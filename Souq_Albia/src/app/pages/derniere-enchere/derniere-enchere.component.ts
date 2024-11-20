import { Component, OnInit } from '@angular/core';
import { EnchereService } from '../../services/enchere.service';
import { Enchere } from '../../../model/Enchere';
import { Categorie } from '../../../model/Categorie';
import { SousCategorie } from '../../../model/SousCategorie';
import { CategorieService } from '../../services/categorie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-derniere-enchere',
  templateUrl: './derniere-enchere.component.html',
  styleUrls: ['./derniere-enchere.component.css'] // Ensure this points to the correct stylesheet
})
export class DerniereEnchereComponent implements OnInit {
  latestEncheres: Enchere[] = [];
  filteredEncheres: Enchere[] = [];
  searchQuery: string = '';
  selectedCategory: number = 0;
  selectedSousCategorie: number = 0;
  minPrice: number | null = null;
  maxPrice: number | null = null;
  location: string = '';
  categories: Categorie[] = [];
  sousCategories: SousCategorie[] = [];

  constructor(
    private enchereService: EnchereService,
    private categorieService: CategorieService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.enchereService.getAllEnchereCours().subscribe((data: Enchere[]) => {
      this.latestEncheres = data;
      this.filteredEncheres = [...this.latestEncheres];
    });
    this.getCategories();
  }

  getCategories(): void {
    this.categorieService.getAllCategories().subscribe((categories: Categorie[]) => {
      this.categories = categories;

    });
  }


  getSousCategories(categoryId: number): void {
    this.categorieService.getSousCategorieByCatID(categoryId).subscribe((sousCategories: SousCategorie[]) => {
      this.sousCategories = sousCategories;
    });
  }
  onSelectEnchere(Enchere: Enchere): void {
    this.router.navigate(['/EncherePage', Enchere.id]);
  }

  applyFilters(): void {
    this.filteredEncheres = this.latestEncheres.filter(enchere => {
      const matchesCategory = this.selectedCategory ? enchere.id_sous_categorie === this.selectedSousCategorie : true;
      const matchesPrice = (this.minPrice ? enchere.prixactuel >= this.minPrice : true) &&
                           (this.maxPrice ? enchere.prixactuel <= this.maxPrice : true);
      const matchesLocation = this.location ? enchere.localisation.toLowerCase().includes(this.location.toLowerCase()) : true;

      return matchesCategory && matchesPrice && matchesLocation;
    });
  }

  onFilterChange(): void {
    this.applyFilters();
  }
}
