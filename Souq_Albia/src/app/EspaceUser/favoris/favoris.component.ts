import { Component, OnInit } from '@angular/core';
import { Enchere } from '../../../model/Enchere';
import { AuthenticationService } from './../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.component.html',
  styleUrls: ['./favoris.component.css']
})
export class FavorisComponent implements OnInit {
  watchlist: Enchere[] = [];
  isDropdownOpen: boolean = false;

  constructor(private authservice: AuthenticationService , private router: Router) {}

  ngOnInit(): void {
    this.loadWatchlist();
  }

  loadWatchlist(): void {
    const currentUserId = this.authservice.getCurrentUserId();
    console.log('Current User ID:', currentUserId);
    if (currentUserId !== null) {
      const storedWatchlist = JSON.parse(localStorage.getItem(`watchlist_${currentUserId}`) || '[]');
      this.watchlist = storedWatchlist;
      console.log('Loaded Watchlist:', this.watchlist);
    } else {
      console.warn('No valid user ID found.');
    }
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  sortWatchlist(sortType: 'oldest' | 'newest'): void {
    this.isDropdownOpen = false;
    if (sortType === 'oldest') {
      this.watchlist.sort((a, b) => new Date(a.dateFin).getTime() - new Date(b.dateFin).getTime());
    } else if (sortType === 'newest') {
      this.watchlist.sort((a, b) => new Date(b.dateFin).getTime() - new Date(a.dateFin).getTime());
    }
  }

  getRemainingTime(dateFin: Date): string {
    const now = new Date();
    const endDate = new Date(dateFin);
    const diffMs = endDate.getTime() - now.getTime();

    if (diffMs <= 0) {
      return 'Terminé';
    } else {
      const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

      return `Se termine en ${days}j ${hours}h ${minutes}min`;
    }
  }

  onSelectEnchere(enchere: Enchere): void {
    this.router.navigate(['/EncherePage', enchere.produit_id]).then(() => {
      window.location.reload();
    });
  }
}
