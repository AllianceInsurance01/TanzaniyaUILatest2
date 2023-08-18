import { Component, OnInit, Input,Pipe, PipeTransform,ViewChild, OnChanges } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as Mydatas from '../../../app-config.json';
import { SharedService } from '../../../shared/shared.service';
//import {NbDialogService } from '@nebular/theme';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import {NgbModule, NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
declare var $:any;



@Component({
  selector: 'app-followup',
  templateUrl: './followup.component.html',
  styleUrls: ['./followup.component.scss'],
})

//@Pipe({name: 'convertFrom24To12Format'})


export class FollowupComponent implements OnInit,OnChanges{
  userDetails: any;
  loginId: any;
  agencyCode: any;
  insuranceId: any;
  userType: any;
  productId: any;
  brokerbranchCode: any;
  branchCode: any;
  NotifiList:any[]=[];
  templatevalue;
  TemplateList:any[]=[];
  followupIdA:any;
  templist:any;
  FollowupDesc:any;
  EndDate:any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public motorApiUrl:any = this.AppConfig.MotorApiUrl;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
  opens: boolean=false;
  mailRequestno: any;
  MailSubject: any;
  MailBody: any;
  MailRegards: any;
  MailHeader:any[]=[];
  ViewList: any;
  closeResult: string;
  New:any[]=[];
  followupId:any;
  Remarks: any;
  EntryDate:any;
  minDate: Date;
  FollowId: any;
  StatusDesc: any;
  Status: any;
  StartTime: any;
  EndTime: any;
  FollowupId: any;
  FollowupDescs: any;
  Remarkss: any;
  EntryDates: any;
  EndTimes: any;
  StartTimes: any;
  NewList:any[]=[];
  count: number;
  FollowupDetails: any;
  RefNo: any;
  quoteno: any;
  CusName: any;
  Startdate: any;
  enddate: any;
  Sttartdate: any;
  proname: string;
  showGrids: boolean=false;
  public dataSource: any;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) private paginator!: MatPaginator;
  @Input('cols') columnHeader: any[] = [];
  Addnew: boolean=false;
  newfollowup: any;


  constructor(private router:Router,private sharedService: SharedService, private modalService: NgbModal,private datePipe:DatePipe) {

    this.minDate=new Date();
    this.userDetails = JSON.parse(sessionStorage.getItem('Userdetails'));
    this.loginId = this.userDetails.Result.LoginId;
    this.agencyCode = this.userDetails.Result.OaCode;
    this.brokerbranchCode = this.userDetails.Result.BrokerBranchCode;
    this.branchCode = this.userDetails.Result.BranchCode;
    this.productId = this.userDetails.Result.ProductId;
    this.userType = this.userDetails?.Result?.UserType;
    this.insuranceId = this.userDetails.Result.InsuranceId;

    this.FollowupDetails = JSON.parse(sessionStorage.getItem('FollowUpDetails'));

    this.mailRequestno=this.FollowupDetails?.RequestReferenceNo;
    this.quoteno=this.FollowupDetails?.QuoteNo;
    this.CusName=this.FollowupDetails?.CustomerName;
    this.Sttartdate=this.FollowupDetails?.StartDate;
    this.enddate=this.FollowupDetails?.QuoteNo;
    if(this.productId=='5'){
      this.proname="Motor"
    }
    else if(this.productId=='4'){
      this.proname="Travel"
    }
    else if(this.productId=='3'){
      this.proname="Domestic"
    }

   

     
  this.onFollowup();


    /*else {
      this.MailHeader=[
        { key: 'FollowupDesc', display: 'FollowupDesc' },
        { key: 'StartDate', display: 'Start Date' },
        { key: 'StartTime', display: 'StartTime' },
        { key: 'Remarks', display: 'Remarks' },

  //{ key: 'RequestReferenceNo', display: 'RequestReferenceNo' },


        {
          key: 'View',
          display: 'View',
          config: {
            isViews:true,
          },
        },

      ]
    }*/

  }
  ngOnInit(): void {

    this.drop();
    // let policyObj = JSON.parse(sessionStorage.getItem('Details'));

    // this.mailRequestno=policyObj.RequestReferenceNo;





 console.log('tttttt',this.followupId)

  }
  trans(time: any): any {
    let hour = (time.split(':'))[0]
    let min = (time.split(':'))[1]
    //let part = hour > 12 ? 'pm' : 'am';
    if(parseInt(hour) == 0)
     hour = 12;
    min = (min+'').length == 1 ? `0${min}` : min;
    hour = hour > 12 ? hour - 12 : hour;
    hour = (hour+'').length == 1 ? `0${hour}` : hour;
    console.log('jjjjjjjj',hour,min)
    return `${hour}:${min}`
   
  }

   transform(time: any): any {
      let hour = (time.split(':'))[0]
      let min = (time.split(':'))[1]
      let part = hour > 12 ? 'pm' : 'am';
      if(parseInt(hour) == 0)
       hour = 12;
      min = (min+'').length == 1 ? `0${min}` : min;
      hour = hour > 12 ? hour - 12 : hour;
      hour = (hour+'').length == 1 ? `0${hour}` : hour;
      return `${hour}:${min} ${part}`
    }
  
  drop(){
    let ReqObj= {
      "InsuranceId": this.insuranceId,
      "BranchCode":this.branchCode
    }

      let urlLink = `${this.CommonApiUrl}dropdown/followupDetailsStatus`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
              this.TemplateList= data?.Result;
                console.log(this.followupId);
                //this.onFollowup();

              console.log('Template',this.TemplateList)
          }
        },
        (err) => { },
      );

  }

 
  smsBack(){
    // this.Addnew=false;
    // this.showGrids=true;
    this.router.navigate(['/Home/existingQuotes'])
  }

  onFollowup(){

    this.NotifiList=[];
    let ReqObj= {
      /*"CreatedBy":this.loginId ,
      "InsuranceId": this.insuranceId,
      "Limit": "0",
      "Offset": "1000",
      "ProductId":this.productId*/
      "RequestReferenceNo": this.mailRequestno,
      "LoginId": this.loginId,
      "InsuranceId": this.insuranceId,
      "ProductId": this.productId,
      // "Status":"PE"
    }
       
      let urlLink = `${this.CommonApiUrl}api/getallfollowupdetails`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          //console.log(data);
          
          if(data.Result){
  
              this.MailHeader=[
                { key: 'FollowupDesc', display: 'FollowupDesc' },
                { key: 'StartDate', display: 'Start Date' },
                { key: 'StatusDesc', display: 'Status' },
                { key: 'Remarks', display: 'Remarks' },
                {
                  key: 'View',
                  display: 'View',
                  config: {
                    isViews:true,
                  },
                },
                {
                  key: 'actions',
                  display: 'update',
                  config: {
                    isEdit: true,
                  },
                },
          
              ]

            if(data?.Result?.FollowupDetailsRes){
              this.NotifiList= data?.Result?.FollowupDetailsRes;
              if(this.NotifiList.length!=0){
                this.showGrids=true;
                this.Addnew=true;
              }
              else{
                this.showGrids=false;
                this.Addnew=false;
              }

              console.log('jjjjjjjj',this.NotifiList)
              //this.FollowId=data?.Result?.FollowupDetailsRes?.FollowId;
  
            } 
          //   this.NewList=[{"FollowupDesc":"New Details","StartDate":"12-08-2023","StatusDesc":"Pending","Remarks":"New","Status":"PE"},
          //   {"FollowupDesc":"Second Details","StartDate":"15-08-2023","StatusDesc":"Completed","Remarks":"New","Status":"CP"},
          //   {"FollowupDesc":"Third Details","StartDate":"14-08-2023","StatusDesc":"Cancelled","Remarks":"New","Status":"CA"}
          // ]
          // this.New=[{"FollowupDesc":"New Details","StartDate":"12-08-2023","StatusDesc":"Pending","Remarks":"New","Status":"PE"},
            this.count=this.NewList.length;
          
          
          }
        },
        (err) => { },
      );
}



getMailTemplate(rowdata,modal){

  //$(this).css("z-index", parseInt($('#card').css('z-index')) + 1);

  console.log('fffffffff',rowdata)
  this.open(modal);
  
  
  let ReqObj= {
    /*"CreatedBy": this.loginId,
    "InsuranceId": this.insuranceId,
    "NotifTemplateCode": this.templatevalue,
    "ProductId": this.productId,
    "RequestReferenceNo":this.mailRequestno*/
    "InsuranceId": this.insuranceId,
  "FollowupId": rowdata.FollowupId,
  "LoginId": rowdata.LoginId,
  "ProductId": this.productId,
  "RequestReferenceNo": rowdata.RequestReferenceNo
  }

    let urlLink = `${this.CommonApiUrl}api/getfollowupdetailsid`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data?.Result){
            this.templist= data?.Result;

            // this.MailSubject=data.Result.MailSubject
            // this.MailBody=data.Result.MailBody;
            // this.MailRegards=data.Result.MailRegards;
            this.FollowupDesc=data?.Result?.FollowupDesc;

            this.newfollowup=data?.Result?.FollowupDesc;
            this.StatusDesc=data?.Result?.StatusDesc;
            this.Status=data?.Result?.Status;
            this.StartTime=data?.Result?.StartTime;
            this.EndTime=data?.Result?.EndTime;
            this.Remarks=data?.Result?.Remarks;
            this.FollowupId=data?.Result?.FollowupId;
            this.EntryDate=data?.Result?.StartDate;
            this.EndDate=data?.Result?.EndDate;

            console.log('end',this.EndDate)

            console.log('hhhhhhhhh',this.FollowupId)

            if(this.EntryDate){
              this.EntryDate=this.onDateFormatInEdit(this.EntryDate)
              console.log('EEEEEEEEE',this.EndDate)
             
            }
            if(this.EndDate){
              this.EndDate=this.onDateFormatInEdit(this.EndDate)
            }
            // if(this.templist.EntryDate){
            //   this.EntryDate=this.onDateFormatInEdit(this.EntryDate)
            // }
            /*if(this.StartTime){
              this.StartTime=this.transform(this.StartTime)
            }
            if(this.EndTime){
              this.EndTime=this.transform(this.EndTime)
            }*/
            console.log('templist',this.templist)
        }
      },
      (err) => { },
    );
}



send(modal){

   
  let follow

  console.log('yyyyyyy',this.FollowupId)
   if(this.FollowupId !="" && this.FollowupId!=null){
      follow =this.FollowupId;
   }
   else{
      follow="";
   }
  let ReqObj= {
"InsuranceId": this.insuranceId,
"EndDate": this.EndDate,
"EndTime":  this.EndTime,
"FollowupDesc": this.FollowupDesc,
"LoginId": this.loginId,
"ProductId":this.productId,
"Remarks":this.Remarks,
"RequestReferenceNo": this.mailRequestno,
"StartDate": this.EntryDate,
"StartTime":  this.StartTime,
"Status":this.followupId,
"FollowupId":follow
  }
  //let urlLink = `${this.ApiUrl1}master/insertcompanypromocode`;

    let urlLink = `${this.CommonApiUrl}api/savefollowup`;
    if (ReqObj.StartDate != '' && ReqObj.StartDate != null && ReqObj.StartDate != undefined) {
      ReqObj['StartDate'] =  this.datePipe.transform(ReqObj.StartDate, "dd/MM/yyyy")
    }
    else{
      ReqObj['StartDate'] = "";
    }

    if (ReqObj.EndDate != '' && ReqObj.EndDate != null && ReqObj.EndDate != undefined) {
      ReqObj['EndDate'] =  this.datePipe.transform(ReqObj.EndDate, "dd/MM/yyyy")
    }
    else{
      ReqObj['EndDate'] = "";
    }
      
 
     /*if (ReqObj.StartTime != '' && ReqObj.StartTime != null && ReqObj.StartTime != undefined) {
       ReqObj['StartTime'] =  this.trans(ReqObj.StartTime)
      
    }
     else{
       ReqObj['StartTime'] = "";
     }

    
     if (ReqObj.EndTime != '' && ReqObj.EndTime != null && ReqObj.EndTime != undefined) {
    ReqObj['EndTime'] =  this.trans(ReqObj.EndTime)
     }
    else{
    ReqObj['EndTime'] = "";
     }*/

    
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
          // $('#follow_Up').modal('hide');

          this.showGrids=true;
          this.Addnew=true;
          this.onFollowup();
         
          modal.dismiss('Cross click');
          $('#follow_Up').modal('hide');
          
         
          //modal.dismiss('Cross click');
             

           console.log('Message Successfull',)
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
      //let NewDate = format[2]+'-'+format[1]+'-'+format[0];
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


backs(){
  this.opens=false;
}

Mail(){
  // this.opens=true;
  this.Addnew=false;
  this.showGrids=false;
  this.drop();
  //this.followupId=""
  console.log('hhhh');
  this.FollowupDesc=null;
  this.StatusDesc=null;
  this.Status=null;
  this.StartTime=null;
  this.EndTime=null;
  this.Remarks=null;
  this.EntryDate="";
  this.FollowupId="";
  this.EndDate="";

}
open(content) {
  this.modalService.open(content, { size: 'lg', backdrop: 'static',ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}
private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return  `with: ${reason}`;
  }
}

onviewMail(rowdata,modal){
  console.log('RRRR',rowdata)
  this.open(modal);
  let ReqObj={
     "InsuranceId": this.insuranceId,
     "ProductId": this.productId,
     "NotificationNo": rowdata.NotificationNo
  }
  let urlLink = `${this.CommonApiUrl}notification/viewsentmail`;
  this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
    (data: any) => {
      console.log(data);
      if(data.Result){
          this.ViewList= data.Result;
          console.log('View',this.ViewList)
      }
    },
    (err) => { },
  );

}


onEditQuotes(rowdata:any,modal){
  this.open(modal);
}
Mails(){
  this.opens=true;
  this.followupId="";
}

main(){
  this.showGrids=true;
}

ngOnChanges() {
  console.log('OOOOOOOOOOO',this.NewList);
  this.dataSource = new MatTableDataSource(this.NewList);
  this.dataSource.sort = this.sort;
  this.dataSource.paginator = this.paginator;
}
get keys() {
  return this.columnHeader.map(({ key }) => key);
}

}
