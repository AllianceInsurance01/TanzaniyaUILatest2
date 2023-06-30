import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';
import { PersonalQuoteDetailsComponent } from './Components/personal-quote-details/personal-quote-details.component';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'formly-field-tabs',
  template: `
    <mat-tab-group [(selectedIndex)]="selectedIndex" #tabs>
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
                <div class="text-center mt-2 mb-2">
                <button type="button" class="btn btn-danger" routerLink="/Home/existingQuotes/customerSelection/customerDetails/risk-selection">Back</button>&nbsp;
                <button type="button" class="btn btn-danger" (click)="previousStep()">Back</button>&nbsp;
                <button  class="btn btn-primary" (click)="nextProceed()">Next</button>
                <button  class="btn btn-primary" (click)="nextProceed()">Submit</button>
            </div>
            </div>
        </div>    
      </mat-tab>
    </mat-tab-group>
  `,
})
export class FormlyFieldTabs extends FieldType implements OnInit {
    selectedIndex: any = 0;
    @ViewChild('tabs', { static: false }) tabGroup:MatTabGroup;
    public parentClass:PersonalQuoteDetailsComponent;
    constructor(){
      super();
      
    }
    ngOnInit(): void {
      this.selectedIndex = 0;
    }
    getSelectedIndex(){
      return this.selectedIndex;
    }
    nextStep(tab,type) {
        
    }
    onProceed(){
      this.parentClass.onNextProceed();
    }
    nextProceed(){
        this.selectedIndex += 1;
        console.log("Final Tab Group",this.selectedIndex,this.tabGroup)
    }
    previousStep(){
      console.log("Previous Called",this.selectedIndex)
        if (this.selectedIndex != 0) {
          this.selectedIndex = this.selectedIndex - 1;
          alert("Reduced")
        }
    }
  isValid(field: FormlyFieldConfig): boolean {
    if (field.key) {
      return field.formControl.valid;
    }
    return field.fieldGroup ? field.fieldGroup.every((f) => this.isValid(f)) : true;
  }
}