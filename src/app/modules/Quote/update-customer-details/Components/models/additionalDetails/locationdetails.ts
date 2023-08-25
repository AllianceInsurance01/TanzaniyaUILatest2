import { FormlyJsonschema } from "@ngx-formly/core/json-schema";
import { SharedService } from "src/app/shared/shared.service";
import { ForceLengthValidators } from '../../domestic-risk-details/domestic-risk-details.component';
import { FormlyFieldConfig } from "@ngx-formly/core";


export class LocationDetails{
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
                          key: 'LocationNameBuilding',
                          defaultValue: '',
                          className: 'col-sm-5 offset-1',
                          props: {
                            label: `Location Name`,
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
                          className: 'col-sm-5',
                          type: 'input',
                          key: 'LocationAddress',
                          templateOptions: {
                            label: 'Address',
                            required: true,
                          },
                          validators: {
                            validation: [ForceLengthValidators.maxLength(20), ForceLengthValidators.min(1)]
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