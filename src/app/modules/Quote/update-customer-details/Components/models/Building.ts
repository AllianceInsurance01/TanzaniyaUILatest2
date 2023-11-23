import { FormlyJsonschema } from "@ngx-formly/core/json-schema";
import { UpdateCustomerDetailsComponent } from "../../update-customer-details.component";
import { ForceLengthValidators } from "../personal-quote-details/personal-quote-details.component";
import { FormlyFieldConfig } from "@ngx-formly/core";

export class Building{
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
                  className: 'col-12 col-md-6 col-lg-4',
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
                  className: 'col-12 col-md-6 col-lg-4',
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
                  className: 'col-12 col-md-6 col-lg-4',
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
               
                // {
                //   className: 'col-6',
                //   key: 'OutbuildConstructType',
                //   type: 'radio',
                //   templateOptions: {
                //     type: 'radio',
                //     label: 'How Are The Outbuildings (if any) Constructed?',
                //     required: true,
                //     disabled: this.checkDisable('OutbuildConstructType'),
                //     name: 'OutbuildConstructType',
                //     options: [{ value: 'W', label: 'Wall' }, { value: 'R', label: 'Roof' }]
                //   }
                // },
  
                // {
                //   className: 'col-6',
                //   type: 'number',
                //   key: 'BuildingFloors',
                //   props: {
                //   label: 'What Is its Height In Storeys?',
                //   disabled: this.checkDisable('BuildingFloors'),
                //   required: false,
                //   options: [
  
                //   ],
                //   },
                //   validators: {
                //     validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                //   },
                //   expressions: {
                //     hide: "model.InbuildConstructType != 'W'",
                //   },
                // },
  
                {
                  className: 'col-12 col-md-6 col-lg-4',
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
          return !entry;
        }
        else return false;
      
      }
}