import { Component, OnInit } from '@angular/core';
import { User } from '../../model/User';
import { AuthenticationService } from '../services/authentication.service';
import { EnchereService } from '../services/enchere.service';
import { Enchere } from '../../model/Enchere';
import { Transaction } from '../../model/transaction';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: User[] = [];
  encheres: Enchere[] = [];
  error: string | null = null;
  transactions: Transaction[] = [];

  constructor(
    private authService: AuthenticationService,
    private enchereService: EnchereService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadEncheres();
  }

  loadUsers(): void {
    this.authService.getAllUsers().subscribe(
      (data) => this.users = data,
      (error) => this.error = 'Failed to load users'
    );
  }

  loadEncheres(): void {
    this.enchereService.getAllEnchere().subscribe(
      (data) => this.encheres = data,
      (error) => this.error = 'Failed to load encheres'
    );
  }

  deleteUser(userId: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.authService.deleteUser(userId).subscribe(
        () => this.loadUsers(),
        (error) => this.error = 'Failed to delete user'
      );
    }
  }
  loadTransactions(): void {
    this.authService.getAllTransactions().subscribe(
      (data) => this.transactions = data,
      (error) => this.error = 'Failed to load transactions'
    );
  }
  deleteEnchere(enchereId: number): void {
    if (confirm('Are you sure you want to delete this enchere?')) {
      this.enchereService.deleteEnchere(enchereId).subscribe(
        () => this.loadEncheres(),
        (error) => this.error = 'Failed to delete enchere'
      );
    }
  }
}
