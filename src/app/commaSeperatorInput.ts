import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
 selector: 'formly-field-input',
 template: `
   <input 
        type="input" class="customInput"
        [formControl]="formControl" 
        [formlyAttributes]="field"
        mask="separator" thousandSeparator=","
        >
 `,
})
export class CommaSeparatorInput extends FieldType {
    
}