import { Component, OnInit, Input, Inject } from '@angular/core';


@Component({
  selector: 'app-Payment',
  templateUrl: './Payment.component.html',
  styleUrls: ['./Payment.component.scss']
})

export class PaymentComponent implements OnInit {
    clientName:any="Hisham";
    idNumber:any="912345";
    policyDesc:any="99876543";
    MobileNo1:any='Admin@01';
    Nationality:any="Tanzania";
    Division:any="Direct Corporate";
    CustomerCode:any="99999";
    CashCustomer:any="CashCustomer";
    So:any="1-Direct";
    Ho:any="HOCorporate";
    ngOnInit(): void {
        
    }

}