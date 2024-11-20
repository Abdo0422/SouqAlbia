import { Message } from "./Message";
export class User {
id: number = 0;
nom: string = "";
password: string = "";
email: string = "";
addresse: string = "";
telephone: string = "";
RegistrationDate : String =  "";
messages: Message[] = [];
}
