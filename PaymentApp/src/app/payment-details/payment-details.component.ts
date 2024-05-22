import { Component,OnInit } from '@angular/core';
import { PaymentDetailService } from '../shared/payment-detail.service';
import { PaymentDetail } from '../shared/payment-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styles: [
  ]
})
export class PaymentDetailsComponent implements OnInit{

  //make constructor
  constructor(public customservicename : PaymentDetailService,private notify:ToastrService){

  }
  ngOnInit(): void {
    this.customservicename.refreshList();
  }

  showclickeddatatoform(custom:PaymentDetail)
  {
     this.customservicename.formofppp = Object.assign({},custom)
  }

  ondelete(id:number)
  {
    this.customservicename.deletepaymentdetail(id)
    .subscribe({
      next : res => {
        this.customservicename.ppplist = res as PaymentDetail[]
        this.notify.success("Data deleted successfully","Payment Detail Register")
        
      },
      error : err => {console.log(err)}
    })
  }

}
