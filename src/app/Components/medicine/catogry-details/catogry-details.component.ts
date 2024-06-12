import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Aos from 'aos';
import { ToastrService } from 'ngx-toastr';
import { AppService } from 'src/app/services/app.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-catogry-details',
  templateUrl: './catogry-details.component.html',
  styleUrls: ['./catogry-details.component.scss']
})
export class CatogryDetailsComponent implements OnInit {
  name: any;
  loading:boolean=true
  Category_detail: any;
  search:any=''
  constructor( private cats:AppService , private authentication: AuthService,private toastr: ToastrService, private route:ActivatedRoute) {
    this.route.queryParams.subscribe( params=> {
      this.name = params['name'];

    });
  }

  ngOnInit(): void {
    Aos.init()
    this.getCats_detail()
  }
  getCats_detail(){

    this.scroll()
  this.loading=true

    return this.cats.getCategory_details(this.name).subscribe((res:any)=>{
      this.Category_detail=res
  this.loading=false

    })
  }
  scroll(){
    window.scroll(0,0)
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
            quantity: 1
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

  //   let form={
  //     profile:this.authentication.currentUserValue.profile_id,

  //   }
  //   if(localStorage.getItem('order_id')){
  //     let form={
  //       drugs_order: Number(localStorage.getItem('order_id')) ,
  //   product:item.id,
  //   quantity:1
  //      }
  //      this.cats.paytoCart(form).subscribe((res:any)=>{
  //       if (res.msg){
  //         this.toastr.info('',res.msg ,{
  //           closeButton: true,
  //           tapToDismiss:true,
  //           disableTimeOut:false,
  //           timeOut: 1000
  //         });
  //       }else{
  //         this.toastr.info('The medicine has been added to the cart',{
  //           closeButton: true,
  //           tapToDismiss:true,
  //           disableTimeOut:false,
  //           timeOut: 1000
  //         })
  //       }

  //      })
  //   }else{
  //     this.cats.addToCart(form).subscribe((res:any)=>{
  //       localStorage.setItem('order_id', res.id)
  //       let form={
  //        drugs_order: +res.id,
  //    product:item.id,
  //    quantity:1
  //       }
  //       this.cats.paytoCart(form).subscribe((res:any)=>{

        
  //        this.toastr.info('The medicine has been added to the cart')

  //       })
  //    })
  //   }

  // }
}
