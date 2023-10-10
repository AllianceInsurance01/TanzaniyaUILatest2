import { FormlyJsonschema } from "@ngx-formly/core/json-schema";
import { SharedService } from "src/app/shared/shared.service";
import { UpdateCustomerDetailsComponent } from "../../update-customer-details.component";
import { ForceLengthValidators } from "../personal-quote-details/personal-quote-details.component";
import { FormlyFieldConfig } from "@ngx-formly/core";

export class FireAlliedPerils{
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
            props: { label: 'Fire & Allied Perils' },
            fieldGroup: [
              {
                fieldGroupClassName: 'row',
                fieldGroup: [
                  {
                    className: 'col-4 col-lg-4 col-md-4 offset-2',
                    type: 'ngselect',
                    key: 'IndemityPeriod',
                    props: {
                      label: 'Indemity Period',
                      disabled: this.checkDisable('IndemityPeriod'),
                      required: true,
                      options: [
                      ],
                    },
                    expressions: {
      
                    },
                  },
      
                  
                  
                  {
                    className: 'col-4 col-lg-4 col-md-4',
                    type: 'commaSeparator',
                    key: 'BuildingSuminsured',
      
                    props: {
                      label: `Building Value`,
                      disabled: this.checkDisable('SumInsured'),
                      required: true,
                      options: [
      
                      ],
      
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
                    className: 'col-6 col-lg-6 col-md-6 offset-2',
                    key: 'MakutiYn',
                    type: 'radio',
                    templateOptions: {
                      type: 'radio',
                      label: 'Makuti',
                      required: true,
                      disabled: this.checkDisable('MakutiYn'),
                      name: 'MakutiYn',
                      options: [{ value: 'Y', label: 'Yes' },{ value: 'N', label: 'No' }],
                    }
                  },
                ]
              }
            ]
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