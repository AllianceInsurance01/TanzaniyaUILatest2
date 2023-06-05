import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as Mydatas from '../../../../../../app-config.json'
import { NewmodelDetailsComponent } from '../newmodel-details/newmodel-details.component';
//import { NbDialogService } from '@nebular/theme';
import { SharedService } from '../../../../../../shared/shared.service';


@Component({
  selector: 'app-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.scss']
})
export class ModelListComponent implements OnInit {
  activeMenu:any='Model';insuranceName:any;insuranceId:any;
  ModelId:any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  public columnHeader: any[] = [];
  ModelData: any[]=[];
  BranchCode: any;
  title:string|any;
  ModelList: any[]=[];MakeValue:any;
  MakeId: any;
  constructor(private router:Router,private sharedService: SharedService, ) {
    this.insuranceName = sessionStorage.getItem('insuranceConfigureName');
    this.insuranceId = sessionStorage.getItem('insuranceConfigureId'); }

  ngOnInit(): void {
    this.columnHeader = [
      { key: 'MakeNameEn', display: 'Make Name En' },
      { key: 'CoreAppCode', display: 'Core APP Code' },
      { key: 'EffectiveDateStart', display: 'EffectiveDateStart' },
      { key: 'Status', display: 'Status' },
      {
        key: 'actions',
        display: 'Action',
        config: {
          isEdit: true,
        },
      },
    ];

    this.getModelList();
  }
  onRedirect(value){
    if(value=='Product') this.router.navigate(['/Admin/companyList/companyConfigure'])
    if(value=='Dropdown') this.router.navigate(['/Admin/companyList/companyConfigure/existingDropdowns'])
    if(value=='Occupation') this.router.navigate(['/Admin/companyList/companyConfigure/existingOccupations'])
    if(value=='Branch') this.router.navigate(['/Admin/companyList/companyConfigure/branchDetails'])
    if(value=='Region') this.router.navigate(['/Admin/companyList/companyConfigure/regionList'])
    if(value=='State') this.router.navigate(['/Admin/companyList/companyConfigure/stateList'])
    if(value=='City') this.router.navigate(['/Admin/companyList/companyConfigure/cityList']);
    if(value=='Currency') this.router.navigate(['/Admin/companyList/companyConfigure/currencyList']);
    if(value=='PolicyType') this.router.navigate(['/Admin/companyList/companyConfigure/policyTypeDetails'])
    if(value=='Color') this.router.navigate(['/Admin/companyList/companyConfigure/colorList']);
    if(value=='Make') this.router.navigate(['/Admin/companyList/companyConfigure/MakeList']);
    if(value=='Model') this.router.navigate(['/Admin/companyList/companyConfigure/ModelList']);
  }
  onAddModel(){
    /*this.dialogService.open(NewmodelDetailsComponent, {
      context: {
        title: 'Model Details',
        "MakeId" : this.MakeValue
      },
    });*/
    let ReqObj = {
      "MakeId": this.MakeId,
      "InsuranceId":"100002",
      "BranchCode": null,
      "ModelId": null,
      "BodyId": null
    }
    sessionStorage.setItem('editModelId',JSON.stringify(ReqObj));

    this.router.navigate(['/Admin/companyList/companyConfigure/ModelList/newModelDetails']);

  //this.router.navigate(['/Admin/companyList/companyConfigure/existingOccupations/updateOccupationDetails'])
  }


  getModelList(){
    let ReqObj = {

"InsuranceId" : 100002,
"BranchCode" : "99999"

    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/motormake`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      if(data.Result){
        let obj = [];
        this.ModelList = obj.concat(data?.Result);
        if(!this.MakeId){ this.MakeId = "99999"; this.getExistingModel() }
      }
    },
    (err) => { },
  );
  }

  getExistingModel(){
    let ReqObj = {
      "InsuranceId":100002,
      "BranchCode":"9999",
      "MakeId":this.MakeId

    }
    let urlLink = `${this.CommonApiUrl}master/getallmotormakemodel`;

    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.ModelData = data?.Result;
        }
      },
      (err) => { },
    );
  }
  onEditModel(rowdata){
    let entry = {
      "MakeId" :this.MakeId,
      "BranchCode" : rowdata.BranchCode,
      "InsuranceId":"100002",
      "ModelId":rowdata.ModelId,
      "BodyId":rowdata.BodyId
    }
    sessionStorage.setItem('editModelId',JSON.stringify(entry));
    this.router.navigate(['/Admin/companyList/companyConfigure/ModelList/newModelDetails'])

  }



}




