import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from "../../services/authentication.service";
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

interface User {
  id: number;
  name: string;
  lastMessage: string;
  lastMessageTime: string;
  messages?: Message[];
}

interface Message {
  contenu: string;
  time: string;
  file_name: string;
  file_url: string;
  senderName: string;
  receiverName: string;
  isSender: boolean;  // Indicates if the message is from the current user
}


interface SendMessageResponse {
  success: boolean;
  message?: string;
}

@Component({
    selector: "app-chatroom",
    templateUrl: "./chatroom.component.html",
    styleUrls: ["./chatroom.component.css"],
    standalone: false
})
export class ChatroomComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  selectedUser: User | null = null;
  newMessage: string = "";
  lightboxUrl: string | null = null;
  fileInput: File | null = null;
  showFilePopup: boolean = false;
  userId: number | null = null;
  currentUserId: number | null = null;
  @ViewChild('messageTextarea') messageTextarea!: ElementRef<HTMLTextAreaElement>;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const userId = params['userId'];
      console.log('Received userId from query params:', userId); // Log userId from query params

      // Pass userId to loadUsers if available, otherwise call without parameters
      this.loadUsers(userId ? +userId : undefined);
    });
  }


  loadUsers(selectedUserId?: number): void {
    // Get current user
    const currentUser = this.authService.getCurrentUser();

    if (!currentUser) {
      console.error('Current user not found');
      return;
    }

    if (selectedUserId !== undefined) {
      // Fetch messages between users if selectedUserId is provided
      const messagesUrl = `http://localhost/Souq_AlbiaBackend/get_users.php?expediteur_id=${currentUser.id}&destinataire_id=${selectedUserId}`;
      console.log('Fetching messages from URL:', messagesUrl); // Log URL for debugging

      this.http.get<any>(messagesUrl).subscribe(
        messages => {
          console.log('Loaded messages between users:', messages);
          if (this.selectedUser) {
            this.selectedUser.messages = messages;
          }
        },
        error => {
          console.error('Error loading messages:', error);
        }
      );
    }

    // Always fetch users
    const usersUrl = `http://localhost/Souq_AlbiaBackend/getUsers.php?user_id=${currentUser.id}`;
    console.log('Fetching users from URL:', usersUrl); // Log URL for debugging

    this.http.get<User[]>(usersUrl).subscribe(
      users => {
        console.log('Loaded users:', users);
        this.users = users;
        this.filterUsers();

        if (selectedUserId !== undefined) {
          this.selectUserById(selectedUserId);
        }
      },
      error => {
        console.error('Error loading users:', error);
      }
    );
  }


  filterUsers(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.filteredUsers = this.users
        .filter(user => user.id !== currentUser.id)
        .sort((a, b) => {
          const timeA = a.lastMessageTime ? new Date(a.lastMessageTime).getTime() : 0;
          const timeB = b.lastMessageTime ? new Date(b.lastMessageTime).getTime() : 0;
          return timeB - timeA;
        });
      console.log('Filtered users:', this.filteredUsers); // Add this line to check filtered users
    }
  }

  selectUser(user: User): void {
    this.selectedUser = user;
    console.log('Selected user:', user);
    this.loadMessages(user.id);
  }

  selectUserById(userId: number): void {
    console.log('Attempting to select user with ID:', userId);
    const user = this.filteredUsers.find(u => u.id === userId);
    if (user) {
      this.selectUser(user);
    } else {
      console.error('User not found:', userId);
    }
  }

  loadMessages(userId: number): void {
    const url = `http://localhost/Souq_AlbiaBackend/get_messages.php?user_id=${userId}&current_user_name=${this.authService.getCurrentUser()?.nom}`;
    console.log('Fetching messages from URL:', url);

    this.http.get<Message[]>(url).subscribe(
      messages => {
        console.log('Loaded messages for user ID', userId, ':', messages);
        if (this.selectedUser) {
          this.selectedUser.messages = messages;
        }
      },
      error => {
        console.error('Error loading messages:', error);
      }
    );
  }


  sendMessage(): void {
    if (!this.selectedUser) return;

    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      console.error('No user is logged in');
      return;
    }

    const formData = new FormData();
    formData.append('expediteur_id', currentUser.id.toString());
    formData.append('destinataire_id', this.selectedUser.id.toString());
    formData.append('contenu', this.newMessage);
    if (this.fileInput) {
      formData.append('file', this.fileInput);
    }

    this.http.post<SendMessageResponse>('http://localhost/Souq_AlbiaBackend/send_messages.php', formData).subscribe(
      response => {
        if (response.success) {
          console.log('Message sent successfully!');
          this.newMessage = '';
          this.fileInput = null;
          this.showFilePopup = false;
          if (this.messageTextarea) {
            this.messageTextarea.nativeElement.value = '';
          }
          if (this.selectedUser) {
            this.loadMessages(this.selectedUser.id);
          }
        } else {
          console.error('Error in response:', response.message);
        }
      },
      error => {
        console.error('HTTP Error:', error);
      }
    );
  }

  showAllUsers(): void {
    this.loadUsers();
  }

  showRecentUsers(): void {
    if (this.users.length) {
      this.filteredUsers = this.users
        .filter(user => user.lastMessageTime)
        .sort((a, b) => new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime())
        .slice(0, 3);
      console.log('Most recent users:', this.filteredUsers);
    }
  }

  handleFileInput(event: any): void {
    this.fileInput = event.target.files[0];
    if (this.fileInput) {
      this.showFilePopup = true;
      console.log('File selected:', this.fileInput); // Log the selected file
    }
  }

  confirmSendFile(): void {
    this.sendMessage();
  }

  cancelSendFile(): void {
    this.fileInput = null;
    this.showFilePopup = false;
  }

  isImage(fileName: string): boolean {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif','jfif'];
    const extension = fileName.split('.').pop()?.toLowerCase();
    return extension ? imageExtensions.includes(extension) : false;
  }

  openLightbox(url: string): void {
    this.lightboxUrl = url;
    console.log('Lightbox opened with URL:', url); // Log lightbox URL
  }

  closeLightbox(): void {
    this.lightboxUrl = null;
    console.log('Lightbox closed'); // Log lightbox closing
  }

  downloadFile(fileName: string, fileUrl: string): void {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    link.click();
  }
}
