import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EnchereService } from './services/enchere.service';
import { InscriptionComponent } from './authentication/inscription/inscription.component';
import { ConnexionComponent } from './authentication/connexion/connexion.component';
import { HomeComponent } from './pages/home/home.component';
import { CatgoriePageComponent } from './pages/catgorie-page/catgorie-page.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DerniereEnchereComponent } from './pages/derniere-enchere/derniere-enchere.component';
import { ArticleTendanceComponent } from './pages/article-tendance/article-tendance.component';
import { SousCategoriePageComponent } from './pages/sous-categorie-page/sous-categorie-page.component';
import { EncherePageComponent } from './pages/enchere-page/enchere-page.component';
import { UserSpaceComponent } from './EspaceUser/user-space/user-space.component';
import { ProfileComponent } from './EspaceUser/profile/profile.component';
import { HistoriqueComponent } from './EspaceUser/historique/historique.component';
import { FavorisComponent } from './EspaceUser/favoris/favoris.component';
import { MesEncheresComponent } from './EspaceUser/mes-encheres/mes-encheres.component';
import { CommentairesComponent } from './EspaceUser/commentaires/commentaires.component';
import { TableauDeBordComponent } from './EspaceUser/tableau-de-bord/tableau-de-bord.component';
import { ChatroomComponent } from './EspaceUser/chatroom/chatroom.component';
import { CreateEnchereComponent } from './EspaceUser/create-enchere/create-enchere.component';
import { ObjetsGagnesComponent } from './EspaceUser/objets-gagnes/objets-gagnes.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { WatchlistPopupComponent } from './watchlist-popup/watchlist-popup.component';
import { AideComponent } from './pages/aide/aide.component';
import { AdminComponent } from './admin/admin.component';
import { ManageUsersComponent } from './admin/manage-users/manage-users.component';
import { ManageEncheresComponent } from './admin/manage-encheres/manage-encheres.component';
import { ReportsComponent } from './admin/reports/reports.component';
import { TransactionsComponent } from './admin/transactions/transactions.component';
import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions.component';

@NgModule({
  declarations: [
    AppComponent,
    InscriptionComponent,
    ConnexionComponent,
    HomeComponent,
    CatgoriePageComponent,
    DerniereEnchereComponent,
    ArticleTendanceComponent,
    SousCategoriePageComponent,
    EncherePageComponent,
    UserSpaceComponent,
    ProfileComponent,
    HistoriqueComponent,
    FavorisComponent,
    MesEncheresComponent,
    CommentairesComponent,
    TableauDeBordComponent,
    ChatroomComponent,
    CreateEnchereComponent,
    ObjetsGagnesComponent,
    WatchlistPopupComponent,
    AideComponent,
    AdminComponent,
    ManageUsersComponent,
    ManageEncheresComponent,
    ReportsComponent,
    TransactionsComponent,
    TermsAndConditionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [EnchereService, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
