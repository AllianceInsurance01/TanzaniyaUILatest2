import { Component, OnInit, Input } from '@angular/core';
//import { NbDialogRef } from '@nebular/theme';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from '../../../../../shared/shared.service';
@Component({
  selector: 'app-new-product-details',
  templateUrl: './new-product-details.component.html',
  styleUrls: ['./new-product-details.component.scss']
})
export class NewProductDetailsComponent implements OnInit {

  @Input() title: any;
  statusValue:any= "YES";cityList:any[]=[];
  insuranceId: string;
  insuranceName: string;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  constructor(/*protected ref: NbDialogRef<NewProductDetailsComponent>,*/private sharedService: SharedService) {
    this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
    this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.getProductList();
   }

  ngOnInit(): void {
  }
  dismiss() {
    //this.ref.close();
  }
  getProductList(){
    let ReqObj = {"InsuranceId":this.insuranceId}

  }
}
