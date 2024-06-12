import { Component, OnInit } from '@angular/core';
import * as Aos from 'aos';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
show_category:boolean=true;
loading:boolean=true
  Categories: any=[];
  Category_detail: any;
  cat_name:any='';
  search:any=''
  constructor(private cats:AppService , private authentication: AuthService,private toastr: ToastrService,) { }

  ngOnInit(): void {

    Aos.init()

    this.getCats()
  }

getCats(){
  return this.cats.getCategorys().subscribe((res:any)=>{
    this.Categories=res.filter((c:any)=>c)
    this.loading=false
  })
}
getCats_detail(name:any){
  this.cat_name=name;
  this.scroll()
this.loading=true
this.show_category=false
  return this.cats.getCategory_details(name.name).subscribe((res:any)=>{
    this.Category_detail=res
this.loading=false

  })
}
scroll(){
  window.scroll(0,0)
}

addtoCart(item:any){

  let form={
    profile:this.authentication.currentUserValue.profile_id,

  }
  return this.cats.addToCart(form).subscribe((res:any)=>{
   let form={
    drugs_order: res.id,
product:item.id,
quantity:1
   }
   this.cats.paytoCart(form).subscribe((res:any)=>{
    this.toastr.info('The medicine has been added to the cart')

   })
})
}
}
