import { FormlyJsonschema } from "@ngx-formly/core/json-schema";
import { SharedService } from "src/app/shared/shared.service";
import { ForceLengthValidators } from '../../domestic-risk-details/domestic-risk-details.component';
import { FormlyFieldConfig } from "@ngx-formly/core";


export class Accessorieswh{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;
    enableFieldsList: any[]=[];
    dobDate: any;
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
            
            fieldGroup: [
              {
                fieldGroupClassName: 'row',
                fieldGroup: [
                  {
                    fieldGroupClassName: 'row',
                    fieldGroup: [
                    //   {
                    //     type: 'select',
                    //     key: 'AccessoriesChassisNo',
                    //     defaultValue: '',
                    //     className: 'col-sm-6',
                    //     props: {
                    //       label: `Chassis No`,
                    //       required: true,
                    //       options: [
          
                    //       ],
          
                    //     },
                    //     validators: {
                    //       validation: [ForceLengthValidators.maxLength(50), ForceLengthValidators.min(1)]
                    //     },
                    //     hooks: {
                    //     },
                    //     expressions: {
                    //     },
                    //   },
                      {
                        type: 'select',
                        key: 'AccessoriesType',
                        defaultValue: '',
                        className: 'col-sm-6',
                        props: {
                          label: `Accessories`,
                          required: true,
                          options: [
          
                          ],
          
                        },
                        validators: {
                          validation: [ForceLengthValidators.maxLength(50), ForceLengthValidators.min(1)]
                        },
                        hooks: {
                        },
                        expressions: {
                        },
                      },
                      {
                        className: 'col-sm-6',
                        type: 'input',
                        key: 'AccessoriesSerialNo',
                        templateOptions: {
                          label: 'Serial No',
                          required: true,
                        },
                        validators: {
                          validation: [ForceLengthValidators.maxLength(100), ForceLengthValidators.min(1)]
                        },
                      
                      },
                      {
                        className: 'col-sm-8 offset-2',
                        type: 'commaSeparator',
                        key: 'AccessoriesSI',
                        templateOptions: {
                          label: 'Sum Insured',
                          required: true,
                        },
                        validators: {
                          validation: [ForceLengthValidators.maxLength(50), ForceLengthValidators.min(1)]
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
            ]
         
          }
        ];
    }
    fields:FormlyFieldConfig[]=[];
    checkDisable(fieldName) {
        console.log("Disable Check", fieldName);
        if (this.endorsementSection) {
          // let occupationEntry = this.enableFieldsList.some(ele => ele == 'OccupationType');
          // if (occupationEntry) {
          //     return false;
          // }
          // else{
            let entry = this.enableFieldsList.some(ele => ele == fieldName);
            return !entry;
          //}
          
        }
        else return false;
      
      }
}