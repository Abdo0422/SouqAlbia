export interface Transaction {
  transaction_id: number;
  montant: number;
  date: string;
  statut: string;
  payment_method: string;
  acheteur_nom: string;
  acheteur_email: string;
  vendeur_nom: string;
  vendeur_email: string;
  enchere_id: number;
}
