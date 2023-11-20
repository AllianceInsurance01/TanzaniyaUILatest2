import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../../../../../shared/shared.service';
import { UpdateCustomerDetailsComponent } from '../../update-customer-details.component';
import { DatePipe } from '@angular/common';
import * as Mydatas from '../../../../../app-config.json';
import { CookieService } from 'ngx-cookie-service';
import { ViewDocumnetDetailsComponent } from 'src/app/shared/view-documnet-details/view-documnet-details.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-make-payement',
  templateUrl: './make-payement.component.html',
  styleUrls: ['./make-payement.component.css']
})
export class MakePayementComponent implements OnInit {
  
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  public motorApiUrl:any = this.AppConfig.MotorApiUrl;
  activeMenu:any;
  Menu:any;micrNo:any;
  first:boolean=false;Fifth:boolean=false;
  second:boolean=false;Fourth:boolean=false;
  Third: boolean;currencyCode:any;
  seven:boolean;
  minDate: Date;
  customerDetails: any;
  vehicleDetails: any;
  requestReferenceNo: string;
  userDetails: any;
  loginId: any;
  userType: any;
  agencyCode: any;
  brokerbranchCode: any;
  branchCode: any;
  branchList: any;
  productId: any;
  insuranceId: any;
  subuserType: string;
  paymentTypeList: any[]=[];
  selectedvalues:boolean=false;
  title: any;
  clientName: any;
  dateOfBirth: any;
  emailId: any;
  mobileNo: any;quoteNo:any;
  idNumber: any;quoteRefNo:any;
  vehicleList: any[]=[];totalPremium:any;chequeDate:any;
  policySection: boolean = false;yearlySection=false;nineMonthSection:boolean=false;
  sixMonthSection:boolean = false;threeMonthSection:boolean = false;endorsementId:any;
  fiveMonthSection:boolean = false;eightMonthSection:boolean = false;
  policyNo: any;EmiYn:any="N";emiPeriod:any=null;emiMonth=null;endorsementSection:boolean = false;
  customerType: string;Emilist1:any[]=[];emiSection:boolean = false;
  endorsePolicyNo: string;cancelEndorse:boolean =false;
  IsChargeOrRefund: any;bankList:any[]=[];bankName:any='';
  chequeNo: null;payeeName:any=null;
  orgPolicyNo: string;
  endorseCategory: any;
  endorsementName: any;
  enableFieldsList: any;
  endtPremium: any;
  accNo: any;
  iBanNo: any;
  paymentDetails: any;
  payAmount: any=null;
  Sixth: boolean=false;
  successSection: boolean;
  tinyUrlInfo: boolean;
  productName: any;
  redirectUrl: string;
  stickerNo: any;
  CoverNoteNo: any;
  quoteLoginId: any;
  quoteSubUsertype: any;
  quoteUsertype: any;
  quoteBranchCode: any;
  loginType: any;
  imageUrl: any;
  uploadDocList: any[]=[];
  uploadSection: boolean=false;
  commonDocTypeList: any[]=[];
  chequeSection: boolean;
  uploadedDocList: any[]=[];totallistselected:any[]=[];
  DueAmount: any;
  quoteDetails: any;
  loadingSection: boolean=false;
  constructor(private router:Router,public dialogService: MatDialog,private sharedService: SharedService,private cookieService: CookieService,
    private updateComponent:UpdateCustomerDetailsComponent,private route:ActivatedRoute,
   private datePipe:DatePipe) {
    this.minDate = new Date();
    sessionStorage.removeItem('buyPolicyDetails');
    this.customerDetails = JSON.parse(sessionStorage.getItem('customerDetails'));
    this.vehicleDetails = JSON.parse(sessionStorage.getItem('vehicleDetails'));
    let quoteRefNo = sessionStorage.getItem('quoteReferenceNo');
    if(quoteRefNo) this.requestReferenceNo = quoteRefNo;
    this.quoteNo = sessionStorage.getItem('quoteNo');
    this.updateComponent.quoteNo = this.quoteNo;
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.loginId = this.userDetails.Result.LoginId;
    this.userType = this.userDetails?.Result?.UserType;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.branchList = this.userDetails.Result.LoginBranchDetails;
    this.productId = this.userDetails.Result.ProductId;
    this.productName = this.userDetails.Result.ProductName
    this.subuserType = sessionStorage.getItem('typeValue');
    this.insuranceId = this.userDetails.Result.InsuranceId;
    this.loginType = this.userDetails.Result.LoginType;
    this.redirectUrl = "aHR0cHM6Ly90ei5zZWxjb20ub25saW5lL3BheW1lbnRndy9jaGVja291dC9XbXRLVmpWbVVGWmtWRTFTY2xGWlVIbEpWR1ZFYTFWbFlqQmFkWHBEWmtJelpFOXdlR1JSTUhZNGQwTjBZa2hZVTFFMVJVNXZTbmwwYWs1cGNHd3dhV3BrYWxZMGFGVkdZbUpWUFE9PS8=";
    this.decodeUrl();
      
    let endorseObj = JSON.parse(sessionStorage.getItem('endorseTypeId'))
      if(endorseObj){
        this.endorsementSection = true;
        
        this.endorseCategory = endorseObj.Category;
        this.endorsementName = endorseObj?.EndtName;
        this.endorsePolicyNo = endorseObj.PolicyNo;
        this.enableFieldsList = endorseObj.FieldsAllowed;
        this.endorsementId = endorseObj.EndtTypeId;
        this.endorsePolicyNo = endorseObj.PolicyNo;
        if(this.endorsementId==42 || this.endorsementId==842) this.cancelEndorse = true;
        else this.cancelEndorse = false;
        
      }
      else{
        this.endorsementSection = false;
      }
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params: any) => {
      console.log("Params",params.params)
      let quoteNo = params?.params?.QuoteNo;
      let type = params?.params?.type;
      if(quoteNo){
        this.quoteNo = quoteNo;
        this.updateComponent.quoteNo = this.quoteNo;
        console.log('NNNNNNNNNNNNNN')
        // if(type!='cancel') this.successSection = true;
      }
    })
    if(this.customerDetails){
      this.title = this.customerDetails?.TitleDesc;
      this.clientName = this.customerDetails?.ClientName;
      this.dateOfBirth = this.customerDetails?.DobOrRegDate;
      this.emailId = this.customerDetails?.Email1;
      this.mobileNo = this.customerDetails?.MobileNo1;
      this.idNumber = this.customerDetails?.IdNumber;
      if(this.customerDetails.PolicyHolderType=='1'){this.customerType="Individual";}
      else if(this.customerDetails.PolicyHolderType=='2'){this.customerType="Corporate";}
    }
    this.getEditQuoteDetails();
  }
  decodeUrl(){
    console.log(atob(this.redirectUrl))
  }
  onB2CRedirect(){
    sessionStorage.clear();
    this.cookieService.delete('XSRF-TOKEN',"/","domain name",true,"None")
    this.router.navigate(['/b2clogin'])
  }
  onEnableUploadSection(){
    this.uploadDocList = [];
    this.uploadSection = true;
  }
  onUploadDocuments(target:any,fileType:any,type:any,uploadType:any){
    console.log("Event ",target);
    let event:any=null;
    if(uploadType=='drag') event = target
    else event = target.target.files;
    let fileList = event;
    for (let index = 0; index < fileList.length; index++) {
      const element = fileList[index];
      var reader:any = new FileReader();
      reader.readAsDataURL(element);
        var filename = element.name;

        let imageUrl: any;
        reader.onload = (res: { target: { result: any; }; }) => {
          imageUrl = res.target.result;
          this.imageUrl = imageUrl;
          this.uploadDocList.push({ 'url': element,'DocTypeId':'23','filename':element.name, 'JsonString': {} });
          this.onFileUploadCommonList();
        }

    }
    console.log("Final File List",this.uploadDocList)
  }
  onFileUploadCommonList(){

    let docList = this.uploadDocList;
    if(docList.length!=0){
      let i=0;
      for(let doc of docList){
        let ReqObj={
          "QuoteNo":this.quoteNo,
          "Id":"99999",
          "IdType":"Common" ,
          "SectionId":"99999" ,
          "InsuranceId": this.insuranceId,
          "DocumentId":doc.DocTypeId,
          "RiskId":"99999",
          "LocationId":"99999",
          "LocationName":"Common" ,
          "ProductId":this.productId,
          "FileName":doc.filename,
          "OriginalFileName":doc.filename,
          "UploadedBy":this.loginId
        }
        // if(this.endorsementSection && this.enableDocumentDetails){
        //   ReqObj['EndtStatus'] = this.quoteDetails?.EndtStatus;
        //   ReqObj['EndorsementTypeDesc'] = this.quoteDetails?.EndtTypeDesc;
        //   ReqObj['EndorsementType'] = this.quoteDetails?.EndtTypeId;
        //   ReqObj['EndtCategoryDesc'] = this.quoteDetails?.Endtcategdesc;
        //   ReqObj['EndtCount'] = this.quoteDetails?.Endtcount;
        //   ReqObj['EndtPrevPolicyNo'] = this.quoteDetails?.Endtprevpolicyno;
        //   ReqObj['EndtPrevQuoteNo'] = this.quoteDetails?.Endtprevquoteno;
        // }
        let urlLink = `${this.CommonApiUrl}document/upload`;
        this.sharedService.onPostDocumentMethodSync(urlLink, ReqObj,doc.url).subscribe(
          (data: any) => {
            if(data.ErrorMessage){
              for(let entry of data.ErrorMessage){
                // let type: NbComponentStatus = 'danger';
                // const config = {
                //   status: type,
                //   destroyByClick: true,
                //   duration: 4000,
                //   hasIcon: true,
                //   position: NbGlobalPhysicalPosition.TOP_RIGHT,
                //   preventDuplicates: false,
                // };
                // this.toastrService.show(
                //   entry.Field,
                //   entry.Message,
                //   config);
              }
            }
            else if(data?.Result){
                i+=1;
                if(i==docList.length){
                  this.uploadDocList = [];
                  this.uploadSection = false;
                  this.getUploadedDocList(null,-1);
                }
              }
            },
            (err) => { },
          );
      }
    }
  }
  getUploadedDocList(vehicleData:any,index:any){
    let ReqObj = {
      "QuoteNo":  this.quoteNo
    }
    let urlLink = `${this.CommonApiUrl}document/getdoclist`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
          if(data?.Result){
            if(data?.Result?.CommmonDocument){
              this.uploadedDocList = data?.Result?.CommmonDocument.filter(ele=>ele.DocumentId=='23');
            }
            
          }
        },
        (err) => { },
      );
  }
  onViewCommonDocument(index)
  {
    let entry = this.uploadedDocList[index];
    let ReqObj = {
      "Id": entry.Id,
      "QuoteNo": this.quoteNo,
      "UniqueId": entry.UniqueId
  }
  let urlLink = `${this.CommonApiUrl}document/getcompressedimage`;
  this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
    (data:any) => {
      console.log(data);
      const dialogRef = this.dialogService.open(ViewDocumnetDetailsComponent,{
        data: {
          title: data.Result.OrginalFileName,
               imageUrl: data.Result.ImgUrl
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    },
    (err) => { },
  );
  }
  onDeleteCommonDocument(index){
    Swal.fire({
      title: '<strong>Delete!</strong>',
      icon: 'info',
      html:
        `<ul class="list-group errorlist">
         <li>Do You Want to Delete this Document?</li>
     </ul>`,
      showCloseButton: false,
      //focusConfirm: false,
      showCancelButton:true,
     //confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: 'YES',
     cancelButtonText: 'NO',
    }).then((result) => {
      if (result.isConfirmed) {
          this.onCommonDocumentDeleteProceed(index);
      }
    })
  }
  onCommonDocumentDeleteProceed(index){
    let ReqObj = {
      "Id": this.uploadedDocList[index].Id,
      "QuoteNo": this.quoteNo,
      "UniqueId": this.uploadedDocList[index].UniqueId
    }
    let urlLink = `${this.CommonApiUrl}document/delete`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
            if(data.ErrorMessage.length!=0){
              for(let entry of data.ErrorMessage){
                // let type: NbComponentStatus = 'danger';
                // const config = {
                //   status: type,
                //   destroyByClick: true,
                //   duration: 4000,
                //   hasIcon: true,
                //   position: NbGlobalPhysicalPosition.TOP_RIGHT,
                //   preventDuplicates: false,
                // };
                // this.toastrService.show(
                //   entry.Field,
                //   entry.Message,
                //   config);
              }
            }
            else if(data?.Result){
              // let type: NbComponentStatus = 'success';
              //   const config = {
              //     status: type,
              //     destroyByClick: true,
              //     duration: 4000,
              //     hasIcon: true,
              //     position: NbGlobalPhysicalPosition.TOP_RIGHT,
              //     preventDuplicates: false,
              //   };
              // this.toastrService.show(
              //   "Delete",
              //   "Document Deleted Successfully",
              //   config);
                this.getUploadedDocList(null,-1);
            }
          },
          (err) => { },
        );
  }
  onCommonDocumentDownload(index){
    let entry = this.uploadedDocList[index];
    let ReqObj = {
      "Id": entry.Id,
      "QuoteNo": this.quoteNo,
      "UniqueId": entry.UniqueId
    }
    let urlLink = `${this.CommonApiUrl}document/getoriginalimage`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        const link = document.createElement('a');
        link.setAttribute('target', '_blank');
        link.setAttribute('href', data?.Result?.ImgUrl);
        link.setAttribute('download', data?.Result?.OriginalFileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
    },
      (err) => { },
    );
  }
  onDeleteDocument(index:any) {
          this.uploadDocList.splice(index,1);
  }
  getEditQuoteDetails(){
    let ReqObj = {
      "QuoteNo":this.quoteNo
    }
    let urlLink = `${this.CommonApiUrl}quote/viewquotedetails`;
    // let ReqObj = {
    //   "ProductId": this.productId,
    //   "RequestReferenceNo": this.requestReferenceNo
    // }
    // let urlLink = `${this.CommonApiUrl}api/view/calc`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
          if(data?.Result){
            this.vehicleList = data?.Result?.ProductDetails;
            let quoteDetails = data?.Result?.QuoteDetails;
            this.quoteDetails = data?.Result?.QuoteDetails;
            this.orgPolicyNo = quoteDetails?.OriginalPolicyNo;
            this.endorsePolicyNo = quoteDetails?.policyNo;
            this.quoteLoginId = quoteDetails?.LoginId;
            this.quoteSubUsertype = quoteDetails?.SubUserType;
            this.quoteUsertype = quoteDetails?.UserType;
            this.quoteBranchCode = quoteDetails?.BrokerBranchCode;
            this.currencyCode = quoteDetails?.Currency;
            this.IsChargeOrRefund = quoteDetails?.IsChargeOrRefund;
            this.endtPremium = quoteDetails?.TotalEndtPremium;
            this.DueAmount=quoteDetails?.DueAmount;
            console.log("Total",this.totalPremium)
            if(this.loadingSection && this.quoteDetails?.policyNo!=null && this.quoteDetails?.policyNo!=''){
              this.paymentDetails = {
                "QuoteNo": this.quoteNo,
                "PolicyNo": this.quoteDetails?.policyNo,
                "MerchantReference": this.quoteDetails?.MerchantReference,
                "DebitNoteNo": this.quoteDetails?.DebitNoteNo,
                "CreditNoteNo": this.quoteDetails?.CreditNoteNo,
              };
              this.policyNo = data?.Result?.PolicyNo;
              this.policySection = true;
              this.successSection = false;
              this.updateTiraDetails();
            }
            else{
              this.checkStatus();
              this.getBankList();
              let paymentId = sessionStorage.getItem('quotePaymentId');
              let makepayment= sessionStorage.getItem('Makepaymentid');
              if(paymentId || makepayment =='Ids'){
                this.getPaymentTypeList();
              } 
            }
            
            
          }
      },
      (err) => { },
    );

  }
  checkStatus(){
    let ReqObj = {
      "InsuranceId": this.insuranceId
    }
    let urlLink = `${this.CommonApiUrl}selcom/v1/checkout/order-status/${this.quoteNo}`;
    
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.result=='FAIL'){
            if(this.quoteDetails.EmiYn!=null){
              this.EmiYn = this.quoteDetails.EmiYn;
              this.emiPeriod = this.quoteDetails.InstallmentPeriod;
              this.emiMonth = this.quoteDetails.InstallmentMonth;
              if(this.EmiYn=='Y') this.getCurrentEmiDetails();
            }
            else{
              this.EmiYn = "N";
              this.emiPeriod = null;
              this.emiMonth = null;
            }
            if(this.endorsementSection){
              this.totalPremium = this.quoteDetails?.TotalEndtPremium;
            }
            else {
              if(this.EmiYn !='Y'){
                this.totalPremium = this.quoteDetails?.OverallPremiumFc;
              }
              else{
                this.totalPremium = this.quoteDetails?.DueAmount;
              }   
            }
        }
        else{
          if(this.quoteDetails?.policyNo!=null && this.quoteDetails?.policyNo!='' && this.quoteDetails?.policyNo!=undefined){
            this.paymentDetails = {
              "QuoteNo": this.quoteNo,
              "PolicyNo": this.quoteDetails?.policyNo,
              "MerchantReference": this.quoteDetails?.MerchantReference,
              "DebitNoteNo": this.quoteDetails?.DebitNoteNo,
              "CreditNoteNo": this.quoteDetails?.CreditNoteNo,
            };
            this.policyNo = data?.Result?.PolicyNo;
            this.policySection = true;
            this.successSection = false;
            this.updateTiraDetails();
          }
          else{
            this.loadingSection = true;
            this.getEditQuoteDetails();
          }
        }
      });
  }
  onDebitdownload(rowData){
    console.log('KKKKKKKKKKK',rowData.QuoteNo);
    let urlLink = `${this.CommonApiUrl}pdf/taxInvoice?quoteNo=${rowData.QuoteNo}`

    this.sharedService.onGetMethodSync(urlLink).subscribe(
      (data: any) => {
        console.log(data);
        const link = document.createElement('a');
        link.setAttribute('target', '_blank');
        link.setAttribute('href', data?.Result.PdfOutFile);
        link.setAttribute('download','DebitPdf');
        document.body.appendChild(link);
        link.click();
        link.remove();
    },
      (err) => { },
    );
  }
  onCreditdownload(rowData){
    console.log('KKKKKKKKKKK',rowData.QuoteNo);
    let urlLink = `${this.CommonApiUrl}pdf/creditNote?quoteNo=${rowData.QuoteNo}`

    this.sharedService.onGetMethodSync(urlLink).subscribe(
      (data: any) => {
        console.log(data);
        const link = document.createElement('a');
        link.setAttribute('target', '_blank');
        link.setAttribute('href', data?.Result.PdfOutFile);
        link.setAttribute('download','Creditpdf');
        document.body.appendChild(link);
        link.click();
        link.remove();
    },
      (err) => { },
    );
  }
  onGetSchedule(rowData){
    let schedule:any;let ReqObj
    if(this.endorsementSection){
      ReqObj = {
        "QuoteNo":rowData.QuoteNo,
        "EndorsementType":"S"
      }
    }
    else{
      ReqObj = {
        "QuoteNo":rowData.QuoteNo,
      }
    }
    let urlLink = `${this.CommonApiUrl}pdf/policyform`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data?.Result?.PdfOutFile){
            this.downloadMyFile(data.Result.PdfOutFile);
        }
        else{
          Swal.fire({
            title: '<strong>Schedule Pdf</strong>',
            icon: 'error',
            html:
              `No Pdf Generated For this Policy`,
            //showCloseButton: true,
            //focusConfirm: false,
            showCancelButton: false,

            //confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancel',
          })
        }
      },
      (err) => { },
    );
  }

  onGetSchedules(rowData){
    let ReqObj = {
      "QuoteNo":rowData.QuoteNo,
      "EndorsementType":"E"
    }
    let urlLink = `${this.CommonApiUrl}pdf/policyform`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data?.Result?.PdfOutFile){
            this.downloadMyFile(data.Result.PdfOutFile);
        }
        else{
          Swal.fire({
            title: '<strong>Schedule Pdf</strong>',
            icon: 'error',
            html:
              `No Pdf Generated For this Policy`,
            showCancelButton: false,
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancel',
          })
        }
      },
      (err) => { },
    );
  }
  downloadMyFile(data) {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', data);
    link.setAttribute('download', 'Schedule');
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
  alphaNumberOnly (e) {  // Accept only alpha numerics, not special characters 
    var regex = new RegExp("^[a-zA-Z0-9 ]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }

    e.preventDefault();
    return false;
  }

  onPaste(e) {
    e.preventDefault();
    return false;
  }
  checkRefundMandatories(){
    return (this.IsChargeOrRefund=='REFUND' && this.bankName!=undefined && this.bankName!=null && this.bankName!='' && 
            this.accNo!=undefined && this.accNo!=null && this.accNo!='' &&
            this.iBanNo!=undefined && this.iBanNo!=null && this.iBanNo!='' && !this.policySection)
  }
  getBankList(){
    let branchCode = '';
    if((this.userType!='Broker' && this.userType!='User')){
      branchCode = this.branchCode
    }
    else{
      branchCode = this.brokerbranchCode
    }
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "BranchCode": branchCode
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/bankmaster`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.bankList = data.Result;
            if(this.orgPolicyNo!=undefined && this.endorsementSection && (this.endtPremium==null || this.endtPremium=='' || this.endtPremium==0 || this.endtPremium==undefined) && !this.cancelEndorse){
              this.updateEndorseStatus();
            }
        }

      },
      (err) => { },
    );
  }
  updateEndorseStatus(){
    let ReqObj = {
      "QuoteNo":this.quoteNo,
      "PolicyNo": this.orgPolicyNo,
      "ProductId": this.productId
    }
    let urlLink = `${this.CommonApiUrl}endorsment/changeEndtStatus`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
          if(data?.Result){
                this.IsChargeOrRefund = null;
                this.paymentDetails = {
                  "QuoteNo": this.quoteNo,
                  "PolicyNo": this.endorsePolicyNo
                }
                this.policySection = true;
                this.updateTiraDetails();
                
          }
      },
      (err) => { },
    );
  }
  getCurrentEmiDetails(){
    let ReqObj = {
         "QuoteNo": this.quoteNo,
         "InsuranceId": this.insuranceId,
         "ProductId": this.productId
         }
    let urlLink = `${this.CommonApiUrl}api/getemidetailsbyquoteno`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
          if(data?.Result){
              let emiList = data.Result;
              if(emiList.length!=0){
                    let i=0,yearlyList=[],nineList=[],sixList=[],threeList=[],fiveList=[],eightList=[];
                    if(emiList.length==13){
                      this.yearlySection = true;
                      yearlyList = emiList;
                    }
                    else if(emiList.length==10){
                      nineList = emiList;
                      this.nineMonthSection = true;
                    }
                    else if(emiList.length==7){
                      sixList = emiList;
                      this.sixMonthSection = true;
                    }
                    else if(emiList.length==4){
                      threeList = emiList;
                      this.threeMonthSection = true;
                    }
                    else if(emiList.length==6){
                      fiveList = emiList;
                      this.fiveMonthSection = true;
                    }
                    else if(emiList.length==9){
                      eightList = emiList;
                      this.eightMonthSection = true;
                    }
                    this.setEmiTableValues(yearlyList,nineList,sixList,threeList,fiveList,eightList);
                // this.Emilist1=data?.Result[0]?.EmiPremium
                // this.Emilist2=data?.Result[1]?.EmiPremium;
                // this.EmiDetails=data.Result[0].EmiDetails;
                // this.EmiDetails1=data.Result[1].EmiDetails;
                console.log('tttt',this.totalPremium);
              }
          }
        },
        (err) => { },
      );
  }
  setEmiTableValues(yearlyList,nineList,sixList,threeList,fiveList,eightList){
    if(this.yearlySection){
       let i=0;this.Emilist1=[];
       for(let entry of yearlyList){
            let data = entry;
            if(yearlyList[i]){data['yearlyAmount']=yearlyList[i].InstallmentAmount}
            else{data['yearlyAmount']=null}
            if(nineList[i]){data['nineAmount']=nineList[i].InstallmentAmount}
            else{data['nineAmount']=null}
            if(sixList[i]){data['sixAmount']=sixList[i].InstallmentAmount}
            else{data['sixAmount']=null}
            if(threeList[i]){data['threeAmount']=threeList[i].InstallmentAmount}
            else{data['threeAmount']=null}
            if(fiveList[i]){data['fiveAmount']=fiveList[i].InstallmentAmount}
            else{data['fiveAmount']=null}
            if(eightList[i]){data['eightAmount']=eightList[i].InstallmentAmount}
            else{data['eightAmount']=null}
            this.Emilist1.push(entry);
            i+=1;
            if(i==yearlyList.length){this.emiSection=true}
       }
    }
    else if(this.nineMonthSection){
      let i=0;this.Emilist1=[];
      for(let entry of nineList){
           let data = entry;
           if(yearlyList[i]){data['yearlyAmount']=yearlyList[i].InstallmentAmount}
           else{data['yearlyAmount']=null}
           if(nineList[i]){data['nineAmount']=nineList[i].InstallmentAmount}
           else{data['nineAmount']=null}
           if(sixList[i]){data['sixAmount']=sixList[i].InstallmentAmount}
           else{data['sixAmount']=null}
           if(threeList[i]){data['threeAmount']=threeList[i].InstallmentAmount}
           else{data['threeAmount']=null}
           if(fiveList[i]){data['fiveAmount']=fiveList[i].InstallmentAmount}
            else{data['fiveAmount']=null}
            if(eightList[i]){data['eightAmount']=eightList[i].InstallmentAmount}
            else{data['eightAmount']=null}
           this.Emilist1.push(entry);
           i+=1;
           if(i==nineList.length){this.emiSection=true}
      }
   }
   else if(this.sixMonthSection){
      let i=0;this.Emilist1=[];
      for(let entry of sixList){
           let data = entry;
           if(yearlyList[i]){data['yearlyAmount']=yearlyList[i].InstallmentAmount}
           else{data['yearlyAmount']=null}
           if(nineList[i]){data['nineAmount']=nineList[i].InstallmentAmount}
           else{data['nineAmount']=null}
           if(sixList[i]){data['sixAmount']=sixList[i].InstallmentAmount}
           else{data['sixAmount']=null}
           if(threeList[i]){data['threeAmount']=threeList[i].InstallmentAmount}
           else{data['threeAmount']=null}
           if(fiveList[i]){data['fiveAmount']=fiveList[i].InstallmentAmount}
            else{data['fiveAmount']=null}
            if(eightList[i]){data['eightAmount']=eightList[i].InstallmentAmount}
            else{data['eightAmount']=null}
           this.Emilist1.push(entry);
           i+=1;
           if(i==sixList.length){this.emiSection=true}

      }
   }
   else if(this.threeMonthSection){
      let i=0;this.Emilist1=[];
      for(let entry of threeList){
           let data = entry;
           if(yearlyList[i]){data['yearlyAmount']=yearlyList[i].InstallmentAmount}
           else{data['yearlyAmount']=null}
           if(nineList[i]){data['nineAmount']=nineList[i].InstallmentAmount}
           else{data['nineAmount']=null}
           if(sixList[i]){data['sixAmount']=sixList[i].InstallmentAmount}
           else{data['sixAmount']=null}
           if(threeList[i]){data['threeAmount']=threeList[i].InstallmentAmount}
           else{data['threeAmount']=null}
           if(fiveList[i]){data['fiveAmount']=fiveList[i].InstallmentAmount}
            else{data['fiveAmount']=null}
            if(eightList[i]){data['eightAmount']=eightList[i].InstallmentAmount}
            else{data['eightAmount']=null}
           this.Emilist1.push(entry);
           i+=1;
           if(i==threeList.length){this.emiSection=true}
      }
   }
   else if(this.fiveMonthSection){
    let i=0;this.Emilist1=[];
    for(let entry of fiveList){
         let data = entry;
         if(yearlyList[i]){data['yearlyAmount']=yearlyList[i].InstallmentAmount}
         else{data['yearlyAmount']=null}
         if(nineList[i]){data['nineAmount']=nineList[i].InstallmentAmount}
         else{data['nineAmount']=null}
         if(sixList[i]){data['sixAmount']=sixList[i].InstallmentAmount}
         else{data['sixAmount']=null}
         if(threeList[i]){data['threeAmount']=threeList[i].InstallmentAmount}
         else{data['threeAmount']=null}
         if(fiveList[i]){data['fiveAmount']=fiveList[i].InstallmentAmount}
          else{data['fiveAmount']=null}
          if(eightList[i]){data['eightAmount']=eightList[i].InstallmentAmount}
          else{data['eightAmount']=null}
         this.Emilist1.push(entry);
         i+=1;
         if(i==fiveList.length){this.emiSection=true}
    }
 }
 else if(this.eightMonthSection){
  let i=0;this.Emilist1=[];
  for(let entry of eightList){
       let data = entry;
       if(yearlyList[i]){data['yearlyAmount']=yearlyList[i].InstallmentAmount}
       else{data['yearlyAmount']=null}
       if(nineList[i]){data['nineAmount']=nineList[i].InstallmentAmount}
       else{data['nineAmount']=null}
       if(sixList[i]){data['sixAmount']=sixList[i].InstallmentAmount}
       else{data['sixAmount']=null}
       if(threeList[i]){data['threeAmount']=threeList[i].InstallmentAmount}
       else{data['threeAmount']=null}
       if(fiveList[i]){data['fiveAmount']=fiveList[i].InstallmentAmount}
        else{data['fiveAmount']=null}
        if(eightList[i]){data['eightAmount']=eightList[i].InstallmentAmount}
        else{data['eightAmount']=null}
       this.Emilist1.push(entry);
       i+=1;
       if(i==eightList.length){this.emiSection=true}
  }
}
  }

  onSelectPolicyTypeRow(event,index){
    let totalamount:any=0;
    console.log('Eventsss',event,index);
    let entry = this.Emilist1[index];
    console.log('Entryyys',entry); console.log('TotalLists',this.totallistselected);
    if(event){
      this.selectedvalues=true;
      this.totallistselected.push({"DueAmount":entry.DueAmount,"NoOfInstallment":entry.NoOfInstallment,"InstallmentPeriod":entry.InstallmentPeriod});
      entry.SelectYn = 'Y';
      for(let i=0;i<this.totallistselected.length;i++){
        console.log('ToLists',index,i,this.totallistselected.length);
        totalamount=Number(this.totallistselected[i].DueAmount)+Number(totalamount);
      }
      //this.payAmount=totalamount;
      this.numberWithCommas(totalamount);
      //this.CommaFormatted();
      console.log('Due Amounts',totalamount);
        }
    else{
      console.log('llllllllllll',this.payAmount)
      const withoutCommas = this.payAmount.replaceAll(',', '');
      console.log('entry new amounts',this.payAmount,entry.DueAmount)
      totalamount=withoutCommas - entry.DueAmount;
      this.numberWithCommas(totalamount);
      let tot=this.totallistselected.find(ele => ele.NoOfInstallment == entry.NoOfInstallment);
      let ind:any;
      if(tot){
        console.log('find result',tot)
        ind =this.totallistselected.indexOf(tot);
        console.log('IIIIIIII',ind)
        this.totallistselected.splice(ind,1)
      }
      //this.totallistselected.splice(index,1);
      console.log('Not entryss',this.totallistselected,index,this.payAmount);
    } 
        //let total=this.totallistselected.filter(ele => ele.NoOfInstallment == entry.NoOfInstallment)
        // console.log('Totallls',total);
        // if(total){
        //   totalamount=total[i].DueAmount+Number(totalamount);
        // }
  }
   numberWithCommas(x) {
    this.payAmount= x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

  updateinstallemnet(){
   let i=0,totallist:any[]=[];let menu
   let type=this.paymentTypeList.filter(ele => ele.Code == this.activeMenu)
     if(type){
       menu = type[0].CodeDesc
      console.log('MMMMMMMMMMMM',menu);
     }
     if(this.totallistselected.length!=0){
    for(let n of this.totallistselected){
        totallist.push({
          "QuoteNo":this.quoteNo,
       "NoOfInstallment":n.NoOfInstallment,
     "InsuranceId":this.insuranceId,
     "ProductId":this.productId,
     "InstallmentPeriod":n.InstallmentPeriod,
     "CreatedBy":this.loginId,
     "PaymentStatus":"Paid",
     "Remarks":"",
     "PaymentDetails":menu
        })
        i+=1; 
        // var sorted = this.totallistselected.sort();
        // console.log('NNNNNNNNNNNN',sorted)
      if(i==this.totallistselected.length) {
        let sorted = totallist.sort((a, b) => a.NoOfInstallment - b.NoOfInstallment); 
        console.log('NNNNNNNNNNNN',sorted);
        console.log('Paymentsss',this.totallistselected.length); this.makepayments(totallist);
      }
    }
    }
    else{
      totallist.push({
        "QuoteNo":this.quoteNo,
     "NoOfInstallment":"",
   "InsuranceId":this.insuranceId,
   "ProductId":this.productId,
   "InstallmentPeriod":"",
   "CreatedBy":this.loginId,
   "PaymentStatus":"Paid",
   "Remarks":"",
   "PaymentDetails":menu
      });
      this.makepayments(totallist);
    }
  }

  makepayments(totallist){
    let urlLink = `${this.CommonApiUrl}api/updateemitransactiondetails`;
    this.sharedService.onPostMethodSync(urlLink,totallist).subscribe(
     (data: any) => {
       console.log(data);
       if(data.Result){
      console.log('NNNNNNNNNNNNN',data.Result);
      sessionStorage.removeItem('Makepaymentid')
      this.onCashPayment();
       } 
     },
     (err) => { },
     );
  }
  getTotalVehiclesCost(){
    let totalCost=0,i=0;
    console.log('VECGJKKK',this.vehicleList);
    for(let veh of this.vehicleList){
      if(veh?.OverallPremiumFc) totalCost = totalCost+Number(veh?.OverallPremiumFc);

      i+=1;
      if(i==this.vehicleList.length) this.totalPremium = totalCost;
    }
  }
  onRedirect(value:any){
    console.log('Routing Valuesss',value);
    this.Menu=value;
    this.first = false;this.second = false;this.Third=false;this.Fourth=false;this.Fifth = false;
    this.bankName = null;this.chequeDate=null;this.chequeNo = null;this.Sixth=false;this.seven=false;
    if(this.Menu=='VisionPay'){ this.first=true;}
    else if(this.Menu=='Pos'){ this.second=true;}
    else if(this.Menu=='1'){ this.Third=true; }
    else if(this.Menu == '2'){ this.Fourth = true;}
    else if(this.Menu == 'Bank'){ this.Fifth = true;}
    else if(this.Menu == '3'){ this.seven = true;}
    else if(this.Menu == '4'){
      console.log('Menu Sixth')
      if(this.EmiYn!='Y'){
        this.payAmount = this.totalPremium;
      }
      else{
        this.payAmount =this.DueAmount;
      }
        this.payeeName = this.clientName;
        this.activeMenu = this.Menu;
        this.onCashPayment();
        // if(this.EmiYn!='Y'){
        //   //this.onCashPayment();
        // } 
        // else{
        //   this.onproceed(); 
        // } 
    }
    if(this.EmiYn!='Y'){
      //this.payAmount=this.totalPremium;
    }
    else {
      //this.payAmount=this.DueAmount;
    }
    //if(this.totalPremium!=null && this.totalPremium!=undefined){this.payAmount = String(this.totalPremium);this.CommaFormatted();}

    // if(this.EmiYn=='N'){
    //   if(this.totalPremium!=null && this.totalPremium!=undefined){this.payAmount = String(this.totalPremium);this.CommaFormatted();}
    // }

  }
  getPaymentTypeList(){
    let ReqObj = {
      "BranchCode": this.quoteBranchCode,
      "InsuranceId": this.insuranceId,
      "UserType": this.quoteUsertype,
      "SubUserType": this.quoteSubUsertype,
      "ProductId": this.productId,
      "CreatedBy": this.loginId
    }
    let urlLink = `${this.CommonApiUrl}master/dropdown/paymenttypes`;
     this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          this.paymentTypeList = data.Result;
          if(this.paymentTypeList.some(ele=>ele.Code=='2')){
            this.getCommonDocTypeList();
            this.getUploadedDocList(null,-1);
          }
        } 
      },
      (err) => { },
      );
  }
  getCommonDocTypeList(){
    let ReqObj = {
      "InsuranceId": this.insuranceId,
      "ProductId":this.productId,
      "SectionId":"99999"
    }
    let urlLink = `${this.CommonApiUrl}document/dropdown/doctypes`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
           this.commonDocTypeList = data.Result;
          if(this.commonDocTypeList.some(ele=>ele.Code=='23')){this.chequeSection=true;}
           
        }
      },
      (err) => { },
    );

  }
//   onproceed(){
//     let makepayment= sessionStorage.getItem('Makepaymentid');
//     if(!this.endorsementSection && makepayment!=='Ids'){
//       if(this.EmiYn!='Y'){
//         this.onCashPayment();  
//       }
//       else{
//         this.updateinstallemnet();
//       }
//     }
//     else if(!this.endorsementSection && makepayment=='Ids'){
//       if(this.EmiYn!='Y'){
//         this.onCashPayment();  
//       }
//       else{
//         if(this.payAmount!=null){
//           this.onMakePayment();
//         }
//         else{
// this.popup();
//         }
        
//       }
//     }
//     else{
//       this.onCashPayment();  
//     }
//   }

  popup(){
    Swal.fire({
      title: '<strong>Error</strong>',
      icon: 'info',
      html:
        `<ul class="list-group errorlist">
         <li>Plese Choose EMI</li>
     </ul>`,
      showCloseButton: false,
     cancelButtonColor: '#d33',
     cancelButtonText: 'Ok',
    })
  }
  onMakePayment(){
    if(this.subuserType==null){
      this.subuserType = this.userDetails.Result.SubUserType;
      sessionStorage.setItem('typeValue',this.subuserType)
    }
    let amount = null;
    if(this.payAmount!=null){
      if(this.payAmount==undefined) amount = null;
      else if(String(this.payAmount).includes(',')){ amount = this.payAmount.replace(/,/g, '') }
      else amount = this.payAmount;
    }
   let emimonth:any;
    if(this.totallistselected[0]?.NoOfInstallment!=null){
      emimonth=this.totallistselected[0]?.NoOfInstallment
    }
    else{
      emimonth=this.emiMonth;
    }
    // if(this.EmiYn=='Y'){
    //   amount = this.dueAmount;
    // }
    // else{
    //   amount = this.localPremiumCost;
    // }
    let ReqObj = {
      "CreatedBy": this.loginId,
      "EmiYn": this.EmiYn,
      "InstallmentMonth":emimonth,
      "InstallmentPeriod":this.emiPeriod,
      "InsuranceId": this.loginId,
      "Premium": amount,
      "QuoteNo": this.quoteNo,
      "Remarks": "None",
      "SubUserType": this.subuserType,
      "UserType": this.userType
    }
    let urlLink = `${this.CommonApiUrl}payment/makepayment`;
    this.sharedService.onPostMethodSync(urlLink,ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            sessionStorage.setItem('quotePaymentId',data.Result.PaymentId);
            this.updateinstallemnet();
          // else if(data.Result.PaymentId){
          //   sessionStorage.setItem('quotePaymentId',data.Result.PaymentId);
          //   if(this.loginType=='B2CFlow' || (this.loginType=='B2CFlow2')){
          //     this.router.navigate(['/Home/customer/ClientDetails']);
          //   }
          //   else this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/make-payment']);
          // }
        }
      },
      (err) => { },
    );
  }
  onCashPayment(){
    let chequeDate = "";let amount=this.totalPremium;
   
    if(this.IsChargeOrRefund=='REFUND'){
      this.Menu='2';
      this.activeMenu = '2';
      amount = this.totalPremium
    }
    else{this.iBanNo = null;this.accNo=null;
      if(this.payAmount==undefined) amount = null;
      else if(String(this.payAmount).includes(',')){ amount = this.payAmount.replace(/,/g, '') }
      else amount = this.payAmount;
    }
    if(this.IsChargeOrRefund!='REFUND' && this.Menu=='2'){
        if(this.chequeDate!='' && this.chequeDate!=null && this.chequeDate!= undefined){
          chequeDate = this.datePipe.transform(this.chequeDate,'dd/MM/yyyy');
        }
    }
    else{
      this.chequeDate = null;this.chequeNo = null;this.micrNo=null;if(this.IsChargeOrRefund!='REFUND')this.bankName = null;
    }
    // if(this.Menu=='4'){
    //   if(this.payAmount==undefined) amount = null;
    //   else if(String(this.payAmount).includes(',')){ amount = this.payAmount.replace(/,/g, '') }
    //   else amount = this.payAmount;
    // }
    let ReqObj = {
      "CreatedBy": this.loginId,
      "InsuranceId": this.insuranceId,
      "EmiYn":this.EmiYn,
      "Premium": amount,
      "QuoteNo": this.quoteNo,
      "Remarks": "None",
      "PayeeName": this.payeeName,
      "SubUserType": this.subuserType,
      "UserType": this.userType,
      "MICRNo": this.micrNo,
      "BankName":this.bankName,
      "ChequeNo":this.chequeNo,
      "ChequeDate":chequeDate,
      "PaymentType": this.activeMenu,
      "Payments": this.IsChargeOrRefund,
      "PaymentId": sessionStorage.getItem('quotePaymentId'),
      "AccountNumber":this.accNo,
      "IbanNumber": this.iBanNo
    }
    console.log("Final Pay Req",ReqObj)
    let urlLink = `${this.CommonApiUrl}payment/insertpaymentdetails`;
     this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data.Result){
          // if(this.EmiYn=='Y'){
          //   this.updateinstallemnet();
          // }
          if(data.Result.paymentUrl){
            this.redirectUrl = data.Result.paymentUrl;
            console.log("Url",atob(this.redirectUrl))
            window.location.href =  atob(this.redirectUrl)
          }
          else {
            if(!this.seven){
              this.paymentDetails = data.Result;
              this.policyNo = data?.Result?.PolicyNo;
              this.policySection = true;
            this.updateTiraDetails();
            }
            else{
              if(data.Result?.DepositResponse!='Y'){
                let Result = data.Result?.DepositResponse;
                console.log('HHHHHHHHHH',Result);
                Swal.fire({
                  title: '<strong>Error</strong>',
                  icon: 'info',
                  html: `<ul class="list-group errorlist">
                     <li>${Result}</li>
                 </ul>`,
                  showCloseButton: false,
                 cancelButtonColor: '#d33',
                 cancelButtonText: 'Ok',
                })
              }
              else{
                this.paymentDetails = data.Result;
                this.policyNo = data?.Result?.PolicyNo;
                this.policySection = true;
                this.updateTiraDetails();
              }
             
            }
          }
        } 
      },
      (err) => { },
      );
  }
  updateTiraDetails(){
      let ReqObj={
        "QuoteNo": this.quoteNo,
      }
      let urlLink = `${this.CommonApiUrl}payment/pushtira`;
     this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        if(data?.Result){
            if(data?.Result?.Response=='Success') this.getTiraDetails();
        } 
      },
      (err) => { },
      );
  }
  getTiraDetails(){
    let urlLink = `${this.CommonApiUrl}payment/gettira/${this.quoteNo}`;
   this.sharedService.onGetMethodSync(urlLink).subscribe(
    (data: any) => {
      if(data?.Result){
        this.policySection = true;
          this.stickerNo = data?.Result?.StickerNumber;
          this.CoverNoteNo = data?.Result?.CoverNoteNo;
      } 
    },
    (err) => { },
    );
  }
  CommaFormatted() {

    // format number
    if (this.payAmount!='' && this.payAmount!=null && this.payAmount!=undefined) {
     this.payAmount = String(this.payAmount).replace(/[^0-9.]|(?<=\..*)\./g, "")
       .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }
  onAmountChange (args) {
    if (args.key === 'e' || args.key === '+' || args.key === '-') {
      return false;
    } else {
      return true;
    }
  }
  ongetBack(){
    let makepayment= sessionStorage.getItem('Makepaymentid');
    if(this.endorsementSection && this.cancelEndorse){
      this.router.navigate(['Home/policies/Endorsements/endorsementTypes'])
    }
    else if(this.loginType=='B2CFlow' || (this.loginType=='B2CFlow2')){
      this.router.navigate(['/Home/customer/ClientDetails']);
    }
    else if(!this.endorsementSection && makepayment=='Ids'){
     
      this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/Emi-Details'])
    }
    else{
      if(this.EmiYn!='Y'){
        this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/premium-details'])
      }
      else{
        this.router.navigate(['/Home/existingQuotes/customerSelection/customerDetails/Emi-Details'])
      }
      
    }
  }
  onOnlinePayment(){
    this.successSection = true;
    this.tinyUrlInfo = false;
  }

  finalTinyUrlInfo(){
    this.tinyUrlInfo = true;
  }
}
