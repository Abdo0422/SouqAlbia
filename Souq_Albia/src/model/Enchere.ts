
export class Enchere {
  id: number = 0;
  produit_id:  number = 0 ;
  vendeur_id:  number = 0 ;
  vendeur_nom:  string = "";
  achteur_id:  number = 0 ;
  nom: string = "";
  description: string = "";
  image: string = "";
  state: string = "";
  localisation: string = "";
  dateDebut: Date = new Date();
  dateFin: Date = new Date();
  prixdepart: number = 0;
  prixactuel: number = 0;
  NumBids: number = 0;
  id_sous_categorie : number = 0 ;
  NombreEncheres: number = 0;
  status: 'active' | 'inactive' = 'inactive';
}
