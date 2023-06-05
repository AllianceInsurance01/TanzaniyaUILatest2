import { Component } from '@angular/core';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'formly-field-stepper',
  template: `
    <mat-horizontal-stepper>
      <mat-step *ngFor="let step of field.fieldGroup; let index = index; let last = last">
        <ng-template matStepLabel>{{ step.props.label }}</ng-template>
        <formly-field [field]="step"></formly-field>

        <div class="text-center">
        <button matStepperPrevious *ngIf="index === 0" class="btn btn-danger" routerLink="/Home/customer" type="button"><<&nbsp;Back</button>&nbsp;
        <router-outlet> </router-outlet>
          <button matStepperPrevious *ngIf="index !== 0" class="btn btn-danger" type="button"><<&nbsp;Back</button>&nbsp;

          <button matStepperNext *ngIf="!last" class="btn btn-primary" type="button" [disabled]="!isValid(step)">
            Next
          </button>

          <button *ngIf="last" class="btn btn-primary" [disabled]="!form.valid" type="submit">Submit</button>
        </div>
      </mat-step>
    </mat-horizontal-stepper>
  `,
})
export class FormlyFieldStepper extends FieldType {

 
  isValid(field: FormlyFieldConfig): boolean {
    if (field.key) {
      return field.formControl.valid;
    }

    return field.fieldGroup ? field.fieldGroup.every((f) => this.isValid(f)) : true;
  }
  /*prevStep(step) {
    this.Router.navigate(['/Home/customer/'])
    //this.activedStep = step - 1;
  }*/
}


/**  Copyright 2021 Formly. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://github.com/ngx-formly/ngx-formly/blob/main/LICENSE */
