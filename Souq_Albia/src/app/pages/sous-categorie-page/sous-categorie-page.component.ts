import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SousCategorie } from '../../../model/SousCategorie';
import { CategorieService } from '../../services/categorie.service';
import { EnchereService } from '../../services/enchere.service';
import { Categorie } from '../../../model/Categorie';
import { Enchere } from './../../../model/Enchere';

@Component({
    selector: 'app-sous-categorie-page',
    templateUrl: './sous-categorie-page.component.html',
    styleUrls: ['./sous-categorie-page.component.css'],
    standalone: false
})
export class SousCategoriePageComponent implements OnInit {
  selectedSousCategorie: SousCategorie | null = null;
  subCategories: SousCategorie[] = [];
  selectedCategoryId: number | null = null;
  categoryName: string = '';
  showSubCategories: boolean = false;
  selectedSousCategoryId: number | null = null;
  itemCount: number = 0;
  products: Enchere[] = [];
  categories: Categorie[] = [];
  filteredSousCategories: SousCategorie[] = [];
  selectedCategory: Categorie | null = null;

  countries: string[] = [
    'France', 'Allemagne', 'États-Unis', 'Canada', 'Australie', 'Japon', 'Chine',
    'Maroc', 'Espagne', 'Italie', 'Brésil', 'Inde', 'Mexique', 'Royaume-Uni',
    'Argentine', 'Afrique du Sud', 'Russie', 'Portugal', 'Grèce', 'Turquie',
    'Corée du Sud', 'Nouvelle-Zélande', 'Indonésie', 'Thaïlande', 'Vietnam',
    'Malaisie', 'Philippines', 'Egypte', 'Arabie Saoudite', 'Émirats Arabes Unis'
  ];

  // Split countries into popular and remaining lists
  popularCountries: string[] = this.countries.slice(0, 5);
  remainingCountries: string[] = this.countries.slice(5);

  showMore: boolean = false;
  selectedCountries: Set<string> = new Set<string>();

  // Split countries into chunks of 10 items each
  countryChunks: string[][] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: CategorieService,
    private productService: EnchereService
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getSelectedSousCategorie();
    this.getSousCategoryItemCount();
    this.loadProducts();
    this.chunkCountries();
     setInterval(() => {
      this.products.forEach(enchereItem => {
        if (enchereItem.status === 'active') {
          enchereItem.dateFin;
        }
      });
    }, 60000);
  }




  toggleCountrySelection(country: string): void {
    if (this.selectedCountries.has(country)) {
      this.selectedCountries.delete(country);
    } else {
      this.selectedCountries.add(country);
    }
    this.filterProductsByCountry();
  }

  filterProductsByCountry(): void {
    console.log('Selected Countries:', Array.from(this.selectedCountries));
  }

  onSelectEnchere(enchere: Enchere): void {
    this.router.navigate(['/EncherePage', enchere.produit_id]);
  }

  toggleSubCategories(category: Categorie): void {
    if (this.selectedCategory === category) {
      this.showSubCategories = !this.showSubCategories;
    } else {
      this.selectedCategory = category;
      this.showSubCategories = true;
      this.categoryName = category.nom;
      this.getSousCategories(category.id_categorie);
    }
  }

  selectCategory(category: Categorie): void {
    this.selectedCategory = category;
    this.showSubCategories = true;
    this.getSousCategories(category.id_categorie);
  }

  getSousCategories(categoryId: number): void {
    this.dataService.getSubCategoriesByCategoryId(categoryId).subscribe(subCategories => {
      this.subCategories = subCategories;
      this.filteredSousCategories = subCategories;
      console.log('Filtered SubCategories:', this.filteredSousCategories);
    });
  }

  getSelectedSousCategorie(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.dataService.getSousCategorieById(id).subscribe((sousCategorie: SousCategorie) => {
      this.selectedSousCategorie = sousCategorie;
      this.selectedCategoryId = sousCategorie.id_categorie;
      console.log('Selected SousCategorie:', this.selectedSousCategorie);
      this.getCategoryNameById(this.selectedCategoryId);
      this.getSousCategories(this.selectedCategoryId);
    });
  }

  getCategoryNameById(categoryId: number): void {
    this.dataService.getCategoryById(categoryId).subscribe(category => {
      this.categoryName = category.nom;
      console.log('Category Name:', this.categoryName);
    });
  }

  selectSubCategory(subCategory: SousCategorie): void {
    this.selectedSousCategorie = subCategory;
    this.getCategoryNameById(subCategory.id_categorie);
    this.getSousCategoryItemCount();
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

  loadProducts(): void {
    this.productService.getAllEnchere().subscribe(products => {
      this.products = products;
      this.selectedSousCategoryProducts();
    });
  }

  selectedSousCategoryProducts(): Enchere[] {
    if (this.products && this.selectedSousCategorie) {
      const selectedProducts = this.products.filter(product => product.id_sous_categorie === this.selectedSousCategorie?.id_sous_categorie);
      console.log(selectedProducts);
      return selectedProducts;
    } else {
      return [];
    }
  }

  getSousCategoryItemCount(): number {
    if (this.products && this.selectedSousCategorie) {
      const itemCount = this.products.filter(product => product.id_sous_categorie === this.selectedSousCategorie?.id_sous_categorie).length;
      return itemCount;
    } else {
      return 0;
    }
  }

  getCategories(): void {
    this.dataService.getAllCategories().subscribe((categories: Categorie[]) => {
      this.categories = categories;
    });
  }

  toggleShowMore(): void {
    this.showMore = !this.showMore;
  }

  // Chunk countries into arrays of 10
  chunkCountries(): void {
    const chunkSize = 10;
    this.countryChunks = [];
    for (let i = 0; i < this.countries.length; i += chunkSize) {
      this.countryChunks.push(this.countries.slice(i, i + chunkSize));
    }
  }
  sortProducts(criteria: string): void {
    if (criteria === 'tempsRestant') {
      this.products.sort((a, b) => {
        const durationA = new Date(a.dateFin).getTime() - new Date(a.dateDebut).getTime();
        const durationB = new Date(b.dateFin).getTime() - new Date(b.dateDebut).getTime();
        return durationA - durationB;
      });
    } else if (criteria === 'recentementAjoute') {
      this.products.sort((a, b) => new Date(b.dateDebut).getTime() - new Date(a.dateDebut).getTime());
    }
    this.selectedSousCategoryProducts(); // Update displayed products
  }
}


