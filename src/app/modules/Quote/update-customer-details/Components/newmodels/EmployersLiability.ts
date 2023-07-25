import { FormlyJsonschema } from "@ngx-formly/core/json-schema";
import { SharedService } from "src/app/shared/shared.service";
import { UpdateCustomerDetailsComponent } from "../../update-customer-details.component";
import { ForceLengthValidators } from "../personal-quote-details/personal-quote-details.component";
import { FormlyFieldConfig } from "@ngx-formly/core";

export class EmployersLiabilitys{
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
        this.fields = [
          {
            key: 'employeeList',
            type: 'repeat',
            
            templateOptions: {
              addText: 'Add Employee',
            },
            fieldArray: {
              fieldGroup: [
                {
                  fieldGroupClassName: 'row',
                  fieldGroup: [
                    {
                      type: 'select',
                      key: 'LiabilityOccupationId',
                      defaultValue: null,
                      className: 'col-sm-4',
                      props: {
                        label: `Occupation`,
                        disabled: this.checkDisable('LiabilityOccupationId'),
                        required: true,
                        options: [
        
                        ],
        
                      },
                      validators: {
                        validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                      },
                      hooks: {
                      },
                      expressions: {
                      },
                    },
                    {
                      className: 'col-sm-4',
                      type: 'number',
                      key: 'TotalNoOfEmployees',
                      templateOptions: {
                        label: 'Employee Count',
                        required: true,
                      },
                      validators: {
                        validation: [ForceLengthValidators.maxLength(3), ForceLengthValidators.min(1)]
                      },
                    },
                    
                    {
                      type: 'commaSeparator',
                      className: 'col-sm-4',
                      key: 'EmpLiabilitySi',
                      defaultValue: '0',
                      props: {
                        label: `SumInsured`,
                        disabled: this.checkDisable('EmpLiabilitySi'),
                        required: true,
                        options: [
        
                        ],
        
                      },
                      validators: {
                        validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                      },
                      hooks: {
                      },
                      expressions: {
                      },
                    },
                    {
                        type: 'commaSeparator',
                        className: 'col-sm-4',
                        key: 'LiabilityAnnualAggregateLimit',
                        defaultValue: '0',
                        props: {
                          label: `Liability Annual Aggregate Limit`,
                        //   disabled: this.checkDisable('EmpLiabilitySi'),
                          required: true,
                          options: [
          
                          ],
          
                        },
                        validators: {
                          validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                        },
                        hooks: {
                        },
                        expressions: {
                        },
                      },
                  ]
                }
              ],
            },
          },
        ];
    }
    fields:FormlyFieldConfig[]=[];
    checkDisable(fieldName) {
        console.log("Disable Check", fieldName);
        if (this.endorsementSection) {
          let entry = this.enableFieldsList.some(ele => ele == fieldName);
          return !entry;
        }
        else return false;
      
      }
}