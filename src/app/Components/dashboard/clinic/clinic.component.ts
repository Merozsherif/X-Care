import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as Aos from 'aos';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-clinic',
  templateUrl: './clinic.component.html',
  styleUrls: ['./clinic.component.scss']
})
export class ClinicComponent implements OnInit {
  userRole!: any;
  public getClinic: any;
  public doctor_id: any;
  public clinicForm: FormGroup;
  public user: any = '';
  public url: any;
  link: any = "https://ai-x-care.future-developers.cloud/";
  newClinicPics: any[] = [];
  clinic_pics: any[] = [];
  selectedFiles: File[] = [];
  public cities: string[] = ['Cairo', 'Alexandria', 'Giza', 'Luxor',
    'Aswan', 'Hurghada', 'Hurghada', 'Port Said', 'Suez', 'Ismailia', 'Tanta',
    'Mansoura', 'Zagazig', 'Fayoum', 'Asyut', 'Sohag', 'Beni Suef', 'Minya',
    'Damietta', 'Qena', 'Assiut', 'Damanhur', 'Kafr El Sheikh', 'Sohag',
    'Marsa Alam', 'New Valley', 'New Damietta', 'Qalyubia'];

  clinicData: any[] = [];

  constructor(
    private clinic: AppService,
    private authentication: AuthService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {
    this.clinicForm = this.formBuilder.group({
      phone: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      name: ['', Validators.required],
      photos: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.userRole = this.authentication.currentUserValue.doctor_id ? 'doctor' : 'others';
    this.doctor_id = this.authentication.currentUserValue.doctor_id;
    Aos.init();
    this.fetchClinicData();
  }

  fetchClinicData() {
    this.clinic.getClinic(this.doctor_id).subscribe({
      next: (res) => {
        this.getClinic = res;
        console.log(res);
        this.url = this.getClinic[0].photos;
        this.clinicForm.patchValue({
          phone: this.getClinic[0].phone,
          address: this.getClinic[0].address,
          city: this.getClinic[0].city,
          name: this.getClinic[0].name,
        });
        this.clinic_pics = this.getClinic[0].pics;
        console.log(this.clinic_pics);
      },
      error: (err) => {
        console.error('Error fetching clinic data', err);
        this.toastr.error('Error fetching clinic data');
      }
    });
  }

  editClinicData() {
    const formData = new FormData();
    formData.append('name', this.clinicForm.get('name')?.value);
    formData.append('phone', this.clinicForm.get('phone')?.value);
    formData.append('city', this.clinicForm.get('city')?.value);
    formData.append('address', this.clinicForm.get('address')?.value);
    this.selectedFiles.forEach((file, index) => {
      formData.append('photos', file, file.name);
    });

    // Log formData contents for debugging
    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    this.clinic.postClinic(this.doctor_id, formData).subscribe({
      next: (res: any) => {
        console.log('post', res);
        if (res) {
          this.toastr.success('The data has been updated');
          this.fetchClinicData();
        }
      },
      error: (err) => {
        console.error('Error updating clinic data', err);
        if (err.error) {
          this.toastr.error('Error updating clinic data', JSON.stringify(err.error));
        } else {
          this.toastr.error('Error updating clinic data');
        }
      }
    });
  }

  selectImage(event: any) {
    const selectedFiles = event.target.files;
    if (selectedFiles.length > 0) {
      this.selectedFiles = Array.from(selectedFiles);
      this.newClinicPics = []; // Reset newClinicPics to avoid duplicate images
      for (let file of selectedFiles) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.newClinicPics.push(reader.result);
        };
      }
    } else {
      this.toastr.error('No photos were uploaded', '', {
        closeButton: true,
        tapToDismiss: true,
        disableTimeOut: false,
        timeOut: 3000
      });
    }
  }
}
