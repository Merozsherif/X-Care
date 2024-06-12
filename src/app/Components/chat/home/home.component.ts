import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { WebSocketService } from './socket'; // Adjust path as necessary
import { AppService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('messageAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('0.3s ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {
  message: string = '';
  loading: boolean = false;
  messages: Array<any> = [];
  fileToUpload: File | null = null;
  sessionId!: string;
  sessions: Array<any> = [];
  user_!: any;
  isFirstMessage: boolean = true;  // Flag to track the first message

  constructor(
    private webSocketService: WebSocketService,
    private service: AppService,
    private auth: AuthService
  ) { }

  @ViewChild('fileInput') fileInput!: ElementRef;

  ngOnInit(): void {
    this.loadSessions();
    this.user_ = this.auth.currentUserValue;
    this.createNewSession();
  }

  createNewSession() {
    this.sessionId = this.generateSessionId();
    this.connectToWebSocket();
    this.clearInputs();
    this.messages = [];
  }

  loadSessions() {
    const token = localStorage.getItem('access_token');
    if (token) {
      this.service.getSessions().subscribe(
        (res: any) => {
          this.sessions = res.sessions;
        },
        (error) => {
          console.error('Failed to load sessions', error);
        }
      );
    }
  }

  loadChats(sessionId: string) {
    const token = localStorage.getItem('access_token');
    if (token) {
      this.messages = [];
      new Promise(resolve => setTimeout(resolve, 1200)).then(() => {
        this.service.getChats(sessionId).subscribe(
          (res: any) => {
            this.messages = res.flatMap((chat: any) => {
              const messages = [];
              if (chat.sender_message) {
                messages.push({
                  text: chat.sender_message,
                  align: 'questions',
                  type: 'message',
                  date: chat.date
                });
              }
              if (chat.bot_message) {
                messages.push({
                  text: chat.bot_message,
                  align: 'answer',
                  type: 'message',
                  date: chat.date
                });
              }
              return messages;
            });
          },
          (error) => {
            console.error('Failed to load chats', error);
          }
        );
      });
    }
  }

  selectSession(sessionId: any) {
    this.sessionId = sessionId;
    this.connectToWebSocket();
    this.loadChats(sessionId);
  }

  generateSessionId(): string {
    return Math.floor(Math.random() * 10000).toString();
  }

  connectToWebSocket() {
    this.webSocketService.connect(this.sessionId).subscribe(
      (data) => this.handleSocketMessage(data),
      (error) => console.error('WebSocket connection error', error)
    );
  }

  handleSocketMessage(data: any) {
    this.loading = false;

    if (data.error) {
      this.displayMessage(data.error, 'left');
    } else {
      this.displayServerMessage(data);
    }
  }

  handleSubmit(event: Event) {
    event.preventDefault();
    this.loading = true;

    const message = this.message;
    const file = this.fileToUpload;

    if (!file && !message) {
      console.log("Please select an image or send a message");
      return;
    }

    const data = {
      session: this.sessionId,
      profile_id: 1,
      message,
      filename: null,
      imageData: null
    };

    let txt = 'you sent';
    if (this.user_.user) {
      txt = `${this.user_.user.username} sent:`;
    }

    const sendMessage = () => {
      if (file) {
        this.handleFileUpload(txt, file, data);
      } else {
        this.displayMessage(message, 'questions');
        this.webSocketService.sendMessage(data);
        this.clearInputs();
      }
    };

    if (this.isFirstMessage) {
      this.isFirstMessage = false;
      setTimeout(sendMessage, 750); // Delay of 2 seconds
    } else {
      sendMessage();
    }
  }

  handleFileUpload(message: String, file: File, data: any) {
    const reader = new FileReader();

    reader.onloadend = () => {
      const imageData = reader.result as string;
      data.filename = file.name;
      data.imageData = imageData;

      this.displayMessage(data.message, 'questions');
      this.displayImage(message, imageData, 'questions');

      this.webSocketService.sendMessage(data);
      this.clearInputs();
    };

    reader.readAsDataURL(file);
  }

  clearInputs() {
    this.message = '';
    this.fileToUpload = null;
    if (this.fileInput) {
      this.fileInput.nativeElement.value = ''; // Reset file input value
    }
  }

  displayMessage(text: string, align: string) {
    this.messages.push({ text, align, type: 'message' });
  }

  displayImage(text: String, src: string, align: string) {
    this.messages.push({ text, src, align, type: 'image' });
  }

  displayServerMessage(data: any) {
    const { bot_message: msg, bot_message_image: msg1, image_src: imageSrc } = data;

    if (msg && msg1) {
      const content = `X-Care-bot: ${msg} and the diagnose image is ${msg1}`;
      this.displayContent(content, imageSrc);
    } else if (msg) {
      this.displayContent(`X-Care-bot: ${msg}`, null);
    } else if (msg1) {
      this.displayContent(`X-Care-bot: ${msg1}`, imageSrc);
    } else {
      alert("Please refresh the page");
    }
  }

  displayContent(content: string, imageSrc: string | null) {
    if (imageSrc) {
      this.messages.push({ text: content, src: imageSrc, align: 'answer', type: 'image' });
    } else {
      this.messages.push({ text: content, align: 'answer', type: 'message' });
    }
  }

  onFileSelected(event: any) {
    this.fileToUpload = event.target.files[0];
  }

  onNewChat() {
    this.createNewSession();
    this.isFirstMessage = true;  // Reset the flag for a new session
  }
}
