
import { UpdateCustomerDetailsComponent } from "../../update-customer-details.component";
import { ForceLengthValidators } from "../personal-quote-details/personal-quote-details.component";
import { FormlyFieldConfig } from "@ngx-formly/core";

export class FireAlliedPerils{
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
        this.customerDetails = JSON.parse(sessionStorage.getItem('customerDetails') || '');
        let commonDetails = JSON.parse(sessionStorage.getItem('homeCommonDetails') || '');
        if (commonDetails) this.commonDetails = commonDetails;
        if (sessionStorage.getItem('endorsePolicyNo')) {
            this.endorsementSection = true;
            let endorseObj = JSON.parse(sessionStorage.getItem('endorseTypeId') || '')
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
                            //         label: `Indemity Period`,
                            //         required: false,
                
                            //       },
                            //     },
                            //     {
                              
                            //       type: 'ngselect',
                            //       key: 'IndemityPeriod',
                            //       props: {
                            //         disabled: this.checkDisable('IndemityPeriod'),
                            //         required: true,
                            //         options: [
                            //         ],
                            //       },
                            //     }
                            //   ]
                            // },
                            // {
                            //   fieldGroup:[
                          
                            //     {
                            //       className: "splitCardHeaderss",
                            //       type: 'displays',
                
                            //       templateOptions: {
                            //         label: `Building`,
                            //         required: false,
                
                            //       },
                            //     },
                            //     {
                            //       className:"labelsum",
                            //       type: 'commaSeparator',
                            //       key: 'BuildingSuminsured',
                            //       props: { 
                            //         label: `Sum Insured`,
                            //       },
                            //       templateOptions: {
                            //         disabled: this.checkDisable('BuildingSuminsured')
                            //       },
                            //       validators: {
                            //         validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                            //       },
                            //       hooks: {
                            //       },
                  
                            //       expressions: {
                                  
                            //       },
                            //     }
                            //   ]
                            // },
                            // {
                            //   fieldGroup:[
                            //     {
                            //       className: "splitCardHeaderss",
                            //       type: 'displays',
                
                            //       templateOptions: {
                            //         label: `Makuti`,
                            //         required: false,
                
                            //       },
                            //     },
                            //     {
                            //       className:"formss",
                            //       type: 'radio',
                            //       key: 'MakutiYn',
                            //       templateOptions: {
                            //         type: 'radio',
                            //         label: 'Makuti',
                            //         required: true,
                            //         disabled: this.checkDisable('MakutiYn'),
                            //         name: 'MakutiYn',
                            //         options: [{ value: 'Y', label: 'Yes' },{ value: 'N', label: 'No' }],
                            //       }
                            //     }
                            //   ]
                            // },
                            {
                              fieldGroup:[
                               
                                {
                                  className: "splitCardHeaderss",
                                  type: 'displays',
                
                                  templateOptions: {
                                    label: `On Asset`,
                                    required: false,
                
                                  },
                                },
                                {
                                  className:"labelsum",
                                  type: 'commaSeparator',
                                  key: 'onAssetSumInsured',
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
                                    label: `On Stock`,
                                    required: false,
                
                                  },
                                },
                                {
                                  className:"labelsum",
                                  type: 'commaSeparator',
                                  key: 'onStockSumInsured',
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
                                    label: `On Building`,
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