import { Component } from '@angular/core';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'formly-field-stepper',
  template: `
    <mat-vertical-stepper fxLayout="column">
      <mat-step *ngFor="let step of field.fieldGroup; let index = index; let last = last">
        <ng-template matStepLabel>{{ step.props.label }}</ng-template>
        <formly-field [field]="step"></formly-field>

        <div class="text-center">
        <!--<button matStepperPrevious *ngIf="index === 0" class="maan-btn maan-btn-red maan-button-data" routerLink="/Home/existingQuotes/customerSelection/customerDetails/customer-details" type="button"><<&nbsp;Back</button>&nbsp;-->
        <router-outlet> </router-outlet>
          <button matStepperPrevious *ngIf="index !== 0" class="maan-btn maan-btn-red maan-button-data" type="button" (click)="onCheckProceed(index)"><<&nbsp;Back</button>&nbsp;
          <button matStepperNext *ngIf="!last" class="maan-btn btn-primary maan-button-data" type="button" (click)="onSkipForm(step);onCheckProceed(last)">
          Skip
        </button>&nbsp;
        <button matStepperNext *ngIf="field.fieldGroup.length!=1 && last" class="maan-btn maan-button-data btn-primary spancommon" type="submit" >
          Skip & Proceed
        </button>&nbsp;
          <button matStepperNext *ngIf="!last" class="maan-btn btn-primary maan-button-data" type="button" (click)="onCheckProceed(index)">
            Next
          </button>

          <button *ngIf="last" class="maan-btn btn-primary maan-button-data" [disabled]="!isValid(step)" type="submit">Submit</button>
        </div>
      </mat-step>
    </mat-vertical-stepper>
    <!-- <div class="text-center">
      <button *ngIf="enableProceed" class="custom-btn btn-5 mr-2" type="button" routerLink="/Home/existingQuotes/customerSelection/customerDetails/customer-details"><<&nbsp;Back</button>
      <button *ngIf="enableProceed" class="custom-btn btn-6 maan-button-data" type="submit">Proceed</button>
    </div> -->
  `,
})
export class FormlyFieldStepper extends FieldType {
  enableProceed: boolean = true;;
 
  isValid(field: FormlyFieldConfig): boolean {
    
    if (field.key) {
      return field.formControl.value!='';
    }
    return field.fieldGroup ? field.fieldGroup.every((f) => this.isValid(f)) : true;
  }
  onSkipForm(field: FormlyFieldConfig){
        console.log("Form Value",field.fieldGroup[0]?.form?.value);
        
  }
  onCheckProceed(index){
    if(index == this.field.fieldGroup.length-1) this.enableProceed = false;
    else this.enableProceed = true;
  }
  checkStepper(){
      
  }
  /*prevStep(step) {
    this.Router.navigate(['/Home/customer/'])
    //this.activedStep = step - 1;
  }*/
}


/**  Copyright 2021 Formly. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://github.com/ngx-formly/ngx-formly/blob/main/LICENSE */
