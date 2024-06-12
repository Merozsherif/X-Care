import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth.service';
import * as Aos from 'aos';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnInit {
  public getProfile: any;
  public doctorForm: FormGroup;
  public user: any = '';
  Spicialations: any = [];
  userRole!: string;
  titles: any = [
    'professor',
    'lecturer',
    'consultant',
    'specialist'
  ];
  durationsList: any = [
    '15', '20', '30', '45', '60', '90'
  ];

  constructor(
    private doctor: AppService,
    private authentication: AuthService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {
    this.doctorForm = this.formBuilder.group({
      license_id: ['', Validators.required],
      specialites: ['', Validators.required],
      experience: ['', Validators.required],
      title: ['', Validators.required],
      duration: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      slug: ['', Validators.required]  // Add slug to form controls
    });
  }

  ngOnInit(): void {
    this.user = this.authentication.currentUserValue;
    this.userRole = this.user.doctor_id ? 'doctor' : 'others';

    Aos.init();
    let doc_id = this.user.doctor_id;
    console.log(this.user.doctor_id)
    this.getSpicialations();

    this.doctor.getDoctorProfile(doc_id).subscribe({
      next: (res) => {
        this.getProfile = res;
        this.doctorForm.patchValue({
          license_id: this.getProfile[0].license_id,
          specialites: this.getProfile[0].specialites[0] ? this.getProfile[0].specialites[0].id : 1 ,
          experience: this.getProfile[0].experience,
          title: this.getProfile[0].title,
          price: this.getProfile[0].price,
          description: this.getProfile[0].description,
          duration: this.getProfile[0].duration,
          slug:this.getProfile[0].slug
        });
      },
      error: (err) => console.error(err)
    });
  }

  getSpicialations() {
    this.doctor.getDoctorsSpicials().subscribe((res: any) => {
      this.Spicialations = res;
    }, error => {
      console.error('Error fetching specializations', error);
    });
  }

  editDoctorProfile() {
    let doc_id = this.user.doctor_id;
    console.log(this.doctorForm)
    if (this.doctorForm.valid) {
      this.doctor.editDoctorProfile(this.doctorForm.value, doc_id).subscribe({
        next: (res: any) => {
          this.toastr.success('Profile updated successfully!');

        },
        error: (err) => {
          console.error('Error updating profile', err);
          this.toastr.error('Failed to update profile');
        }
      });
    } else {
      this.toastr.error('Please fill all the required fields');
    }
  }
}
