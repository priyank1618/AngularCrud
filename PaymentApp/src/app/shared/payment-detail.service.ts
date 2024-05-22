import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { PaymentDetail } from './payment-detail.model';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {

  //we will use the viewmodal or model to bind the data with the ui
  //first make the empty list and then add the response in it and filled it with data
  //then we will show that data in the ui
  ppplist:PaymentDetail[] = []

  //now we wil make form that is child component
  //here the formofppp represt the object of the data inserted by user
  //its two way binding form
  formofppp: PaymentDetail = new PaymentDetail()
  formIsSubmit:boolean = false
  url:string = environment.apiBaseUrl + '/PaymentDetails'
  constructor(private http:HttpClient) { }
  
  refreshList()
  {
    //this get method return the observable
    //we will subscribe to get the data from it 
    this.http.get(this.url)
    .subscribe({
      next : res => {
        //now all the data is coming in the ppplist
        this.ppplist = res as PaymentDetail[]
      },
      error : err => {console.log(err)}
    })
  }

  getPaymentDetailDataById(id: number): Observable<PaymentDetail> {
    return this.http.get<PaymentDetail>(`${this.url}/${id}`);
  }

  // getPaymentDetailDataById(id: number){
  //      return this.http.get(this.url + '/' + id);
  //   }

  
  //we make that method in the service and consume it in the component ts file
  postformMethod()
  {
    //we will use injected http obj by httpclient
    //this will return observable
    return this.http.post(this.url,this.formofppp)
  }
  putformMethod()
  {
    //we will use injected http obj by httpclient
    //this will return observable
    return this.http.put(this.url + '/' + this.formofppp.paymentDetailId,this.formofppp)
  }

  deletepaymentdetail(id:number)
  {
    return this.http.delete(this.url + '/' + id)
  }

  resetForm(form:NgForm)
  {
    //this is the method to reset the form
     form.form.reset()

     //we also need to reset the service
     this.formofppp = new PaymentDetail()
     this.formIsSubmit = false
  }
  
}
