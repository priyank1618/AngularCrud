import { Component } from '@angular/core';
import { PaymentDetailService } from 'src/app/shared/payment-detail.service';
import { NgForm } from '@angular/forms';
import { PaymentDetail } from 'src/app/shared/payment-detail.model';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-payment-detail-form',
  templateUrl: './payment-detail-form.component.html',
  styles: [
  ]
})
export class PaymentDetailFormComponent  {

  //here you can name service and use that in the html as paymentdetais service object
  //this is called the inject the dependency of the class

  //we are again injecting the obj of the toastr and use it to show the toaster
  constructor(public customservicename : PaymentDetailService,private notify:ToastrService)
  {

  }


  onSubmit(pppform : NgForm){
 
    this.customservicename.formIsSubmit = true

    //we had write the method to post the form in the service
    //we will use it by injected service class obj

    if (pppform.valid) 
      {
        if(this.customservicename.formofppp.paymentDetailId == 0)
          {
            this.Insertdata(pppform)
          }
          else
          {
            this.updatedata(pppform,this.customservicename.formofppp.paymentDetailId)
          }
    }

   
  }
  
  //we make inset and update method using the primary key
  Insertdata(pppform : NgForm)
  {
    this.customservicename.postformMethod()
    .subscribe({
      next : res => {
        
          this.customservicename.ppplist = res as PaymentDetail[]
          this.customservicename.resetForm(pppform)
          //the data entered in as first arg is msg and second arg is title
          this.notify.success("Data added successfully","Payment Detail Register")
      },
      error : err => {console.log(err)}
    })
  }

  updatedata(pppform:NgForm,id:number)
  {
       this.customservicename.getPaymentDetailDataById(id)
       .subscribe({
        
        next : currentData => {
          const isChanged = this.isDataChanged(currentData, pppform.value);
          if(isChanged)
            {
              this.customservicename.putformMethod()
              .subscribe({
                next : res => {
                  
                    this.customservicename.ppplist = res as PaymentDetail[]
                    this.customservicename.resetForm(pppform)
                    //the data entered in as first arg is msg and second arg is title
                    this.notify.info("Data updated successfully","Payment Detail Register")
                },
                error : err => {console.log(err)}
              })
            }
            else{
              this.customservicename.resetForm(pppform)
              this.notify.warning("No changes detected. Data is already up to date.", "Payment Detail Register");
            }
        },
        error : err => {}
       })

   

    
  }

  isDataChanged(currentData: PaymentDetail, newData : PaymentDetail): boolean {
    const keys = Object.values(newData);
    const key = Object.values(currentData)
   
    for (let i = 0; i < keys.length; i++) {
      
      if (keys[i] !== key[i+1]) {
        return true;
      }
    }
  
    return false;
  }
  
  
}
