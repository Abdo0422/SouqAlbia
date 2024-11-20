import { Component, OnInit } from '@angular/core';
import { User } from '../../../model/User';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  users: User[] = [];
  error: string | null = null;

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.authService.getAllUsers().subscribe(
      (data) => this.users = data,
      (error) => this.error = 'Failed to load users'
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
}
