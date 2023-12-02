import { FormlyJsonschema } from "@ngx-formly/core/json-schema";
import { SharedService } from "src/app/shared/shared.service";
import { ForceLengthValidators } from '../../domestic-risk-details/domestic-risk-details.component';
import { FormlyFieldConfig } from "@ngx-formly/core";


export class Machineryss{
    customerDetails: any;
    commonDetails: any[]=[];
    endorsementSection: boolean=false;
    enableFieldsList: any[]=[];
    dobDate: any;
    constructor() {
        this.customerDetails = JSON.parse(sessionStorage.getItem('customerDetails'));
        let commonDetails = JSON.parse(sessionStorage.getItem('homeCommonDetails'));
        if (commonDetails) this.commonDetails = commonDetails;
        var d = new Date();
        var year = d.getFullYear();
        var month = d.getMonth();
        var day = d.getDate();
        this.dobDate = new Date(year - 18, month, day);
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
                      {
                        type: 'ngselect',
                        key: 'MLocation',
                        defaultValue: '',
                        className: 'col-sm-4',
                        props: {
                          label: `Location`,
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
                        className: 'col-sm-8 col-lg-8 col-xl-8 col-md-8',
                        type: 'input',
                        key: 'MDescription',
                        templateOptions: {
                          label: 'Description',
                          required: true,
                        },
                        validators: {
                          validation: [ForceLengthValidators.maxLength(500), ForceLengthValidators.min(1)]
                        },
                      
                      },
                     
                      {
                        className: 'col-sm-4',
                        type: 'input',
                        key: 'MName',
                        templateOptions: {
                          label: 'Name',
                          required: true,
                        },
                        validators: {
                          validation: [ForceLengthValidators.maxLength(150), ForceLengthValidators.min(1)]
                        },
                      
                      }, 
                      {
                        type: 'ngselect',
                        key: 'MContentType',
                        defaultValue: '',
                        className: 'col-sm-4',
                        props: {
                          label: `Content Type`,
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
                        className: 'col-sm-4',
                        type: 'input',
                        key: 'MBrand',
                        templateOptions: {
                          label: 'Brand Name',
                          required: true,
                        },
                        validators: {
                          validation: [ForceLengthValidators.maxLength(150), ForceLengthValidators.min(1)]
                        },
                      },
                      {
                        className: 'col-sm-4',
                        type: 'input',
                        key: 'MSerialNo',
                        templateOptions: {
                          label: 'Serial No',
                          required: true,
                        },
                        validators: {
                          validation: [ForceLengthValidators.maxLength(100), ForceLengthValidators.min(1)]
                        },
                      },
                      {
                        className: 'col-sm-4',
                        type: 'commaSeparator',
                        key: 'MSI',
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