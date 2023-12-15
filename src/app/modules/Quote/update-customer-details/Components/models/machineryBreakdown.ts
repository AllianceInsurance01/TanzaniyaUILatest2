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
          props: { label: 'Machinery BreakDown' },
          fieldGroup: [
            {
              fieldGroupClassName: 'row mt-2',
              fieldGroup: [
                {
                  className: 'col-12',
                  type: 'tables',
                  fieldGroup: [
                    {
                        fieldGroup:[
                          {props:{label:`Items to be Insured`}},
                          {props:{label:`Sum Insured`}},
                        ]
                    },
                    {
                      fieldGroup:[
                            {
                              fieldGroup:[
                                {
                                  className: "mt-1",
                                  type: 'displays',
                
                                  templateOptions: {
                                    label: `Sum Insured`,
                                    required: false,
                
                                  },
                                },
                                {
                                  className:"labelsum",
                                  type: 'commaSeparator',
                                  key: 'PowerPlantSi',
                                    props: {
                                    label: `  `,
                                    disabled: this.checkDisable('MachinerySi'),
                                  },
                                  templateOptions: {
                                    
                                  },
                                  validators: {
                                    validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                                  },
                                  hooks: {
                                  },
                  
                                  expressions: {
                                    disabled: '!model.PowerPlantSIYN'
                                  },
                                }
                              ]
                            },

                            // {
                            //   fieldGroup:[
                            //     {
                            //       className: "mt-1",
                            //       type: 'displays',
                
                            //       templateOptions: {
                            //         label: `Power Plant`,
                            //         required: false,
                
                            //       },
                            //     },
                            //     {
                            //       className:"labelsum",
                            //       type: 'commaSeparator',
                            //       key: 'PowerPlantSi',
                            //         props: {
                            //         label: `Sum Insured`,
                            //         disabled: this.checkDisable('SumInsured'),
                            //       },
                            //       templateOptions: {
                                    
                            //       },
                            //       validators: {
                            //         validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                            //       },
                            //       hooks: {
                            //       },
                  
                            //       expressions: {
                            //         disabled: '!model.PowerPlantSIYN'
                            //       },
                            //     }
                            //   ]
                            // },
                            // {
                            //   fieldGroup:[
                            //     {
                            //       className: "mt-1",
                            //       type: 'displays',
                
                            //       templateOptions: {
                            //         label: `Electrical Machines`,
                            //         required: false,
                
                            //       },
                            //     },
                            //     {
                            //       className:"labelsum",
                            //       type: 'commaSeparator',
                            //       key: 'ElecMachinesSi',
                            //       props: {
                            //         label: `Sum Insured`,
                            //         disabled: this.checkDisable('SumInsured'),
                            //       },
                            //       templateOptions: {
                                   
                            //       },
                            //       validators: {
                            //         validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                            //       },
                            //       hooks: {
                            //       },
                  
                            //       expressions: {
                            //         disabled: '!model.ElecMachinesSIYN'
                            //       },
                            //     }
                            //   ]
                            // },
                            // {
                            //   fieldGroup:[
                            //     {
                            //       className: "mt-1",
                            //       type: 'displays',
                
                            //       templateOptions: {
                            //         label: `Equipments`,
                            //         required: false,
                
                            //       },
                            //     },
                            //     {
                            //       className:"labelsum",
                            //       type: 'commaSeparator',
                            //       key: 'EquipmentSi',
                            //       props: {
                            //         label: `Sum Insured`,
                            //         disabled: this.checkDisable('SumInsured'),
                            //       },
                            //       templateOptions: {
                                    
                            //       },
                            //       validators: {
                            //         validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                            //       },
                            //       hooks: {
                            //       },
                  
                            //       expressions: {
                            //         disabled: '!model.EquipmentSIYN'
                            //       },
                            //     }
                            //   ]
                            // },
                            // {
                            //   fieldGroup:[
                            //     {
                            //       className: "mt-1",
                            //       type: 'displays',
                
                            //       templateOptions: {
                            //         label: `Electronic Equipment`,
                            //         required: false,
                
                            //       },
                            //     },
                            //     {
                            //       className:"labelsum",
                            //       type: 'commaSeparator',
                            //       key: 'MachineEquipSi',
                            //       props: {
                            //         label: `Sum Insured`,
                            //         disabled: this.checkDisable('SumInsured'),
                            //       },
                            //       templateOptions: {
                                    
                            //       },
                            //       validators: {
                            //         validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                            //       },
                            //       hooks: {
                            //       },
                            //     }
                            //   ]
                            // },
                            // {
                            //   fieldGroup:[
                            //     {
                            //       className: "mt-1",
                            //       type: 'displays',
                
                            //       templateOptions: {
                            //         label: `General Machines`,
                            //         required: false,
                
                            //       },
                            //     },
                            //     {
                            //       className:"labelsum",
                            //       type: 'commaSeparator',
                            //       key: 'GeneralMachineSi',
                            //       props: {
                            //         label: `Sum Insured`,
                            //         disabled: this.checkDisable('SumInsured'),
                            //       },
                            //       templateOptions: {
                                    
                            //       },
                            //       validators: {
                            //         validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                            //       },
                            //       hooks: {
                            //       },
                  
                            //       expressions: {
                            //         disabled: '!model.GeneralMachineSIYN'
                            //       },
                            //     }
                            //   ]
                            // },
                            // {
                            //   fieldGroup:[
                            //     {
                            //       className: "mt-1",
                            //       type: 'displays',
                
                            //       templateOptions: {
                            //         label: `Manufacturing Units`,
                            //         required: false,
                
                            //       },
                            //     },
                            //     {
                            //       className:"labelsum",
                            //       type: 'commaSeparator',
                            //       key: 'ManuUnitsSi',
                            //       props: {
                            //         label: `Sum Insured`,
                            //         disabled: this.checkDisable('SumInsured'),
                            //       },
                            //       templateOptions: {
                                    
                            //       },
                            //       validators: {
                            //         validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                            //       },
                            //       hooks: {
                            //       },
                  
                            //       expressions: {
                            //         disabled: '!model.ManuUnitsSIYN'
                            //       },
                            //     }
                            //   ]
                            // },
                            // {
                            //   fieldGroup:[
                            //     {
                            //       className: "mt-1",
                            //       type: 'displays',
                
                            //       templateOptions: {
                            //         label: `Boiler And Pressure Plants`,
                            //         required: false,
                
                            //       },
                            //     },
                            //     {
                            //       className:"labelsum",
                            //       type: 'commaSeparator',
                            //       key: 'BoilerPlantsSi',
                            //       props: {
                            //         label: `Sum Insured`,
                            //         disabled: this.checkDisable('SumInsured'),
                            //       },
                            //       templateOptions: {
                                    
                            //       },
                            //       validators: {
                            //         validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                            //       },
                            //       hooks: {
                            //       },
                  
                            //       expressions: {
                            //         disabled: '!model.BoilerPlantsSIYN'
                            //       },
                            //     }
                            //   ]
                            // },
                      ]
                    }
                  ]
                },
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