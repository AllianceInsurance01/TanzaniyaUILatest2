import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
 selector: 'display',
 template: `
 <div style="margin-top: 10px !important;margin-left: 10px !important;line-height: 1.5!important;">
        <h5>{{field.templateOptions.label}}</h5>
 </div>

 `,
})
export class DisplayLabel extends FieldType {
    
}