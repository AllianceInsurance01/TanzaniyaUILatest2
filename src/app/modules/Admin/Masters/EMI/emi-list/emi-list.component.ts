import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../../app-config.json';
import { SharedService } from '../../../../../shared/shared.service';

@Component({
  selector: 'app-emi-list',
  templateUrl: './emi-list.component.html',
  styleUrls: ['./emi-list.component.scss']
})
export class EmiListComponent implements OnInit {

  public EmiData:any[]=[];
  public columnHeader:any[]=[];
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public insuranceId: any;productId: any;
  EmiId: any;

  constructor(private router:Router,private sharedService: SharedService) {
    this.insuranceId = sessionStorage.getItem('insuranceConfigureId');
    this.productId =  sessionStorage.getItem('companyProductId');
      this.getExistingEmi();
   }

  ngOnInit(): void {
    sessionStorage.removeItem('EmiId')
    this.columnHeader = [
      { key: 'PremiumStart', display: 'Premium Start' },
      { key: 'PremiumEnd', display: 'Premium End' },
      { key: 'EffectiveDateStart', display: 'Effective Date' },

      { key: 'Status', display: 'Status' },
      {
        key: 'actions',
        display: 'Action',
        config: {
          isEdit: true,
        },
      }
    ];
  }
  onAddSection(){
    sessionStorage.removeItem('EmiId')
    this.router.navigate(['/Admin/emiMaster/newEmiDetails'])
  }
  onEditSection(rowdata){
    sessionStorage.setItem('EmiId', rowdata.EmiId);

    let entry = {
      "EmiId":rowdata.EmiId,
    "InsuranceId":rowdata.CompanyId,
    "ProductId":rowdata.ProductId

    }
    sessionStorage.setItem('Sno',JSON.stringify(entry));
    this.router.navigate(['/Admin/emiMaster/newEmiDetails']);
  }
  getExistingEmi(){
    let ReqObj = {
      "InsuranceId":this.insuranceId,
      "ProductId":this.productId,
    }
    let urlLink = `${this.ApiUrl1}master/getallemidetails`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.EmiData = data?.Result;
        }
      },
      (err) => { },
    );
  }
}
