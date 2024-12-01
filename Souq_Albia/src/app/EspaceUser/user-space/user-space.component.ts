import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-user-space',
    templateUrl: './user-space.component.html',
    styleUrl: './user-space.component.css',
    standalone: false
})
export class UserSpaceComponent {
  isDropdownOpen = false;

  constructor(private router: Router) {}

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  isLinkActive(url: string): boolean {
    return this.router.url.includes(url);
  }

}
