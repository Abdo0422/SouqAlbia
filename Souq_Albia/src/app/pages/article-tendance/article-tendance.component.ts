import { Component, OnInit } from '@angular/core';
import { Categorie } from '../../../model/Categorie';
import { SousCategorie } from '../../../model/SousCategorie';
import { Enchere } from '../../../model/Enchere';
import { CategorieService } from '../../services/categorie.service';
import { EnchereService } from '../../services/enchere.service'; // Import EnchereService
import { Router } from '@angular/router';

@Component({
  selector: 'app-article-tendance',
  templateUrl: './article-tendance.component.html',
  styleUrls: ['./article-tendance.component.css'] // Fixed the property name from styleUrl to styleUrls
})
export class ArticleTendanceComponent implements OnInit {
  showSubCategories: boolean = false;
  selectedCategory: Categorie | null = null;
  categoryName: string = '';
  subCategories: SousCategorie[] = [];
  filteredSousCategories: SousCategorie[] = [];
  categories: Categorie[] = [];
  selectedSousCategorie: SousCategorie | null = null;
  enchereDataTendance: Enchere[] = []; // Array to hold auction data

  constructor(private dataService: CategorieService, private enchereService: EnchereService ,private router: Router) { }

  ngOnInit(): void {
    this.getCategories();
    this.getEnchereTendance(); // Call to fetch trending auction data
  }
  onSelectEnchere(Enchere: Enchere): void {
    this.router.navigate(['/EncherePage', Enchere.id]);
  }
  getCategories(): void {
    this.dataService.getAllCategories().subscribe((categories: Categorie[]) => {
      this.categories = categories;
    });
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

  getSousCategories(categoryId: number): void {
    this.dataService.getSubCategoriesByCategoryId(categoryId).subscribe(subCategories => {
      this.subCategories = subCategories;
      this.filteredSousCategories = subCategories;
      console.log('Filtered SubCategories:', this.filteredSousCategories);
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
  }

  getEnchereTendance(): void {
    this.enchereService.getEnchereAllTendance().subscribe(
      (data: Enchere[]) => {
        console.log('Enchere Tendance Data:', data);  // Log data to verify structure
        this.enchereDataTendance = data;
      },
      (error) => {
        console.error('Error fetching auction data:', error);
      }
    );
  }
}
