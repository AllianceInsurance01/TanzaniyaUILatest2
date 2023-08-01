import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import * as Mydatas from '../../../app-config.json';
import { SharedService } from '../../../shared/shared.service';
@Component({
  selector: 'app-dialog-details',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  title:any;
   imageUrl:any;
  ClausesData: any;
  ExclusionData:any;
  jsonList:any[]=[];
  ExclusionList:any[]=[];
  json:any[]=[];
  RiskId: any;
  SectionId: any;
  quoteNo: any;
  ReferenceNo: any;
  userDetails: any;
  localCurrency: any;
  loginId: any;
  userType: any;
  agencyCode: any;
  branchCode: any;
  branchList: any;
  productId: any;
  insuranceId: any;
  productName: any;
  Id:any;
  Open:any;
  brokerbranchCode: any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  public motorApiUrl:any = this.AppConfig.MotorApiUrl;
  constructor( public dialogRef: MatDialogRef<DialogComponent>,public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any,public sharedService: SharedService) {
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.localCurrency = this.userDetails.Result.CurrencyId;
    this.loginId = this.userDetails.Result.LoginId;
    this.userType = this.userDetails?.Result?.UserType;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.branchList = this.userDetails.Result.LoginBranchDetails;
    this.productId = this.userDetails.Result.ProductId;
    this.productName =  this.userDetails.Result.ProductName;
    this.insuranceId = this.userDetails.Result.InsuranceId;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    this.jsonList = [
      {
        "TypeId":"D",
        "DocRefNo":null,
      "DocumentId":null,
         "Id":"6",
        "SubId":null,
         "SubIdDesc":""
      }
    ]

    this.ExclusionList = [
      {
        "TypeId":"D",
         "Id":"7",
        "SubId":null,
         "SubIdDesc":"",
         "DocRefNo":null,
         "DocumentId":null,
      }
    ]


    this.json = [
      {
        "TypeId":"D",
         "Id":"4",
        "SubId":null,
         "SubIdDesc":"",
         "DocRefNo":null,
         "DocumentId":null,
      }
    ]


   }

  ngOnInit(): void {


      console.log('jjjjjj',this.data.title)
      this.title = this.data?.title;
      this.ClausesData = this.data?.existingData;
      this.RiskId=this.data.RiskId;
      this.SectionId=this.data.SectionId;
      this.quoteNo=this.data.QuoteNo;
      this.ReferenceNo=this.data.ReferenceNo;
      //this.jsonList=this.data.jsonList;
      this.Id=this.data.Id


    /*if(this.data.title="Exclusion"){
      console.log('jjjjjj',this.data.title)
      this.title = this.data?.title;
      this.ExclusionData = this.data?.existingData;
      this.RiskId=this.data.RiskId;
      this.SectionId=this.data.SectionId;
      this.quoteNo=this.data.QuoteNo;
      this.ReferenceNo=this.data.ReferenceNo;
      //this.jsonList=this.data.jsonList;
      this.Id=this.data.Id
    }*/



  }
  close(){ this.dialogRef.close();}

  addItem(){
    //this.jsonList.push(row);
    let entry = [{
     "TypeId":"D",
     "Id":this.Id,
     "SubId":null,
     "SubIdDesc":"",
     "DocRefNo":null,
    "DocumentId":null,
     
   }]
   this.jsonList = entry.concat(this.jsonList);
     }


  saveChanges(){

    //let insert= this.jsonList.concat(this.json, this.Exclusion);
    let i=0;

    /*if (tempData.length != 0) {
      this.jsonList.forEach((item) => (item["Id"] = "6"));
      this.ExclusionList.forEach((item) => (item["Id"] = "4"));
      this.json.forEach((item) => (item["Id"] = "7"));
      console.log("EEEEEEEE", jsonList);
      console.log("iiii", this.json);
    } else if (this.json.length != 0) {
      this.ExclusionList.forEach((item) => (item["Id"] = "4"));
      this.ExclusionList.forEach((item) => (item["Id"] = "7"));
      console.log("WWWWWWW", this.ExclusionList);
    } else if (this.json.length != 0) {
      this.json.forEach((item) => (item["Id"] = "7"));
      console.log("EEEEEEEE", this.json);
    }*/

    //let insert=this.jsonList.concat(this.ExclusionList, this.json);


      //this.ClausesData.forEach((item) => (item["Id"] = "6"));
      //var funcs = [];
        //this.ClausesData.forEach((i) => funcs.push( () => i  ))
      console.log("EEEEEEEE", this.ClausesData);

   let clauses
     if(this.ClausesData!=null || this.ClausesData !=undefined){
      clauses= this.ClausesData.concat(this.jsonList);
     }
     else{
      clauses= this.jsonList
     }

    console.log('QQQQQ',this.quoteNo)
        let quote
    if(this.quoteNo){
      quote=this.quoteNo;
    }
    else{
      quote="";
    }

    //console.log('SSSSSSSSSSSS',this.tempData)
    //console.log('aaaaaaaaaaaaaa',this.jsonList)
    let Req = {
      BranchCode: this.branchCode,
      CreatedBy: this.loginId,
      InsuranceId: this.insuranceId,
      ProductId: this.productId,
      QuoteNo:quote,
      //TermsId:null,
      RiskId:"1",
      SectionId:"99999",
      TermsAndConditionReq:clauses,
      RequestReferenceNo: this.ReferenceNo
    };

    let urlLink = `${this.CommonApiUrl}api/inserttermsandcondition`;
    this.sharedService.onPostMethodSync(urlLink, Req).subscribe((data: any) => {
      if (data.Result) {

        /*let vech= this.ClausesData.filter(
          (ele) => ele.SubIdDesc ==""
        );
        if(vech){

          let clauses = this.ClausesData

          clauses.concat(this.jsonList);

          console.log('clauses',clauses)
        }
        else{
          console.log("canot Added");

        }*/

        //this.ddata=data.Result;
        //this.ClausesData=this.ClausesData.concat(this.json);

        console.log('TOOOOOOOOO');
        //console.log('VechileLength',this.vehicleDetailsList.length);
        //this.closes=false;

        //exampleModel.hide()
        this.jsonList =[
          {
            "TermsId":null,
             "Id":this.Id,
            "SubId":null,
             "SubIdDesc":""
          }
        ];
        this.close();
        //this.jsonList.splice();


        //$('#ExclusionModal').modal('hide');
        //$('#WarrantyModel').modal('hide');

        //window.location.reload();
      }
    });

  }
  deleteClauses(row){
    const index = this.jsonList.indexOf(row);
    this.jsonList.splice(index, 1);
  }



  saveExclusion(){
    console.log('QQQQQ',this.quoteNo)
    let quote
if(this.quoteNo){
 quote=this.quoteNo;
}
else{
  quote="";
}
    let i=0;

    let clauses
    if(this.ClausesData!=null || this.ClausesData !=undefined){
      clauses= this.ClausesData.concat(this.ExclusionList);
     }
     else{
      clauses= this.ExclusionList
     }
    //= this.ExclusionData.concat(this.ExclusionList);
    //console.log('Exclusion',this.tempData)
    console.log('Exclsuion',this.ExclusionList)
    let Req = {
      BranchCode: this.branchCode,
      CreatedBy: this.loginId,
      InsuranceId: this.insuranceId,
      ProductId: this.productId,
      QuoteNo:quote,
      //TermsId:null,
      RiskId: this.RiskId,
      SectionId:this.SectionId,
      TermsAndConditionReq:clauses,
      RequestReferenceNo: this.ReferenceNo
    };

    let urlLink = `${this.CommonApiUrl}api/inserttermsandcondition`;
    this.sharedService.onPostMethodSync(urlLink, Req).subscribe((data: any) => {
      if (data.Result) {

        //this.ddata=data.Result;
        console.log('TOOOOOOOOO');
        //console.log('VechileLength',this.vehicleDetailsList.length);
        //this.closes=false;
        //$('#exampleModal').modal('hide');
        //$('#ExclusionModal').modal('hide');
        this.ExclusionList =[
          {
            "TermsId":null,
             "Id":"7",
            "SubId":null,
             "SubIdDesc":""
          }
        ];
        this.close();
        //$('#WarrantyModel').modal('hide');


        //window.location.reload();
      }
    });
  }

  deleteExclusion(row){
    const index = this.ExclusionList.indexOf(row);
    this.ExclusionList.splice(index, 1);
  }

  addExclusion(){
    let entry = [{
      "TermsId":null,
      "Id":"7",
      "SubId":null,
      "SubIdDesc":"",
      "DocRefNo":null,
      "DocumentId":null,
    }]
    this.ExclusionList = entry.concat(this.ExclusionList);
  //this.ExclusionList.push(row);
  }



  saveWarranty(tempData,json){
    let i=0;
    console.log('QQQQQ',this.quoteNo)
    let quote
if(this.quoteNo){
 quote=this.quoteNo;
}
else{
  quote="";
}
    let clauses
    if(this.ClausesData !=null || this.ClausesData !=undefined){
      clauses= this.ClausesData.concat(this.json);
     }
     else{
      clauses= this.json
     }
    //let clauses = this.WarrantyData .concat(this.json);
    //console.log('Warranty',this.tempData)
    console.log('Warranty',this.json)
    let Req = {
      BranchCode: this.branchCode,
      CreatedBy: this.loginId,
      InsuranceId: this.insuranceId,
      ProductId: this.productId,
      QuoteNo:quote,
      //TermsId:null,
      RiskId: this.RiskId,
      SectionId:this.SectionId,
      TermsAndConditionReq:clauses,
      RequestReferenceNo: this.ReferenceNo
    };

    let urlLink = `${this.CommonApiUrl}api/inserttermsandcondition`;
    this.sharedService.onPostMethodSync(urlLink, Req).subscribe((data: any) => {
      if (data.Result) {

        //this.ddata=data.Result;
        console.log('TOOOOOOOOO');
        //console.log('VechileLength',this.vehicleDetailsList.length);
        //this.closes=false;
        //$('#exampleModal').modal('hide');
        //$('#ExclusionModal').modal('hide');

        this.json = [
          {
            "TermsId":null,
             "Id": "4",
            "SubId":null,
             "SubIdDesc":""
          }
        ]
        this.close();


        //window.location.reload();
      }
    });
  }

  addwarranty(){
    let entry = [{
      "TermsId":null,
      "Id":"4",
      "SubId":null,
      "SubIdDesc":"",
      "DocRefNo":null,
      "DocumentId":null,
    }]
    this.json = entry.concat(this.json);
    //this.json.push(row);
  }
}
