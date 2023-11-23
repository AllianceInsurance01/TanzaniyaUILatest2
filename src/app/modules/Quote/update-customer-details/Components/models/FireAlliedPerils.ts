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
          props: { label: 'Fire & Allied Perils'},
          fieldGroup: [
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  
                  fieldGroupClassName: 'col-8 col-md-8 col-lg-8 offset-2',
                  type: 'tables',
                  fieldGroup: [
                    {
                        fieldGroup:[
                          // {props:{label:`Select`}},
                          {props:{label:`Items to be Insured`}},
                          {props:{label:`Sum Insured`}},
                        ]
                    },
                    {
                      fieldGroup:[
                            {
                              fieldGroup:[
                               
                                {
                                  className: "splitCardHeaderss",
                                  type: 'displays',
                
                                  templateOptions: {
                                    label: `Indemity Period`,
                                    required: false,
                
                                  },
                                },
                                {
                              
                                  type: 'ngselect',
                                  key: 'IndemityPeriod',
                                  props: {
                                    // label: 'Indemity Period',
                                    disabled: this.checkDisable('IndemityPeriod'),
                                    required: true,
                                    options: [
                                    ],
                                  },
                                }
                              ]
                            },
                            {
                              fieldGroup:[
                          
                                {
                                  className: "splitCardHeaderss",
                                  type: 'displays',
                
                                  templateOptions: {
                                    label: `Building`,
                                    //on premises out of business hrs
                                    required: false,
                
                                  },
                                },
                                {
                                  className:"labelsum",
                                  type: 'commaSeparator',
                                  key: 'BuildingSuminsured',
                                  props: { 
                                    label: `Sum Insured`,
                                  },
                                  templateOptions: {
                                    disabled: this.checkDisable('BuildingSuminsured')
                                  },
                                  validators: {
                                    validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                                  },
                                  hooks: {
                                  },
                  
                                  expressions: {
                                  
                                  },
                                }
                              ]
                            },
                            {
                              fieldGroup:[
                                {
                                  className: "splitCardHeaderss",
                                  type: 'displays',
                
                                  templateOptions: {
                                    label: `Makuti`,
                                    required: false,
                
                                  },
                                },
                                {
                                  className:"formss",
                                  type: 'radio',
                                  key: 'MakutiYn',
                                  templateOptions: {
                                    type: 'radio',
                                    label: 'Makuti',
                                    required: true,
                                    disabled: this.checkDisable('MakutiYn'),
                                    name: 'MakutiYn',
                                    options: [{ value: 'Y', label: 'Yes' },{ value: 'N', label: 'No' }],
                                  }
                                }
                              ]
                            },
                         
                      ]
                    }
                  ]
                }
              ]
              
            },
         
          ],
        }
      
    }
    fields:FormlyFieldConfig;
    checkDisable(fieldName) {
        if (this.endorsementSection) {
          let entry = this.enableFieldsList.some(ele => ele == fieldName);
          return !entry;
        }
        else return false;
      
      }
}