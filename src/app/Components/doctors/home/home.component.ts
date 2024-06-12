import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import * as Aos from 'aos';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  Spicialations: any=[];
  loading:boolean=true
  name:any='';
  city:any='';
  specialites:any=''
cities:any=['Cairo', 'Alexandria', 'Giza','Luxor',
    'Aswan', 'Hurghada', 'Hurghada','Port Said',  'Suez','Ismailia', 'Tanta'
    , 'Mansoura', 'Zagazig','Fayoum',
     'Asyut', 'Sohag','Beni Suef','Minya',
    'Damietta','Qena', 'Assiut','Damanhur',
    'Kafr El Sheikh','Sohag','Marsa Alam','New Valley',
    'New Damietta', 'Qalyubia']
  constructor(private doctors:AppService , private router:Router) { }

  ngOnInit(): void {
    Aos.init()
    this.getSpicialations()
  }
getSpicialations(){
  this.doctors.getDoctorsSpicials().subscribe((res:any) => {
    // console.log(res);
this.Spicialations=res
this.loading=false
  })

}
routerToDoctorsSpicials(item:any) {
  this.router.navigate(['Doctors/list'], {queryParams:{category:item.name , from:'cats'}});
}
createList(){
  // console.log(this.name , this.city , this.specialites);

   if((this.specialites!='')||(this.city !='')||(this.name !='')){
    const queryParams: any = {};
    if(this.name !=''){
      queryParams.name=this.name
    }
    if(this.city !=''){
      queryParams.city=this.city
    }
    if(this.specialites !=''){
      queryParams.specialites=this.specialites
    }
    const navigationExtras: NavigationExtras = {
      queryParamsHandling: 'merge',
      queryParams,  // This will merge new queryParams with existing ones
    };

    // Navigate to the route with the updated query parameters
    this.router.navigate(['Doctors/list'], navigationExtras);
   }

}

}
