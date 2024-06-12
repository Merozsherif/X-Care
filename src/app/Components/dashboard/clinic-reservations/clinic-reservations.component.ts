import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AppService } from 'src/app/services/app.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-clinic-reservations',
  templateUrl: './clinic-reservations.component.html',
  styleUrls: ['./clinic-reservations.component.scss']
})
export class ClinicReservationsComponent implements OnInit {
  userRole!: string;
  reservations: any = []; // Array to hold the reservations


  constructor(private authentication: AuthService, private appService: AppService, private to_str_ser: ToastrService) { }

  ngOnInit(): void {
    this.userRole = this.authentication.currentUserValue.doctor_id ? 'doctor' : 'others';
    let doc_id = this.authentication.currentUserValue.doctor_id
    this.getReservations(doc_id)
  }

  getReservations(doc_id: any): void {
    this.appService.getMyReservationsDoctor(doc_id).subscribe({
      next: (res) => {
        this.reservations = res; // Assign the response to the reservations array
      }
    });
  }

  del_reservation(res_id: any) {
    this.appService.DeleteReservations(res_id).subscribe({
      next: (res) => {
        this.to_str_ser.success('Reservation deleted successfully!');
        let doc_id = this.authentication.currentUserValue.doctor_id
        this.reservations = []
        this.getReservations(doc_id)
      },
      error: (err) => {
        console.error('Error deleting reservation:', err);
        this.to_str_ser.error('Failed to delete reservation');
      }
    });
  }

}
