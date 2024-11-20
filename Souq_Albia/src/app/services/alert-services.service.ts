import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertServicesService {
  private alerts: { message: string; action?: () => void }[] = []; // Updated to include action
  private storageKey = 'alerts';

  constructor() {
    // Initialize the alerts from localStorage when the service is created
    this.initializeAlerts();
  }

  private initializeAlerts(): void {
    const storedAlerts = localStorage.getItem(this.storageKey);
    if (storedAlerts) {
      try {
        this.alerts = JSON.parse(storedAlerts);
      } catch (error) {
        console.error('Failed to parse alerts from localStorage:', error);
        this.alerts = [];
      }
    } else {
      this.alerts = [];
    }
  }
  logout(): void {
    this.clearAlerts(); // Clear alerts on logout
  }
  addAlert(message: string, action?: () => void): void { // Added action parameter
    this.alerts.push({ message, action }); // Store both message and action
    this.saveAlerts();
    const audio = new Audio('assets/alert.wav');
    audio.play().catch(error => {
      console.error('Error playing sound:', error);
    });

    // Call displayAlert method to show the alert
    this.displayAlert(message, action);
  }

  getAlerts(): string[] {
    return this.alerts.map(alert => alert.message).reverse(); // Return reversed messages
  }

  getAlertCount(): number {
    return this.alerts.length;
  }

  clearAlerts(): void {
    this.alerts = [];
    this.saveAlerts();
  }

  private saveAlerts(): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.alerts));
    } catch (error) {
      console.error('Failed to save alerts to localStorage:', error);
    }
  }

  private displayAlert(message: string, action?: () => void): void {
    // You might want to implement a custom modal instead of using alert
    const userConfirmed = confirm(message); // Example using confirm for simplicity

    if (userConfirmed) {
      try {
        if (action) {
          action(); // Call the action to show the popup
        }
      } catch (error) {
        console.error('Error executing action for alert:', error);
      }
    }
  }

}
