import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../app-config.json';
import { SharedService } from '../../../../shared/shared.service';
import {NgbModule, NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
declare var $:any;

@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.scss']
})
export class OthersComponent implements OnInit {
    
    
    issuerHeader:any[]=[];issuerData:any[]=[];companyList:any[]=[];
    quoteno:any;
    startdate:Date;enddate:Date;
    insuranceId:any;userDetails:any;subUserType:any;
    pageCount: number;
    totalRecords: any;
    quotePageNo: any;
    startIndex: number;
    endIndex: number;
    totalQuoteRecords: any;
    public AppConfig: any = (Mydatas as any).default;
    public ApiUrl1: any = this.AppConfig.ApiUrl1;
    public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
    productId: string;show:boolean=false;productList:any[]=[];
    loginId: any;
    insuranceList: any[]=[];
      branchValue: any;
      branchList:any;
    constructor(private router:Router,private sharedService:SharedService,private modalService: NgbModal) {
      this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      const user = this.userDetails?.Result;
      this.loginId = user?.LoginId;
      let insurance = sessionStorage.getItem('issuerInsuranceId');
      if(insurance){
        this.insuranceId = insurance;
      }
      else{
        if(user.AttachedCompanies){
          if(user.AttachedCompanies.length!=0) this.insuranceId=user.AttachedCompanies[0];
        }
      }
      // this.productId =  sessionStorage.getItem('companyProductId');
      this.subUserType = sessionStorage.getItem('typeValue');
    }
    ngOnInit(): void {
    
    }
}
