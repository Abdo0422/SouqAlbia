import { Component, OnInit, ViewChild } from '@angular/core';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { EnchereService } from './services/enchere.service';
import { Enchere } from '../model/Enchere';
import { User } from '../model/User';
import { AlertServicesService } from './services/alert-services.service';
import { WatchlistPopupComponent } from './watchlist-popup/watchlist-popup.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Souq_Albia';
  image = 'assets/SouqAlbia.gif';
  isSidebarActive = false;
  dropdownOpen = false;
  showLoading = false;
  encheres: Enchere[] = [];
  filteredEncheres: Enchere[] = [];
  searchTerm = '';
  users: User[] = [];
  filteredUsers: User[] = [];
  currentUser: User | null = null;
  watchlist: Enchere[] = [];
  isAdmin = false;
  isSearchPopupVisible = false;
  paymentNotifications: any[] = [];
  isPaymentPopupVisible: boolean = false;

  openSearch() {
    this.isSearchPopupVisible = !this.isSearchPopupVisible; // Show search popup
    this.searchTerm = ''; // Reset search term when opening the popup
    this.filteredEncheres = this.encheres; // Reset filtered results
  }
  @ViewChild(WatchlistPopupComponent)
  watchlistPopupComponent!: WatchlistPopupComponent;

  closeSearch() {
    this.isSearchPopupVisible = false; // Hide search popup
    this.searchTerm = ''; // Clear search term
    this.filteredEncheres = this.encheres; // Reset filtered results
  }

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive; // Toggles the sidebar
  }
  closeSidebar() {
    this.isSidebarActive = false; // Close sidebar
  }
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private enchereService: EnchereService,
    private alertService: AlertServicesService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.showLoading = true;
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        setTimeout(() => {
          this.showLoading = false;
        }, 1000); // Timeout duration to allow spinner to be visible
      }
      if (event instanceof NavigationError) {
        console.error('Navigation error:', event.error);
      }
    });
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadEncheres();
    this.loadUsers();
    this.checkAdminStatus();
    this.fetchPaymentNotifications();
  }
  navigateToCreateAuction() {
    this.router.navigate(['/create-auction']);
  }
  fetchPaymentNotifications(): void {
    this.authService.getPaymentNotifications().subscribe(
      (notifications) => {
        this.paymentNotifications = notifications;
        if (this.paymentNotifications.length > 0) {
          this.showPaymentAlert(); // Show the alert if there are notifications
        }
      },
      (error) => {
        console.error('Error fetching payment notifications:', error);
      }
    );
  }
  showPaymentPopup(): void {
    this.isPaymentPopupVisible = true; // Set the popup visibility to true
  }

  showPaymentAlert(): void {
    this.alertService.addAlert(
      'You have new payments for your auctions!',
      () => {
        this.showPaymentPopup(); // Show the popup when alert is clicked
      }
    );
  }
  handleAlertClick(alert: string): void {
    if (alert === 'You have new payments for your auctions!') {
      this.showPaymentPopup();
      console.log('You have new payments for your auctions!');
    }
  }

  closePaymentPopup(): void {
    this.isPaymentPopupVisible = false; // Hide the popup
  }
  getAlerts(): string[] {
    return this.alertService.getAlerts();
  }

  getAlertCount(): number {
    return this.alertService.getAlertCount();
  }
  clearAlerts(): void {
    this.alertService.clearAlerts();
    this.dropdownOpen = false;
  }
  loadEncheres(): void {
    this.enchereService.getAllEnchere().subscribe(
      (data) => {
        this.encheres = data;
        this.filteredEncheres = data;
      },
      (error) => console.error('Failed to fetch encheres', error)
    );
  }

  loadUsers(): void {
    this.authService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
        this.filteredUsers = data;
      },
      (error) => console.error('Failed to fetch users', error)
    );
  }

  checkAdminStatus(): void {
    if (this.currentUser) {
      this.authService
        .isAdmin()
        .subscribe((isAdmin) => (this.isAdmin = isAdmin));
    }
  }

  onSearch(): void {
    this.filteredEncheres = this.searchTerm
      ? this.encheres.filter((enchere) =>
          enchere.nom.toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      : [];
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout(): void {
    this.authService.logout();
    this.alertService.logout();
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }

  isHomeComponent(): boolean {
    return this.router.url === '/';
  }

  onSelectEnchere(Enchere: Enchere): void {
    this.router.navigate(['/EncherePage', Enchere.produit_id]).then(() => {
      window.location.reload();
    });
  }

  isPopupVisible: boolean = false;

  // Toggle the popup visibility
  showPopup(): void {
    this.isPopupVisible = true; // Set the popup to visible
    console.log('Showing popup');
  }

  closePopup(): void {
    this.isPopupVisible = false; // Set the popup to hidden
    console.log('Closing popup');
  }
}
