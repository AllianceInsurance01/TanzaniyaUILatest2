import { FormlyJsonschema } from "@ngx-formly/core/json-schema";
import { SharedService } from "src/app/shared/shared.service";
import { UpdateCustomerDetailsComponent } from "../../update-customer-details.component";
import { ForceLengthValidators } from "../personal-quote-details/personal-quote-details.component";
import { FormlyFieldConfig } from "@ngx-formly/core";

export class MedicalInsurance{
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
          props: { label: 'Medical Insurance' },
          fieldGroup: [
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-12 col-lg-12 col-md-12',
                  type: 'radioList',
                  key: 'Category',
                  templateOptions: {
                    label:'Occupation',
                    name: 'gender',
                    options: []
                  },
                  expressions: {
    
                  },
                },
                {
                    className: 'col-5 col-lg-5 col-md-5 offset-1',
                    type: 'ngselect',
                    key: 'AooSumInsured',
                    props: {
                      label: 'Limit Of Indeminity(AOO)',
                      defaultValue: null,
                      disabled: this.checkDisable('AooSumInsured'),
                      required: true,
                      options: [
                      ],
                    },
                    expressions: {
      
                    },
                  },
                  {
                    className: 'col-5 col-lg-5 col-md-5',
                    type: 'ngselect',
                    key: 'AggSumInsured',
                    props: {
                      label: 'Limit Of Indeminity(AGG)',
                      defaultValue: null,
                      disabled: this.checkDisable('AggSumInsured'),
                      required: true,
                      options: [
                      ],
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