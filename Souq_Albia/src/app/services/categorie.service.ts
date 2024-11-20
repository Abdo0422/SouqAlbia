import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categorie } from '../../model/Categorie';
import { Observable } from 'rxjs';
import { SousCategorie } from '../../model/SousCategorie';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  private baseUrl = 'http://localhost/Souq_AlbiaBackend';
  private categories: Categorie[] = [];
  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(`${this.baseUrl}/getAllCategories.php`);
  }

  getSousCategories(): Observable<SousCategorie[]> {
    return this.http.get<SousCategorie[]>(`${this.baseUrl}/getSousCategories.php`);
  }

  getNombreEncheresParSousCategorie(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/CountItemsPerSubcategorie.php`);
  }

  getSousCategorieById(id: number): Observable<SousCategorie> {
    return this.http.get<SousCategorie>(`${this.baseUrl}/getSousCategorieById.php?id=${id}`);
  }

  getItemsBySousCategorieId(sousCategorieId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getItemsBySousCategorieId.php?id=${sousCategorieId}`);
  }

  getSubCategoriesByCategoryId(categoryId: number): Observable<SousCategorie[]> {
    return this.http.get<SousCategorie[]>(`${this.baseUrl}/getSubCategoriesByCategoryId.php?categoryId=${categoryId}`);
  }
  getCategoryById(id: number): Observable<Categorie> {
    return this.http.get<Categorie>(`${this.baseUrl}/getCategoryById.php?id=${id}`);
  }
  getItemCountForSousCategory(sousCategoryId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/getItemCountForSousCategory.php?sousCategoryId=${sousCategoryId}`);
  }
  getSousCategorieByCatID(categoryId: number): Observable<SousCategorie[]> {
    return this.http.get<SousCategorie[]>(`${this.baseUrl}/getSousCategorieByCategoryId.php?category_id=${categoryId}`);
  }
}
