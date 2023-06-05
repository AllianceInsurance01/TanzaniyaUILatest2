import { Component } from '@angular/core';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-tabs',
  template: `
    <mat-tab-group [selectedIndex]="selectedIndex">
      <mat-tab *ngFor="let tab of field.fieldGroup; let i = index; let last = last" [label]="tab.props.label">
        <div class="maan-grid-item">
                <div class="maan-grid-item-title">
                    <div class="d-flex justify-content-between">
                        <div>
                            <span class="mx-0">
                                <span class="spancommon span_font_size" style="font-weight:600">{{tab.props.label}}</span>
                            </span>
                        </div>
                        <div>
                            <button class="btn btn-danger p-1"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                </div>
            <div class="maan-grid-body">
                <formly-field [field]="tab"></formly-field>
                <div class="text-center">
                        <button type="button" *ngIf="i==0" class="btn btn-danger" routerLink="/Home/existingQuotes/customerSelection/customerDetails/risk-selection">Back</button>&nbsp;
                        <button type="button" *ngIf="i!=0" class="btn btn-danger" (click)="previousStep()">Back</button>&nbsp;
                        <button *ngIf="!last" class="btn btn-primary" (click)="nextStep()" type="button">Next</button>
                        <button *ngIf="last" class="btn btn-primary" [disabled]="!form.valid" type="submit">Submit</button>
                </div>
            </div>
        </div>    
      </mat-tab>
    </mat-tab-group>
  `,
})
export class FormlyFieldTabs extends FieldType {
    selectedIndex: number = 0;

    nextStep() {
        if (this.selectedIndex != this.field.fieldGroup.length) {
            this.selectedIndex = this.selectedIndex + 1;
        }
        console.log(this.selectedIndex);
    }
    previousStep(){
        if (this.selectedIndex != 0) {
            this.selectedIndex = this.selectedIndex - 1;
        }
    }
  isValid(field: FormlyFieldConfig): boolean {
    if (field.key) {
      return field.formControl.valid;
    }

    return field.fieldGroup ? field.fieldGroup.every((f) => this.isValid(f)) : true;
  }
}