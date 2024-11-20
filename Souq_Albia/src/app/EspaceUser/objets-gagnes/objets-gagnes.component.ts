import { Component, OnInit } from '@angular/core';
import { Enchere } from '../../../model/Enchere';
import { EnchereService } from '../../services/enchere.service';
import { AuthenticationService } from '../../services/authentication.service';
import { AlertServicesService } from '../../services/alert-services.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-objets-gagnes',
  templateUrl: './objets-gagnes.component.html',
  styleUrls: ['./objets-gagnes.component.css'],
})
export class ObjetsGagnesComponent implements OnInit {
  auctions: Enchere[] = [];
  userId: number | null = null;
  userName: string = ''; // Added userName property
  isCommentVisible = false;
  comment: string = '';
  currentRating: number = 0;
  stars: number[] = [1, 2, 3, 4, 5];
  selectedAddress: string = '';
  editedAddress: string = '';
  isPaymentVisible = false;
  showAddressInput = false;
  newAddress: string = '';
  addresses: string[] = ['Jean Dupont 25 Rue de la Liberté 75001 Paris France'];
  editingIndex: number | null = null;
  newMessage: string = '';
  selectedFile: File | null = null;
  chatMessages: any[] = [];
  address: string = '';
  paymentMethod: string = '';
  cardNumber: string = '';
  expiryDate: string = '';
  cvv: string = '';
  vendeurID: number = 0;
  enchereImage: string = '';
  enchereNom: string = '';
  isChatVisible = false; // For the chat popup visibility
  enchereId: number | null = null;
  isPurchased: boolean = false;

  constructor(
    private auctionService: EnchereService,
    private authService: AuthenticationService,
    private alertService: AlertServicesService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getCurrentUserId();
    this.userName = this.authService.getCurrentUserName(); // Get current user's name

    if (this.userId) {
      this.loadAuctions();
    } else {
      console.error('User ID not available');
    }
  }

  loadAuctions(): void {
    if (this.userId !== null) {
      this.auctionService.getCompletedAuctions(this.userId).subscribe(
        (data) => {
          this.auctions = data;
          console.log(this.auctions);
          this.enchereId = this.auctions[0].id;
          console.log(this.enchereId);
          this.checkIfPurchased(this.enchereId);
          console.log(this.isPurchased);
        },
        (error) => {
          console.error('Error fetching auctions', error);
        }
      );
    } else {
      console.error('User ID is null. Cannot load auctions.');
    }
  }

  openPayment(): void {
    this.isPaymentVisible = true;
  }

  closePayment(): void {
    this.isPaymentVisible = false;
    this.showAddressInput = false;
    this.editingIndex = null;
  }

  openComment(enchereId: number): void {
    this.isCommentVisible = true;
    this.loadEnchereDetails(enchereId);
  }

  closeComment(): void {
    this.isCommentVisible = false;
    this.comment = '';
    this.currentRating = 0;
  }

  onBackgroundClick(event: MouseEvent): void {
    if (this.isPaymentVisible) {
      this.closePayment();
    }
    if (this.isCommentVisible) {
      this.closeComment();
    }
  }

  checkIfPurchased(enchereId: number | null): void {
    if (enchereId !== null) {
      this.http.get(`http://localhost/Souq_AlbiaBackend/checkTransaction.php?acheteur_id=${this.userId}`)
      .subscribe(
        (response: any) => {
          this.isPurchased = response.isCompleted;
          console.log('isPurchased:', this.isPurchased);
        },
        (error) => {
          console.error('Error checking transaction', error);
        }
      );
    }
  }

  submitPayment(event: Event): void {
    event.preventDefault();
    if (!this.selectedAddress || !this.paymentMethod) {
      this.alertService.addAlert('Please complete all required fields.');
      return;
    }
    if (this.paymentMethod === 'paypal') {
      this.processPayPalPayment();
    } else {
      const paymentData = {
        address: this.selectedAddress,
        paymentMethod: this.paymentMethod,
        cardNumber: this.cardNumber,
        expiryDate: this.expiryDate,
        cvv: this.cvv,
        userId: this.userId,
        vendeurID: this.auctions[0].vendeur_id,
        enchereID: this.enchereId,
        amount: this.auctions.reduce(
          (total, auction) => total + auction.prixactuel,
          0
        ),
      };
      console.log(paymentData);
      this.http
        .post(
          'http://localhost/Souq_AlbiaBackend/process-payment.php',
          paymentData
        )
        .subscribe(
          (response: any) => {
            if (response.success) {
              this.isPurchased = true;
              this.alertService.addAlert('Payment processed successfully!');
              this.closePayment();
            } else {
              this.alertService.addAlert('Payment failed: ' + response.error);
            }
          },
          (error) => {
            console.error('Error processing payment', error);
            this.alertService.addAlert(
              'Error processing payment. Please try again.'
            );
          }
        );
    }
  }
  processPayPalPayment(): void {
    const amount =
      this.auctions.reduce((total, auction) => total + auction.prixactuel, 0) /
      10;
    const paypalButtonContainer = document.getElementById(
      'paypal-button-container'
    );
    if (paypalButtonContainer) {
      paypalButtonContainer.innerHTML = '<div>Your PayPal Button HTML</div>';
    }
    (<any>window).paypal
      .Buttons({
        createOrder: (data: any, actions: any) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: 'USD',
                  value: amount.toFixed(2),
                },
              },
            ],
            application_context: {
              return_url:
                'http://localhost/Souq_AlbiaBackend/payment-success.php',
              cancel_url:
                'http://localhost/Souq_AlbiaBackend/payment-cancelled.php',
            },
          });
        },
        onApprove: (data: any, actions: any) => {
          return actions.order.capture().then((details: any) => {
            // Process the payment on your server
            this.handlePaymentSuccess(details);
          });
        },
        onError: (err: any) => {
          console.error('PayPal error:', err);
          this.alertService.addAlert(
            'PayPal payment failed. Please try again.'
          );
        },
      })
      .render('#paypal-button-container'); // Render PayPal button into #paypal-button-container
  }

  handlePaymentSuccess(details: any): void {
    // Here you can send the payment details to your server for further processing
    const paymentData = {
      address: this.selectedAddress,
      paymentMethod: 'paypal',
      cardNumber: '', // Not used for PayPal
      expiryDate: '', // Not used for PayPal
      cvv: '', // Not used for PayPal
      userId: this.userId,
      vendeurID: this.auctions[0].vendeur_id,
      enchereID: this.enchereId,
      amount: this.auctions.reduce(
        (total, auction) => total + auction.prixactuel,
        0
      ),
      paypalOrderID: details.id,
    };

    this.http
      .post(
        'http://localhost/Souq_AlbiaBackend/process-payment.php',
        paymentData
      )
      .subscribe(
        (response: any) => {
          if (response.success) {
            this.isPurchased = true;
            this.alertService.addAlert('Payment processed successfully!');
            this.closePayment();
          } else {
            this.alertService.addAlert('Payment failed: ' + response.error);
          }
        },
        (error) => {
          console.error('Error processing payment', error);
          this.alertService.addAlert(
            'Error processing payment. Please try again.'
          );
        }
      );
  }

  redirectToPayPal(amount: number): void {
    const paypalForm = document.createElement('form');
    paypalForm.action = 'https://www.paypal.com/cgi-bin/webscr';
    paypalForm.method = 'post';
    paypalForm.target = '_blank';

    const fields = {
      cmd: '_xclick',
      business: 'sb-z40cf23959928@business.example.com',
      item_name: 'Order',
      amount: amount.toFixed(2),
      currency_code: 'USD',
      return: 'http://localhost/Souq_AlbiaBackend/payment-success.php',
      cancel_return: 'http://localhost/Souq_AlbiaBackend/payment-cancelled.php',
    };

    for (const [key, value] of Object.entries(fields)) {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value;
      paypalForm.appendChild(input);
    }

    document.body.appendChild(paypalForm);
    paypalForm.submit();
    document.body.removeChild(paypalForm);

    this.alertService.addAlert('Redirecting to PayPal for payment...');
  }

  rate(rating: number): void {
    this.currentRating = rating;
    console.log('Selected rating:', this.currentRating);
  }

  submitComment(): void {
    if (this.comment.trim() === '') {
      this.alertService.addAlert(
        'Veuillez laisser un commentaire avant de soumettre.'
      );
      return;
    }

    const date = new Date().toLocaleDateString();
    const commentData = {
      text: this.comment,
      rating: this.currentRating,
      date: date,
      enchereImage: this.enchereImage,
      enchereNom: this.enchereNom,
      acheteurName: this.userName,
      userId: this.userId,
      vendeurID: this.vendeurID,
    };

    let comments = JSON.parse(localStorage.getItem('comments') || '[]');
    comments.push(commentData);
    localStorage.setItem('comments', JSON.stringify(comments));

    console.log('Commentaire:', this.comment);
    console.log('Évaluation:', this.currentRating);
    console.log("Image de l'enchère:", this.enchereImage);
    console.log("Nom de l'enchère:", this.enchereNom);
    console.log('Nom du acheteur:', this.userName); // Log the user's name

    this.alertService.addAlert('Votre commentaire a été soumis avec succès!');

    this.closeComment();
  }

  addNewAddress(): void {
    if (this.newAddress.trim()) {
      this.addresses.push(this.newAddress);
      this.newAddress = '';
      this.showAddressInput = false;
    }
  }

  editAddress(index: number): void {
    this.editingIndex = index;
    this.editedAddress = this.addresses[index];
  }

  saveAddress(index: number): void {
    if (this.editedAddress.trim() !== '') {
      this.addresses[index] = this.editedAddress.trim();
      this.editingIndex = null;
      this.editedAddress = '';
    }
  }

  loadEnchereDetails(enchereId: number): void {
    this.auctionService.getEnchereById(enchereId).subscribe(
      (data) => {
        this.enchereImage = data.image;
        this.enchereNom = data.nom;
        this.vendeurID = data.vendeur_id;
      },
      (error) => {
        console.error('Error fetching enchere details', error);
      }
    );
  }

  openChat(vendeurId: number): void {
    this.vendeurID = vendeurId;
    this.isChatVisible = true;

    if (this.userId && this.vendeurID) {
      this.http
        .get<any[]>(
          `http://localhost/Souq_AlbiaBackend/get_users.php?expediteur_id=${this.userId}&destinataire_id=${this.vendeurID}`
        )
        .subscribe(
          (data) => {
            this.chatMessages = data;
            console.log('chatMessages', this.chatMessages);
          },
          (error) => {
            console.error('Error fetching chat messages', error);
          }
        );
    }
  }

  closeChat(): void {
    this.isChatVisible = false;
    this.chatMessages = [];
  }

  sendMessage(): void {
    if (!this.userId || !this.newMessage.trim()) {
      return;
    }

    const formData = new FormData();
    formData.append('expediteur_id', this.userId.toString());
    formData.append('destinataire_id', this.vendeurID.toString());
    formData.append('contenu', this.newMessage);
    if (this.selectedFile) {
      formData.append('file', this.selectedFile);
    }

    this.http
      .post('http://localhost/Souq_AlbiaBackend/send_messages.php', formData)
      .subscribe(
        (response: any) => {
          if (response.success) {
            this.chatMessages.push({
              name: this.authService.getCurrentUserName(),
              lastMessage: this.newMessage,
              lastMessageTime: new Date(),
            });
            this.newMessage = '';
            this.selectedFile = null;
          } else {
            console.error('Message sending failed', response.error);
          }
        },
        (error) => {
          console.error('Error sending message', error);
        }
      );
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
}
