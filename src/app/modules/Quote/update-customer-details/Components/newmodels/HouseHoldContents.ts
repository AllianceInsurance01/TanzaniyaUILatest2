import { FormlyJsonschema } from "@ngx-formly/core/json-schema";
import { SharedService } from "src/app/shared/shared.service";
import { UpdateCustomerDetailsComponent } from "../../update-customer-details.component";
import { ForceLengthValidators } from "../personal-quote-details/personal-quote-details.component";
import { FormlyFieldConfig } from "@ngx-formly/core";

export class HouseHoldContentsss{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;
    enableFieldsList: any[]=[];finalizeYN: any='N';
    subuserType: any=null;
    constructor() {
        let finalize = sessionStorage.getItem('FinalizeYN');
        if(finalize) this.finalizeYN = finalize;
        this.subuserType = sessionStorage.getItem('typeValue');
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
        this.fields={
          props: { label: 'Contents Risk' },
          fieldGroup: [
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-12 col-md-6 col-lg-3',
                  type: 'commaSeparator',
                  key: 'PaitingsSi',
    
                  props: {
                    label: `Paintings SumInsured`,
                    disabled: this.checkDisable('PaitingsSi'),
                    //required: true,
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
                  className: 'col-12 col-md-6 col-lg-3',
                  type: 'commaSeparator',
                  key: 'CarpetsSi',
    
                  props: {
                    label: `Carpets SumInsured`,
                    disabled: this.checkDisable('PaitingsSi'),
                    //required: true,
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
                  className: 'col-12 col-md-6 col-lg-3',
                  type: 'commaSeparator',
                  key: 'JewellerySi',
    
                  props: {
                    label: `Jewellery SumInsured`,
                    disabled: this.checkDisable('PaitingsSi'),
                    //required: true,
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
                  className: 'col-12 col-md-6 col-lg-3',
                  type: 'commaSeparator',
                  key: 'EquipmentSis',
    
                  props: {
                    label: `Equipment SumInsured`,
                    disabled: this.checkDisable('EquipmentSis'),
                    //required: true,
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
              ]
            }
          ]
        }
    }
  fields:FormlyFieldConfig;
    getFieldDetails(){return this.fields; }
    checkDisable(fieldName) {
        if (this.endorsementSection) {
          let entry = this.enableFieldsList.some(ele => ele == fieldName);
          console.log("Entry ", fieldName, entry)
          return !entry;
        }
        else if(this.subuserType=='low') return this.finalizeYN=='Y'; 
        else return false;
      
      }
}