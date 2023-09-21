import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
 selector: 'display',
 template: `
       <label class="input-form-label" ><b>{{to.label}}</b></label>
       <div class="row">
              <div class="col-md-6 col-lg-6 col-xl-6" *ngFor="let option of to.options">
                     <div class="d-flex flex-row" >
                            <div style="margin:8px !important">
                                   <input type="radio" class="customRadioButton"
                                   [name]="to.name"
                                   [formControl]="formControl" 
                                   [formlyAttributes]="field"
                                   [value]="option.value">
                            </div>
                            <div class="customRadioBox d-flex flex-row" style="flex-wrap:wrap !important">
                            
                                   <ng-container *ngFor="let val of option.list">
                                   <div class="input-form-radio-box mt-1">
                                          <div class="radio-toolbar" style="min-width:auto !important;">
                                                 <label class="yes_alt">{{val}}</label>
                                          </div>   
                                   </div>&nbsp;&nbsp;
                                   </ng-container>
                            </div>
                     </div>  
              </div>
       </div>
 `,
})
export class RadioList extends FieldType {
    
}