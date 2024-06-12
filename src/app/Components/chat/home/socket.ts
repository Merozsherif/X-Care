import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket!: WebSocket;
  private observer!: Observer<any>;

  public connect(sessionId: string): Observable<any> {
    const host = 'ai-x-care.future-developers.cloud';
    let url = `wss://${host}/ws/chatAI/${sessionId}/`;

    const wsUrl = new URL(url);
    url += "?!xx!?secureKey=team_x_care!xx!"
    // Retrieve JWT token from local storage
    const token = localStorage.getItem('access_token');
    if (token) {
      // Decrypt the JWT token if it's encrypted
      const secretKey = 'done-by-zkzk'; // Same secret key used for encryption
      const decryptedBytes = CryptoJS.AES.decrypt(token, secretKey);
      const decryptedToken = decryptedBytes.toString(CryptoJS.enc.Utf8);
      // Append JWT token to the WebSocket URL as a query parameter
      url += `?token=${decryptedToken}`;
    }
    // Establish WebSocket connection
    this.socket = new WebSocket(url);

    // this.socket.onopen = () =>{
    //   console.log('web socket is established successfully!')
    // }

    // Handle incoming messages
    this.socket.onmessage = (event) => {
      if (this.observer) {
        this.observer.next(JSON.parse(event.data));
      }
    };

    // Return an observable to listen for incoming messages
    return new Observable(observer => {
      this.observer = observer;
    });
  }

  public sendMessage(data: any) {
    // Check if the socket is open before sending the message
    if (this.socket.readyState === WebSocket.OPEN && this.socket) {
      this.socket.send(JSON.stringify(data));
    }
  }
}
