import { Component, OnInit, Input, Inject } from '@angular/core';
import * as Mydatas from '../../../app-config.json';

@Component({
  selector: 'app-vechileCustomer',
  templateUrl: './vechileCustomer.component.html',
  styleUrls: ['./vechileCustomer.component.scss']
})

export class vechileCustomer implements OnInit {

  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;selectedData:any;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  public motorApiUrl:any = this.AppConfig.MotorApiUrl;
    ReferenceNo:any="VISIN1000";
    QuotationNo:any="401822";
    CustomerId:any="100902";
    clientName:any="Hisham";
    idNumber:any="912345";
    policyDesc:any="99876543";
    MobileNo1:any='P-1000WB-S0001';
    Nationality:any="Tanzania";
    Division:any="Direct Corporate";
    CustomerCode:any="99999";
    CashCustomer:any="CashCustomer";
    So:any="1-Direct";
    Ho:any="HOCorporate";
    Po:any="https://tinyurl.com";
    RE:any="31/01/2023";
    YnPo:any="N"

    ngOnInit(): void {
        
    }
  
        
}