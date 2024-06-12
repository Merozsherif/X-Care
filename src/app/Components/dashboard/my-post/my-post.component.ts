import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-my-post',
  templateUrl: './my-post.component.html',
  styleUrls: ['./my-post.component.scss']
})
export class MyPostComponent implements OnInit {
  userRole!: string;

  constructor(private authentication:AuthService) { }

  ngOnInit(): void {
    this.userRole = this.authentication.currentUserValue.doctor_id? 'doctor': 'others';

  }

}
