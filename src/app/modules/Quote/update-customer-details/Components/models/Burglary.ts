import { FormlyJsonschema } from "@ngx-formly/core/json-schema";
import { SharedService } from "src/app/shared/shared.service";
import { UpdateCustomerDetailsComponent } from "../../update-customer-details.component";
import { ForceLengthValidators } from "../personal-quote-details/personal-quote-details.component";
import { FormlyFieldConfig } from "@ngx-formly/core";

export class Burglary{
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
        this.fields= {
            type: 'stepper',
            fieldGroup: [
  
              {
                props: { label: 'Burglary' },
                fieldGroup: [
                  {
                    fieldGroupClassName: 'row',
                    fieldGroup: [
                      {
                        className: 'col-4',
                        type: 'select',
                        key: 'NatureOfTradeId',
                        props: {
                          label: 'Nature Of Trade',
                          required: true,
                          disabled: this.checkDisable('NatureOfTrade'),
                          options: []
                        },
                        expressions: {
  
                        }
                      },
                      // {
                      //   className: 'col-6',
                      //   type: 'select',
                      //   key: 'IndustryId',
                      //   props: {
                      //     label: 'Industry Type',
                      //     required: true,
                      //     options: []
                      //   },
                      //   expressions: {
  
                      //   }
                      // },
                      {
                        key: 'InsuranceForId',
                        className: 'col-4',
                        type: 'multicheckbox',
                        props: {
                          label: 'Insurance For',
                          disabled: this.checkDisable('InsuranceForId'),
                          required: true,
                          options: [
  
                          ],
                        },
                      },
                      {
                        className: 'col-4',
                        key: 'BuildingOwnerYn',
                        type: 'radio',
                        templateOptions: {
                          type: 'radio',
                          label: 'Do You Rent Or Own Home ?',
                          required: true,
                          disabled: this.checkDisable('BuildingOwnerYn'),
                          name: 'BuildingOwnerYn',
                          options: [{ value: 'N', label: 'I Rent Home' }, { value: 'Y', label: 'I Own Home' }],
                        }
                      },
                      {
                        className: 'col-4',
                        type: 'input',
                        key: 'BuildingBuildYear',
                        props: {
                          label: 'Built Construction Year',
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
                            //pattern: (error: any, field: FormlyFieldConfig) => field.formControl.setValue(field.formControl.value.replace(/[^0-9]+/gm, ''))
                          },
                        },
                        expressions: {
  
                        },
                      },
                      {
                        className: 'col-4',
                        type: 'input',
                        key: 'OccupiedYear',
                        props: {
                          label: 'Occupied From(Year)',
                          placeholder: "YYYY",
                          required: false,
                          maxLength: 4,
                          disabled: this.checkDisable('OccupiedYear'),
                          pattern: /[0-9]+/gm,
                          options: [
                          ],
                        },
                        validation: {
                          messages: {
                            //pattern: (error: any, field: FormlyFieldConfig) => field.formControl.setValue(field.formControl.value.replace(/[^0-9]+/gm, ''))
                          },
                        },
                        expressions: {
  
                        },
                      },
                      {
                        className: 'col-4',
                        type: 'select',
                        key: 'WallType',
                        props: {
                          label: 'External Wall Type',
                          required: false,
                          disabled: this.checkDisable('WallType'),
                          options: []
                        },
                        expressions: {
  
                        }
                      },
                      {
                        className: 'col-4',
                        type: 'select',
                        key: 'InternalWallType',
                        props: {
                          label: 'Internal Wall Type',
                          disabled: this.checkDisable('InternalWallType'),
                          required: false,
                          options: []
                        },
                        expressions: {
  
                        }
                      },
                      {
                        className: 'col-4',
                        type: 'select',
                        key: 'RoofType',
                        props: {
                          label: 'Roof Type',
                          disabled: this.checkDisable('RoofType'),
                          required: false,
                          options: []
                        },
                        expressions: {
  
                        }
                      },
                      {
                        className: 'col-4',
                        type: 'select',
                        key: 'CeilingType',
                        props: {
                          label: 'Ceiling Type',
                          disabled: this.checkDisable('CeilingType'),
                          required: false,
                          options: []
                        },
                        expressions: {
  
                        }
                      },
                    ]
                  }
                ]
              },
              {
                  props: {label: 'Property Details'},
                  fieldGroup:[
                    {
                      fieldGroupClassName: 'row',
                      fieldGroup:[
                        {
                          className: 'col-4',
                          type: 'input',
                          key: 'Address',
                          props: {
                            label: 'Address',
                            disabled: this.checkDisable('Address'),
                            required: false,
                            maxLength: 100,
                            options: [
                            ],
                          },
                          expressions: {
    
                          }
                        },
                        {
                          className: 'col-4',
                          type: 'select',
                          key: 'RegionCode',
                          props: {
                            label: 'Region',
                            disabled: this.checkDisable('RegionCode'),
                            required: false,
                            options: []
                          },
                          expressions: {
    
                          },
                          hooks: {
                            
                          },
                        },
                        {
                          className: 'col-4',
                          type: 'select',
                          key: 'DistrictCode',
                          props: {
                            label: 'District',
                            disabled: this.checkDisable('DistrictCode'),
                            required: false,
                            options: []
                          },
                          expressions: {
    
                          }
                        },
                        {
                          className: 'col-4',
                          type: 'input',
                          key: 'WatchmanGuardHours',
                          props: {
                            label: 'Watchman Guard Premises(Hours)',
                            placeholder: "Premises Time Limit in Hours",
                            required: false,
                            disabled: this.checkDisable('WatchmanGuardHours'),
                            maxLength: 2,
                            pattern: /[0-9]+/gm,
                            options: [
                            ],
                          },
                          validation: {
                            messages: {
                              //pattern: (error: any, field: FormlyFieldConfig) => field.formControl.setValue(field.formControl.value.replace(/[^0-9]+/gm, ''))
                            },
                          },
                          expressions: {
    
                          },
                        },
    
                      ]
                    }
                  ] 
              },
              {
                props: { label: 'Doors & Windows in premises' },
                fieldGroup: [
                  {
                    fieldGroupClassName: 'row',
                    fieldGroup: [
                      {
                        className: 'col-4',
                        type: 'input',
                        key: 'AccessibleWindows',
                        props: {
                          label: 'Accessible Windows',
                          disabled: this.checkDisable('AccessibleWindows'),
                          placeholder: "Number Of Accessible Windows",
                          required: false,
                          maxLength: 2,
                          pattern: /[0-9]+/gm,
                          options: [
                          ],
                        },
                        validation: {
                          messages: {
                            //pattern: (error: any, field: FormlyFieldConfig) => field.formControl.setValue(field.formControl.value.replace(/[^0-9]+/gm, ''))
                          },
                        },
                        expressions: {
  
                        },
                      },
                      {
                        className: 'col-4',
                        type: 'input',
                        key: 'ShowWindow',
                        props: {
                          label: 'Show Windows',
                          placeholder: "Number Of Show Windows",
                          required: false,
                          disabled: this.checkDisable('ShowWindow'),
                          maxLength: 2,
                          pattern: /[0-9]+/gm,
                          options: [
                          ],
                        },
                        validation: {
                          messages: {
                            //pattern: (error: any, field: FormlyFieldConfig) => field.formControl.setValue(field.formControl.value.replace(/[^0-9]+/gm, ''))
                          },
                        },
                        expressions: {
  
                        },
                      },
                      {
                        className: 'col-4',
                        type: 'input',
                        key: 'FrontDoors',
                        props: {
                          label: 'Front Door',
                          placeholder: "Number Of Front Door",
                          required: false,
                          disabled: this.checkDisable('FrontDoors'),
                          maxLength: 2,
                          pattern: /[0-9]+/gm,
                          options: [
                          ],
                        },
                        validation: {
                          messages: {
                            //pattern: (error: any, field: FormlyFieldConfig) => field.formControl.setValue(field.formControl.value.replace(/[^0-9]+/gm, ''))
                          },
                        },
                        expressions: {
  
                        },
                      },
                      {
                        className: 'col-4',
                        type: 'input',
                        key: 'BackDoors',
                        props: {
                          label: 'Back Door',
                          placeholder: "Number Of Back Door",
                          disabled: this.checkDisable('BackDoors'),
                          required: false,
                          maxLength: 2,
                          pattern: /[0-9]+/gm,
                          options: [
                          ],
                        },
                        validation: {
                          messages: {
                            //pattern: (error: any, field: FormlyFieldConfig) => field.formControl.setValue(field.formControl.value.replace(/[^0-9]+/gm, ''))
                          },
                        },
                        expressions: {
  
                        },
                      },
                      {
                        className: 'col-4',
                        type: 'input',
                        key: 'TrapDoors',
                        props: {
                          label: 'Skylights and Trap Doors',
                          placeholder: "",
                          disabled: this.checkDisable('TrapDoors'),
                          required: false,
                          maxLength: 2,
                          pattern: /[0-9]+/gm,
                          options: [
                          ],
                        },
                        validation: {
                          messages: {
                            //pattern: (error: any, field: FormlyFieldConfig) => field.formControl.setValue(field.formControl.value.replace(/[^0-9]+/gm, ''))
                          },
                        },
                        expressions: {
  
                        },
                      },
                      {
                        className: 'col-4',
                        type: 'select',
                        key: 'WindowsMaterialId',
                        props: {
                          label: 'Windows Construction Material',
                          disabled: this.checkDisable('WindowsMaterialId'),
                          required: true,
                          options: []
                        },
                        expressions: {
  
                        }
                      },
                      {
                        className: 'col-4',
                        type: 'select',
                        key: 'DoorsMaterialId',
                        props: {
                          label: 'Doors Construction Material',
                          disabled: this.checkDisable('DoorsMaterialId'),
                          required: true,
                          options: []
                        },
                        expressions: {
  
                        }
                      },
                      {
                        className: 'col-4',
                        type: 'select',
                        key: 'NightLeftDoor',
                        props: {
                          label: 'In Night by which door are the premises Left',
                          disabled: this.checkDisable('NightLeftDoor'),
                          required: true,
                          options: []
                        },
                        expressions: {
  
                        }
                      },
                      {
                        className: 'col-4',
                        type: 'select',
                        key: 'BuildingOccupied',
                        props: {
                          label: 'Building occupied',
                          disabled: this.checkDisable('BuildingOccupied'),
                          required: true,
                          options: []
                        },
                        expressions: {
  
                        }
                      },
                    ]
                  }
                ]
              },
              {
                props: { label: 'Sum Insured Details' },
                fieldGroup: [
                  {
                    fieldGroupClassName: 'row',
                    fieldGroup: [
                      {
                        className: 'col-12',
                        type: 'table',
                        fieldGroup: [
                          {
                              fieldGroup:[
                                {props:{label:`Description`}},
                                {props:{label:`Sum Insured`}},
                                {props:{label:`First Loss SumInsured (%)`}},
                              ]
                          },
                          {
                            fieldGroup:[
                                  {
                                    fieldGroup:[
                                      {
                                        className: "mt-1",
                                        type: 'display',
                      
                                        templateOptions: {
                                          label: `Stock In Trade `,
                                          required: false,
                      
                                        },
                                      },
                                      {
                                        className: "mt-1",
                                        type: 'commaSeparator',
                                        key: 'StockInTradeSi',
                      
                                        templateOptions: {
                                          disabled: this.checkDisable('SumInsured'),
                                          required: false,
                                          options: [
                      
                                          ],
                      
                                        },
                                        validators: {
                                        },
                                        hooks: {
                                        },
                                        expressions: {
                                        },
                                      },
                                      {
                                        type: 'select',
                                        key: 'StockLossPercent',
                      
                                        templateOptions: {
                                          required: false,
                                          disabled: this.checkDisable('SumInsured'),
                                          options: [
                      
                                          ],
                      
                                        },
                                        validators: {
                                        },
                                        hooks: {
                                        },
                                        expressions: {
                                          //disabled: (this.checkDisable('StockLossPercent') || this.model.StockInTradeSi =='' || this.model.StockInTradeSi =='0'),
                                        },
                                      },
                                    ]
                                  },
                                  {
                                    fieldGroup:[
                                   
                                      {
                                        className: "mt-1",
                                        type: 'display',
                      
                                        templateOptions: {
                                          label: `Goods`,
                                          required: false,
                      
                                        },
                                      },
                                      {
                                        className: "mt-3",
                                        type: 'commaSeparator',
                                        key: 'GoodsSi',
                      
                                        templateOptions: {
                                          disabled: this.checkDisable('SumInsured'),
                                          required: false,
                                          options: [
                      
                                          ],
                      
                                        },
                                        validators: {
                                        },
                                        hooks: {
                                        },
                                        expressions: {
                                        },
                                      },
                                      {
                                        type: 'select',
                                        key: 'GoodsLossPercent',
                                        
                                        templateOptions: {
                                          disabled: this.checkDisable('SumInsured'),
                                          required: false,
                                          options: [
                      
                                          ],
                      
                                        },
                                        validators: {
                                        },
                                        hooks: {
                                        },
                                        expressions: {
                                          //disabled: (this.checkDisable('GoodsLossPercent') || this.model.GoodsSi =='' || this.model.GoodsSi =='0'),
                                        },
                                      },
                                    ]
                                  },
                                  {
                                    fieldGroup:[
                                      {
                                        className: "mt-1",
                                        type: 'display',
                      
                                        templateOptions: {
                                          label: `Furnitures`,
                                          required: false,
                      
                                        },
                                      },
                                      {
                                        className: "mt-1",
                                        type: 'commaSeparator',
                                        key: 'FurnitureSi',
                      
                                        templateOptions: {
                                          disabled: this.checkDisable('SumInsured'),
                                          required: false,
                                          options: [
                      
                                          ],
                      
                                        },
                                        validators: {
                                        },
                                        hooks: {
                                        },
                                        expressions: {
                                        },
                                      },
                                      {
                                        type: 'select',
                                        key: 'FurnitureLossPercent',
                                        
                                        templateOptions: {
                                          disabled: this.checkDisable('SumInsured'),
                                          required: false,
                                          options: [
                      
                                          ],
                      
                                        },
                                        validators: {
                                        },
                                        hooks: {
                                        },
                                        expressions: {
                                          //disabled: (this.checkDisable('FurnitureLossPercent') || this.model.FurnitureSi =='' || this.model.FurnitureSi =='0'),
                                        },
                                      }
                                    ]
                                  },
                                  {
                                      fieldGroup:[
                                        {
                                          className: "mt-1",
                                          type: 'display',
                        
                                          templateOptions: {
                                            label: `Appliances`,
                                            required: false,
                        
                                          },
                                        },
                                        {
                                          className: "mt-1",
                                          type: 'commaSeparator',
                                          key: 'ApplianceSi',
                        
                                          templateOptions: {
                                            disabled: this.checkDisable('SumInsured'),
                                            required: false,
                                            options: [
                        
                                            ],
                        
                                          },
                                          validators: {
                                          },
                                          hooks: {
                                          },
                                          expressions: {
                                          },
                                        },
                                        {
                                          type: 'select',
                                          key: 'ApplianceLossPercent',
                                         
                                          templateOptions: {
                                            disabled: this.checkDisable('SumInsured'),
                                            required: false,
                                            options: [
                        
                                            ],
                        
                                          },
                                          validators: {
                                          },
                                          hooks: {
                                          },
                                          expressions: {
                                            //disabled: (this.checkDisable('ApplianceLossPercent') || this.model.ApplianceSi =='' || this.model.ApplianceSi =='0'),
                                          },
                                        },
                                      ]
                                  },
                                  {
                                    fieldGroup:[
                                      {
                                        className: "mt-1",
                                        type: 'display',
                      
                                        templateOptions: {
                                          label: `Cash Valuables`,
                                          required: false,
                      
                                        },
                                      },
                                      {
                                        className: "mt-1",
                                        type: 'commaSeparator',
                                        key: 'CashValueablesSi',
                      
                                        templateOptions: {
                                          disabled: this.checkDisable('SumInsured'),
                                          required: false,
                                          options: [
                      
                                          ],
                      
                                        },
                                        validators: {
                                        },
                                        hooks: {
                                        },
                                        expressions: {
                                        },
                                      },
                                      {
                                        type: 'select',
                                        key: 'CashValueablesLossPercent',
                                        
                                        templateOptions: {
                                          disabled: this.checkDisable('SumInsured'),
                                          required: false,
                                          options: [
                      
                                          ],
                      
                                        },
                                        validators: {
                                        },
                                        hooks: {
                                        },
                                        expressions: {
                                          //disabled: (this.checkDisable('CashValueablesLossPercent') || this.model.CashValueablesSi =='' || this.model.CashValueablesSi =='0'),
                                        },
                                      },
                                    ]
                                  }
                            ]
                          },
                          
                        ]
                      }
                    ]
                  }
                ]
              }
             
            ]
          }
    }
  fields:FormlyFieldConfig;
    getFieldDetails(){return this.fields; }
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