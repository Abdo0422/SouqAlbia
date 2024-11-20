export class Message {
  id: number = 0;
  expediteur_id: number = 0;
  destinataire_id: number = 0;
  contenu: string = "";
  dateEnvoi: string = "";
  file?: { name: string; url: string };
}
