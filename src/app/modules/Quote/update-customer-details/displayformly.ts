import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
 selector: 'displays',
 template: `
 <div style="font-size:0.90rem!important;font-weight:700;font-family: 'Inter', sans-serif !important;display: block !important; padding-left: 3px !important;padding:7px !important;margin-left:-5px !important;cursor: pointer !important;background: #e3e0e0 !important;color: #6f6c6c !important;margin-top:-9px !important;">
        <span>{{field.templateOptions.label}}</span>
 </div>
 `,
})
export class DisplayLabels extends FieldType {
    
}