import { FormlyJsonschema } from "@ngx-formly/core/json-schema";
import { SharedService } from "src/app/shared/shared.service";
import { UpdateCustomerDetailsComponent } from "../../update-customer-details.component";
import { ForceLengthValidators } from "../personal-quote-details/personal-quote-details.component";
import { FormlyFieldConfig } from "@ngx-formly/core";

export class Moneys{
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
        props: { label: 'Money' },
        fieldGroup: [
          {
            fieldGroupClassName: 'row',
            fieldGroup: [
              {
                
                fieldGroupClassName: 'col-8 col-md-8 col-lg-8 offset-2',
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
                                key: 'MoneyInSafeBusinessSIYN',
                                type: 'checkbox',
                                templateOptions: {
                                  type: 'checkbox',
                                  label: '',
                                  required: false,
                                  disabled: this.checkDisable('MoneyInSafeBusinessSIYN'),
                                  name: 'MoneyInSafeBusinessSIYN',
                                  options: [],
                                }
                              },
                              {
                                className: "mt-1",
                                type: 'display',
              
                                templateOptions: {
                                  label: `Major Loss Limit (Premises & In Transit)`,
                                  required: false,
              
                                },
                              },
                              {
                                type: 'commaSeparator',
                                key: 'MoneyInSafeBusiness',
                                templateOptions: {
                                  disabled: this.checkDisable('MoneyInSafeBusiness')
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
                                className:'customCheckbox',
                                key: 'MoneyOutSafeBusinessSIYN',
                                type: 'checkbox',
                                templateOptions: {
                                  type: 'checkbox',
                                  label: '',
                                  required: false,
                                  disabled: this.checkDisable('MoneyOutSafeBusinessSIYN'),
                                  name: 'MoneyOutSafeBusinessSIYN',
                                  options: [],
                                }
                              },
                              {
                                className: "mt-1",
                                type: 'display',
              
                                templateOptions: {
                                  label: `Money out of safe on premises out of business hrs`,
                                  required: false,
              
                                },
                              },
                              {
                                type: 'commaSeparator',
                                key: 'MoneyOutSafeBusiness',
                                templateOptions: {
                                  disabled: this.checkDisable('MoneyOutSafeBusiness')
                                },
                                validators: {
                                  validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                                },
                                hooks: {
                                },
                
                                expressions: {
                                  disabled: '!model.MoneyOutSafeBusinessSIYN'
                                },
                              }
                            ]
                          },
                          {
                            fieldGroup:[
                              {
                                className:'customCheckbox',
                                key: 'MoneyInPremisesSIYN',
                                type: 'checkbox',
                                templateOptions: {
                                  type: 'checkbox',
                                  label: '',
                                  required: false,
                                  disabled: this.checkDisable('MoneyInPremisesSIYN'),
                                  name: 'MoneyInPremisesSIYN',
                                  options: [],
                                }
                              },
                              {
                                className: "mt-1",
                                type: 'display',
              
                                templateOptions: {
                                  label: `Residence Of Director And Managers`,
                                  required: false,
              
                                },
                              },
                              {
                                type: 'commaSeparator',
                                key: 'MoneyInPremises',
                                templateOptions: {
                                  disabled: this.checkDisable('MoneyInPremises')
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
                                className:'customCheckbox',
                                key: 'CashInTransitSIYN',
                                type: 'checkbox',
                                templateOptions: {
                                  type: 'checkbox',
                                  label: '',
                                  required: false,
                                  disabled: this.checkDisable('CashInTransitSIYN'),
                                  name: 'CashInTransitSIYN',
                                  options: [],
                                }
                              },
                              {
                                className: "mt-1",
                                type: 'display',
              
                                templateOptions: {
                                  label: `Damage to safe Limit`,
                                  required: false,
              
                                },
                              },
                              {
                                type: 'commaSeparator',
                                key: 'CashInTransit',
                                templateOptions: {
                                  disabled: this.checkDisable('CashInTransit')
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
                          {
                            fieldGroup:[
                              {
                                className:'customCheckbox',
                                key: 'CashInHandEmployeesSIYN',
                                type: 'checkbox',
                                templateOptions: {
                                  type: 'checkbox',
                                  label: '',
                                  required: false,
                                  disabled: this.checkDisable('CashInHandEmployeesSIYN'),
                                  name: 'CashInHandEmployeesSIYN',
                                  options: [],
                                }
                              },
                              {
                                className: "mt-1",
                                type: 'display',
              
                                templateOptions: {
                                  label: `Collectors / salesman`,
                                  required: false,
              
                                },
                              },
                              {
                                type: 'commaSeparator',
                                key: 'CashInHandEmployees',
                                templateOptions: {
                                  disabled: this.checkDisable('CashInHandEmployees')
                                },
                                validators: {
                                  validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                                },
                                hooks: {
                                },
                
                                expressions: {
                                  disabled: '!model.CashInHandEmployeesSIYN'
                                },
                              }
                            ]
                          },
                          {
                            fieldGroup:[
                              {
                                className:'customCheckbox',
                                key: 'CashInSafeSIYN',
                                type: 'checkbox',
                                templateOptions: {
                                  type: 'checkbox',
                                  label: '',
                                  required: false,
                                  disabled: this.checkDisable('CashInSafeSIYN'),
                                  name: 'CashInSafeSIYN',
                                  options: [],
                                }
                              },
                              {
                                className: "mt-1",
                                type: 'display',
              
                                templateOptions: {
                                  label: `Estimated Annual Carry`,
                                  required: false,
              
                                },
                              },
                              {
                                type: 'commaSeparator',
                                key: 'CashInSafe',
                                templateOptions: {
                                  disabled: this.checkDisable('CashInSafe')
                                },
                                validators: {
                                  validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                                },
                                hooks: {
                                },
                
                                expressions: {
                                  disabled: '!model.CashInSafeSIYN'
                                },
                              }
                            ]
                          },
                          // {
                          //   fieldGroup:[
                          //     {
                          //       className:'customCheckbox',
                          //       key: 'MoneyAnnualcarrySuminsuredSIYN',
                          //       type: 'checkbox',
                          //       templateOptions: {
                          //         type: 'checkbox',
                          //         label: '',
                          //         required: false,
                          //         disabled: this.checkDisable('MoneyAnnualcarrySuminsuredSIYN'),
                          //         name: 'MoneyAnnualcarrySuminsuredSIYN',
                          //         options: [],
                          //       }
                          //     },
                          //     {
                          //       className: "mt-1",
                          //       type: 'display',
              
                          //       templateOptions: {
                          //         label: `Estimated Annual Cash Carrying`,
                          //         required: false,
              
                          //       },
                          //     },
                          //     {
                          //       type: 'commaSeparator',
                          //       key: 'MoneyAnnualcarrySuminsured',
                          //       templateOptions: {
                          //         disabled: this.checkDisable('MoneyAnnualcarrySuminsured')
                          //       },
                          //       validators: {
                          //         validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                          //       },
                          //       hooks: {
                          //       },
                
                          //       expressions: {
                          //         disabled: '!model.MoneyAnnualcarrySuminsuredSIYN'
                          //       },
                          //     }
                          //   ]
                          // },
                    ]
                  }
                ]
              }
            ]
            
          },
          // {
          //   fieldGroupClassName: 'row',
          //   fieldGroup: [
          //     {
          //       className: 'col-4',
          //       type: 'commaSeparator',
          //       key: 'MoneyInSafeBusiness',
          //       templateOptions: {
          //         label: `Safe During Working Hours`,
          //         disabled: this.checkDisable('MoneyInSafeBusiness')
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
          //       className: 'col-4',
          //       type: 'commaSeparator',
          //       key: 'MoneyOutSafeBusiness',
          //       templateOptions: {
          //         label: `Safe Outside Working Hours`,
          //         disabled: this.checkDisable('MoneyOutSafeBusiness')
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
          //       className: 'col-4',
          //       type: 'commaSeparator',
          //       key: 'MoneyInPremises',
          //       templateOptions: {
          //         label: `Residence Of Director And Partner`,
          //         disabled: this.checkDisable('MoneyInPremises')
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
          //       className: 'col-4',
          //       type: 'commaSeparator',
          //       key: 'CashInTransit',
          //       templateOptions: {
          //         label: `Cash in Transit Limit`,
          //         disabled: this.checkDisable('CashInTransit')
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
          //       className: 'col-4',
          //       type: 'commaSeparator',
          //       key: 'CashInHandEmployees',
          //       templateOptions: {
          //         label: `Custody Of Collectors`,
          //         disabled: this.checkDisable('CashInHandEmployees')
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
          //       className: 'col-4',
          //       type: 'commaSeparator',
          //       key: 'CashInSafe',
          //       templateOptions: {
          //         label: `Value Of Safe`,
          //         disabled: this.checkDisable('CashInSafe')
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
          //       className: 'col-4',
          //       type: 'commaSeparator',
          //       key: 'MoneyAnnualcarrySuminsured',
          //       templateOptions: {
          //         label: `Estimated Annual Cash Carrying`,
          //         disabled: this.checkDisable('MoneyAnnualcarrySuminsured')
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