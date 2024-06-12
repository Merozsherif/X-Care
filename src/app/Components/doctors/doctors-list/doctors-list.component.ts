import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import * as Aos from 'aos';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-doctors-list',
  templateUrl: './doctors-list.component.html',
  styleUrls: ['./doctors-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DoctorsListComponent implements OnInit {
  public rangeValue: number[] = [30, 70];
  public rangeType: string = "Range";
  name: any='';
  city: any='';
  titles:any=[
    'Professor',
    'lecturer',
    'Consultant',
    'Spicialist'
  ]
  durations:any=[
    '30',
    '60',
    'Open',

  ]
  genders:any=[
    'male',
    'female',
  ];
  duration:any=''
  spicialty: any='';
  loading:boolean=true;
  cities:any=['Cairo', 'Alexandria', 'Giza','Luxor',
  'Aswan', 'Hurghada', 'Hurghada','Port Said',  'Suez','Ismailia', 'Tanta'
  , 'Mansoura', 'Zagazig','Fayoum',
   'Asyut', 'Sohag','Beni Suef','Minya',
  'Damietta','Qena', 'Assiut','Damanhur',
  'Kafr El Sheikh','Sohag','Marsa Alam','New Valley',
  'New Damietta', 'Qalyubia']
  Spicialations: any=[];
  params: any='';
  title: any='';
  gender: any='';
  max_price: any=0;
  min_price: any=0;
  Doctors: any=[];
  constructor(private doctors:AppService , private router:Router , private route:ActivatedRoute , private http:HttpClient) {
    this.route.queryParams.subscribe(params => {
      // console.log(params);
this.params=params;
if(this.params['name']){
  this.name=this.params['name']
}
if(this.params['city']){
  this.city=this.params['city']
}
if(this.params['specialites']){
  this.spicialty=this.params['specialites']
}
    });
   }

  ngOnInit(): void {
    Aos.init()
    if(this.params['from']=='cats'){
this.getDoctorsInSpicials(this.params['category'])
    }else{
      this.getDoctors()
    }
    this.getSpicialations()

  }
  routerToDoctor(item:any) {
    this.router.navigate(['Doctors/doctor_details'], {queryParams:{slug:item.slug}});
  }
  createList(){
    // console.log(this.name , this.city , this.spicialty);


      const queryParams: any = { };
      if(this.name !=''){
        // console.log(this.name);

        queryParams.name=this.name
      }

      if(this.city !=''){
        queryParams.city=this.city
      }
      if(this.spicialty !=''){
        queryParams.specialites=this.spicialty
      }
      if(this.duration !=''){
        queryParams.duration=this.duration
      }
      if(this.title !=''){
        queryParams.title=this.title
      }
      if(this.gender !=''){
        queryParams.gender=this.gender
      }
      if(this.max_price !=''){
        queryParams.max_price=this.max_price
      }
      if(this.min_price !=''){
        queryParams.min_price=this.min_price
      }
      console.clear();

      // console.log(queryParams);



      // Navigate to the route with the updated query parameters
      this.router.navigate(['Doctors/list'], {queryParams:{
        ...queryParams
      }});
     setTimeout(() => {
      this.getDoctors()
     }, 1000);

  }
  getDoctorsInSpicials(name:any){
    this.doctors.getDoctorsInSpicials(name).subscribe((res:any) => {
      this.Doctors=res
      this.Doctors.map((doctor:any)=>{
        doctor.rating=Math.round(doctor?.rating)
      })
      this.loading=false
    })
  }
  getSpicialations(){
    this.doctors.getDoctorsSpicials().subscribe((res:any) => {
      // console.log(res);
  this.Spicialations=res
  this.loading=false
    })
}
getDoctors(){
  this.loading=true
  var url='https://ai-x-care.future-developers.cloud/accounts/doctors/'

      const queryString = Object.keys(this.params).map(key => key + '=' + encodeURIComponent(this.params[key])).join('&');

      // Append query string to the URL
      url += '?' + queryString;



  // Then you can use these params in your HTTP request
  this.http.get(url).subscribe((data: any) => {
// console.log(data);
this.Doctors = data
this.Doctors.map((doctor:any)=>{
  doctor.rating=Math.round(doctor?.rating)
})
this.loading=false
  });
}
checkValueTitle(event: any , item:any){
  // console.log(event.currentTarget.checked);
  if(event.currentTarget.checked==true){
this.title=item
// console.log(this.title);

  }else{
    this.title=''
  }
}
checkValueduration(event: any , item:any){
  // console.log(event.currentTarget.checked);
  if(event.currentTarget.checked==true){
this.duration=item
// console.log(this.title);

  }else{
    this.duration=''
  }
}
checkValuegender(event: any , item:any){
  // console.log(event.currentTarget.checked);
  if(event.currentTarget.checked==true){
this.gender=item
// console.log(this.title);

  }else{
    this.gender=''
  }
}

}
