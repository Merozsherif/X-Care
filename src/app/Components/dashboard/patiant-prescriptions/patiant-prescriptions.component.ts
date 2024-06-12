import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-patiant-prescriptions',
  templateUrl: './patiant-prescriptions.component.html',
  styleUrls: ['./patiant-prescriptions.component.scss']
})
export class PatiantPrescriptionsComponent implements OnInit {
  userRole!: string;

  constructor(private authentication:AuthService) { }

  ngOnInit(): void {
    this.userRole = this.authentication.currentUserValue.doctor_id? 'doctor': 'others';
  }

}
