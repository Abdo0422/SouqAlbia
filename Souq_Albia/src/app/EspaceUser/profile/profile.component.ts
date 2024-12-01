import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../../model/User';
import { AlertServicesService } from '../../services/alert-services.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
    standalone: false
})
export class ProfileComponent implements OnInit {
  user: User = new User();
  showShippingInput = false;
  showDeliveryInput = false;
  showPaymentInput = false;
  addresses: string[] = [];
  paymentOptions: string[] = [];

  constructor(private authService: AuthenticationService, private alertService: AlertServicesService) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.authService.getProfile().subscribe(user => {
      this.user = user;
    }, error => {
      console.error('Failed to load user profile:', error);
    });
  }

  updateProfile(): void {
    this.authService.updateProfile(this.user).subscribe(updatedUser => {
      this.user = updatedUser;
      this.alertService.addAlert('Profile updated successfully!');
      window.location.reload();
    }, error => {
      console.error('Update failed:', error);
    });
  }

  deleteUser(): void {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      this.authService.deleteUser(this.user.id).subscribe(() => {
        this.alertService.addAlert('Account deleted successfully!');
        console.log('User account deleted');
      }, error => {
        console.error('Delete failed:', error);
      });
    }
  }

  addAddress(type: 'shipping' | 'delivery' | 'payment', value: string): void {
    if (type === 'shipping') {
      this.addresses.push(value);
      this.showShippingInput = false;
    } else if (type === 'payment') {
      this.paymentOptions.push(value);
      this.showPaymentInput = false;
    }
  }

  removeInput(index: number, type: 'shipping' | 'payment'): void {
    if (type === 'shipping') {
      this.addresses.splice(index, 1);
    } else if (type === 'payment') {
      this.paymentOptions.splice(index, 1);
    }
  }
}
