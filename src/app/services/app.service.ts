import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

if (environment.enableDebugging) {
  debugger;
}

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http:HttpClient) { }
  // medicinesService
  getCategorys(){
    return this.http.get(`https://ai-x-care.future-developers.cloud/category/drug/`)
   }
   getCategory_details(name:any){
    return this.http.get(`https://ai-x-care.future-developers.cloud/drug/category/${name}`)
   }
   getmedicine_details(name:any){
    return this.http.get(`https://ai-x-care.future-developers.cloud/drug/${name}`)
   }
   addToCart(user_id:any){
    return this.http.post(`https://ai-x-care.future-developers.cloud/orders/`,user_id)
   }
   getOrders(id:any){
    return this.http.get(`https://ai-x-care.future-developers.cloud/orders/items/`)
   }
   paytoCart(form:any){
    return this.http.post(`https://ai-x-care.future-developers.cloud/orders/items/`,form)
   }
   deleteitem(it_id:any){
    return this.http.delete(`https://ai-x-care.future-developers.cloud/orders/items/modify/${it_id}/`)
   }
  // medicinesService
  // doctorsService
   getDoctorsSpicials(){
    return this.http.get(`https://ai-x-care.future-developers.cloud/specialist/`)
   }
   getDoctorsInSpicials(specialites_name:any){
    return this.http.get(`https://ai-x-care.future-developers.cloud/accounts/doctors/specialites/${specialites_name}`)
   }
   getDoctor_details(slug:any){

    return this.http.get(`https://ai-x-care.future-developers.cloud/accounts/doctors/${slug}`)
   }
   getDoctor_booking(id:any){

    return this.http.get(`https://ai-x-care.future-developers.cloud/schedule/reservations/${id}`)
   }
   booking(form:any , id:any){

    return this.http.post(`https://ai-x-care.future-developers.cloud/book/reservations`,form)
   }
   // doctorsService
  //  blogs
  showBlogs(){
    return this.http.get(`https://ai-x-care.future-developers.cloud/posts/`)
  }
  like(form:any){
    return this.http.post(`https://ai-x-care.future-developers.cloud/post/like/`, form)
  }
  dislike(form:any){
    return this.http.post(`https://ai-x-care.future-developers.cloud/post/dislike/`, form)
  }
  comments(id:any){
    return this.http.get(`https://ai-x-care.future-developers.cloud/post/comments/${id}`)
  }
  addComments(id:any,form:any){
    return this.http.post(`https://ai-x-care.future-developers.cloud/post/comments/${id}`,form)
  }
  addpost(form:any){

  const formData:FormData = new FormData()
  for (const [key, value] of Object.entries(form)) {
    if((value !='')&&(value !=undefined)) {
      if(key==`media_file`){
        formData.append(`media_file`,form.media_file)
      }else{
        formData.append(key,`${value}`)
      }

  }

}
    return this.http.post(`https://ai-x-care.future-developers.cloud/posts/`,formData)
  }
    // socket 
    getSessions(){
      return this.http.get('https://ai-x-care.future-developers.cloud/chat/ai/mysessions'); // Adjust the URL as necessary
    }

    getChats(sessionId: string){
      return this.http.get(`https://ai-x-care.future-developers.cloud/chat/ai/mymessages/${sessionId}`); // Adjust the URL as necessary
    }
    getProfile() {
      return this.http.get(`https://ai-x-care.future-developers.cloud/accounts/profile`)
    }
    
  editProfile(form: any, profile_id: any) {
    return this.http.put(`https://ai-x-care.future-developers.cloud/accounts/profile/${profile_id}`, form)
  }
  editProfileData(form: any , profile_id:any) {

    const formData: FormData = new FormData()
    for (const [key, value] of Object.entries(form)) {
      if ((value != '') && (value != undefined)) {
        if (key == `photo`) {
          formData.append(`photo`, form.photo)
        } else {
          formData.append(key, `${value}`)
        }

      }

    }
    return this.http.put(`https://ai-x-care.future-developers.cloud/accounts/profile/${profile_id}`, formData)
  }

    // profile doctor
    getDoctorProfile(doc_id : any) {
      return this.http.get(`https://ai-x-care.future-developers.cloud/accounts/doctors/account/${doc_id}`)
    }
  
    editDoctorProfile(form: any, doctor_id: any) {
      return this.http.put(`https://ai-x-care.future-developers.cloud/accounts/doctors/account/${doctor_id}`, form)
    }

    getMyReservations(){
      return this.http.get(`https://ai-x-care.future-developers.cloud/book/reservations`)
    }

    DeleteReservations(res_id:any){
      return this.http.delete(`https://ai-x-care.future-developers.cloud/delete/reservation/${res_id}/`)
    }

    getMyReservationsDoctor(doc_id:any){
      return this.http.get(`https://ai-x-care.future-developers.cloud/get/reservations/doctor/${doc_id}`)
    }

    //clinic
  getClinic(doc_id:any) {
    return this.http.get(`https://ai-x-care.future-developers.cloud/accounts/organizations/${doc_id}`)
  }

  postClinic(doc_id:any, form: any) {
    return this.http.post(`https://ai-x-care.future-developers.cloud/accounts/organizations/${doc_id}`, form)
  }
  putClinic(doc_id:any ,form: any) {
    return this.http.put(`https://ai-x-care.future-developers.cloud/accounts/organizations/${doc_id}`, form)
  }

}
