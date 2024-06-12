import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Aos from 'aos';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-medicine-details',
  templateUrl: './medicine-details.component.html',
  styleUrls: ['./medicine-details.component.scss']
})
export class MedicineDetailsComponent implements OnInit {
  loading:boolean=true;
  customOptions: OwlOptions = {
    loop: true,
    autoplay:true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    autoHeight: true,

    autoplayTimeout:3000,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false,
    center:true
  }
  name: any;
  medicine_details: any;
  quantity: any=1;
  constructor( private cats:AppService , private authentication: AuthService,private toastr: ToastrService,private spinner: NgxSpinnerService , private route:ActivatedRoute) {
    this.route.queryParams.subscribe( params=> {
            this.name = params['name'];

          });
   }

  ngOnInit(): void {
    Aos.init()
this.medicine_detail(this.name)

  }
  scroll(){
    window.scroll(0,0)
  }
  medicine_detail(name:any){
    this.spinner.show()
    return this.cats.getmedicine_details(name).subscribe((res:any)=>{
    // console.log(res);
  this.medicine_details=res
  this.spinner.hide()
  this.loading=false
    })
  }


  addtoCart(item: any) {
    const profileId = this.authentication.currentUserValue.profile_id;

    // Function to display a toastr message
    const displayMessage = (message: string) => {
        this.toastr.info('', message, {
            closeButton: true,
            tapToDismiss: true,
            disableTimeOut: false,
            timeOut: 1000
        });
    };

    // Function to handle adding the item to the cart
    const addItemToCart = (orderId: number) => {
        const form = {
            drugs_order:  orderId,
            product: item.id,
            quantity: this.quantity
        };
        this.cats.paytoCart(form).subscribe((res: any) => {
            if (res.msg) {
                displayMessage(res.msg);
            } else {
                displayMessage('The medicine has been added to the cart');
            }
        });
    };

    // Function to fetch the current order ID from the server
    const fetchCurrentOrderId = (): Promise<number | null> => {
        return fetch('https://ai-x-care.future-developers.cloud/get/current_order', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('access_token') // Assuming JWT or similar
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch current order ID');
            }
            return response.json();
        })
        .then(data => {
            return data.order_id ? Number(data.order_id) : null;
        })
        .catch(error => {
            console.error(error);
            return null;
        });
    };

    // Main logic for adding to cart
    const existingOrderId = localStorage.getItem('order_id');
    if (existingOrderId) {
        addItemToCart(Number(existingOrderId));
    } else {
        fetchCurrentOrderId().then(orderId => {
            if (orderId) {
                localStorage.setItem('order_id', orderId.toString());
                addItemToCart(orderId);
            } else {
                // If no current order ID, create a new order
                const form = { profile: profileId };
                this.cats.addToCart(form).subscribe((res: any) => {
                    const newOrderId = res.id;
                    localStorage.setItem('order_id', newOrderId.toString());
                    addItemToCart(newOrderId);
                });
            }
        });
    }
}

  // addtoCart(item:any){

  //   var form={
  //     profile:this.authentication.currentUserValue.profile_id,

  //   }
  //   if(localStorage.getItem('order_id')){
  //     let form={
  //       drugs_order:Number(localStorage.getItem('order_id')) ,
  //   product:item.id,
  //   quantity:this.quantity
  //      }
  //      this.cats.paytoCart(form).subscribe((res:any)=>{
  //       this.toastr.info('The medicine has been added to the cart')

  //      })
  //   }else{
  //      this.cats.addToCart(form).subscribe((res:any)=>{
  //       localStorage.setItem('order_id', res.id)
  //       var form={
  //        drugs_order: res.id,
  //    product:item.id,
  //    quantity:this.quantity
  //       }
  //       this.cats.paytoCart(form).subscribe((res:any)=>{
  //        this.toastr.info('The medicine has been added to the cart')

  //       })
  //    })
  //   }
  // }



  decrease(){
    if(this.quantity==1){
    this.quantity=1
  }else
  this.quantity=this.quantity-1
  }
  increase(){

  this.quantity=this.quantity+1

}
}
