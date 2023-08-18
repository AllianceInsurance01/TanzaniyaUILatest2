import { FormlyJsonschema } from "@ngx-formly/core/json-schema";
import { SharedService } from "src/app/shared/shared.service";
import { UpdateCustomerDetailsComponent } from "../../../update-customer-details.component";
// import { ForceLengthValidators } from "../../personal-quote-details/personal-quote-details.component";
import { ForceLengthValidators } from '../../domestic-risk-details/domestic-risk-details.component';
import { FormlyFieldConfig } from "@ngx-formly/core";

export class Medical{
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
                fieldGroup: [
                    {
                   fieldGroupClassName: 'row',
                fieldGroup: [
                  {
                    fieldGroupClassName: 'row',
                    fieldGroup: [
                      {
                        type: 'input',
                         key: 'HighestQaualification',
                       defaultValue: '',
                       className: 'col-sm-4 offset-1',
                        props: {
                         label: `Highest Qualification Held`,
                          required: true,
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
                                      className: 'col-sm-4 offset-1',
                                      type: 'input',
                                      key: 'IssuingAuthority',
                                      templateOptions: {
                                        label: 'Issuing Authority',
                                        required: true,
                                      },
                                      validators: {
                                        validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
                                      },
                                    },
                                    
                                    {
                                      type: 'input',
                                      className: 'col-sm-4 offset-1',
                                      key: 'YearOfPassing',
                                      props: {
                                        label: `Year Of Passing`,
                                        required: true,
                                      },
                                      validators: {
                                        validation: [ForceLengthValidators.maxLength(4), ForceLengthValidators.min(1)]
                                      },
                                      hooks: {
                                      },
                                      expressions: {
                                      },
                                    },
                                    {
                                      type: 'input',
                                      className: 'col-sm-4 offset-1',
                                      key: 'Employee Name',
                                      props: {
                                        label: `Employee Name`,
                                        required: true,
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
                ]
            }
        ]
              }
            //   {
            //     key: 'MedicalList',
            //     type: 'repeat',
            //     templateOptions: {
            //       addText: 'Add New',
            //     },
            //     fieldArray: {
            //       fieldGroup: [
            //         {
            //           fieldGroupClassName: 'row',
            //           fieldGroup: [
            //             {
            //               type: 'input',
            //               key: 'HighestQaualification',
            //               defaultValue: '',
            //               className: 'col-sm-4 offset-2',
            //               props: {
            //                 label: `Highest Qualification Held`,
            //                 required: true,
            //               },
            //               validators: {
            //                 validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
            //               },
            //               hooks: {
            //               },
            //               expressions: {
            //               },
            //             },
            //             {
            //               className: 'col-sm-4 offset-2',
            //               type: 'input',
            //               key: 'IssuingAuthority',
            //               templateOptions: {
            //                 label: 'IssuingAuthority',
            //                 required: true,
            //               },
            //               validators: {
            //                 validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
            //               },
            //             },
                        
            //             {
            //               type: 'input',
            //               className: 'col-sm-4 offset-2',
            //               key: 'YearOfPassing',
            //               props: {
            //                 label: `Year Of Passing`,
            //                 required: true,
            //               },
            //               validators: {
            //                 validation: [ForceLengthValidators.maxLength(4), ForceLengthValidators.min(1)]
            //               },
            //               hooks: {
            //               },
            //               expressions: {
            //               },
            //             },
            //             {
            //               type: 'input',
            //               className: 'col-sm-4 offset-2',
            //               key: 'Employee Name',
            //               props: {
            //                 label: `Employee Name`,
            //                 required: true,
            //               },
            //               validators: {
            //                 validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
            //               },
            //               hooks: {
            //               },
            //               expressions: {
            //               },
            //             },
            //           ]
            //         }
            //       ],
            //     },
            //   },
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