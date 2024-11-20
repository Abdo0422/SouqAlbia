import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-commentaires',
  templateUrl: './commentaires.component.html',
  styleUrls: ['./commentaires.component.css']
})
export class CommentairesComponent implements OnInit {
  comments: any[] = [];
  stars: number[] = [1, 2, 3, 4, 5];
  userId: number | null = null;

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.loadComments();
    this.userId = this.authService.getCurrentUserId();

    // Log the current userId to the console
    console.log('Current User ID:', this.userId);
  }

  loadComments(): void {
      this.comments = JSON.parse(localStorage.getItem('comments') || '[]');

      // Ensure vendeurId is a number
      this.comments.forEach(comment => {
        comment.vendeurID = Number(comment.vendeurID);
      });

    console.log('Loaded Comments:', this.comments);
  }
}
