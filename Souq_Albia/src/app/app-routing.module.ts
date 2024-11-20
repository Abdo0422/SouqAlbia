import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { InscriptionComponent } from './authentication/inscription/inscription.component';
import { ConnexionComponent } from './authentication/connexion/connexion.component';
import { CatgoriePageComponent } from './pages/catgorie-page/catgorie-page.component';
import { DerniereEnchereComponent } from './pages/derniere-enchere/derniere-enchere.component';
import { ArticleTendanceComponent } from './pages/article-tendance/article-tendance.component';
import { SousCategoriePageComponent } from './pages/sous-categorie-page/sous-categorie-page.component';
import { EncherePageComponent } from './pages/enchere-page/enchere-page.component';
import { UserSpaceComponent } from './EspaceUser/user-space/user-space.component';
import { ProfileComponent } from './EspaceUser/profile/profile.component';
import { FavorisComponent } from './EspaceUser/favoris/favoris.component';
import { HistoriqueComponent } from './EspaceUser/historique/historique.component';
import { MesEncheresComponent } from './EspaceUser/mes-encheres/mes-encheres.component';
import { TableauDeBordComponent } from './EspaceUser/tableau-de-bord/tableau-de-bord.component';
import { CommentairesComponent } from './EspaceUser/commentaires/commentaires.component';
import { ChatroomComponent } from './EspaceUser/chatroom/chatroom.component';
import { CreateEnchereComponent } from './EspaceUser/create-enchere/create-enchere.component';
import { ObjetsGagnesComponent } from './EspaceUser/objets-gagnes/objets-gagnes.component';
import { AideComponent } from './pages/aide/aide.component';
import { AdminComponent } from './admin/admin.component';
import { ManageUsersComponent } from './admin/manage-users/manage-users.component';
import { ManageEncheresComponent } from './admin/manage-encheres/manage-encheres.component';
import { ReportsComponent } from './admin/reports/reports.component';
import { TransactionsComponent } from './admin/transactions/transactions.component';
import { TermsAndConditionsComponent } from './pages/terms-and-conditions/terms-and-conditions.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Inscription', component: InscriptionComponent },
  { path: 'Connexion', component: ConnexionComponent },
  { path: 'CategoriePage', component: CatgoriePageComponent },
  { path: 'DerniereEnchere', component: DerniereEnchereComponent },
  { path: 'ArticleTendance', component: ArticleTendanceComponent },
  { path: 'SousCategoriePage/:id', component: SousCategoriePageComponent },
  { path: 'EncherePage/:id', component: EncherePageComponent },
  { path: 'CreateEnchere', component: CreateEnchereComponent },
  { path: 'terms-and-conditions', component: TermsAndConditionsComponent },
  { path: 'admin', component: AdminComponent, children: [
    { path: '', redirectTo: 'users', pathMatch: 'full' },
    { path: 'users', component: ManageUsersComponent },
    { path: 'encheres', component: ManageEncheresComponent },
    { path: 'reports', component: ReportsComponent },
    { path: 'transactions', component: TransactionsComponent }
  ]
},
  { path: 'help', component: AideComponent },
   {
    path: 'UserSpace',
    component: UserSpaceComponent,
    children: [
      { path: 'Profile', component: ProfileComponent },
      { path: '', redirectTo: 'Profile', pathMatch: 'full' },
      { path: 'Favoris', component: FavorisComponent },
      { path: 'Historique', component: HistoriqueComponent },
      { path: 'MesEncheres', component: MesEncheresComponent },
      { path: 'TableauDeBord', component: TableauDeBordComponent },
      { path: 'Commentaires', component: CommentairesComponent },
      { path: 'Chatroom', component: ChatroomComponent },
      { path: 'ObjetsGagnés', component: ObjetsGagnesComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes
    , {
      scrollPositionRestoration: 'enabled',
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
