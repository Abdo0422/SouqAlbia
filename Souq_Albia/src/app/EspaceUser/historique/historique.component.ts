import { Component , OnInit} from '@angular/core';
import { Enchere } from '../../../model/Enchere';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-historique',
    templateUrl: './historique.component.html',
    styleUrl: './historique.component.css',
    standalone: false
})
export class HistoriqueComponent implements OnInit {
  constructor(  private router: Router,  private authService: AuthenticationService) {}
  enchereHistory: Enchere[] = [];

  ngOnInit(): void {
      this.loadEnchereHistory();
  }

  loadEnchereHistory(): void {
      const currentUserId = this.authService.getCurrentUserId();
      if (currentUserId !== null) {
          const historyKey = `history_${currentUserId}`;
          this.enchereHistory = JSON.parse(localStorage.getItem(historyKey) || '[]');
      }
  }

  clearHistory(): void {
      const currentUserId = this.authService.getCurrentUserId();
      if (currentUserId !== null) {
          const historyKey = `history_${currentUserId}`;
          localStorage.removeItem(historyKey);
          this.enchereHistory = [];
      }
  }
  getRemainingTime(dateFin: Date): string {
    const now = new Date();
    const endDate = new Date(dateFin);
    const diffMs = endDate.getTime() - now.getTime();

    if (diffMs <= 0) {
      return 'Terminé';
    }

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${days}j ${hours}h ${minutes}min`;
  }


  onSelectEnchere(Enchere: Enchere): void {
    this.router.navigate(['/EncherePage', Enchere.produit_id]).then(() => {
      window.location.reload();
    });;
  }
}
