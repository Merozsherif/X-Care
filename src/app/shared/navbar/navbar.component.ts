import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user_name:any=''
  photo:any=''
  user: any={};
  constructor(private authentication: AuthService,private router:Router,private toastr: ToastrService,) {

  }

  ngOnInit(): void {
    this.authentication.refreshuser.subscribe((l:any)=>{
      if(l==true){

        this.user= this.authentication.currentUserValue
        this.photo = 'https://ai-x-care.future-developers.cloud/media/' + this.user.photo
        console.log(this.photo)
// console.log(this.user , "authentication");



      }
      // this.getNotif()

    })
    this.user= this.authentication.currentUserValue
    this.photo = 'https://ai-x-care.future-developers.cloud/media/' + this.user.photo

// console.log(this.user);

     setTimeout(() => {
      let token = localStorage.getItem('access_token')
      if (token){
        this.user_name=this.user.user.username
        this.photo = 'https://ai-x-care.future-developers.cloud/media/' + this.user.photo

      }
     }, 0);


  }
  logout(){
    this.user_name=''
    this.toastr.info('logout is successful')
    localStorage.removeItem('access_token')

    localStorage.removeItem('order_id')


    localStorage.removeItem('jwt');
   setTimeout(() => {
    this.authentication.currentUserSubject.next(null)
    this.authentication.refreshuser.next(true)
   }, 0);
  //  location.reload()
    this.router.navigate(['/Home'] ).then(()=>{
      location.reload()
    })
  }
}
