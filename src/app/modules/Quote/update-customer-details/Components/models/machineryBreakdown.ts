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
              fieldGroupClassName: 'row mt-2',
              fieldGroup: [
                {
                  className: 'col-12',
                  type: 'table',
                  fieldGroup: [
                    {
                        fieldGroup:[
                          {props:{label:`Select`}},
                          {props:{label:`Items to be Insured`}},
                          {props:{label:`Sum Insured`}},
                        ]
                    },
                    {
                      fieldGroup:[
                            {
                              fieldGroup:[
                                {
                                  className:'customCheckbox',
                                  key: 'PowerPlantSIYN',
                                  type: 'checkbox',
                                  templateOptions: {
                                    type: 'checkbox',
                                    label: '',
                                    required: false,
                                    disabled: this.checkDisable('MakutiYn'),
                                    name: 'PowerPlantSIYN',
                                    options: [],
                                  }
                                },
                                {
                                  className: "mt-1",
                                  type: 'display',
                
                                  templateOptions: {
                                    label: `Power Plant`,
                                    required: false,
                
                                  },
                                },
                                {
                                  type: 'commaSeparator',
                                  key: 'PowerPlantSi',
                                  templateOptions: {
                                    disabled: this.checkDisable('PowerPlantSi')
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
                            {
                              fieldGroup:[
                                {
                                  className:'customCheckbox',
                                  key: 'ElecMachinesSIYN',
                                  type: 'checkbox',
                                  templateOptions: {
                                    type: 'checkbox',
                                    label: '',
                                    required: false,
                                    disabled: this.checkDisable('ElecMachinesSIYN'),
                                    name: 'ElecMachinesSIYN',
                                    options: [],
                                  }
                                },
                                {
                                  className: "mt-1",
                                  type: 'display',
                
                                  templateOptions: {
                                    label: `Electrical Machines`,
                                    required: false,
                
                                  },
                                },
                                {
                                  type: 'commaSeparator',
                                  key: 'ElecMachinesSi',
                                  templateOptions: {
                                    disabled: this.checkDisable('ElecMachinesSi')
                                  },
                                  validators: {
                                    validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                                  },
                                  hooks: {
                                  },
                  
                                  expressions: {
                                    disabled: '!model.ElecMachinesSIYN'
                                  },
                                }
                              ]
                            },
                            {
                              fieldGroup:[
                                {
                                  className:'customCheckbox',
                                  key: 'EquipmentSIYN',
                                  type: 'checkbox',
                                  templateOptions: {
                                    type: 'checkbox',
                                    label: '',
                                    required: false,
                                    disabled: this.checkDisable('EquipmentSIYN'),
                                    name: 'EquipmentSIYN',
                                    options: [],
                                  }
                                },
                                {
                                  className: "mt-1",
                                  type: 'display',
                
                                  templateOptions: {
                                    label: `Equipments Suminsured`,
                                    required: false,
                
                                  },
                                },
                                {
                                  type: 'commaSeparator',
                                  key: 'EquipmentSi',
                                  templateOptions: {
                                    disabled: this.checkDisable('EquipmentSi')
                                  },
                                  validators: {
                                    validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                                  },
                                  hooks: {
                                  },
                  
                                  expressions: {
                                    disabled: '!model.EquipmentSIYN'
                                  },
                                }
                              ]
                            },
                            {
                              fieldGroup:[
                                {
                                  className:'customCheckbox',
                                  key: 'MachineEquipSIYN',
                                  type: 'checkbox',
                                  templateOptions: {
                                    type: 'checkbox',
                                    label: '',
                                    required: false,
                                    disabled: this.checkDisable('MachineEquipSIYN'),
                                    name: 'MachineEquipSIYN',
                                    options: [],
                                  }
                                },
                                {
                                  className: "mt-1",
                                  type: 'display',
                
                                  templateOptions: {
                                    label: `Electronic Equipment Suminsured`,
                                    required: false,
                
                                  },
                                },
                                {
                                  type: 'commaSeparator',
                                  key: 'MachineEquipSi',
                                  templateOptions: {
                                    disabled: this.checkDisable('MachineEquipSi')
                                  },
                                  validators: {
                                    validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                                  },
                                  hooks: {
                                  },
                  
                                  expressions: {
                                    disabled: '!model.MachineEquipSIYN'
                                  },
                                }
                              ]
                            },
                            {
                              fieldGroup:[
                                {
                                  className:'customCheckbox',
                                  key: 'GeneralMachineSIYN',
                                  type: 'checkbox',
                                  templateOptions: {
                                    type: 'checkbox',
                                    label: '',
                                    required: false,
                                    disabled: this.checkDisable('GeneralMachineSIYN'),
                                    name: 'GeneralMachineSIYN',
                                    options: [],
                                  }
                                },
                                {
                                  className: "mt-1",
                                  type: 'display',
                
                                  templateOptions: {
                                    label: `General Machines Suminsured`,
                                    required: false,
                
                                  },
                                },
                                {
                                  type: 'commaSeparator',
                                  key: 'GeneralMachineSi',
                                  templateOptions: {
                                    disabled: this.checkDisable('GeneralMachineSi')
                                  },
                                  validators: {
                                    validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                                  },
                                  hooks: {
                                  },
                  
                                  expressions: {
                                    disabled: '!model.GeneralMachineSIYN'
                                  },
                                }
                              ]
                            },
                            {
                              fieldGroup:[
                                {
                                  className:'customCheckbox',
                                  key: 'ManuUnitsSIYN',
                                  type: 'checkbox',
                                  templateOptions: {
                                    type: 'checkbox',
                                    label: '',
                                    required: false,
                                    disabled: this.checkDisable('ManuUnitsSIYN'),
                                    name: 'ManuUnitsSIYN',
                                    options: [],
                                  }
                                },
                                {
                                  className: "mt-1",
                                  type: 'display',
                
                                  templateOptions: {
                                    label: `Manufacturing Units Suminsured`,
                                    required: false,
                
                                  },
                                },
                                {
                                  type: 'commaSeparator',
                                  key: 'ManuUnitsSi',
                                  templateOptions: {
                                    disabled: this.checkDisable('ManuUnitsSi')
                                  },
                                  validators: {
                                    validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                                  },
                                  hooks: {
                                  },
                  
                                  expressions: {
                                    disabled: '!model.ManuUnitsSIYN'
                                  },
                                }
                              ]
                            },
                            {
                              fieldGroup:[
                                {
                                  className:'customCheckbox',
                                  key: 'BoilerPlantsSIYN',
                                  type: 'checkbox',
                                  templateOptions: {
                                    type: 'checkbox',
                                    label: '',
                                    required: false,
                                    disabled: this.checkDisable('BoilerPlantsSIYN'),
                                    name: 'BoilerPlantsSIYN',
                                    options: [],
                                  }
                                },
                                {
                                  className: "mt-1",
                                  type: 'display',
                
                                  templateOptions: {
                                    label: `Boiler And Pressure Plants`,
                                    required: false,
                
                                  },
                                },
                                {
                                  type: 'commaSeparator',
                                  key: 'BoilerPlantsSi',
                                  templateOptions: {
                                    disabled: this.checkDisable('BoilerPlantsSi')
                                  },
                                  validators: {
                                    validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                                  },
                                  hooks: {
                                  },
                  
                                  expressions: {
                                    disabled: '!model.BoilerPlantsSIYN'
                                  },
                                }
                              ]
                            },
                      ]
                    }
                  ]
                },
              ]
            },
            // {
            //   fieldGroupClassName: 'row',
            //   fieldGroup: [
            //     {
            //       className: 'col-6 col-lg-6 col-md-6 offset-2',
            //       key: 'PowerPlantSIYN',
            //       type: 'checkbox',
            //       templateOptions: {
            //         type: 'checkbox',
            //         label: 'Power Plant',
            //         required: true,
            //         disabled: this.checkDisable('MakutiYn'),
            //         name: 'PowerPlantSIYN',
            //         options: [],
            //       }
            //     },
            //     {
            //      className: 'col-4',
            //       type: 'commaSeparator',
            //       key: 'PowerPlantSi',
            //       templateOptions: {
            //         label: `Power Plant Suminsured`,
            //         disabled: this.checkDisable('PowerPlantSi')
            //       },
            //       validators: {
            //         validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
            //       },
            //       hooks: {
            //       },
  
            //       expressions: {
            //         hidden: 'model.PowerPlantSIYN ==true'
            //       },
            //     },
            //     {
            //      className: 'col-4',
            //       type: 'commaSeparator',
            //       key: 'ElecMachinesSi',
            //       templateOptions: {
            //         label: `Electrical Machines Suminsured`,
            //         disabled: this.checkDisable('ElecMachinesSi')
            //       },
            //       validators: {
            //         validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
            //       },
            //       hooks: {
            //       },
  
            //       expressions: {
                    
            //       },
            //     },
            //     {
            //      className: 'col-4',
            //       type: 'commaSeparator',
            //       key: 'EquipmentSi',
            //       templateOptions: {
            //         label: `Equipments Suminsured`,
            //         disabled: this.checkDisable('EquipmentSi')
            //       },
            //       validators: {
            //         validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
            //       },
            //       hooks: {
            //       },
  
            //       expressions: {
                   
            //       },
            //     },
            //     {
            //      className: 'col-4',
            //       type: 'commaSeparator',
            //       key: 'MachineEquipSi',
            //       templateOptions: {
            //         label: `Electronic Equipment Suminsured`,
            //         disabled: this.checkDisable('MachineEquipSi')
            //       },
            //       validators: {
            //         validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
            //       },
            //       hooks: {
            //       },
  
            //       expressions: {
                   
            //       },
            //     },
            //     {
            //      className: 'col-4',
            //       type: 'commaSeparator',
            //       key: 'GeneralMachineSi',
            //       templateOptions: {
            //         label: `General Machines Suminsured`,
            //         disabled: this.checkDisable('GeneralMachineSi')
            //       },
            //       validators: {
            //         validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
            //       },
            //       hooks: {
            //       },
  
            //       expressions: {
                    
            //       },
            //     },
            //     {
            //      className: 'col-4',
            //       type: 'commaSeparator',
            //       key: 'ManuUnitsSi',
            //       templateOptions: {
            //         label: `Manufacturing Units Suminsured`,
            //         disabled: this.checkDisable('ManuUnitsSi')
            //       },
            //       validators: {
            //         validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
            //       },
            //       hooks: {
            //       },
  
            //       expressions: {
                    
            //       },
            //     },
            //     {
            //      className: 'col-4',
            //       type: 'commaSeparator',
            //       key: 'BoilerPlantsSi',
            //       templateOptions: {
            //         label: `Boiler And Pressure Plants  Suminsured`,
            //         disabled: this.checkDisable('BoilerPlantsSi')
            //       },
            //       validators: {
            //         validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
            //       },
            //       hooks: {
            //       },
  
            //       expressions: {
                    
            //       },
            //     },
  
            //   ]
            // },
  
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