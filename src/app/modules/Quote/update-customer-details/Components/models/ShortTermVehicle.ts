import { FormlyJsonschema } from "@ngx-formly/core/json-schema";
import { SharedService } from "src/app/shared/shared.service";
import { UpdateCustomerDetailsComponent } from "../../update-customer-details.component";
import { ForceLengthValidators } from "../personal-quote-details/personal-quote-details.component";
import { FormlyFieldConfig } from "@ngx-formly/core";

export class ShortTermVehicle{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;
    enableFieldsList: any[]=[];
    public model = {}
    constructor() {
        this.customerDetails = JSON.parse(sessionStorage.getItem('customerDetails'));
        let commonDetails = JSON.parse(sessionStorage.getItem('vehicleDetailsList'));
        if (commonDetails) this.commonDetails = commonDetails;
        if (sessionStorage.getItem('endorsePolicyNo')) {
            this.endorsementSection = true;
            let endorseObj = JSON.parse(sessionStorage.getItem('endorseTypeId'))
            if (endorseObj) {
              this.enableFieldsList = endorseObj.FieldsAllowed;
            }
        }
        this.fields= {
            props: { label: 'Personal Accident' },
            fieldGroup: [
              {
                fieldGroupClassName: 'row',
                fieldGroup: [
                    {
                      type: 'select',
                      key: 'BodyType',
                      defaultValue: '',
                      className: 'col-4',
                      props: {
                        label: `Body Type`,
                        disabled: this.checkDisable('BodyType'),
                        required: true,
                        options: [
        
                        ],
                      },
                      validators: {
                        validation: [ForceLengthValidators.maxLength(100), ForceLengthValidators.min(1)]
                      },
                      hooks: {
                      },
                      expressions: {
                      },
                    },
                    {
                        type: 'select',
                        key: 'Make',
                        defaultValue: '',
                        className: 'col-4',
                        
                        props: {
                          label: `Make`,
                          disabled: this.checkDisable('Make'),
                          required: true,
                          options: [
          
                          ],
                        },
                        validators: {
                          validation: [ForceLengthValidators.maxLength(100), ForceLengthValidators.min(1)]
                        },
                        hooks: {
                        },
                        expressions: {
                        },
                    },
                    {
                      type: 'select',
                      key: 'Model',
                      defaultValue: '',
                      className: 'col-4',
                      props: {
                        label: `Model`,
                        disabled: this.checkDisable('Model'),
                        required: true,
                        options: [
        
                        ],
                      },
                      validators: {
                        validation: [ForceLengthValidators.maxLength(100), ForceLengthValidators.min(1)]
                      },
                      hooks: {
                      },
                      expressions: {
                      },
                    },
                    {
                        type: 'input',
                        key: 'ModelDesc',
                        defaultValue: '',
                        className: 'col-4',
                        props: {
                          label: `Model`,
                          disabled: this.checkDisable('Model'),
                          required: true,
                          options: [
          
                          ],
                        },
                        validators: {
                          validation: [ForceLengthValidators.maxLength(100), ForceLengthValidators.min(1)]
                        },
                        hooks: {
                        },
                        expressions: {
                        },
                    },
                    {
                      type: 'input',
                      key: 'OtherModelDesc',
                      defaultValue: '',
                      className: 'col-4',
                      props: {
                        label: `Model Description`,
                        disabled: this.checkDisable('Model'),
                        required: true,
                        options: [
        
                        ],
                      },
                      validators: {
                        validation: [ForceLengthValidators.maxLength(100), ForceLengthValidators.min(1)]
                      },
                      hooks: {
                      },
                      expressions: {
                      },
                    },
                    {
                        className: 'col-4',
                        type: 'input',
                        key: 'ChassisNo',
                        templateOptions: {
                          label: 'Chassis Number',
                          disabled: this.checkDisable('ChassisNo'),
                          required: true,
                        },
                        validators: {
                          validation: [ForceLengthValidators.maxLength(100), ForceLengthValidators.min(1)]
                        },
                    },
                    // {
                    //     className: 'col-4',
                    //     type: 'input',
                    //     key: 'RegistrationNo',
                    //     templateOptions: {
                    //       label: 'Registration Number',
                    //       disabled: this.checkDisable('RegistrationNo'),
                    //       required: false,
                    //     },
                    //     validators: {
                    //       validation: [ForceLengthValidators.maxLength(100), ForceLengthValidators.min(1)]
                    //     },
                    // },
                    {
                        className: 'col-4',
                        type: 'input',
                        key: 'EngineNo',
                        templateOptions: {
                          label: 'Engine Number',
                          disabled: this.checkDisable('EngineNo'),
                          required: true,
                        },
                        validators: {
                          validation: [ForceLengthValidators.maxLength(100), ForceLengthValidators.min(1)]
                        },
                    },
                    {
                        className: 'col-4',
                        type: 'input',
                        key: 'EngineCapacity',
                        templateOptions: {
                          label: 'Engine Capacity',
                          disabled: this.checkDisable('EngineCapacity'),
                          required: true,
                        },
                        validators: {
                          validation: [ForceLengthValidators.maxLength(100), ForceLengthValidators.min(1)]
                        },
                    },
                    {
                        className: 'col-4',
                        type: 'input',
                        key: 'SeatingCapacity',
                        templateOptions: {
                          label: 'Seating Capacity',
                          disabled: this.checkDisable('SeatingCapacity'),
                          required: true,
                        },
                        validators: {
                          validation: [ForceLengthValidators.maxLength(100), ForceLengthValidators.min(1)]
                        },
                    },
                    {
                        type: 'select',
                        key: 'ManufactureYear',
                        defaultValue: '',
                        className: 'col-4',
                        props: {
                          label: `Manufacture Year`,
                          disabled: this.checkDisable('ManufactureYear'),
                          required: true,
                          options: [
          
                          ],
                        },
                        validators: {
                          validation: [ForceLengthValidators.maxLength(100), ForceLengthValidators.min(1)]
                        },
                        hooks: {
                        },
                        expressions: {
                        },
                    },
                    {
                        type: 'select',
                        key: 'FuelType',
                        defaultValue: '',
                        className: 'col-4',
                        props: {
                          label: `Fuel Used`,
                          disabled: this.checkDisable('FuelType'),
                          required: true,
                          options: [
          
                          ],
                        },
                        validators: {
                          validation: [ForceLengthValidators.maxLength(100), ForceLengthValidators.min(1)]
                        },
                        hooks: {
                        },
                        expressions: {
                        },
                    },
                    {
                        type: 'select',
                        key: 'Color',
                        defaultValue: '',
                        className: 'col-4',
                        props: {
                          label: `Vehicle Color`,
                          disabled: this.checkDisable('Color'),
                          required: false,
                          options: [
          
                          ],
                        },
                        validators: {
                          validation: [ForceLengthValidators.maxLength(100), ForceLengthValidators.min(1)]
                        },
                        hooks: {
                        },
                        expressions: {
                        },
                    },
                    
                    {
                        type: 'select',
                        key: 'MotorUsage',
                        defaultValue: '',
                        className: 'col-4',
                        props: {
                          label: `Vehicle Usage`,
                          disabled: this.checkDisable('MotorUsage'),
                          required: true,
                          options: [
          
                          ],
                        },
                        validators: {
                          validation: [ForceLengthValidators.maxLength(100), ForceLengthValidators.min(1)]
                        },
                        hooks: {
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