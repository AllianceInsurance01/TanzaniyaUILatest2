import { FormlyJsonschema } from "@ngx-formly/core/json-schema";
import { SharedService } from "src/app/shared/shared.service";
import { UpdateCustomerDetailsComponent } from "../../update-customer-details.component";
import { ForceLengthValidators } from "../personal-quote-details/personal-quote-details.component";
import { FormlyFieldConfig } from "@ngx-formly/core";

export class FireAndMaterialDamage{
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
          props: { label: 'Fire And Material Damage' },
          fieldGroup: [
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-4 col-lg-4 col-md-4 offset-2',
                  type: 'commaSeparator',
                  key: 'BuildingSuminsured',
                  props: {
                    label: 'Building SI',
                    disabled: this.checkDisable('Building'),
                    required: true,
                    options: [
                    ],
                    // validators: {
                    //   validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                    // },
                    // hooks: {
                    // },
                    // expressions: {
                    // },
                  },
                },
                {
                  className: 'col-4 col-lg-4 col-md-4',
                  type: 'commaSeparator',
                  key: 'FirePlantSi',
                  props: {
                    label: `Plant SI`,
                    // disabled: this.checkDisable('BuildingSuminsured'),
                    required: true,
                    options: [
                    ],
                    // validators: {
                    //   validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                    // },
                    // hooks: {
                    // },
                    // expressions: {
                    // },
    
                  },
    
                },
                {
                  className: 'col-4 col-lg-4 col-md-4 offset-2',
                  type: 'commaSeparator',
                  key: 'FireEquipSi',
                  props: {
                    label: `Equipment SI`,
                    disabled: this.checkDisable('EquipmentMachinery'),
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
                  className: 'col-4 col-lg-4 col-md-4',
                  type: 'commaSeparator',
                  key: 'FireStockSi',
                  templateOptions: {
                    label: 'Stock SI',
                    required: true,
                  },
                 
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