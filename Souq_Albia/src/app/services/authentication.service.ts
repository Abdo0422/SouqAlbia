import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../../model/User';
import { Router } from '@angular/router';
import { Transaction } from '../../model/transaction';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient, private router: Router) {}

  register(userData: User): Observable<User> {
    return this.http.post<User>('http://localhost/Souq_AlbiaBackend/signup.php', userData).pipe(
      tap((user) => {
        this.login(userData.email, userData.password).subscribe(
          (loggedInUser) => {
            localStorage.setItem('currentUser', JSON.stringify(loggedInUser));
            this.router.navigate(['/']).then(() => {
              window.location.reload();
            });
          },
          (error) => {
            console.error('Login after registration failed:', error);
          }
        );
      })
    );
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>('http://localhost/Souq_AlbiaBackend/signin.php', { email, password });
  }

  logout(): void {
    const currentUserId = this.getCurrentUserId(); // Assuming you have a method to get the current user's ID
    if (currentUserId !== null) {
      localStorage.removeItem(`watchlist_${currentUserId}`); // Clear the watchlist
    }
    localStorage.removeItem('currentUser'); // Remove current user from localStorage
    sessionStorage.removeItem('currentUser'); // Remove current user from sessionStorage
    console.log('User logged out');
  }

  isLoggedIn(): boolean {
    return !!(localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser'));
  }

  getCurrentUser(): User | null {
    const userJson = localStorage.getItem('currentUser') || sessionStorage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) : null;
  }
  getCurrentUserName(): string {
    const user = this.getCurrentUser();
    return user ? user.nom : '';
  }
  getCurrentUserId(): number | null {
    const user = this.getCurrentUser();
    return user ? user.id : null;
  }
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost/Souq_AlbiaBackend/getUserData.php');
  }

  getProfile(): Observable<User> {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      throw new Error('User not logged in');
    }
    return this.http.get<User>(`http://localhost/Souq_AlbiaBackend/getUserById.php?id=${currentUser.id}`);
  }

  updateProfile(userData: User): Observable<User> {
    return this.http.post<User>(`http://localhost/Souq_AlbiaBackend/updateUser.php`, userData).pipe(
      tap((updatedUser) => {
        localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        sessionStorage.setItem('currentUser', JSON.stringify(updatedUser));
      })
    );
  }

  checkEmailExists(email: string): Observable<any> {
    return this.http.post<any>('http://localhost/Souq_AlbiaBackend/checkmail.php', { email: email });
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>(`http://localhost/Souq_AlbiaBackend/deleteUser.php?id=${userId}`).pipe(
      tap(() => {
        localStorage.removeItem('currentUser');
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
      })
    );
  }
  isAdmin(): Observable<boolean> {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      return new Observable<boolean>(observer => observer.next(false));
    }
    return this.http.get<boolean>(`http://localhost/Souq_AlbiaBackend/checkAdmin.php?id=${currentUser.id}`);
  }


  getPaymentNotifications(): Observable<any> {
    const vendeurId = this.getCurrentUserId(); // Get the current vendeur ID
    return this.http.get<any>(`http://localhost/Souq_AlbiaBackend/paymentNotification.php?vendeurId=${vendeurId}`);
  }

  getAllTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>("http://localhost/Souq_AlbiaBackend/transactions.php");
  }
  deleteTransaction(id: number): Observable<any> {
    return this.http.delete(`http://localhost/Souq_AlbiaBackend/transactions.php?id=${id}`);
  }
}
