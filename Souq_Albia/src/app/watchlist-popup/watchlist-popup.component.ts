import { Component, Output, EventEmitter } from '@angular/core';
import { Enchere } from '../../model/Enchere';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-watchlist-popup',
    templateUrl: './watchlist-popup.component.html',
    styleUrls: ['./watchlist-popup.component.css'],
    standalone: false
})
export class WatchlistPopupComponent {
  watchlist: Enchere[] = [];
  @Output() close = new EventEmitter<void>();

  constructor(private authService: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
    this.loadWatchlist();
  }

  loadWatchlist(): void {
    const currentUserId = this.authService.getCurrentUserId();
    console.log('Current User ID:', currentUserId);
    if (currentUserId !== null) {
      const storedWatchlist = JSON.parse(localStorage.getItem(`watchlist_${currentUserId}`) || '[]');
      this.watchlist = storedWatchlist;
      console.log('Loaded Watchlist:', this.watchlist);
    } else {
      console.warn('No valid user ID found.');
    }
  }

  onSelectEnchere(enchere: Enchere): void {
    this.router.navigate(['/EncherePage', enchere.produit_id]).then(() => {
      window.location.reload();
    });
  }

  closePopup(): void {
    console.log('Closing popup');
    this.close.emit(); // Emit event to parent to close the popup
  }
}
