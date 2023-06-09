import { FormlyJsonschema } from "@ngx-formly/core/json-schema";
import { SharedService } from "src/app/shared/shared.service";
import { UpdateCustomerDetailsComponent } from "../../update-customer-details.component";
import { ForceLengthValidators } from "../personal-quote-details/personal-quote-details.component";
import { FormlyFieldConfig } from "@ngx-formly/core";

export class Money{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;
    enableFieldsList: any[]=[];
    constructor() {
        this.customerDetails = JSON.parse(sessionStorage.getItem('customerDetails'));
        let commonDetails = JSON.parse(sessionStorage.getItem('homeCommonDetails'));
        if (commonDetails) this.commonDetails = commonDetails;
        if (sessionStorage.getItem('endorsePolicyNo')) {
            this.endorsementSection = true;
            let endorseObj = JSON.parse(sessionStorage.getItem('endorseTypeId'))
            if (endorseObj) {
              this.enableFieldsList = endorseObj.FieldsAllowed;
            }
        }
        this.fields = {
          props: { label: 'Money' },
          fieldGroup: [
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'offset-1 col-5',
                  type: 'commaSeparator',
                  key: 'MoneyInSafeBusiness',
                  templateOptions: {
                    label: `Money In Safe During Working Hours (${this.commonDetails[0].Currency})`,
                    disabled: this.checkDisable('MoneyInSafeBusiness')
                  },
                  validators: {
                    validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                  },
                  hooks: {
                  },
  
                  expressions: {
                    
                  },
                },
                {
                  className: 'offset-1 col-5',
                  type: 'commaSeparator',
                  key: 'MoneyOutSafeBusiness',
                  templateOptions: {
                    label: `Money In Safe Outside Working Hours (${this.commonDetails[0].Currency})`,
                    disabled: this.checkDisable('MoneyOutSafeBusiness')
                  },
                  validators: {
                    validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                  },
                  hooks: {
                  },
  
                  expressions: {
                    
                  },
                },
                {
                  className: 'offset-1 col-5',
                  type: 'commaSeparator',
                  key: 'MoneyInPremises',
                  templateOptions: {
                    label: `Money In Residence Of Director And Partner (${this.commonDetails[0].Currency})`,
                    disabled: this.checkDisable('MoneyInPremises')
                  },
                  validators: {
                    validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                  },
                  hooks: {
                  },
  
                  expressions: {
                    
                  },
                },
                {
                  className: 'offset-1 col-5',
                  type: 'commaSeparator',
                  key: 'CashInTransit',
                  templateOptions: {
                    label: `Cash In Transit Limit (${this.commonDetails[0].Currency})`,
                    disabled: this.checkDisable('CashInTransit')
                  },
                  validators: {
                    validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                  },
                  hooks: {
                  },
  
                  expressions: {
                    
                  },
                },
                {
                  className: 'offset-1 col-5',
                  type: 'commaSeparator',
                  key: 'CashInHandEmployees',
                  templateOptions: {
                    label: `Money in Custody Of Collectors (${this.commonDetails[0].Currency})`,
                    disabled: this.checkDisable('CashInHandEmployees')
                  },
                  validators: {
                    validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                  },
                  hooks: {
                  },
  
                  expressions: {
                    
                  },
                },
                {
                  className: 'offset-1 col-5',
                  type: 'commaSeparator',
                  key: 'CashInSafe',
                  templateOptions: {
                    label: `Money - Value Of Safe (${this.commonDetails[0].Currency})`,
                    disabled: this.checkDisable('CashInSafe')
                  },
                  validators: {
                    validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                  },
                  hooks: {
                  },
  
                  expressions: {
                    
                  },
                },
  
                {
                  className: 'offset-1 col-5',
                  type: 'commaSeparator',
                  key: 'MoneyAnnualcarrySuminsured',
                  templateOptions: {
                    label: `Estimated Annual Cash Carrying (${this.commonDetails[0].Currency})`,
                    disabled: this.checkDisable('MoneyAnnualcarrySuminsured')
                  },
                  validators: {
                    validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                  },
                  hooks: {
                  },
  
                  expressions: {
                    
                  },
                },
  
              ]
            },
  
          ],
        }
    }
    fields:FormlyFieldConfig;
    checkDisable(fieldName) {
        console.log("Disable Check", fieldName);
        if (this.endorsementSection) {
          let entry = this.enableFieldsList.some(ele => ele == fieldName);
          console.log("Entry ", fieldName, entry)
          return !entry;
        }
        else return false;
      
      }
}