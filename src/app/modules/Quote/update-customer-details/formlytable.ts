import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'app-tables-type',
  template: `
    <div class="row">
      <div>
      <ng-container *ngFor="let row of field.fieldGroup;let i = index">
      <ng-container *ngIf="i!=0">
      <div class="row">
          <div *ngFor="let column of row.fieldGroup; let j = index;" class="slider-main">
        <!--<span class="splitCardHeader"> {{ column.props.label }}</span>-->
          <div *ngFor="let subColumn of column.fieldGroup;let k=index;">
            <formly-field [field]="subColumn"></formly-field>
          </div>
        </div>
        </div>
      </ng-container>
  </ng-container>
      </div>
    </div>
  `,
  styles: ['@media screen and (min-width: 280px) and (max-width: 750px){.slider-main {box-shadow: 1px 1px 8px rgba(0,0,0,.1);padding:10px;text-align: center;margin-top: 20px;width:92% !important;}}','@media screen and (min-width: 1024px) and (max-width: 4000px){.slider-main {box-shadow: 1px 1px 8px rgba(0,0,0,.1);padding:10px;text-align: center;margin-top: 20px;margin-left:10px !important; width:22% !important;}}',
'@media screen and (min-width: 768px) and (max-width: 1024px){.slider-main {box-shadow: 1px 1px 8px rgba(0,0,0,.1);padding:10px;text-align: center;margin-top: 20px;width:30% !important;}}']

})
export class TablesTypeComponent extends FieldType {}