import { Component, OnInit } from '@angular/core';
import { EnchereService } from '../../services/enchere.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
    selector: 'app-tableau-de-bord',
    templateUrl: './tableau-de-bord.component.html',
    styleUrls: ['./tableau-de-bord.component.css'],
    standalone: false
})
export class TableauDeBordComponent implements OnInit {
  disponibles: number = 0;
  conclu: number = 0;
  enAttente: number = 0;

  constructor(
    private enchereService: EnchereService,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.loadCounts();
  }

  loadCounts(): void {
    const vendeurId = this.authService.getCurrentUserId();
    if (vendeurId !== null) {
      this.enchereService.getCounts(vendeurId).subscribe(
        data => {
          this.disponibles = data.disponibles;
          this.conclu = data.conclu;
          this.enAttente = data.en_attente;
        },
        error => {
          console.error('Erreur lors de la récupération des données', error);
        }
      );
    } else {
      console.error('ID de vendeur non disponible');
    }
  }
}
