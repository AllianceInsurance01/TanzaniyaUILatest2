import { FormlyJsonschema } from "@ngx-formly/core/json-schema";
import { SharedService } from "src/app/shared/shared.service";
import { UpdateCustomerDetailsComponent } from "../../update-customer-details.component";
import { ForceLengthValidators } from "../personal-quote-details/personal-quote-details.component";
import { FormlyFieldConfig } from "@ngx-formly/core";

export class PlantAllRisk{
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
        props: { label: 'Plant All Risk'},
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
                                  label: `Over Ground Mining Plant`,
                                  required: false,
              
                                },
                              },
                              {
                                className:"labelsum",
                                type: 'commaSeparator',
                                key: 'MiningPlantSi',
                                props: { 
                                  label: `Sum Insured`,
                                },
                                templateOptions: {
                                  disabled: this.checkDisable('MiningPlantSi')
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
                                  label: `Non Mining/Farming`,
                                  //on premises out of business hrs
                                  required: false,
              
                                },
                              },
                              {
                                className:"labelsum",
                                type: 'commaSeparator',
                                key: 'NonminingPlantSi',
                                props: { 
                                  label: `Sum Insured`,
                                },
                                templateOptions: {
                                  disabled: this.checkDisable('NonminingPlantSi')
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
                                  label: `Gensets SumInsured`,
                                  required: false,
              
                                },
                              },
                              {
                                className:"labelsum",
                                type: 'commaSeparator',
                                key: 'GensetsSi',
                                props: { 
                                  label: `Sum Insured`,
                                },
                                templateOptions: {
                                  disabled: this.checkDisable('GensetsSi')
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