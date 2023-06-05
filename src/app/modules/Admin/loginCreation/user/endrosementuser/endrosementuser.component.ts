import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/shared.service';
import * as Mydatas from '../../../../../app-config.json';
@Component({
  selector: 'app-endrosementuser',
  templateUrl: './endrosementuser.component.html',
  styleUrls: ['./endrosementuser.component.scss']
})
export class EndrosementUserComponent {

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
    userLoginId: string;
    productDetails:any[]=[];
    constructor(private router:Router,private sharedService:SharedService,) {
      let userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
      console.log('MMMMMMMMMMMMMMMMMM',userDetails);
      if(userDetails){
        this.loginId = userDetails?.Result?.LoginId;
        this.productId= userDetails?.Result?.BrokerCompanyProducts[0].ProductId;

      }
      //let issuerId = sessionStorage.getItem('editIssuerLoginId');
      let issuerDetails = JSON.parse(sessionStorage.getItem('issuerTypeDetails'));
           
           this.productId= sessionStorage.getItem('userproduct');
          this.userLoginId = sessionStorage.getItem('loginUser');
          this.insuranceId = sessionStorage.getItem('productuser')
      if(this.insuranceId){
        this.getProductList();
      }
    }

    ngOnInit(): void {

        this.categoryList = [
          {"Code":"1","CodeDesc":"Non-Financial"},
          {"Code":"2","CodeDesc":"Financial"}
        ]
    }
  
     getProductList(){
        if(this.insuranceId!='' && this.insuranceId!= undefined){
          let urlLink = `${this.CommonApiUrl}admin/getissuerproductbyid`;
          let ReqObj ={
            "LoginId": this.userLoginId,
            "InsuranceId": this.insuranceId,
            "UserType": 'User'
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
            let entry = this.productDetails.find(ele=>ele.ProductId==sessionStorage.getItem('userproduct'))
            if(entry){
                let endorsements = entry?.EndorsementIds[0]?.split(',');
                return endorsements.some(ele=>ele==rowData?.EndtTypeId);
            }
        }
      }

       
    onSelectProduct(rowData,event){ 
        let Endrosement; let endorsements;
     
        if(this.productDetails.length!=0){
            let entry = this.productDetails.find(ele=>ele.ProductId==sessionStorage.getItem('userproduct'))
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
                    let entry = this.productDetails.find(ele=>ele.ProductId==sessionStorage.getItem('userproduct'))
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
                                let entry = this.productDetails.find(ele=>ele.ProductId==sessionStorage.getItem('userproduct'))
                                entry.EndorsementIds[0] = finalString;
                            }
                        }
                    }
                    
                }
            }
        }
        console.log("Final Product List",this.productDetails)
                
      }
    

      back(){
        sessionStorage.removeItem('userproduct');
        this.router.navigate(['Admin/userList/UserproductList']);
      }

      getEndorsementList(){
        this.endorseData=[];
        let s=sessionStorage.getItem('userproduct')
        let ReqObj={
          "CompanyId":this.insuranceId,
          "EndtTypeCategoryId": this.categoryId,
          "ProductId": s,
          "LoginId":this.userLoginId
        }
        let urlLink = `${this.CommonApiUrl}master/getallbrokerendorsement`;
        this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
          (data: any) => {
            console.log(data);
            let res:any = data; let i=0;let endrose=[]; 
    
            console.log('rrrrrr',res?.Result)
            if(res){
           console.log('dddddddddd',res?.Result.EndorsementMasterListRes)
              
           let endorseData=res?.Result;
           console.log('TTTTTTTTTTTTTTTT',this.endorseData)
            if(endorseData.length!=0){  
              let endroses=[]; 
                //endorseData = res?.Result.EndorsementMasterListRes;
                for(let v of endorseData){
                  endrose=v.EndorsementMasterListRes[0]; 
                  if(endrose!=null){
                  console.log('GGGGGGGGGGGGGG',i);  
                  endroses.push(endrose);
                  i+=1; 
                  }
                     
                  if(i==endorseData?.length){
                   this.endorseData=endroses;
                   console.log('TTTTTTTTTTTTTTTT',this.endorseData)
                  }
                }
                //console.log('TTTTTTTTTTTTTTTT',this.endorseData)
               
    
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
           "LoginId":this.userLoginId,
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
               this.router.navigate(['/Admin/userList/UserproductList']);
                }
               
              },
              (err) => { },
            );
      
      }
}
