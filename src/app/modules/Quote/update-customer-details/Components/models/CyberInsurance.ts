import { FormlyJsonschema } from "@ngx-formly/core/json-schema";
import { SharedService } from "src/app/shared/shared.service";
import { UpdateCustomerDetailsComponent } from "../../update-customer-details.component";
import { ForceLengthValidators } from "../personal-quote-details/personal-quote-details.component";
import { FormlyFieldConfig } from "@ngx-formly/core";

export class CyberInsurance{
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
          props: { label: 'Cyber Insurance Details' },
          fieldGroup: [
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                    className: 'col-6 co-md-6 col-lg-6 col-xl-6 offset-3',
                    key: 'BuildingOwnerYn',
                    type: 'radio',
                    templateOptions: {
                      type: 'radio',
                      label: 'Choose Your Usage Type',
                      required: true,
                      disabled: this.checkDisable('BuildingOwnerYn'),
                      name: 'BuildingOwnerYn',
                      options: [{ value: 'S', label: 'Self' }, { value: 'SS', label: 'Self & Spouse' },{ value: 'SSC', label: 'Self,Spouse & Child' }],
                    }
                },
                {
                    className: 'col-6 co-md-6 col-lg-6 col-xl-6 offset-3',
                    key: 'BuildingOwnerYn',
                    type: 'radio',
                    templateOptions: {
                      type: 'radio',
                      label: 'Choose Your Plan Type',
                      required: true,
                      disabled: this.checkDisable('BuildingOwnerYn'),
                      name: 'BuildingOwnerYn',
                      options: [{ value: 'S', label: 'Silver' }, { value: 'SS', label: 'Gold' },{ value: 'SSC', label: 'Platinum' }],
                    }
                }
              ]
            }
          ]
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