import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../../model/User';
import { AlertServicesService } from '../../services/alert-services.service';
@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  user: User = new User();
  confirmPassword: string = "";
  emailExists: boolean = false;
  acceptTerms: boolean = false;
  constructor(
    private authService: AuthenticationService,
    private alertService: AlertServicesService,
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (!this.acceptTerms) {
      alert("Vous devez accepter les termes et conditions.");
      return;
    }

    if (this.user.password !== this.confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    this.authService.checkEmailExists(this.user.email).subscribe(
      response => {
        if (response.exists) {
          this.emailExists = true;
        } else {
          this.emailExists = false;
          this.authService.register(this.user).subscribe(
            () => {
              console.log('User logged in automatically after registration');
              this.alertService.addAlert("Inscription réussie");
            },
            error => {
              console.error('Erreur d\'inscription:', error);
              alert("L'inscription a échoué");
            }
          );
        }
      },
      error => {
        console.error('Erreur lors de la vérification de l\'email:', error);
        alert("Une erreur s'est produite lors de la vérification de l'email.");
      }
    );
  }

}
