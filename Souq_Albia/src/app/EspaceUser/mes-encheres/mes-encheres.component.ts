import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../../services/authentication.service';
import { Enchere } from '../../../model/Enchere';
import { EnchereService } from '../../services/enchere.service';
import { AlertServicesService } from '../../services/alert-services.service';
@Component({
    selector: 'app-mes-encheres',
    templateUrl: './mes-encheres.component.html',
    styleUrls: ['./mes-encheres.component.css'],
    standalone: false
})
export class MesEncheresComponent implements OnInit {
  enchereList: Enchere[] = []; 
  isDropdownOpen: boolean = false;

  constructor(private http: HttpClient, private authService: AuthenticationService, private enchereService: EnchereService , private alertService: AlertServicesService) { }

  ngOnInit(): void {
    this.loadEncheres();
  }

  loadEncheres(): void {
    const userId = this.authService.getCurrentUserId();
    if (userId) {
      this.http.get<Enchere[]>(`http://localhost/Souq_AlbiaBackend/getEncheresByVendeur.php?vendeur_id=${userId}`)
        .subscribe(
          data => {
            this.enchereList = data;
            console.log('Enchères chargées:', this.enchereList); // Log loaded enchères
          },
          error => {
            console.error('Erreur lors de la récupération des enchères:', error); // Log error
          }
        );
    } else {
      console.error('Utilisateur non connecté. Impossible de charger les enchères.'); // Log user not connected
    }
  }

  deleteEnchere(id: number): void {
    if (confirm('Are you sure you want to delete this enchere?')) {
        this.enchereService.deleteEnchere(id).subscribe(
            response => {
                console.log('Enchere deleted successfully.', response);
                this.alertService.addAlert('Enchere deleted successfully.');
                window.location.reload();

              },
            error => {
                // Log the error object to understand its structure
                console.error('Error deleting enchere:', error);

                // Check if error contains a response body with an error message
                let errorMessage = 'An error occurred while deleting the enchere.';
                if (error.error && error.error.message) {
                    errorMessage = `An error occurred: ${error.error.message}`;
                } else if (error.message) {
                    errorMessage = `An error occurred: ${error.message}`;
                }

                alert(errorMessage);
            }
        );
    }
}

  editEnchere(id: number): void {
    // Redirect to edit page or open a modal for editing
    console.log(`Modifier l’enchère ${id}`);
    // Example: this.router.navigate(['/edit-enchere', id]);
  }
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  sortWatchlist(sortType: 'oldest' | 'newest'): void {
    this.isDropdownOpen = false;
    if (sortType === 'oldest') {
      this.enchereList.sort((a, b) => new Date(a.dateFin).getTime() - new Date(b.dateFin).getTime());
    } else if (sortType === 'newest') {
      this.enchereList.sort((a, b) => new Date(b.dateFin).getTime() - new Date(a.dateFin).getTime());
    }
  }
  getRemainingTime(dateFin: Date): string {
    const now = new Date();
    const endDate = new Date(dateFin);
    const diffMs = endDate.getTime() - now.getTime();

    if (diffMs <= 0) {
      return 'Terminé';
    }
    else{
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return `Se termine en ${days}j ${hours}h ${minutes}min`;}
  }
}
