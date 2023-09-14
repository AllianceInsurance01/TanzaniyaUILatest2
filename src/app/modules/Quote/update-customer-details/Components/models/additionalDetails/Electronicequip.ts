import { FormlyJsonschema } from "@ngx-formly/core/json-schema";
import { SharedService } from "src/app/shared/shared.service";
import { ForceLengthValidators } from '../../domestic-risk-details/domestic-risk-details.component';
import { FormlyFieldConfig } from "@ngx-formly/core";


export class ElectronicEquip{
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
            // <th class="tbl-header spancommon span_font_size">Location</th>
            // <th class="tbl-header spancommon span_font_size">Electronic Item</th>
            // <th class="tbl-header spancommon span_font_size">PurchaseMonth</th>
            // <th class="tbl-header spancommon span_font_size">PurchaseYear</th>
            // <th class="tbl-header spancommon span_font_size">MakeAndModel</th>
            // <th class="tbl-header spancommon span_font_size">SumInsured &nbsp;({{currencyValue}})</th>
            fieldGroup: [
              {
                fieldGroupClassName: 'row',
                fieldGroup: [
                  {
                    fieldGroupClassName: 'row',
                    fieldGroup: [
                      {
                        type: 'select',
                        key: 'ElqLocation',
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
                        type: 'select',
                        key: 'ElqList',
                        defaultValue: '',
                        className: 'col-sm-4',
                        props: {
                          label: `Electronic Equipment`,
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
                      // {
                      //   type: 'input',
                      //   key: 'ElqJoin',
                      //   defaultValue: '',
                      //   className: 'col-sm-4',
                      //   props: {
                      //     label: `Purchase Month`,
                      //     required: true,
                      //   },
                      //   validators: {
                      //     validation: [ForceLengthValidators.maxLength(4), ForceLengthValidators.min(1)]
                      //   },
                      //   hooks: {
                      //   },
                      //   expressions: {
                      //   },
                      // },
                      {
                        type: 'select',
                        key: 'ElqJoin',
                        defaultValue: '',
                        className: 'col-sm-4',
                        props: {
                          label: `Purchase Month`,
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
                        key: 'ElqPeriod',
                        templateOptions: {
                          label: 'Purchase Year',
                          required: true,
                        },
                        validators: {
                          validation: [ForceLengthValidators.maxLength(4), ForceLengthValidators.min(1)]
                        },
                      
                      }, 
                      {
                        className: 'col-sm-4',
                        type: 'input',
                        key: 'Elqmake',
                        templateOptions: {
                          label: 'Make And Model',
                          required: true,
                        },
                        validators: {
                          validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                        },
                      
                      },
                      {
                        className: 'col-sm-4',
                        type: 'commaSeparator',
                        key: 'ElqSI',
                        templateOptions: {
                          label: 'Sum Insured',
                          required: true,
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