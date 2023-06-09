import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'app-table-type',
  template: `
    <table class="table table-bordered">
      <thead>
        <tr>
          <ng-container *ngFor="let column of field.fieldGroup;let i = index">
              <ng-container *ngIf="i==0">
                  <th *ngFor="let row of column.fieldGroup">
                  {{ row.props.label }}
                  </th>
              </ng-container>
          </ng-container>
          
        </tr>
      </thead>
      <tbody>
        <ng-container *ngFor="let row of field.fieldGroup;let i = index">
            <ng-container *ngIf="i!=0">
              <tr *ngFor="let column of row.fieldGroup; let j = index;" style="border-bottom:1px black !important;background-color:white !important">
                <td *ngFor="let subColumn of column.fieldGroup;let k=index;">
                  <formly-field [field]="subColumn"></formly-field>
                </td>
              </tr>
            </ng-container>
        </ng-container>
      <!--<tr *ngFor="let row of field.fieldGroup; let i = index;" style="border-bottom:1px black !important;background-color:white !important">
          <td *ngFor="let column of row.fieldGroup;let j=index;">
            <formly-field [field]="column"></formly-field>
          </td>
        </tr>-->
      </tbody> 
    </table>
  `,
})
export class TableTypeComponent extends FieldType {}
