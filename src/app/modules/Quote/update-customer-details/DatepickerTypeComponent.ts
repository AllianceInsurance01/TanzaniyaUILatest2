import { Component, ViewChild } from '@angular/core';
import { FieldType } from '@ngx-formly/core';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-form-datepicker-type',
  template: `
  <mat-form-field>
    <input matInput
      
      [formControl]="formControl"
      [matDatepicker]="picker"
      [matDatepickerFilter]="to.datepickerOptions.filter"
      [min]="to.datepickerOptions.min"
      [max]="to.datepickerOptions.max"
      [formlyAttributes]="field">
    
      <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
    
    <mat-datepicker #picker></mat-datepicker>
</mat-form-field>
  `,
})
export class DatepickerTypeComponent extends FieldType {
  // Optional: only if you want to rely on `MatInput` implementation
  @ViewChild(MatInput) formFieldControl: MatInput;

    constructor() {
    super();
  }
}
