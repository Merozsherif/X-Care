import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as Aos from 'aos';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  card: boolean=false;
value:any='cash'
display = "none";
form!: FormGroup;
formCash!: FormGroup;
  order: any='';
  submitted: boolean=false;
  total: any;
  constructor(private router:Router ,private cats:AppService ,private formbuilder:FormBuilder,private toastr: ToastrService,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    Aos.init();
    this.form = this.formbuilder.group({
      name:['',Validators.required],
      number:['',Validators.required],
      expire:['',[Validators.required  ]],
      cnn:['',Validators.required],
    })
    this.formCash = this.formbuilder.group({
      address:['',Validators.required],
      phone:['',Validators.required],

    })
    if(localStorage.getItem('order_id')){
      this.showItems(localStorage.getItem('order_id'))
    }
    else{
      this.toastr.info('there is no order')
    }
  }
  handleChange(evt:any) {
    var target = evt.target;
    //console.log(target);
    this.value=target.value;
   if(target.value=='card'){
    this.card=true
   }else{
    this.card=false
   }
  }
  showItems(id:any){
    this.spinner.show();
    this.cats.getOrders(+id).subscribe((res:any)=>{
      //console.log(res);
      this.spinner.hide();
      this.order=res

      this.total=  this.order.reduce((a:any, b:any) => a + b.total, 0)

    })
  }


  openModal() {
    this.submitted=true;
    if((this.card==true)&&this.form.invalid){

return
    }
    if((this.card==false)&&this.formCash.invalid){

      return
          }
    else{
  this.display = "block";
}


  }
  onCloseHandled() {
    this.router.navigate(['/'])
    this.display = "none";
  }
  deleteItems(index:any , id:any){
    this.order.splice(index,1)
    this.total=  this.order.reduce((a:any, b:any) => a + b.total, 0)
this.cats.deleteitem(id).subscribe((res:any)=>{
  // console.log(res);
  this.toastr.info('item deleted successfully')


})
}
}
