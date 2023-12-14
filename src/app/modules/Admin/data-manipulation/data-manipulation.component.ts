import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import * as Mydatas from '../../../app-config.json';
@Component({
  selector: 'app-data-manipulation',
  templateUrl: './data-manipulation.component.html',
  styleUrls: ['./data-manipulation.component.scss']
})
export class DataManipulationComponent {

  queryValue:any=null;
  password:any = null;
  queryHeader:any[]=[];
  queryData:any[]=[];
  filterValue:any=null;showSection:boolean = false;
  userDetails: any;
  loginId: any;
  insuranceId: string;
  subUserType: string;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  emptySection: boolean;p: Number = 1;
  constructor(private router:Router,private sharedService:SharedService,) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    const user = this.userDetails?.Result;
    this.loginId = user.LoginId;
     this.insuranceId = user.LoginBranchDetails[0].InsuranceId;
    //this.insuranceId = sessionStorage.getItem('insuranceConfigureId');

    this.subUserType = sessionStorage.getItem('typeValue');
  }
  onSearchQuery(){
    this.queryHeader = [];
      let ReqObj = {
        "Query" : this.queryValue
      }
      let urlLink = `${this.ApiUrl1}reports/datamanipulation`;
      this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
              if(data.Result.length!=0){
                  this.emptySection=false;
                  this.queryData = data.Result;
                  let entry = this.queryData[0];
                  var length = Object.keys(entry).length;let i=0;
                  for (var key in entry) {
                    if (entry.hasOwnProperty(key)) {
                      let obj =  { key: key, display: key }
                      this.queryHeader.push(obj);
                      i+=1;
                      if(i==length){this.showSection=true;console.log(this.queryHeader);};
                      
                    }
                  }
              }
              else{this.emptySection = true;}
          }
        },
        (err) => { },
      );
  }
}
