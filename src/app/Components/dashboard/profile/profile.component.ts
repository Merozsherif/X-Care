import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as Aos from 'aos';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public getProfile: any;
  public profileForm: FormGroup;
  public user: any = '';
  public url: any;
  public genders: string[] = ["male", "female"];
  public blood_type: string[] = ["A", "O", "B", "AB"];
  public photo!: File | null;
  userRole!: string;


  constructor(
    private profile: AppService,
    private http: HttpClient,
    private authentication: AuthService,
    private toastr: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.profileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      emgo_phone: ['', Validators.required],
      gender: ['', Validators.required],
      blood_type: ['', Validators.required],
      address: ['', Validators.required],
      photo: [null]
    });
  }

  ngOnInit(): void {
    this.user = this.authentication.currentUserValue;
    this.userRole = this.authentication.currentUserValue.doctor_id? 'doctor': 'others';
    Aos.init();
    this.profile.getProfile().subscribe({
      next: (res) => {
        this.getProfile = res;
        this.url = "https://ai-x-care.future-developers.cloud/" + this.getProfile.photo;
        const [firstName, lastName] = this.getProfile.name.split(' ');
        this.profileForm.patchValue({
          firstName: firstName || '',
          lastName: lastName || '',
          age: this.getProfile.age,
          email: this.getProfile.email,
          phone: this.getProfile.phone,
          emgo_phone: this.getProfile.emgo_phone,
          gender: this.getProfile.gender,
          address: this.getProfile.address,
          blood_type: this.getProfile.blood_type,
        });
      }
    });
  }

  selectImage(event: any) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      this.profileForm.get('photo')?.setValue(selectedFile);
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = () => {
        this.url = reader.result;
      };
    } else {
      this.toastr.error('', 'This photo was not uploaded', {
        closeButton: true,
        tapToDismiss: true,
        disableTimeOut: false,
        timeOut: 3000
      });
    }
  }

  editProfileData() {
    const form: {
      name: string;
      age: any;
      email: any;
      phone: any;
      emgo_phone: any;
      gender: any;
      blood_type: any;
      address: any;
      photo?: File | null; // Include 'photo' property with optional File | null type
    } = {
      name: `${this.profileForm.value.firstName} ${this.profileForm.value.lastName}`,
      age: this.profileForm.value.age,
      email: this.profileForm.value.email,
      phone: this.profileForm.value.phone,
      emgo_phone: this.profileForm.value.emgo_phone,
      gender: this.profileForm.value.gender,
      blood_type: this.profileForm.value.blood_type,
      address: this.profileForm.value.address,
    };
  
    if (this.profileForm.value.photo) {
      form.photo = this.profileForm.value.photo; // Assign the photo value to form.photo
    }

    let profile_id = this.user.profile_id;

    this.profile.editProfileData(form, profile_id).subscribe((res: any) => {
      if (res) {
        this.toastr.success('The data has been updated');
        this.profile.getProfile().subscribe(updatedProfile => {
          this.getProfile = updatedProfile;
          this.url = "https://ai-x-care.future-developers.cloud/" + this.getProfile.photo;
          const [firstName, lastName] = this.getProfile.name.split(' ');
          this.profileForm.patchValue({
            firstName: firstName || '',
            lastName: lastName || '',
            age: this.getProfile.age,
            email: this.getProfile.email,
            phone: this.getProfile.phone,
            emgo_phone: this.getProfile.emgo_phone,
            gender: this.getProfile.gender,
            address: this.getProfile.address,
            blood_type: this.getProfile.blood_type,
          });
        });
      }
    });
  }
}
