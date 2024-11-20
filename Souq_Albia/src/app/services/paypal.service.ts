import { Injectable } from '@angular/core';

interface PayPalDetails {
  payerID: string;
  orderID: string;
  paymentID: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaypalService {

  constructor() { }

  public initPayPalButton(containerId: string, amount: number, onApprove: (details: PayPalDetails) => void): void {
    const paypal = window['paypal'] as any;

    if (paypal) {
      paypal.Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                currency_code: 'USD',
                value: amount.toFixed(2)
              }
            }]
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: PayPalDetails) => {
            onApprove(details);
          }).catch((error: Error) => {
            console.error('PayPal payment capture failed:', error);
          });
        }
      }).render(containerId);
    } else {
      console.error('PayPal SDK not loaded');
    }
  }
}
