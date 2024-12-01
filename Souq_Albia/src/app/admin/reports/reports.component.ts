// src/app/admin/reports/reports.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.css'],
    standalone: false
})
export class ReportsComponent implements OnInit {
  reports: any[] = [];
  isDetailVisible: boolean = false;
  selectedReport: any;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchReports();
  }
  closeDetailModal(): void {
    this.isDetailVisible = false; // Hide the detail modal
    this.selectedReport = null; // Reset selected report for future use
  }

  fetchReports(): void {
    this.http
      .get<any[]>('http://localhost/Souq_AlbiaBackend/get_reports.php')
      .subscribe(
        (data) => {
          this.reports = data;
        },
        (error) => {
          console.error('Error fetching reports:', error);
        }
      );
  }
  handleReport(report: any): void {
    this.selectedReport = report; // Set the selected report
    this.fetchEnchereAndProduit(report.enchere_id); // Fetch associated enchere and produit
  }
  fetchEnchereAndProduit(enchereId: number): void {
    this.http.get(`http://localhost/Souq_AlbiaBackend/get_enchere_details.php?id=${enchereId}`).subscribe((data: any) => {
      this.selectedReport.enchereDetails = data; // Add enchere details to the report
      this.isDetailVisible = true; // Show the detail modal
    });
  }
  deleteReport(reportId: number): void {
    this.http
      .delete(
        `http://localhost/Souq_AlbiaBackend/delete_report.php?id=${reportId}`
      )
      .subscribe(
        (response) => {
          this.fetchReports(); // Refresh the reports after deletion
        },
        (error) => {
          console.error('Error deleting report:', error);
        }
      );
  }
}
