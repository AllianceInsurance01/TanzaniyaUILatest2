import { Component, OnInit } from '@angular/core';
//import { NbComponentStatus, NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
import * as Mydatas from '../../../../app-config.json';
import { SharedService } from 'src/app/shared/shared.service';
import { NewDocumentDetailsComponent } from '../new-document-details/new-document-details.component';

@Component({
  selector: 'app-existing-document',
  templateUrl: './existing-document.component.html',
  styleUrls: ['./existing-document.component.scss']
})
export class ExistingDocumentComponent implements OnInit {

  activeMenu='Document';
  public documentData:any[]=[];
  documentHeader:any[]=[];
  DocumentId:any;
  public AppConfig: any = (Mydatas as any).default;
  public ApiUrl1: any = this.AppConfig.ApiUrl1;
  constructor(private router:Router,
    private sharedService: SharedService) {
      this.DocumentId = sessionStorage.getItem('DocumentId');


   }

  ngOnInit(): void {
    sessionStorage.removeItem('DocumentId')
    this.documentHeader = [
      { key: 'DocumentName', display: 'Document Name' },
      { key: 'DocumentDesc', display: 'Document Desc' },
      { key: 'CoreAppCode', display: 'Core App Code' },
      { key: 'EffectiveDateStart', display: 'Date Start' },
      { key: 'Status', display: 'Status' },
      {
        key: 'actions',
        display: 'Action',
        config: {
          isEdit: true,
        },
      },
    ];
    this.getExistingDocument();
  }
  onAddDocument(){
    let ReqObj ={
      "DocumentId":null,
    }
    sessionStorage.setItem('DocumentId',JSON.stringify(ReqObj));
    this.router.navigate(['/Admin/globalConfigure/newDocumentDetails'])
  }
  onEditDocument(event){
   let ReqObj ={
    "DocumentId":event.DocumentId,
   }
   sessionStorage.setItem('DocumentId',JSON.stringify(ReqObj));
   this.router.navigate(['/Admin/globalConfigure/newDocumentDetails'])
  }
  EditStatus(event){
    let ReqObj = {
      "DocumentId":event.DocumentId,
      "Status":event.ChangedStatus,
      "EffectiveDateStart":event.ChangeEffectiveDate
    }
    let urlLink = `${this.ApiUrl1}master/document/changestatus`;
    this.sharedService.onPostMethodSync(urlLink, ReqObj).subscribe(
      (data:any) => {
        console.log(data);
        let res:any=data;
        if(data.Result){
          // let type: NbComponentStatus = 'success';
          //       const config = {
          //         status: type,
          //         destroyByClick: true,
          //         duration: 4000,
          //         hasIcon: true,
          //         position: NbGlobalPhysicalPosition.TOP_RIGHT,
          //         preventDuplicates: false,
          //       };
          //       this.toastrService.show(
          //         'Status Changed Successfully',
          //         'Status Updated',
          //         config);
                  this.getExistingDocument();
                //window.location.reload()
        }
      },
      (err) => { },
    );
  }
  onRedirect(value){
    this.activeMenu = value;
    if(this.activeMenu=='Cover') this.router.navigate(['/Admin/globalConfigure/existingCovers']);
    if(value=='Product') this.router.navigate(['/Admin/globalConfigure']);
    if(value=='Section') this.router.navigate(['/Admin/globalConfigure/existingSections']);
    if(value=='Referral') this.router.navigate(['/Admin/globalConfigure/existingReferral']);
    if(value=='Document') this.router.navigate(['/Admin/globalConfigure/existingDocument']);
    if(value=='Rating') this.router.navigate(['/Admin/globalConfigure/existingRating']);
  }
  getExistingDocument(){
    let urlLink = `${this.ApiUrl1}master/getalldocuments`;
    this.sharedService.onGetMethodSync(urlLink).subscribe(
      (data: any) => {
        console.log(data);
        if(data.Result){
            this.documentData = data?.Result;
        }
      },
      (err) => { },
    );
  }
}


