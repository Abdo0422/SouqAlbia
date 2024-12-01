import { Component } from "@angular/core";
import { NgForm } from '@angular/forms';
import { Enchere } from "../../../model/Enchere";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SousCategorie } from "../../../model/SousCategorie";
import { AuthenticationService } from "../../services/authentication.service";
import { AlertServicesService } from "../../services/alert-services.service";
import { Router } from '@angular/router';

@Component({
    selector: 'app-create-enchere',
    templateUrl: './create-enchere.component.html',
    styleUrls: ['./create-enchere.component.css'],
    standalone: false
})
export class CreateEnchereComponent {
  enchere: Enchere = new Enchere();
  duration: string = '';
  location: string = '';
  countries: string[] = [
    'France', 'Allemagne', 'États-Unis', 'Canada', 'Australie', 'Japon', 'Chine',
    'Maroc', 'Espagne', 'Italie', 'Brésil', 'Inde', 'Mexique', 'Royaume-Uni',
    'Argentine', 'Afrique du Sud', 'Russie', 'Portugal', 'Grèce', 'Turquie',
    'Corée du Sud', 'Nouvelle-Zélande', 'Indonésie', 'Thaïlande', 'Vietnam',
    'Malaisie', 'Philippines', 'Egypte', 'Arabie Saoudite', 'Émirats Arabes Unis'
  ];
  filteredCountries: string[] = [];
  files: File[] = []; // Add a property to hold files
  sousCategories: SousCategorie[] = [];


  constructor(private http: HttpClient , private authService: AuthenticationService , private alertService: AlertServicesService,private router: Router ) {}
  ngOnInit() {
    this.getSousCategories().subscribe(
      (data: SousCategorie[]) => {
        this.sousCategories = data;
      },
      error => {
        console.error('Erreur lors de la récupération des sous-catégories:', error);
      }
    );
  }
  filterCountries() {
    const query = this.location.toLowerCase();
    if (query) {
      this.filteredCountries = this.countries
        .filter(country => country.toLowerCase().includes(query))
        .sort((a, b) => a.localeCompare(b));
    } else {
      this.filteredCountries = [];
    }
  }

  getSousCategories(): Observable<SousCategorie[]> {
    return this.http.get<SousCategorie[]>('http://localhost/Souq_AlbiaBackend/getSousCategories.php');
  }
  updateDateFin() {
    const days = 0;
    let durationDays = 0;

    switch (this.duration) {
      case '3 jours':
        durationDays = 3;
        break;
      case '24h':
        durationDays = 1;
        break;
      case '7 jours':
        durationDays = 7;
        break;
    }
    this.enchere.dateDebut = new Date();
    this.enchere.dateFin = new Date();
    this.enchere.dateFin.setDate(this.enchere.dateFin.getDate() + days);
  }
  selectSubCategory(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedValue = target.value;

    // Check if the selectedValue is not empty and is a valid number
    if (selectedValue) {
      const id = Number(selectedValue); // Convert value to number
      if (!isNaN(id)) {
        this.enchere.id_sous_categorie = id;
      } else {
        console.error('Invalid number selected:', selectedValue);
        this.enchere.id_sous_categorie = 0; // or handle as needed
      }
    } else {
      this.enchere.id_sous_categorie = 0; // or handle as needed
    }
  }

  selectCountry(country: string) {
    this.location = country;
    this.filteredCountries = [];
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.files = Array.from(input.files); // Convert FileList to array
    }
  }
  onSubmit(form: NgForm): void {
    console.log('Enchere object:', this.enchere);

    const formData = new FormData();
    formData.append('title', this.enchere.nom);
    formData.append('description', this.enchere.description);
    formData.append('state', this.enchere.state);
    formData.append('location', this.location);
    formData.append('duration', this.duration);
    formData.append('startingPrice', this.enchere.prixdepart.toString());
    formData.append('id_sous_categorie', this.enchere.id_sous_categorie.toString());

    const vendeurId = this.authService.getCurrentUserId();
    if (vendeurId !== null) {
      formData.append('vendeur_id', vendeurId.toString());
    } else {
      console.error('No current user found, cannot set vendeur_id.');
      return;
    }

    this.files.forEach(file => formData.append('images[]', file));
    console.log('Contenu du FormData :');
    formData.forEach((value, key) => {
      console.log(key, value);
    });

    this.http.post('http://localhost/Souq_AlbiaBackend/CreateEnchere.php', formData).subscribe(
      response => {
        console.log('Response:', response); // Log the response
        this.alertService.addAlert("Enchère créée avec succès");
        form.resetForm(); // Optionally reset the form on success
        this.router.navigate(['/UserSpace/MesEncheres']).then(() => {
          window.location.reload();
        });
      },
      error => {
        console.error('Erreur lors de la création de l\'enchère:', error);
        console.error('Détails de l\'erreur:', error.message, error.status, error.error);
        if (error.error) {
          console.error('Erreur du serveur:', error.error);
        }
        this.alertService.addAlert("Erreur lors de la création de l'enchère");
      }
    );
  }




  onReset(form: NgForm): void { // Updated method to accept form argument
    form.resetForm();
  }
}
