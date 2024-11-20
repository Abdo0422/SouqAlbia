import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enchere } from '../../model/Enchere';
import { catchError, throwError, Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class EnchereService {
  constructor(private http: HttpClient) {}

  getEnchereCours(): Observable<Enchere[]> {
    return this.http.get<Enchere[]>(
      'http://localhost/Souq_AlbiaBackend/getEnchereCours.php'
    );
  }
  getAllEnchereCours(): Observable<Enchere[]> {
    return this.http.get<Enchere[]>(
      'http://localhost/Souq_AlbiaBackend/getallEnchereCours.php'
    );
  }
  getEnchereTendance(): Observable<Enchere[]> {
    return this.http.get<Enchere[]>(
      'http://localhost/Souq_AlbiaBackend/getEnchereTendance.php'
    );
  }
  getEnchereAllTendance(): Observable<Enchere[]> {
    return this.http.get<Enchere[]>(
      'http://localhost/Souq_AlbiaBackend/getallEnchereTendance.php'
    );
  }
  getAllEnchere(): Observable<Enchere[]> {
    return this.http.get<Enchere[]>(
      'http://localhost/Souq_AlbiaBackend/getAllEnchere.php'
    );
  }
  getEnchereById(id: number): Observable<Enchere> {
    return this.http.get<Enchere>(
      `http://localhost/Souq_AlbiaBackend/getEnchereByID.php?id=${id}`
    );
  }
  getEncheresBySousCategorie(souscategorieId: number): Observable<Enchere[]> {
    return this.http.get<Enchere[]>(
      `http://localhost/Souq_AlbiaBackend/getEnchereBySubCategorie.php?id_sous_categorie=${souscategorieId}`
    );
  }
  deleteEnchere(id: number): Observable<any> {
    return this.http
      .request(
        'DELETE',
        `http://localhost/Souq_AlbiaBackend/deleteEnchere.php?id=${id}`
      )
      .pipe(catchError(this.handleError));
  }
  updateEnchere(data: any): Observable<any> {
    return this.http.get<any>(
      'http://localhost/Souq_AlbiaBackend/submit_offer.php',
      data
    );
  }
  private handleError(error: HttpErrorResponse) {
    // Handle different types of errors here
    return throwError(() => new Error('An error occurred.'));
  }
  getCounts(vendeurId: number): Observable<any> {
    return this.http.get<any>(
      `http://localhost/Souq_AlbiaBackend/CountEnchereByVendeur.php?vendeur_id=${vendeurId}`
    );
  }
  getCompletedAuctions(userId: number): Observable<Enchere[]> {
    return this.http.get<Enchere[]>(
      `http://localhost/Souq_AlbiaBackend/getFinishedEnchere.php?acheteur_id=${userId}`
    );
  }
  startEnchere(id: number): Observable<any> {
    return this.http.post<any>(
      'http://localhost/Souq_AlbiaBackend/startEnchere.php',
      { id }
    );
  }

  stopEnchere(id: number): Observable<any> {
    return this.http.post<any>(
      'http://localhost/Souq_AlbiaBackend/stopEnchere.php',
      { id }
    );
  }

  reportItem(enchereId: number, reason: string): void {
    this.http.post('http://localhost/Souq_AlbiaBackend/report.php', { enchereId, reason })
      .subscribe((response : any) => {
        // Handle success or failure response
        alert(response['message']);
      }, error => {
        alert('Error occurred while reporting the item.');
      });
  }
}
