import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
       selector: 'display',
       template: `
              <div class="input-control-container mt-3">
                     <label class="input-form-label">{{to.label}}</label>
                     <ng-select class="input-form-select" appendTo="body" [formControl]="formControl"   [items]="to.options" bindValue="value" bindLabel="label">
                    </ng-select>
              </div> 
 `,
})
export class NgSelect extends FieldType {

}