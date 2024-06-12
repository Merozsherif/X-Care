import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.component.html',
  styleUrls: ['./prescriptions.component.scss']
})
export class PrescriptionsComponent implements OnInit {
  userRole!: string;

  constructor(private authentication:AuthService) { }

  ngOnInit(): void {
    this.userRole = this.authentication.currentUserValue.doctor_id? 'doctor': 'others';

  }

}
