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
  subuserType: any=null;
  finalizeYN: any='N';
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
        this.fields = {
          props: { label: 'Money' },
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
                          //{props:{label:`Select`}},
                          {props:{label:`Items to be Insured`}},
                          {props:{label:`Sum Insured`}},
                        ]
                    },
                    {
                      fieldGroup:[
                          
                            // {
                            //   fieldGroup:[
                            //     {
                            //       className: "splitCardHeaderss",
                            //       type: 'displays',
                            //       templateOptions: {
                            //         label: `Safe Outside Working Hours`,
                            //         required: false,
                            //       },
                            //     },
                            //     {
                            //       className:"labelsum",
                            //       type: 'commaSeparator',
                            //       key: 'MoneyOutofSafe',
                            //       props: { 
                            //         label: `Sum Insured`,
                            //         disabled: this.checkDisable('SumInsured')
                            //       },
                            //       templateOptions: {
                                    
                            //       },
                            //       validators: {
                            //         validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                            //       },
                            //       hooks: {
                            //       },
                  
                            //       expressions: {
                            //         disabled: '!model.MoneyOutSafeBusinessSIYN'
                            //       },
                            //     }
                            //   ]
                            // },
                            {
                              fieldGroup:[
                                {
                                  className: "splitCardHeaderss",
                                  type: 'displays',
                
                                  templateOptions: {
                                    label: `Premises`,
                                    required: false,
                
                                  },
                                },
                                {
                                  className:"labelsum",
                                  type: 'commaSeparator',
                                  key: 'MoneyDirectorResidence',
                                  props: {
                                    label: `Sum Insured`,
                                    disabled: this.checkDisable('SumInsured')
                                  },
                                  templateOptions: {
                                  },
                                  validators: {
                                    validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                                  },
                                  hooks: {
                                  },
                  
                                  expressions: {
                                    disabled: '!model.MoneyInPremisesSIYN'
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
                                    label: `Money in Transit`,
                                    required: false,
                
                                  },
                                },
                                {
                                  className:"labelsum",
                                  type: 'commaSeparator',
                                  key: 'MoneyMajorLoss',
                                  props: {
                                    label: `Sum Insured`,
                                    disabled: this.checkDisable('SumInsured')
                                  },
                                  templateOptions: {
                                    
                                  },
                                  validators: {
                                    validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                                  },
                                  hooks: {
                                  },
                  
                                  expressions: {
                                    disabled: '!model.CashInTransitSIYN'
                                  },
                                }
                              ]
                            },
                            // {
                            //   fieldGroup:[
                            //     {
                            //       className: "splitCardHeaderss",
                            //       type: 'displays',
                
                            //       templateOptions: {
                            //         label: `Custody Of Collectors`,
                            //         required: false,
                
                            //       },
                            //     },
                            //     {
                            //       className:"labelsum",
                            //       type: 'commaSeparator',
                            //       key: 'MoneyCollector',
                            //       props: {
                            //         label: `Sum Insured`,
                            //         disabled: this.checkDisable('SumInsured')
                            //       },
                            //       templateOptions: {
                                    
                            //       },
                            //       validators: {
                            //         validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                            //       },
                            //       hooks: {
                            //       },
                  
                            //       expressions: {
                            //         disabled: '!model.CashInHandEmployeesSIYN'
                            //       },
                            //     }
                            //   ]
                            // },
                            {
                              fieldGroup:[
                               
                                {
                                  className: "labeltable",
                                  type: 'displays',
                
                                  templateOptions: {
                                    label: `StrongRoom`,
                                    required: false,
                
                                  },
                                },
                                {
                                  className:"labelsum",
                                  type: 'commaSeparator',
                                  key: 'StrongroomSi',
                                  props: {
                                    label: `Sum Insured`,
                                    disabled: this.checkDisable('StrongroomSi')
                                  },
                                  templateOptions: {
                                    
                                  },
                                  validators: {
                                    validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                                  },
                                  hooks: {
                                  },
                  
                                  expressions: {
                                    disabled: '!model.MoneyAnnualcarrySuminsuredSIYN'
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
                                    label: `Money In Safe`,
                                    required: false,
                                  },
                                },
                                {
                                  className:"labelsum",
                                  type: 'commaSeparator',
                                  key: 'MoneySafeLimit',
                                  props: {
                                    label: `Sum Insured`,
                                    disabled: this.checkDisable('SumInsured')
                                  },
                                  templateOptions: {
                                 
                                   
                                  },
                                  validators: {
                                    validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                                  },
                                  hooks: {
                                  },
                  
                                  expressions: {
                                    disabled: '!model.MoneyInSafeBusinessSIYN'
                                  },
                                }
                              ]
                            },
                            {
                              fieldGroup:[
                               
                                {
                                  className: "labeltable",
                                  type: 'displays',
                
                                  templateOptions: {
                                    label: `Estimated annual carryings`,
                                    required: false,
                
                                  },
                                },
                                {
                                  className:"labelsum",
                                  type: 'commaSeparator',
                                  key: 'MoneyAnnualEstimate',
                                  props: {
                                    label: `Sum Insured`,
                                    disabled: this.checkDisable('SumInsured')
                                  },
                                  templateOptions: {
                                    
                                  },
                                  validators: {
                                    validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                                  },
                                  hooks: {
                                  },
                  
                                  expressions: {
                                    disabled: '!model.MoneyAnnualcarrySuminsuredSIYN'
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
        else if(this.subuserType=='low') return this.finalizeYN=='Y'; 
        else return false;
      
      }
}