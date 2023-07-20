import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import * as Mydatas from '../../../../../app-config.json';
import { endrosement } from '../../Company/EndrosementField/endrosementfield-details/endrosement.Model';
@Component({
  selector: 'app-sum-insured-configuration',
  templateUrl: './sum-insured-configuration.component.html',
  styleUrls: ['./sum-insured-configuration.component.css']
})
export class SumInsuredConfigurationComponent {
  productList:any[]=[];endorsementData:any[]=[];
  loginId:any;issuerType:any;issuerLoginId:any;endorsementHeader:any;
  issuerId:any;insuranceId:any;referralHeader:any[]=[];referralData:any[]=[]
  public AppConfig: any = (Mydatas as any).default;countryList:any[]=[];
  public ApiUrl1: any = this.AppConfig.ApiUrl1;public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  productHeader: any[]=[]; p: Number = 1;productSection:boolean = true;referralSection = false;
  endorseSection = false;selectedRowData:any;
  productIds: any;
  categoryId: any;
  columnList:any[]=[];
  endorseData:any[]=[];
  categoryList:any[]=[];
  referralproductId: any;
  IssuerType: any;
  tableList:any[]=[];
  InputTable: any;
  constructor(private router:Router,private sharedService:SharedService,) {
    let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    if(userDetails){
      this.loginId = userDetails?.Result?.LoginId;
    }
    let issuerId = sessionStorage.getItem('editIssuerLoginId');
    let issuerDetails = JSON.parse(sessionStorage.getItem('issuerTypeDetails'));
    if(issuerDetails!=undefined && issuerDetails!=null){
        this.issuerType = issuerDetails?.issuerType;
        this.issuerLoginId = issuerDetails?.loginId;
        this.insuranceId = issuerDetails?.InsuranceId;
        this.IssuerType=issuerDetails.IssuerType;
        console.log('YYYYYYYYYYYY',this.IssuerType);
        //this.productIds=issuerDetails?.productIds;
    }
    if(issuerId){
      this.issuerId = issuerId;
    }
    if(this.insuranceId){
      this.getProductList();
    }
    this.referralHeader = [
      {
        key: 'CoverId',
        display: 'Select',
        config: {
          isChecked: true,
          model:'isChecked'
        },
      },
      { key: 'ApiName', display: 'Referral Name' },
      { key: 'EffectiveDateStart', display: 'EffectiveDate Start' },  
    ];
    this.endorsementHeader = [
      {
        key: 'CoverId',
        display: 'Select',
        config: {
          isChecked: true,
          model:'isChecked'
        },
      },
      { key: 'EndtType', display: 'End tType' },
      { key: 'EndtTypeDesc', display: 'Endt TypeDesc' },

    { key: 'EffectiveDateStart', display: 'EffectiveDate Start' }
    ];
    this.endorsementData = [
      {
          "EndtTypeId": "846",
          "EndtType": "Add New Vehicle Detail",
          "EndtTypeDesc": "Add New Vehicle Detail",
          "Status": "Y",
          "Priority": "1",
          "EndtDependantFields": [
              "addVehicle"
          ],
          "EndtDependantIds": [
              "1"
          ],
          "EndtFeeYn": "Y",
          "EndtFeePercent": "2",
          "Remarks": null,
          "EntryDate": "28/03/2023",
          "EffectiveDateStart": "28/03/2023",
          "EffectiveDateEnd": "30/12/2050",
          "CreatedBy": null,
          "UpdatedBy": null,
          "RegulatoryCode": null,
          "UpdatedDate": null,
          "AmendId": "0",
          "CalcTypeId": "P",
          "CoreAppCode": "20"
      },
      {
          "EndtTypeId": "849",
          "EndtType": "Change of Currency Type",
          "EndtTypeDesc": "Change of Currency Type",
          "Status": "Y",
          "Priority": "1",
          "EndtDependantFields": [
              "Currency"
          ],
          "EndtDependantIds": [
              "30"
          ],
          "EndtFeeYn": "Y",
          "EndtFeePercent": "2",
          "Remarks": "Change of Currency Type",
          "EntryDate": "26/04/2023",
          "EffectiveDateStart": "26/04/2023",
          "EffectiveDateEnd": "30/12/2050",
          "CreatedBy": "prakash_admin",
          "UpdatedBy": "prakash_admin",
          "RegulatoryCode": "99999",
          "UpdatedDate": "26/04/2023",
          "AmendId": "0",
          "CalcTypeId": "P",
          "CoreAppCode": "99999"
      },
      {
          "EndtTypeId": "844",
          "EndtType": "Cover Modification",
          "EndtTypeDesc": "Cover Modification",
          "Status": "Y",
          "Priority": "2",
          "EndtDependantFields": [
              "Covers"
          ],
          "EndtDependantIds": [
              "24"
          ],
          "EndtFeeYn": "N",
          "EndtFeePercent": "",
          "Remarks": "None",
          "EntryDate": "04/04/2023",
          "EffectiveDateStart": "04/04/2023",
          "EffectiveDateEnd": "30/12/2050",
          "CreatedBy": "leoAdmin",
          "UpdatedBy": "leoAdmin",
          "RegulatoryCode": "99999",
          "UpdatedDate": "04/04/2023",
          "AmendId": "0",
          "CalcTypeId": "",
          "CoreAppCode": "99999"
      },
      {
          "EndtTypeId": "843",
          "EndtType": "Modification Of Policy Period",
          "EndtTypeDesc": "None",
          "Status": "Y",
          "Priority": "1",
          "EndtDependantFields": [
              "PolicyStartDate",
              "PolicyEndDate"
          ],
          "EndtDependantIds": [
              "25",
              "26"
          ],
          "EndtFeeYn": "N",
          "EndtFeePercent": "",
          "Remarks": "None",
          "EntryDate": "04/04/2023",
          "EffectiveDateStart": "04/04/2023",
          "EffectiveDateEnd": "30/12/2050",
          "CreatedBy": "leoAdmin",
          "UpdatedBy": "leoAdmin",
          "RegulatoryCode": "99999",
          "UpdatedDate": "04/04/2023",
          "AmendId": "0",
          "CalcTypeId": "",
          "CoreAppCode": "99999"
      },
      {
          "EndtTypeId": "845",
          "EndtType": "Modification of Policy Period",
          "EndtTypeDesc": "Modification of Policy Period",
          "Status": "Y",
          "Priority": "3",
          "EndtDependantFields": [
              "policyStartDate",
              "policyEndDate"
          ],
          "EndtDependantIds": [
              "1"
          ],
          "EndtFeeYn": "Y",
          "EndtFeePercent": "2",
          "Remarks": null,
          "EntryDate": "24/03/2023",
          "EffectiveDateStart": "24/03/2023",
          "EffectiveDateEnd": "30/12/2050",
          "CreatedBy": null,
          "UpdatedBy": null,
          "RegulatoryCode": null,
          "UpdatedDate": null,
          "AmendId": "0",
          "CalcTypeId": "P",
          "CoreAppCode": "20"
      },
      {
          "EndtTypeId": "848",
          "EndtType": "Name",
          "EndtTypeDesc": "None",
          "Status": "N",
          "Priority": "2",
          "EndtDependantFields": [
              "testing"
          ],
          "EndtDependantIds": [
              "3"
          ],
          "EndtFeeYn": "N",
          "EndtFeePercent": "",
          "Remarks": "jjhghgf",
          "EntryDate": "25/04/2023",
          "EffectiveDateStart": "26/04/2023",
          "EffectiveDateEnd": "30/12/2050",
          "CreatedBy": "prakash_admin",
          "UpdatedBy": "prakash_admin",
          "RegulatoryCode": "8547",
          "UpdatedDate": "25/04/2023",
          "AmendId": "1",
          "CalcTypeId": "",
          "CoreAppCode": "9965"
      },
      {
          "EndtTypeId": "842",
          "EndtType": "Policy Cancellation",
          "EndtTypeDesc": "Policy Cancellation",
          "Status": "Y",
          "Priority": "42",
          "EndtDependantFields": [
              "test"
          ],
          "EndtDependantIds": [
              "1"
          ],
          "EndtFeeYn": "N",
          "EndtFeePercent": "",
          "Remarks": "None",
          "EntryDate": "01/04/2023",
          "EffectiveDateStart": "01/04/2023",
          "EffectiveDateEnd": "30/12/2050",
          "CreatedBy": "prakashadmin",
          "UpdatedBy": "prakashadmin",
          "RegulatoryCode": "20",
          "UpdatedDate": "01/04/2023",
          "AmendId": "0",
          "CalcTypeId": "",
          "CoreAppCode": "20"
      },
      {
          "EndtTypeId": "847",
          "EndtType": "Remove Existing Vehicle Details",
          "EndtTypeDesc": "Remove Existing Vehicle Details",
          "Status": "Y",
          "Priority": "1",
          "EndtDependantFields": [
              "removeVehicle"
          ],
          "EndtDependantIds": [
              "1"
          ],
          "EndtFeeYn": "Y",
          "EndtFeePercent": "2",
          "Remarks": null,
          "EntryDate": "28/03/2023",
          "EffectiveDateStart": "28/03/2023",
          "EffectiveDateEnd": "30/12/2050",
          "CreatedBy": null,
          "UpdatedBy": null,
          "RegulatoryCode": null,
          "UpdatedDate": null,
          "AmendId": "0",
          "CalcTypeId": "P",
          "CoreAppCode": "20"
      },
      {
          "EndtTypeId": "811",
          "EndtType": "policy cancellation",
          "EndtTypeDesc": "none",
          "Status": "Y",
          "Priority": "1",
          "EndtDependantFields": [
              "non financial"
          ],
          "EndtDependantIds": [
              "2"
          ],
          "EndtFeeYn": "Y",
          "EndtFeePercent": "2",
          "Remarks": "Change of Currency Type",
          "EntryDate": "26/04/2023",
          "EffectiveDateStart": null,
          "EffectiveDateEnd": "30/12/2050",
          "CreatedBy": "prakash_admin",
          "UpdatedBy": "prakash_admin",
          "RegulatoryCode": "99999",
          "UpdatedDate": "26/04/2023",
          "AmendId": "1",
          "CalcTypeId": "P",
          "CoreAppCode": "99999"
      }
    ];
    this.getTableList();
  }

  ngOnInit(): void{
    
   
  }
  ongetBack(){
    this.productIds="";
    this.categoryId="";
      this.router.navigate(['Admin/issuerList/newIssuerDetails'])
  }
  onSelectProduct(rowData,event,i){
    console.log('HHHHHHHHHH',rowData,event,i)
    if(event){
        rowData.IsOptedYn = 'Y';
        rowData.Checked = true;
          this.onTableChange(rowData.TableName)
      
    }
    else{
        rowData.IsOptedYn = 'N';
        rowData.Checked = false;
    
    }
    //this.onProceed(rowData,i)
   
  }
  getProductList(){
    if(this.insuranceId!='' && this.insuranceId!= undefined){
      let urlLink = `${this.CommonApiUrl}admin/getissuerproductbyid`;
      let ReqObj ={
        "LoginId": this.issuerLoginId,
        "InsuranceId": this.insuranceId,
        "UserType": 'Issuer'
      }
      this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
              let productList = data.Result;
              if(productList.length!=0){
                let i=0,products = [];
                for(let product of productList){
                    if(product?.IsOptedYn=='Y') product['Checked'] = true;
                    else product['Checked'] = false;
                    if(product?.IsOptedYn =='Y'){
                      this.onTableChange(product.TableName)
                    }
                    this.onChangeSumInsuredStart(product);
                    products.push(product);
                    i+=1;
                    if(i==productList.length){
                      this.productList = productList;
                     
                      this.productHeader = [
                        {
                          key: 'CoverId',
                          display: 'Select',
                          config: {
                            isChecked: true,
                            model:'isChecked'
                          },
                        },
                        { key: 'CodeDesc', display: 'Product' },
                        { key: 'SumInsuredStart', display: 'SumInsured Start' },
                        { key: 'SumInsuredEnd', display: 'SumInsured End' }
                      ]
                    }
                }
              }
          }
        },
        (err) => { },
      );
    }
  }
  onSIValueChange (args) {
    if (args.key === 'e' || args.key === '+' || args.key === '-') {
      return false;
    } else {
      return true;
    }
  }
  onChangeSumInsuredStart(rowData){
    if (rowData.SumInsuredStart) {
      rowData.SumInsuredStart = rowData.SumInsuredStart.replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    if (rowData.SumInsuredEnd) {
      rowData.SumInsuredEnd = rowData.SumInsuredEnd.replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
  showReferral(rowData){
    let urlLink = `${this.ApiUrl1}api/getallconstanttabledetails`;
    this.referralproductId=rowData.ProductId;
    let ReqObj= {
        "InsuranceId": this.insuranceId,
        "ProductId": rowData.ProductId
        
    }
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
         
          this.referralData = data.Result;
          console.log('RRRRRRRRRRRRR',this.referralData);
        } 
      },
      (err) => { },
    );
    this.selectedRowData = rowData;
    
    this.productSection = false;
    this.referralSection = true;
    this.endorseSection = false;
  }
  showEndorsement(row){
    this.productSection = false;
    this.referralSection = false;
    this.endorseSection = true;
    this.categoryId="";
    this.productIds=row.ProductId;
 
    if(this.productIds){
      this.categoryList = [
        {"Code":"1","CodeDesc":"Non-Financial"},
        {"Code":"2","CodeDesc":"Financial"}
      ]
    }
  }


  
  onCheckEndorseSelect(rowData){
    if(this.productList.length!=0){
        let entry = this.productList.find(ele=>ele.ProductId==this.productIds)
        if(entry){
            let endorsements = entry?.EndorsementIds[0]?.split(',');
            return endorsements.some(ele=>ele==rowData.EndtTypeId);
        }
    }
  }

  onCheckProductSelect(rowData){
    let i=0
    if(this.productList.length!=0){
        let entry = this.productList.find(ele=>ele.IsOptedYn == "Y");
        console.log('KKKKKKKKKK',entry)
        if(entry){
          let endorsements = entry?.ProductId?.split(',');
         
           return endorsements.some(ele=>ele.IsOptedYn =='Y');
        }
            //let endorsements = entry?.ReferralIds[0]?.split(',');
            //return endorsements.some(ele=>ele==rowData.IsOptedYn.value=='Y');
        
    }
  }


  onCheckReferalSelect(rowData){
    if(this.productList.length!=0){
        let entry = this.productList.find(ele=>ele.ProductId==this.referralproductId)
        if(entry){
            let endorsements = entry?.ReferralIds[0]?.split(',');
            return endorsements.some(ele=>ele==rowData.ItemId);
        }
    }
  }




  
  /*onSelectProduct(rowData,event){ 
    let Endrosement; let endorsements 
    if(this.productList.length!=0){
        let entry = this.productList.find(ele=>ele.IsOptedYn== "Y")
        if(entry){
            endorsements = entry?.ProductId?.split(',');
            Endrosement=endorsements.some(ele=>ele.IsOptedYn=="Y");
        }
    }
    console.log('llllllllllllll',endorsements);
    console.log('hhhhhhhhhhhh',event);
    let type:any;let list:any
    if(event==true){
        if(endorsements.length!=0){
            let exist = endorsements.some(ele=>ele == "Y");
            if(!exist){
                let entry = this.productList.find(ele=>ele.IsOptedYn== "Y")
                if(entry){
                  if(entry.ReferralIds[0]==''){
                    entry.ReferralIds[0]=rowData.ItemId
                  }
                 
                  //entry.ReferralIds[0]=rowData.ItemId;
                   entry.ReferralIds[0] = entry.ReferralIds[0]+','+rowData.ItemId;
               
                }
            }
        }
    }
    else{
        if(endorsements.length!=0){
            let exist = endorsements.some(ele=>ele == rowData.ItemId);
            if(exist){
                endorsements.splice(endorsements.findIndex(ele=>ele == rowData.ItemId),1);
                let i=0,finalString = ''
                if(endorsements.length!=0){
                    for(let endorse of endorsements){
                        if(finalString=='') finalString = endorse;
                        else finalString = finalString+','+endorse;
                        i+=1;
                        if(i==endorsements.length){
                            let entry = this.productList.find(ele=>ele.ProductId== this.referralproductId)
                            entry.ReferralIds[0] = finalString;
                        }
                    }
                }
                
            }
        }
    }
    console.log("Final Product List",this.productList)
            
  }*/



  onSelectrefferal(rowData,event){ 
    let Endrosement; let endorsements 
    if(this.productList.length!=0){
        let entry = this.productList.find(ele=>ele.ProductId==this.referralproductId)
        if(entry?.ReferralIds[0]){
          endorsements = entry?.ReferralIds[0];
        }
        else if(entry){
            endorsements = entry?.ReferralIds[0]?.split(',');
            Endrosement=endorsements.some(ele=>ele==rowData.ItemId);
        }
    }
    console.log('llllllllllllll',endorsements);
    console.log('hhhhhhhhhhhh',event);
    let type:any;let list:any
    if(event==true){
        if(endorsements.length!=0){
            let exist = endorsements.some(ele=>ele == rowData.ItemId);
            if(!exist){
                let entry = this.productList.find(ele=>ele.ProductId== this.referralproductId)
                if(entry){
                  /*if(entry.ReferralIds[0]==''){
                    entry.ReferralIds[0]=rowData.ItemId
                  }*/
                 
                  //entry.ReferralIds[0]=rowData.ItemId;
                   entry.ReferralIds[0] = entry.ReferralIds[0]+','+rowData.ItemId;
               
                }
            }
        }
    }
    else{
        if(endorsements.length!=0){
            let exist = endorsements.some(ele=>ele == rowData.ItemId);
            if(exist){
                endorsements.splice(endorsements.findIndex(ele=>ele == rowData.ItemId),1);
                let i=0,finalString = ''
                if(endorsements.length!=0){
                    for(let endorse of endorsements){
                        if(finalString=='') finalString = endorse;
                        else finalString = finalString+','+endorse;
                        i+=1;
                        if(i==endorsements.length){
                            let entry = this.productList.find(ele=>ele.ProductId== this.referralproductId)
                            entry.ReferralIds[0] = finalString;
                        }
                    }
                }
                
            }
        }
    }
    console.log("Final Product List",this.productList)
            
  }


   
onSelectendorse(rowData,event){ 
    let Endrosement; let endorsements 
   let i=0;
    if(this.productList.length!=0){
        let entry = this.productList.find(ele=>ele.ProductId==this.productIds)
        if(entry){
               if(entry?.EndorsementIds[i]==0){
                endorsements = entry?.EndorsementIds[0];
               }
               else if(entry?.EndorsementIds[i]!=0){
            endorsements = entry?.EndorsementIds[0]?.split(',');
               }
            Endrosement=endorsements.some(ele=>ele==rowData.EndtTypeId);
            i+=1;
        }
    }
    console.log('llllllllllllll',rowData);
    console.log('hhhhhhhhhhhh',event);
    let type:any;let list:any
    if(event==true){
        if(endorsements.length!=0){
            let exist = endorsements.some(ele=>ele == rowData.EndtTypeId);
            if(!exist){
                let entry = this.productList.find(ele=>ele.ProductId== this.productIds)
                if(entry){
                   entry.EndorsementIds[0] = entry.EndorsementIds[0]+','+rowData.EndtTypeId
                }
            }
        }
    }
    else{
        if(endorsements.length!=0){
            let exist = endorsements.some(ele=>ele == rowData.EndtTypeId);
            if(exist){
                endorsements.splice(endorsements.findIndex(ele=>ele == rowData.EndtTypeId),1);
                let i=0,finalString = ''
                if(endorsements.length!=0){
                    for(let endorse of endorsements){
                        if(finalString=='') finalString = endorse;
                        else finalString = finalString+','+endorse;
                        i+=1;
                        if(i==endorsements.length){
                            let entry = this.productList.find(ele=>ele.ProductId== this.productIds)
                            entry.EndorsementIds[0] = finalString;
                        }
                    }
                }
                
            }
        }
    }
    console.log("Final Product List",this.productList)
            
  }

  getEndorsementList(){
    let s=sessionStorage.getItem('userproduct')
    let ReqObj={
      "CompanyId":this.insuranceId,
      "EndtTypeCategoryId": this.categoryId,
      "ProductId": this.productIds,
      //"LoginId":this.issuerLoginId
    }
    let urlLink = `${this.CommonApiUrl}master/getallendorsement`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        let res:any = data;

        console.log('rrrrrr',res)
        if(res){
       console.log('dddddddddd',res?.Result.EndorsementMasterListRes)
        if(res?.Result[0].EndorsementMasterListRes){
            this.endorseData = res?.Result[0]?.EndorsementMasterListRes;
          console.log('eeeeeeee',this.endorseData)

          if(this.categoryId!=undefined && this.categoryId!=null){
            let docObj = {"ItemType":this.categoryId};
            sessionStorage.setItem('addDocDetailsObj',JSON.stringify(docObj));
          }
        }
    }
      },
      (err) => { },
    );
  }
  onProceed(){
   console.log('MMMMMMMMMM',this.productList);
   this.onProceedendorse();
   /*if(rowData.Checked == true){
    rowData[event].IsOptedYn ='Y'
   }
   else if(rowData.Checked == false){
    rowData[event].IsOptedYn ='N'
   }*/
  }

  /*onproceedreferral(){
    console.log('kkkkkkkkkkkk',this.productList)
    if (this.productList.length != 0){
        let reqList=[];let i=0;
        for(let s of this.productList){
          let sumInsured; let startsuminsured;
          console.log('HHHHHHHHHHHHHHHH',s.SumInsuredEnd);
          if(s.SumInsuredEnd == undefined || s.SumInsuredEnd == null)sumInsured = null;
         if(s?.SumInsuredEnd.includes(',')){ 
            sumInsured = s.SumInsuredEnd.replace(/,/g, '');
            console.log('MMMMMMMMMMMM',sumInsured);
           }
          //else {sumInsured = s.SuminsuredEnd;}

          if(s.SumInsuredStart==undefined || s.SumInsuredStart==null) {startsuminsured = null;}
          else if(s.SumInsuredStart.includes(',')){  startsuminsured= s.SumInsuredStart.replace(/,/g, '') }
          else {startsuminsured= s.SumInsuredStart;}

            let data = {
                    "ProductId": s.ProductId,
                      "ReferralIds":s.ReferralIds,
                      "EndorsementIds":s.EndorsementIds,
                      "SuminsuredEnd":sumInsured,
                      "SuminsuredStart":startsuminsured
                }
                reqList.push(data)
               i+=1; 
               if(i==this.productList.length){
                this.onsubmit(reqList);
              }
            }
        }
  }*/

  getTableList(){
    let urlLink = `${this.ApiUrl1}dropdown/tablename`;
    this.sharedService.onGetMethodSync(urlLink).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          this.tableList = data.Result;
        }
      },
      (err) => { },
    );

  }
  onTableChange(rowData){
    if(rowData!= null && rowData!= ''){
      let ReqObj = {"TableName": rowData}
      let urlLink = `${this.ApiUrl1}dropdown/gettabledetails`;
      this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
            this.columnList = data.Result;
          }
        },
        (err) => { },
      );
    }
  }

  onProceedendorse(){
    console.log('kkkkkkkkkkkk',this.productList)
    if (this.productList.length != 0){
        let reqList=[];let i=0;
        for(let s of this.productList){
          let sumInsured; let startsuminsured;
          console.log('HHHHHHHHHHHHHHHH',s.SumInsuredEnd);
          if(s.SumInsuredEnd == undefined || s.SumInsuredEnd == null)sumInsured = null;
         if(s?.SumInsuredEnd.includes(',')){ 
            sumInsured = s.SumInsuredEnd.replace(/,/g, '');
            console.log('MMMMMMMMMMMM',sumInsured);
           }
          //else {sumInsured = s.SuminsuredEnd;}

          if(s.SumInsuredStart==undefined || s.SumInsuredStart==null) {startsuminsured = null;}
          else if(s.SumInsuredStart.includes(',')){  startsuminsured= s.SumInsuredStart.replace(/,/g, '') }
          else {startsuminsured= s.SumInsuredStart;}
             if(s.Checked==true){
              console.log('FFFFFFFFFFFFFFFF',s.Checked);
            let data = {
                    "ProductId": s.ProductId,
                      "ReferralIds":s.ReferralIds,
                      "EndorsementIds":s.EndorsementIds,
                      "SuminsuredEnd":sumInsured,
                      "SuminsuredStart":startsuminsured,
                       "ColumnName" :s.ColumnName               
                      }
                reqList.push(data)
              }
               i+=1; 
               if(i==this.productList.length){
                this.onsubmit(reqList);
              }
            }
        }
  }

  onsubmit(reqList){
    let ReqObj = {
       "LoginId":this.issuerLoginId,
       "InsuranceId":this.insuranceId,
       "CreatedBy":this.loginId,
        "IssuerProduct":reqList
      }
    let urlLink = `${this.CommonApiUrl}admin/attachissuerproducts`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
            console.log(data);
            let res:any=data;
            if(data.Result){
              this.productSection=true;
              this.referralSection = false;
              this.endorseSection = false;
              this.getProductList();
              this.router.navigate(['/Admin/issuerList/issuerMenuCongifuration']);
              
              //.referralSection = false;
           //this.router.navigate(['/Admin/userList/UserproductList']);
            }
           
          },
          (err) => { },
        );
  
  }
}
