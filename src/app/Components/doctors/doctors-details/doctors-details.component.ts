import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import * as Aos from 'aos'
import { NgxSpinnerService } from 'ngx-spinner'
import { ToastrService } from 'ngx-toastr'
import { map, switchMap } from 'rxjs'
import { AppService } from 'src/app/services/app.service'
import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'app-doctors-details',
  templateUrl: './doctors-details.component.html',
  styleUrls: ['./doctors-details.component.scss'],

})
export class DoctorsDetailsComponent implements OnInit {
dates:any=[]
  doctor: any
date:any=''
x:any=''
  params: any
  constructor(private doctors:AppService ,private toastr: ToastrService, private auth:AuthService, private route:ActivatedRoute, private spinner: NgxSpinnerService , ) {
    this.route.queryParams.subscribe(params => {
      // console.log(params);
this.params=params
    });
   }

  ngOnInit(): void {
    this.spinner.show()
    Aos.init()
    this.getDoctorDetails(this.params['slug'])
  }
  time(itim:any){
this.x=itim
  }
getDoctorDetails(name:any){

  this.doctors.getDoctor_details(name).pipe(
    map((res:any) =>  this.doctor=res[0]),switchMap((res:any) =>this.doctors.getDoctor_booking(this.doctor.id))
  ).subscribe((data:any) =>{
   this.dates=data
   this.doctor.rating=Math.round(this.doctor?.rating)
   this.spinner.hide()
  })



}
checkValueDate(event: any , item:any){
  // console.log(event.currentTarget.checked);
  if(event.currentTarget.checked==true){
this.date=item
// console.log(this.date);

  }else{
    this.date=''
  }
}
booking(item:any){
  let form={
    reservation:item.id,
    doctor:this.doctor.id,
    date:this.date.date,
    time:this.x,
    patient:this.auth.currentUserValue.patient_id

    // profile:this.doctors.currentUserValue.profile_id
  }
  this.doctors.booking(form ,this.doctor.id ).subscribe((res:any) => {
    // console.log(res);
    if (res.msg){
      this.toastr.info('',res.msg ,{
        closeButton: true,
        tapToDismiss:true,
        disableTimeOut:false,
        timeOut: 3000
      });
    }else{
      this.toastr.info('','the booking is successfully'   ,{
        closeButton: true,
        tapToDismiss:true,
        disableTimeOut:false,
        timeOut: 3000
      });
    }
    
  })
}
}
