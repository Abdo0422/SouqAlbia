import { EnchereService } from '../../services/enchere.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { CategorieService } from '../../services/categorie.service';
import { Enchere } from '../../../model/Enchere';
import { AuthenticationService } from '../../services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { AlertServicesService } from '../../services/alert-services.service';
@Component({
  selector: 'app-enchere-page',
  templateUrl: './enchere-page.component.html',
  styleUrls: ['./enchere-page.component.css']
})
export class EncherePageComponent implements OnInit {
  subcategoryName: string = '';
  categoryName: string = '';
  selectedEnchere: Enchere | null = null;
  selectedSousCategoryId: number | null = null;
  enchereList: Enchere[] = [];
  souscategorieId: number = 0;
  offer: number | null = null;
  isAuctionFinished: boolean = false;
  isChatVisible = false;
  private timer: any;
  userId: number | null = null;
  chatMessages: any[] = [];
  vendeurID: number = 0;
  newMessage: string = '';
  selectedFile: File | null = null;
  isReportVisible = false;
  reportReason: string = '';


  constructor(
    private route: ActivatedRoute,
    private productService: EnchereService,
    private dataService: CategorieService,
    private authService: AuthenticationService,
    private router: Router,
    private http: HttpClient,
    private alertService: AlertServicesService
  ) {}

  ngOnInit(): void {
    this.getSelectedEnchere();
    this.startAuctionTimer();
    this.userId = this.authService.getCurrentUserId();
  }
  onBackgroundClick(event: MouseEvent): void {
    if (this.isChatVisible) {
      this.closeChat();
    }
  }
  openChat(vendeurId: number): void {
    this.vendeurID = vendeurId;
    this.isChatVisible = true;

    if (this.userId && this.vendeurID) {
      this.http.get<any[]>(`http://localhost/Souq_AlbiaBackend/get_users.php?expediteur_id=${this.userId}&destinataire_id=${this.vendeurID}`)
        .subscribe(
          (data) => {
            this.chatMessages = data;
             console.log("chatMessages",this.chatMessages);
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

    this.http.post('http://localhost/Souq_AlbiaBackend/send_messages.php', formData).subscribe(
      (response: any) => {
        if (response.success) {
          this.chatMessages.push({
            name: this.authService.getCurrentUserName(),
            lastMessage: this.newMessage,
            lastMessageTime: new Date()
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
  startAuctionTimer(): void {
    this.updateAuctionStatus();
    this.timer = setInterval(() => {
      this.updateAuctionStatus();
    }, 60000); // Update every minute
  }

  updateAuctionStatus(): void {
    if (this.selectedEnchere) {
      const remainingTime = this.getRemainingTime(this.selectedEnchere.dateFin);
      this.isAuctionFinished = remainingTime === 'Terminé';
    }
  }

  getRemainingTime(dateFin: string | Date): string {
    const now = new Date();
    const endDate = new Date(dateFin);
    const diffMs = endDate.getTime() - now.getTime();

    if (diffMs <= 0) {
      return 'Terminé';
    }

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${days}j ${hours}h ${minutes}min`;
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
  loadEncheres(): void {
    this.productService.getEncheresBySousCategorie(this.souscategorieId).subscribe(
      (response: any) => {
        console.log('Fetched encheres by SousCategorie:', response);

        if (response.success && Array.isArray(response.data)) {
          this.enchereList = response.data;
        } else {
          console.error('Expected an array in data but received:', response);
        }
      },
      error => {
        console.error('Error fetching encheres:', error);
      }
    );
  }
  getSelectedEnchere(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (isNaN(id)) {
        console.warn('Invalid ID parameter:', id);
        return;
    }

    this.productService.getEnchereById(id).subscribe(
        (enchere: Enchere) => {
            if (enchere) {
                this.selectedEnchere = enchere;
                this.vendeurID = Number(this.selectedEnchere.vendeur_id);
                this.updateAuctionStatus();

                this.souscategorieId = this.selectedEnchere.id_sous_categorie;

                // Track visited enchere
                this.trackEnchereVisit(enchere);

                console.log('Enchere ID:', this.selectedEnchere.id);
                console.log('Selected Enchere:', this.selectedEnchere);

                this.selectedSousCategoryId = enchere.id_sous_categorie;
                if (this.selectedSousCategoryId !== null && this.selectedSousCategoryId !== 0) {
                    this.getSousCategoryNameById(this.selectedSousCategoryId);
                } else {
                    console.warn('No valid subcategory ID available in Enchere:', this.selectedEnchere);
                }

                // Load encheres after getting the selected Enchere
                this.loadEncheres();
            } else {
                console.warn('Enchere not found for ID:', id);
            }
        },
        (error) => {
            console.error('Error fetching Enchere:', error);
        }
    );
}

trackEnchereVisit(enchere: Enchere): void {
    const currentUserId = this.authService.getCurrentUserId();
    if (currentUserId === null) {
        return; // User is not logged in
    }

    const historyKey = `history_${currentUserId}`;
    let history: Enchere[] = JSON.parse(localStorage.getItem(historyKey) || '[]');

    // Prevent duplicates
    if (!history.some((item: Enchere) => item.id === enchere.id)) {
        history.push(enchere);
    }

    localStorage.setItem(historyKey, JSON.stringify(history));
}



  getSousCategoryNameById(subcategoryId: number): void {
    if (subcategoryId) {
      this.dataService.getSousCategorieById(subcategoryId).subscribe(
        (subcategory) => {
          if (subcategory) {
            this.subcategoryName = subcategory.nom || 'Unknown';
            console.log('SubCategory Name:', this.subcategoryName);
            this.getCategoryNameById(subcategory.id_categorie);
          } else {
            console.warn('Subcategory not found');
            this.subcategoryName = 'Unknown';
          }
        },
        (error) => {
          console.error('Error fetching Subcategory:', error);
        }
      );
    } else {
      console.warn('Invalid subcategoryId:', subcategoryId);
    }
  }

  getCategoryNameById(categoryId: number): void {
    if (categoryId) {
      this.dataService.getCategoryById(categoryId).subscribe(
        (category) => {
          if (category) {
            this.categoryName = category.nom || 'Unknown';
            console.log('Category Name:', this.categoryName);
          } else {
            console.warn('Category not found');
            this.categoryName = 'Unknown';
          }
        },
        (error) => {
          console.error('Error fetching Category:', error);
        }
      );
    } else {
      console.warn('Invalid categoryId:', categoryId);
    }
  }



  onSelectEnchere(Enchere: Enchere): void {
    this.router.navigate(['/EncherePage', Enchere.produit_id]).then(() => {
      window.location.reload();
    });;
  }
  shareContent(): void {
    if (navigator.share && this.selectedEnchere) {
      navigator.share({
        title: `Enchere: ${this.selectedEnchere.produit_id}`,
        text: `Check out this enchere! ${this.selectedEnchere.description}`,
        url: window.location.href
      }).then(() => {
        console.log('Thanks for sharing!');
      }).catch((error) => {
        console.log('Error sharing:', error);
      });
    } else {
      console.log('Web Share API is not supported in your browser or no Enchere selected.');
      // Fallback to other share methods, e.g., copy URL to clipboard
    }
  }
  addToWatchlist(): void {
    if (this.selectedEnchere) {
      const currentUserId = this.authService.getCurrentUserId();
      if (currentUserId === null) {
        this.alertService.addAlert('You need to be logged in to add items to the watchlist.');
        return;
      }

      const watchlist = JSON.parse(localStorage.getItem(`watchlist_${currentUserId}`) || '[]');
      if (watchlist.some((item: Enchere) => item.id === this.selectedEnchere!.id)) {
        this.alertService.addAlert('This enchere is already in your watchlist.');
        return;
      }

      watchlist.push(this.selectedEnchere);
      localStorage.setItem(`watchlist_${currentUserId}`, JSON.stringify(watchlist));
      this.alertService.addAlert('Enchere added to watchlist!');
    } else {
      this.alertService.addAlert('No Enchere selected to add to watchlist.');
    }
  }

  submitOffer(): void {
    if (this.isAuctionFinished) {
        this.alertService.addAlert('This auction has ended. You cannot place any more offers.');
        return;
    }

    if (this.offer !== null && this.selectedEnchere) {
        const currentUserId = this.authService.getCurrentUserId();

        if (currentUserId === null) {
            this.alertService.addAlert('You need to be logged in to place an offer.');
            return;
        }

        if (this.offer <= this.selectedEnchere.prixactuel) {
            this.alertService.addAlert('Your offer must be greater than the current price.');
            return;
        }

        const offerData = {
            id: this.selectedEnchere.id,
            offer: this.offer,
            acheteur_id: currentUserId
        };

        this.http.post('http://localhost/Souq_AlbiaBackend/submit_offer.php', offerData)
            .subscribe(
                (response: any) => {
                    if (response.success) {
                        this.alertService.addAlert('Offer placed successfully!');
                        this.offer = null;
                        window.location.reload();
                    } else {
                        this.alertService.addAlert('Failed to place offer: ' + (response.message || 'Unknown error'));
                    }
                },
                (error: any) => {
                    console.error('Error placing offer:', error);
                    this.alertService.addAlert('Failed to place offer. Please try again.');
                }
            );
    } else {
        this.alertService.addAlert('Please enter a valid offer amount.');
    }
}


  openChatWithSeller(): void {
    if (this.selectedEnchere) {
      const vendeurID = this.selectedEnchere.vendeur_id;
      const currentUserId = this.authService.getCurrentUserId();

      if (vendeurID === null || vendeurID === undefined || currentUserId === null || currentUserId === undefined) {
        this.alertService.addAlert('Error: Unable to open chat. Please try again later.');
        return;
      }

      this.http.get<any>(`http://localhost/Souq_AlbiaBackend/get_users.php?expediteur_id=${currentUserId}&destinataire_id=${vendeurID}`).subscribe(
        (messages: any) => {
          if (messages && messages.length > 0) {
            this.router.navigate(['/UserSpace/Chatroom'], { queryParams: { userId: vendeurID } });
          } else {
            this.alertService.addAlert('No previous messages found. Starting a new chat.');
            this.router.navigate(['/UserSpace/Chatroom'], { queryParams: { userId: vendeurID } });
          }
        },
        error => {
          console.error('Error fetching messages:', error);
          this.alertService.addAlert('Failed to fetch messages. Please try again later.');
        }
      );
    } else {
      this.alertService.addAlert('No selected enchere. Please select an enchere first.');
    }
  }



  showReportDialog(): void {
    this.isReportVisible = true;
  }

  reportItem(): void {
    if (!this.reportReason) {
      alert("Veuillez entrer une raison pour le signalement.");
      return;
    }

    const body = { enchereId: this.selectedEnchere?.id, reason: this.reportReason };
    this.http.post('http://localhost/Souq_AlbiaBackend/report_item.php', body).subscribe(
      (response: any) => {
        if (response['success']) {
          alert(response['message']);
        } else {
          alert("Erreur lors de l'envoi du signalement.");
        }
        this.isReportVisible = false; // Close dialog after submission
        this.reportReason = ''; // Reset the report reason
      },
      error => {
        console.error('Error occurred:', error); // Log error for debugging
        alert('Erreur de communication avec le serveur.');
      }
    );
}

}
