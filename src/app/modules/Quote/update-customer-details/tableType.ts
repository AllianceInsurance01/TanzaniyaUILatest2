import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'app-table-type',
  template: `
    <div class="row">
      <div class="col-md-10 col-lg-10 col-xl-10 offset-1">
        <table class="table table-bordered" >
          <thead style="background-color: #333b85;color:#fff;">
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
          <tbody style="background-color: #b3c6d6 !important;">
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
      </div>
    </div>
  `,
})
export class TableTypeComponent extends FieldType {}
