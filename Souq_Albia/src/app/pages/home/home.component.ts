import { Categorie } from './../../../model/Categorie';
import { Component , OnInit  } from '@angular/core';
import { EnchereService } from '../../services/enchere.service';
import { Enchere } from '../../../model/Enchere';
import { CategorieService } from '../../services/categorie.service';
import { Router } from '@angular/router';
import { SousCategorie } from '../../../model/SousCategorie';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    standalone: false
})
export class HomeComponent implements OnInit {
  enchereDataCours: Enchere[] = [];
  enchereDataTendance: Enchere[] = [];
  categories: Categorie[] = [];
  sousCategories: SousCategorie[] = [];
  selectedCategory: Categorie | null = null;
  encheres: Enchere[] = [];
  filteredEncheres: Enchere[] = [];
  searchTerm: string = '';
  constructor(private enchereService: EnchereService , private categorieService: CategorieService ,private router: Router) { }

  ngOnInit(): void {
    this.enchereService.getEnchereCours().subscribe(
      (data: Enchere[]) => {
        console.log('Enchere Cours Data:', data);  // Log data to verify structure
        this.enchereDataCours = data;
      },
      (error) => {
        console.error('Error fetching auction data:', error);
      }
    );

    this.enchereService.getEnchereTendance().subscribe(
      (data: Enchere[]) => {
        console.log('Enchere Tendance Data:', data);  // Log data to verify structure
        this.enchereDataTendance = data;
      },
      (error) => {
        console.error('Error fetching auction data:', error);
      }
    );

    this.categorieService.getAllCategories().subscribe(
      (data: Categorie[]) => {
        console.log('Categories Data:', data);  // Log data to verify structure
        this.categories = data;
      },
      (error) => {
        console.error('Error fetching categories data:', error);
      }
    );
    this.loadEncheres();
    setInterval(() => {
      this.enchereDataCours.forEach(enchereItem => {
        if (enchereItem.status === 'active') {
          enchereItem.dateFin;
        }
      });
    }, 60000);
  }


  loadEncheres() {
    this.enchereService.getAllEnchere().subscribe(
      (data: Enchere[]) => {  // Ensure 'data' is of type Enchere[]
        if (Array.isArray(data)) {
          this.encheres = data;
          this.filteredEncheres = data;
          console.log('Encheres:', this.encheres);
          console.log('Filtered Encheres:', this.filteredEncheres);
        } else {
          console.error('Fetched data is not an array:', data);
        }
      },
      (error) => {
        console.error('Failed to fetch encheres', error);
      }
    );
  }


  onSearch() {
    if (this.searchTerm) {
      this.filteredEncheres = this.encheres.filter((enchere) =>
        enchere.nom && enchere.nom.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredEncheres = [];
    }
  }

  goToCategory(categorie: Categorie) {
    this.selectedCategory = categorie;
    this.router.navigate(['/CategoriePage'], { state: { selectedCategory: categorie } });
  }
  onSelectEnchere(Enchere: Enchere): void {
    this.router.navigate(['/EncherePage', Enchere.id]);
  }
  getRemainingTime(enchereItem: Enchere): string {
    if (enchereItem.status === 'inactive') {
      return 'Inactive';  // Display a static message for inactive auctions
    }

    const now = new Date();
    const endDate = new Date(enchereItem.dateFin);
    const diffMs = endDate.getTime() - now.getTime();

    if (diffMs <= 0) {
      return 'Terminé';  // Indicate that the auction has ended
    } else {
      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

      return `Se termine en ${days}j ${hours}h ${minutes}min`;
    }
  }



}
