import { Component, OnInit } from '@angular/core';
import { Enchere } from '../../../model/Enchere';
import { EnchereService } from '../../services/enchere.service';

@Component({
    selector: 'app-manage-encheres',
    templateUrl: './manage-encheres.component.html',
    styleUrls: ['./manage-encheres.component.css'],
    standalone: false
})
export class ManageEncheresComponent implements OnInit {
  encheres: Enchere[] = [];
  error: string | null = null;

  constructor(private enchereService: EnchereService) {}

  ngOnInit(): void {
    this.loadEncheres();
  }

  loadEncheres(): void {
    this.enchereService.getAllEnchere().subscribe(
      (data) => this.encheres = data,
      (error) => this.error = 'Failed to load encheres'
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
  startEnchere(enchereId: number): void {
    this.enchereService.startEnchere(enchereId).subscribe(
      () => this.loadEncheres(),
      (error) => this.error = 'Failed to start enchere'
    );
  }

  stopEnchere(enchereId: number): void {
    this.enchereService.stopEnchere(enchereId).subscribe(
      () => this.loadEncheres(),
      (error) => this.error = 'Failed to stop enchere'
    );
  }

}
