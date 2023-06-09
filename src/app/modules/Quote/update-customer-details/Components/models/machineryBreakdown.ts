import { FormlyJsonschema } from "@ngx-formly/core/json-schema";
import { SharedService } from "src/app/shared/shared.service";
import { UpdateCustomerDetailsComponent } from "../../update-customer-details.component";
import { ForceLengthValidators } from "../personal-quote-details/personal-quote-details.component";
import { FormlyFieldConfig } from "@ngx-formly/core";

export class MachineryBreakDown{
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
          props: { label: 'Machinery BreakDown' },
          fieldGroup: [
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                 className: 'offset-1 col-5',
                  type: 'commaSeparator',
                  
                  key: 'PowerPlantSi',
                  templateOptions: {
                    label: `Power Plant Suminsured (${this.commonDetails[0].Currency})`,
                    disabled: this.checkDisable('PowerPlantSi')
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
                  key: 'ElecMachinesSi',
                  templateOptions: {
                    label: `Electrical Machines Suminsured (${this.commonDetails[0].Currency})`,
                    disabled: this.checkDisable('ElecMachinesSi')
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
                  key: 'EquipmentSi',
                  templateOptions: {
                    label: `Equipments Suminsured (${this.commonDetails[0].Currency})`,
                    disabled: this.checkDisable('EquipmentSi')
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
                  key: 'MachineEquipSi',
                  templateOptions: {
                    label: `Elelctronic Equipment Suminsured (${this.commonDetails[0].Currency})`,
                    disabled: this.checkDisable('MachineEquipSi')
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
                  key: 'GeneralMachineSi',
                  templateOptions: {
                    label: `General Machines Suminsured (${this.commonDetails[0].Currency})`,
                    disabled: this.checkDisable('GeneralMachineSi')
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
                  key: 'ManuUnitsSi',
                  templateOptions: {
                    label: `Manufacturing Units Suminsured (${this.commonDetails[0].Currency})`,
                    disabled: this.checkDisable('ManuUnitsSi')
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
                  key: 'BoilerPlantsSi',
                  templateOptions: {
                    label: `Boiler And Pressur Plants  Suminsured (${this.commonDetails[0].Currency})`,
                    disabled: this.checkDisable('BoilerPlantsSi')
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