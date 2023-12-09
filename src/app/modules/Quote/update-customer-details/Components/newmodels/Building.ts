import { FormlyJsonschema } from "@ngx-formly/core/json-schema";
import { UpdateCustomerDetailsComponent } from "../../update-customer-details.component";
import { ForceLengthValidators } from "../personal-quote-details/personal-quote-details.component";
import { FormlyFieldConfig } from "@ngx-formly/core";

export class Buildingss{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;
    enableFieldsList: any[]=[];
  finalizeYN: any='N';
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
          props: { label: 'Building Risk' },
  
          fieldGroup: [
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-12 col-md-6 col-lg-4',
                  type: 'ngselect',
                  key: 'BuildingUsageId',
                  props: {
                    label: 'Building Usage',
                    //hideExpression: "model.BuildingOwnerYn =='N'",
                    disabled: this.checkDisable('BuildingUsageId'),
                    required: true,
                    options: [
                    ],
                  },
                  expressions: {
  
                  },
                },
                {
                  className: 'col-12 col-md-6 col-lg-2',
                  type: 'input',
                  key: 'BuildingBuildYear',
                  props: {
                    label: 'Built Year',
                    placeholder: "YYYY",
                    required: false,
                    maxLength: 4,
                    pattern: /[0-9]+/gm,
                    disabled: this.checkDisable('BuildingBuildYear'),
                    options: [
                    ],
                  },
                  validation: {
                    messages: {
                    },
                  },
                  expressions: {
  
                  },
                },
                {
                  className: 'col-12 col-md-6 col-lg-3',
                  type: 'ngselect',
                  key: 'WallType',
                  props: {
                    label: 'Construction (Wall)',
                    disabled: this.checkDisable('WallType'),
                    required: false,
                    options: [
                    ],
                  },
                  expressions: {
  
                  },
                },
                {
                  className: 'col-12 col-md-6 col-lg-3',
                  type: 'ngselect',
                  key: 'RoofType',
                  props: {
                    label: 'Construction (Roof)',
                    disabled: this.checkDisable('RoofType'),
                    required: false,
                    options: [
                    ],
                  },
                  expressions: {
  
                  },
                },
                {
                  className: 'col-12 col-md-6 col-lg-3',
                  type: 'ngselect',
                  key: 'TypeOfProperty',
                  props: {
                    label: 'Type Of Property',
                    display:'',
                    disabled: this.checkDisable('TypeOfProperty'),
                    required: true,
                    options: [
                    ],
                  },
                  expressions: {
  
                  },
                },
                {
                  className: 'col-12 col-md-6 col-lg-3',
                  type: 'commaSeparator',
                  key: 'BuildingSuminsured',
                  templateOptions: {
                    label: `Building Sum Insured (${this.commonDetails[0].Currency})`,
                    required: true,
                    disabled: this.checkDisable('BuildingSuminsured'),
                  },
                  validators: {
                  },
                  hooks: {
  
                  },
  
                  expressions: {
                    
                  },
                },
                {
                  className: 'col-12 col-md-6 col-lg-3',
                  type: 'commaSeparator',
                  key: 'WaterTankSi',
                  templateOptions: {
                    label: `WaterTank SumInsured`,
                    disabled: this.checkDisable('WaterTankSi')
                  },
                  validators: {
                  },
                  hooks: {
  
                  },
                },
                {
                  className: 'col-12 col-md-6 col-lg-3',
                  type: 'commaSeparator',
                  key: 'LossOfRentSi',
                  templateOptions: {
                    label: `Loss Of Rent SumInsured`,
                    disabled: this.checkDisable('LossOfRentSi')
                  },
                  validators: {
                  },
                  hooks: {
  
                  },
  
                },
                {
                  className: 'col-12 col-md-6 col-lg-3',
                  type: 'commaSeparator',
                  key: 'ArchitectsSi',
                  templateOptions: {
                    label: `Architects SumInsured`,
                    disabled: this.checkDisable('ArchitectsSi')
                  },
                  validators: {
                  },
                  hooks: {
  
                  },

                }
  
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