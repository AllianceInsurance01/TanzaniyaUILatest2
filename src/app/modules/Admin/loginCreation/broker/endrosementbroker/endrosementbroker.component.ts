import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../../../shared/shared.service';
import * as Mydatas from '../../../../../app-config.json';
import { endrosement } from '../../Company/EndrosementField/endrosementfield-details/endrosement.Model';
@Component({
  selector: 'app-endrosementbroker',
  templateUrl: './endrosementbroker.component.html',
  styleUrls: ['./endrosementbroker.component.scss']
})
export class EndrosementBrokerComponent {
    productList:any[]=[];endorsementData:any[]=[];categoryList:any[]=[];
    loginId:any;issuerType:any;issuerLoginId:any;endorsementHeader:any;
    issuerId:any;insuranceId:any;referralHeader:any[]=[];referralData:any[]=[];
    categoryId: any;endorseData:any[]=[];
    public AppConfig: any = (Mydatas as any).default;countryList:any[]=[];
    public ApiUrl1: any = this.AppConfig.ApiUrl1;public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
    productHeader: any[]=[]; p: Number = 1;productSection:boolean = true;referralSection = false;
    endorseSection = false;selectedRowData:any;
    productId: any;
    columnHeader:any[]=[];
    insurance: string;
    effectivevalue: any;
    productDetails: any[]=[];
    selectedEndrosementId:any[]=[];
    constructor(private router:Router,private sharedService:SharedService,) {
      let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      console.log('MMMMMMMMMMMMMMMMMM',userDetails);
      if(userDetails){
        this.loginId = userDetails?.Result?.LoginId;
        //this.productId= userDetails?.Result?.BrokerCompanyProducts[0].ProductId;

      }
      let issuerId = sessionStorage.getItem('editIssuerLoginId');
      let issuerDetails = JSON.parse(sessionStorage.getItem('issuerTypeDetails'));
      console.log('kkkkkkkkkkkkkkkkkkk',issuerDetails)

      this.insurance=sessionStorage.getItem('productbroker');
      this.issuerId=sessionStorage.getItem('loginbroker');
      /*if(issuerDetails!=undefined && issuerDetails!=null){
          this.issuerType = issuerDetails?.issuerType;
          this.issuerLoginId = issuerDetails?.loginId;
          this.insuranceId = issuerDetails?.InsuranceId;
      }*/
      /*if(issuerId){
        this.issuerId = issuerId;
      }*/
      if(this.insurance){
        this.getProductList();
      }
    }

    ngOnInit(): void {

        this.categoryList = [
          {"Code":"1","CodeDesc":"Non-Financial"}
        ]
        this.categoryId = "1";
        this.getEndorsementList();
    }
    
    onSelectProduct(rowData,event){
    
        let Endrosement; let endorsements 
        if(this.productDetails.length!=0){
            let entry = this.productDetails.find(ele=>ele.ProductId==sessionStorage.getItem('brokerproduct'))
            if(entry){
                endorsements = entry?.EndorsementIds[0]?.split(',');
                Endrosement=endorsements.some(ele=>ele==rowData.EndtTypeId);
            }
        }
        console.log('llllllllllllll',rowData);
        console.log('hhhhhhhhhhhh',event);
        let type:any;let list:any
        if(event==true){
            if(endorsements.length!=0){
                let exist = endorsements.some(ele=>ele == rowData.EndtTypeId);
                if(!exist){
                    let entry = this.productDetails.find(ele=>ele.ProductId==sessionStorage.getItem('brokerproduct'))
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
                                let entry = this.productDetails.find(ele=>ele.ProductId==sessionStorage.getItem('brokerproduct'))
                                entry.EndorsementIds[0] = finalString;
                            }
                        }
                    }
                    
                }
            }
        }
        console.log("Final Product List",this.productDetails)
            /*else if(event.checked==false){
              let index = this.selectedMenuList.findIndex(ele=>ele==rowData);
              this.selectedMenuList.splice(index,1);
              console.log('sssssssss',this.selectedMenuList)
            }  */      
      }
    
     getProductList(){
        if(this.insurance!='' && this.insurance!= undefined){
          let urlLink = `${this.CommonApiUrl}admin/getissuerproductbyid`;
          let ReqObj ={
            "LoginId": this.issuerId,
            "InsuranceId": this.insurance,
            "UserType": 'Broker'
          }
          this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
            (data: any) => {
              console.log('KKKKKKKKKKK',data);
              if(data.Result){
                  this.productDetails = data.Result;
              }
            },
            (err) => { },
          );
        }
      }
      onCheckEndorseSelect(rowData){
        if(this.productDetails.length!=0){
            let entry = this.productDetails.find(ele=>ele.ProductId==sessionStorage.getItem('brokerproduct'))
            if(entry){
                let endorsements = entry?.EndorsementIds[0]?.split(',');
                return endorsements.some(ele=>ele==rowData.EndtTypeId);
            }
        }
      }
      back(){
        sessionStorage.removeItem('brokerproduct');
        this.router.navigate(['Admin/brokersList/newBrokerDetails/brokerProductList']);
      }

      getEndorsementList(){
        let s=sessionStorage.getItem('brokerproduct');
        //let i=0;
        //let insurance=sessionStorage.getItem('productbroker');
        let ReqObj={
          "CompanyId":this.insurance,
          "EndtTypeCategoryId": this.categoryId,
          "ProductId": s
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
                /*let i=0
                for(let s of this.endorseData){
                  this.endorseData[i].EffectiveDateStart=this.onDateFormatInEdit(s.EffectiveDateStart)
                    i++;
                }*/
              
                /*endorseData = endorseData.map(x => ({
                    isChecked: false,
                    ...x
                  }));
                  console.log('mmmmmmmmmmmmmmmmmmmm',endorseData)
                       

                  if(endorseData.length!=0){
                    let i=0,products = [];
                  for(let product of this.productList){
                    for(let endrose of endorseData){
                        console.log('RRRRRRRRRRRR',product.ProductId)
                    if(endrose.EndtFeeYn=='Y'){
                        endrose['isChecked']= true;
                    }
                    else endrose['isChecked'] = false;
                  }
                  products.push(endorseData);
                  i+=1;
                  if(i==endorseData.length){
                    this.endorseData= endorseData;
                  this.columnHeader = [
                    {
                        key: 'EndtTypeId',
                        display: 'Select',
                        config: {
                          isChecked: true,
                          model:'isChecked'
                        },
                      },
                    { key: 'EndtType', display: 'Endt Type' },
                    { key: 'EndtTypeDesc', display: 'Endt TypeDesc' },
                    { key: 'CoreAppCode', display: 'Core AppCode' },
                    { key: 'RegulatoryCode', display: 'Regulatory Code' },
              
                  { key: 'EffectiveDateStart', display: 'EffectiveDate Start' },     
                   { key: 'Status', display: 'Status' },
                   { key: 'Remarks', display: 'Remarks' },
                  ];
                }
        
                }
            }*/
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
        console.log('kkkkkkkkkkkk',this.productDetails)
        if (this.productDetails.length != 0){
            let reqList=[];let i=0;
            for(let s of this.productDetails){
                let data = {
                        "ProductId": s.ProductId,
                          "ReferralIds":s.ReferralIds,
                          "EndorsementIds":s.EndorsementIds,
                          "SuminsuredEnd":s.SumInsuredEnd,
                          "SuminsuredStart":s.SumInsuredStart
                    }
                    reqList.push(data)
                   i+=1; 
                   if(i==this.productDetails.length){
                    this.onsubmit(reqList);
                  }
                }
            }
      }
      onsubmit(reqList){
        let ReqObj = {
           "LoginId":this.issuerId,
           "InsuranceId":this.insurance,
           "CreatedBy":this.loginId,
            "IssuerProduct":reqList
          }
        let urlLink = `${this.CommonApiUrl}admin/attachissuerproducts`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
            (data: any) => {
                console.log(data);
                let res:any=data;
                if(data.Result){
               this.router.navigate(['/Admin/brokersList/newBrokerDetails/brokerProductList']);
                }
               
              },
              (err) => { },
            );
      
      }
      onDateFormatInEdit(date) {
        console.log(date);
        if (date) {
          let format = date.split('-');
          if(format.length >1){
            var NewDate = new Date(new Date(format[0], format[1], format[2]));
            NewDate.setMonth(NewDate.getMonth() - 1);
            return NewDate;
          }
          else{
            format = date.split('/');
            if(format.length >1){
              //var NewDate = new Date(new Date(format[2], format[1], format[0]));
              //NewDate.setMonth(NewDate.getMonth() - 1);
              let NewDate = format[2]+'-'+format[1]+'-'+format[0];
              return NewDate;
            }
          }
    
        }
      }
}