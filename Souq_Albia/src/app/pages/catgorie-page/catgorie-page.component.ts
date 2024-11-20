import { Component, OnInit } from '@angular/core';
import { CategorieService } from '../../services/categorie.service';
import { Categorie } from './../../../model/Categorie';
import { SousCategorie } from '../../../model/SousCategorie';
import { Router } from '@angular/router';


@Component({
  selector: 'app-catgorie-page',
  templateUrl: './catgorie-page.component.html',
  styleUrls: ['./catgorie-page.component.css']
})
export class CatgoriePageComponent implements OnInit {
  sousCategories: SousCategorie[] = [];
  nombre_encheres: any[] = [];
  categories: Categorie[] = [];
  selectedCategory: Categorie | null = null;
  filteredSousCategories: SousCategorie[] = [];

  constructor(private dataService: CategorieService , private route : Router) { }

  ngOnInit(): void {
    this.getCategories();
    this.getSousCategories();
    this.getNumber();
    this.selectedCategory = history.state.selectedCategory || null;
    if (this.selectedCategory) {
      this.filterSousCategories();
    }
  }
  onSelectSousCategorie(sousCategorie: SousCategorie): void {
    this.route.navigate(['/SousCategoriePage', sousCategorie.id_sous_categorie]);
  }
  getNumber(): void {
    this.dataService.getNombreEncheresParSousCategorie().subscribe((encheres: any[]) => {
      this.nombre_encheres = encheres;
    });
  }

  getCategories(): void {
    this.dataService.getAllCategories().subscribe((categories: Categorie[]) => {
      this.categories = categories;
    });
  }

  onSelectCategory(category: Categorie): void {
    this.selectedCategory = category;
    this.filterSousCategories();
  }

  getSousCategories(): void {
    this.dataService.getSousCategories().subscribe((sousCategories: SousCategorie[]) => {
      this.sousCategories = sousCategories;
      this.filterSousCategories();
    });
  }

  filterSousCategories(): void {
    this.filteredSousCategories = [];
    if (this.selectedCategory) {
      for (const sousCategorie of this.sousCategories) {
        if (sousCategorie.id_categorie === this.selectedCategory.id_categorie) {
          this.filteredSousCategories.push(sousCategorie);
        }
      }
    }
  }

  getNumberOfObjects(sousCategorie: SousCategorie): number {
    const sousCategorieId = sousCategorie.id_sous_categorie;
    const numberOfObjects = this.nombre_encheres.find(item => item.id_sous_categorie === sousCategorieId);
    return numberOfObjects ? numberOfObjects.nombre_encheres : 0;
  }
}
