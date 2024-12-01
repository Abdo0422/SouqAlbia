import { AuthenticationService } from './../../services/authentication.service';
import { Component } from '@angular/core';
import { Transaction } from '../../../model/transaction';

@Component({
    selector: 'app-transactions',
    templateUrl: './transactions.component.html',
    styleUrl: './transactions.component.css',
    standalone: false
})
export class TransactionsComponent {
  transactions: Transaction[] = [];
  error: string | null = null;

  constructor(private AuthenticationService: AuthenticationService) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.AuthenticationService.getAllTransactions().subscribe(
      (data) => this.transactions = data,
      (error) => this.error = 'Failed to load transactions'
    );
  }

  deleteTransaction(transactionId: number): void {
    if (confirm('Are you sure you want to delete this transaction?')) {
      this.AuthenticationService.deleteTransaction(transactionId).subscribe(
        () => this.loadTransactions(),
        (error) => this.error = 'Failed to delete transaction'
      );
    }
  }
}
