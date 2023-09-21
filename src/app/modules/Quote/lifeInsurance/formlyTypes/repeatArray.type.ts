import { Component } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';

@Component({
  selector: 'formly-repeat-section',
  template: `
  
    <div *ngFor="let field of field.fieldGroup; let i = index;" class="row">
      <formly-field class="col" [field]="field"></formly-field>
      <div class="col-sm-2 d-flex align-items-center" >
        <button class="btn btn-danger mt-3" type="button" *ngIf='i!=0' (click)="remove(i)">&nbsp;<i class="fa fa-trash"></i>&nbsp;</button>
      </div>
    </div>
    <div class="justify-content-end d-flex">
        <div >
            <button class="btn btn-primary" type="button" *ngIf="endorsementId!=850 && endorsementId!=846" (click)="add()"><i class="fa fa-plus"></i>&nbsp;Add Employees</button>
        </div>
    </div>
  `,
})
export class RepeatTypeComponent extends FieldArrayType {
  endorsementSection:boolean=false;
  endorsementId: any=null;
  constructor(){
    super();
    let endorsementDetails = JSON.parse(sessionStorage.getItem('endorseTypeId'));
    console.log("Endorsements",endorsementDetails);
    if(endorsementDetails){
      this.endorsementSection = true;
      this.endorsementId = endorsementDetails?.EndtTypeId
    }
  }
}