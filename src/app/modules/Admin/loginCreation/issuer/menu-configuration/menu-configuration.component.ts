import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../../../../shared/shared.service';
import * as Mydatas from '../../../../../app-config.json';
//import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'app-menu-configuration',
  templateUrl: './menu-configuration.component.html',
  styleUrls: ['./menu-configuration.component.scss']
})
export class MenuConfigurationComponent implements OnInit {

  activeMenu:any="Menu";userList:any[]=[];includedUserList:any[]=[];
  issuerList:any[]=[];includedIssuerList:any[]=[];loginId:any;
    issuerId: string;issuerType:any;
    IsDesti:any;


    public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  public CommonApiUrl: any = this.AppConfig.CommonApiUrl;
    issuerLoginId: any;

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
    }
    if(issuerId){
      this.issuerId = issuerId;
      this.getIssuerMenuList();
    }
    // this.userList = [
    //   {
    //       "link": "/",
    //       "title": "Quote Register",
    //       "icon": null,
    //       "id": "279",
    //       "IsDesti":false,
    //       "parent": "99999",
    //       "orderby": 2,
    //       "children": [
    //           {
    //               "link": "/existingQuotes",
    //               "title": "Existing Quote",
    //               "icon": null,
    //               "id": "301",
    //               "parent": "279",
    //               "orderby": 11,
    //               "children": null
    //           },
    //           {
    //               "link": "/lapsedQuote",
    //               "title": "Lapsed Quote",
    //               "icon": null,
    //               "id": "302",
    //               "parent": "279",
    //               "orderby": 12,
    //               "children": null
    //           },
    //           {
    //               "link": "/rejectedQuote",
    //               "title": "Rejected Quote",
    //               "icon": null,
    //               "id": "303",
    //               "parent": "279",
    //               "orderby": 13,
    //               "children": null
    //           }
    //       ]
    //   },
    //   {
    //       "link": "/",
    //       "title": "Issuer Referral",
    //       "icon": null,
    //       "id": "285",
    //       "IsDesti":false,
    //       "parent": "99999",
    //       "orderby": 5,
    //       "children": [
    //           {
    //               "link": "/referal",
    //               "title": "Pending Quotes",
    //               "icon": null,
    //               "id": "314",
    //               "parent": "285",
    //               "orderby": 21,
    //               "children": null
    //           },
    //           {
    //               "link": "/referal",
    //               "title": "Approved Quotes",
    //               "icon": null,
    //               "id": "315",
    //               "parent": "285",
    //               "orderby": 22,
    //               "children": null
    //           },
    //           {
    //               "link": "/referal",
    //               "title": "Rejected Quotes",
    //               "icon": null,
    //               "id": "316",
    //               "parent": "285",
    //               "orderby": 23,
    //               "children": null
    //           }
    //       ]
    //   },
    //   {
    //       "link": "/",
    //       "title": "Report",
    //       "icon": null,
    //       "id": "293",
    //       "IsDesti":false,
    //       "parent": "99999",
    //       "orderby": 7,
    //       "children": []
    //   },
    //   {
    //       "link": "/",
    //       "title": "New",
    //       "icon": null,
    //       "id": "304",
    //       "IsDesti":false,
    //       "parent": "99999",
    //       "orderby": 1,
    //       "children": []
    //   },
    //   {
    //       "link": "/",
    //       "title": "Customer Approval",
    //       "icon": null,
    //       "id": "305",
    //       "IsDesti":false,
    //       "parent": "99999",
    //       "orderby": 3,
    //       "children": [
    //           {
    //               "link": "/customerApproval",
    //               "title": "Pending Quotes",
    //               "icon": null,
    //               "id": "306",
    //               "parent": "305",
    //               "orderby": 14,
    //               "children": null
    //           },
    //           {
    //               "link": "/customerApproval",
    //               "title": "Requested For ReQuoting",
    //               "icon": null,
    //               "id": "307",
    //               "parent": "305",
    //               "orderby": 15,
    //               "children": null
    //           },
    //           {
    //               "link": "/customerApproval",
    //               "title": "Approved Quotes",
    //               "icon": null,
    //               "id": "308",
    //               "parent": "305",
    //               "orderby": 16,
    //               "children": null
    //           },
    //           {
    //               "link": "/customerApproval",
    //               "title": "Rejected Quotes",
    //               "icon": null,
    //               "id": "309",
    //               "parent": "305",
    //               "orderby": 17,
    //               "children": null
    //           }
    //       ]
    //   },
    //   {
    //       "link": "/",
    //       "title": "Portfolio",
    //       "icon": null,
    //       "id": "310",
    //       "IsDesti":false,
    //       "parent": "99999",
    //       "orderby": 4,
    //       "children": [
    //           {
    //               "link": "/policies",
    //               "title": "Policies",
    //               "icon": null,
    //               "id": "311",
    //               "parent": "310",
    //               "orderby": 18,
    //               "children": null
    //           },
    //           {
    //               "link": "/cancelledPolicies",
    //               "title": "Cancelled Policies",
    //               "icon": null,
    //               "id": "312",
    //               "parent": "310",
    //               "orderby": 19,
    //               "children": null
    //           },
    //           {
    //               "link": "/pendingPolicies",
    //               "title": "Pending Polices",
    //               "icon": null,
    //               "id": "313",
    //               "parent": "310",
    //               "orderby": 20,
    //               "children": null
    //           }
    //       ]
    //   },
    //   {
    //       "link": "/",
    //       "title": "Search",
    //       "icon": null,
    //       "id": "317",
    //       "IsDesti":false,
    //       "parent": "99999",
    //       "orderby": 6,
    //       "children": []
    //   },
    //   {
    //       "link": "/",
    //       "title": "Copy Quote",
    //       "icon": null,
    //       "id": "318",
    //       "IsDesti":false,
    //       "parent": "99999",
    //       "orderby": 8,
    //       "children": []
    //   },
    //   {
    //       "link": "/",
    //       "title": "Assign Quote",
    //       "icon": null,
    //       "id": "319",
    //       "IsDesti":false,
    //       "parent": "99999",
    //       "orderby": 9,
    //       "children": []
    //   }
    // ];
    // this.issuerList = [
    //   {
    //       "link": "/Admin",
    //       "title": "DASH-BOARD",
    //       "icon": null,
    //       "id": "1",
    //       "IsDesti":false,
    //       "parent": "99999",
    //       "orderby": 1,
    //       "children": []
    //   },
    //   {
    //       "link": "/Admin/globalConfigure",
    //       "title": "Global Configuration",
    //       "icon": null,
    //       "id": "2",
    //       "IsDesti":false,
    //       "parent": "99999",
    //       "orderby": 2,
    //       "children": []
    //   },
    //   {
    //       "link": "/Admin/companyList",
    //       "title": "Company Configuration",
    //       "icon": null,
    //       "id": "3",
    //       "IsDesti":false,
    //       "parent": "99999",
    //       "orderby": 3,
    //       "children": []
    //   },
    //   {
    //       "link": "#",
    //       "title": "Login Creation",
    //       "icon": null,
    //       "id": "4",
    //       "IsDesti":false,
    //       "parent": "99999",
    //       "orderby": 4,
    //       "children": [
    //           {
    //               "link": "/Admin/brokersList",
    //               "title": "Broker Creation",
    //               "icon": null,
    //               "id": "5",
    //               "parent": "4",
    //               "orderby": 5,
    //               "children": null
    //           },
    //           {
    //               "link": "/Admin/userList",
    //               "title": "User (Broker Emp)",
    //               "icon": null,
    //               "id": "6",
    //               "parent": "4",
    //               "orderby": 6,
    //               "children": null
    //           },
    //           {
    //               "link": "/Admin/issuerList",
    //               "title": "Insurance Employee Creation",
    //               "icon": null,
    //               "id": "7",
    //               "parent": "4",
    //               "orderby": 7,
    //               "children": null
    //           }
    //       ]
    //   },
    //   {
    //       "link": "#",
    //       "title": "Masters",
    //       "icon": null,
    //       "id": "8",
    //       "IsDesti":false,
    //       "parent": "99999",
    //       "orderby": 8,
    //       "children": [
    //           {
    //               "link": "/Admin/bankMaster",
    //               "title": "Bank Master",
    //               "icon": null,
    //               "id": "9",
    //               "parent": "8",
    //               "orderby": 9,
    //               "children": null
    //           },
    //           {
    //               "link": "/Admin/countryMaster",
    //               "title": "Country Master",
    //               "icon": null,
    //               "id": "10",
    //               "parent": "8",
    //               "orderby": 10,
    //               "children": null
    //           }
    //       ]
    //   },
    //   {
    //       "link": "#",
    //       "title": "Admin Referal",
    //       "icon": null,
    //       "id": "11",
    //       "IsDesti":false,
    //       "parent": "99999",
    //       "orderby": 11,
    //       "children": [
    //           {
    //               "link": "/Admin/pendingQuotes",
    //               "title": "Pending Quotes",
    //               "icon": null,
    //               "id": "12",
    //               "parent": "11",
    //               "orderby": 12,
    //               "children": null
    //           },
    //           {
    //               "link": "/Admin/approvedQuotes",
    //               "title": "Approved Quotes",
    //               "icon": null,
    //               "id": "13",
    //               "parent": "11",
    //               "orderby": 13,
    //               "children": null
    //           },
    //           {
    //               "link": "/Admin/rejectedQuotes",
    //               "title": "Rejected Quotes",
    //               "icon": null,
    //               "id": "14",
    //               "parent": "11",
    //               "orderby": 14,
    //               "children": null
    //           }
    //       ]
    //   }
    // ];
   }

  ngOnInit(): void {


  }
  onChange(){
    this.IsDesti=true;
    if(this.IsDesti){
        this.IsDesti=false
    }
  }
  unselect(): void {
    this.IsDesti = undefined;
 }
  checkUncheckAll() {
    for (var i = 0; i < this.userList.length; i++) {
      this.userList[i].isSelected = this.IsDesti;
    }
    this. getMenuIds();
  }
  getIssuerMenuList(){
      let ReqObj = {
        "UserType":"Issuer",
        "SubUserType":this.issuerType
      }
      let urlLink = `${this.CommonApiUrl}master/menu`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
              this.userList = data.Result.UserList;
              this.issuerList = data.Result.AdminList;
              this.getMenuIds();
          }
        },
        (err) => { },
    );
  }
  getMenuIds(){
      let ReqObj = { "LoginId":this.issuerLoginId}
      let urlLink = `${this.CommonApiUrl}admin/getmenuids`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
            let menuList:any[]=[];
            menuList= data.Result.MenuId;
            if(menuList.length!=0){
              for(let entry of menuList){
                const result = (this.userList.find(x => x.id === entry) ) ? true : false;
                if(result){
                  let index = this.userList.findIndex(ele=>ele.id==entry);
                  this.includedUserList.push(this.userList[index]);
                  this.userList.splice(index,1);

                   }
                else{
                  let index = this.issuerList.findIndex(ele=>ele.id==entry);
                  this.includedIssuerList.push(this.issuerList[index]);
                  this.issuerList.splice(index,1);
                }
                console.log("Checked",result);
              }
            }
          }
        },
        (err) => { },
        );
  }
  onSelected(arrayaside: string) {
    let index = 0;
    if (arrayaside === 'right') {
        console.log("User List",this.userList)
      let filteredList = this.userList.filter(ele=>ele?.IsDesti==true);
        console.log(filteredList);
        if(filteredList.length!=0){
            for(let entry of filteredList){
                entry.IsDesti = false;
                this.includedUserList = [entry].concat(this.includedUserList);
                this.userList = this.userList.filter(item => item.id != entry.id);



            }
        }
    //   let obj:any = this.userList[index];
    //   if(obj){
    //     this.includedUserList.push(obj);
    //     this.userList.splice(index,1);
    //   }
    }
    if (arrayaside === 'left') {
        let filteredList = this.includedUserList.filter(ele=>ele.IsDesti==true);
        console.log(filteredList);
      if(filteredList.length!=0){
          for(let entry of filteredList){
              entry.IsDesti = false;
              this.userList = [entry].concat(this.userList);
              this.includedUserList = this.includedUserList.filter(item => item.id != entry.id);
          }
      }
    //   let obj:any = this.includedUserList[index];
    //   if(obj){
    //     this.userList.push(obj);
    //     this.includedUserList.splice(index,1);
    //   }
    }
  }
  onIssuerSelected(arrayaside: string){
    if (arrayaside === 'right') {
        let filteredList = this.issuerList.filter(ele=>ele.IsDesti==true);
          console.log(filteredList);
          if(filteredList.length!=0){
            let i=0;
              for(let entry of filteredList){
                  entry.IsDesti = false;
                  this.includedIssuerList = [entry].concat(this.includedIssuerList);
                  this.issuerList = this.issuerList.filter(item => item.id != entry.id);
                  i+=1;
                  if(i==filteredList.length){
                    console.log("Final Issuer",this.issuerList)
                  }
              }

          }
      //   let obj:any = this.userList[index];
      //   if(obj){
      //     this.includedUserList.push(obj);
      //     this.userList.splice(index,1);
      //   }
      }
      if (arrayaside === 'left') {
          let filteredList = this.includedIssuerList.filter(ele=>ele.IsDesti==true);
          console.log(filteredList);
        if(filteredList.length!=0){
            for(let entry of filteredList){
                entry.IsDesti = false;
                this.issuerList = [entry].concat(this.issuerList);
                this.includedIssuerList = this.includedIssuerList.filter(item => item.id != entry.id);
            }
        }
      //   let obj:any = this.includedUserList[index];
      //   if(obj){
      //     this.userList.push(obj);
      //     this.includedUserList.splice(index,1);
      //   }
      }
  }
  onMoveAll(arrayaside: string) {
    if (arrayaside === 'right') {
      this.includedUserList = [...this.includedUserList, ...this.userList];
      this.userList = [];
    }
    if (arrayaside === 'left') {this.userList = [...this.userList, ...this.includedUserList];
      this.includedUserList = [];
    }
  }
  onMoveIssuerAll(arrayaside: string) {
    if (arrayaside === 'right') {
      this.includedIssuerList = [...this.includedIssuerList, ...this.issuerList];
      this.issuerList = [];
    }
    if (arrayaside === 'left') {this.issuerList = [...this.issuerList, ...this.includedIssuerList];
      this.includedIssuerList = [];
    }
  }
  ongetBack(){
    this.router.navigate(['/Admin/issuerList/newIssuerDetails'])
  }
  onProceed(){
    let excludedList = [];
    if(this.includedUserList.length!=0){
        let i =0;
        for(let entry of this.includedUserList){
            if(entry.id){
              excludedList.push(entry.id);
            }

            i+=1;
            if(i==this.includedUserList.length){
                this.includeIssuerList(excludedList);
            }
        }
    }
    else{
        this.includeIssuerList(excludedList)
    }
    //excludedList = this.includedIssuerList.concat(this.includedUserList);

    //this.router.navigate(['/Admin/issuerList'])
  }
  includeIssuerList(excludedList){
      if(this.includedIssuerList.length!=0){
          let i=0;
          for(let entry of this.includedIssuerList){
              if (!excludedList.includes(entry.id)) {
                  excludedList.push(entry.id);

              }
              i+=1;
              if(i==this.includedIssuerList.length){
                  this.onSubmit(excludedList);
              }
          }
      }
      else{
          this.onSubmit(excludedList)
      }
  }
  onSubmit(excludedList){
    let ReqObj = {
        "LoginId": this.issuerLoginId,
        "MenuIds": excludedList
    }
    let urlLink = `${this.CommonApiUrl}admin/savemenuids`;
      this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
        (data: any) => {
          console.log(data);
          if(data.Result){
            // let type: NbComponentStatus = 'success';
            // const config = {
            //   status: type,
            //   destroyByClick: true,
            //   duration: 4000,
            //   hasIcon: true,
            //   position: NbGlobalPhysicalPosition.TOP_RIGHT,
            //   preventDuplicates: false,
            // };
            // this.toastrService.show(
            //   'Insurance Employee Details Inserted/Updated Successfully',
            //   'Insurance Employee Details',
            //   config);
              sessionStorage.removeItem('issuerTypeDetails');
              this.router.navigate(['/Admin/issuerList'])
          }
          else if(data.ErrorMessage){
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
            console.log("Error Iterate",data.ErrorMessage)
            //this.loginService.errorService(data.ErrorMessage);
          }
        },
        (err) => { },
    );
  }
}
