import { FormlyJsonschema } from "@ngx-formly/core/json-schema";
import { SharedService } from "src/app/shared/shared.service";
import { FormlyFieldConfig } from "@ngx-formly/core";

export class LifeInsurance{
  customerDetails: any;
  commonDetails: any[]=[];
  endorsementSection: boolean=false;
  enableFieldsList: any[]=[];
  dobDate:any=null;
  constructor() {
      var d = new Date();
      var year = d.getFullYear();
      var month = d.getMonth();
      var day = d.getDate();
      this.dobDate = new Date(year - 18, month, day);
      this.fields = {
          props: { label: 'Quote Details' },
          fieldGroup: [
            {
              fieldGroupClassName: 'row',
              fieldGroup: [
                {
                  className: 'col-6 col-md-6 col-lg-6 col-xl-6',
                  type: 'input',
                  key: 'Name',
                  props: {
                    label: "Enter Your Name",
                    required: true,
                    disabled: this.checkDisable('Name'),
                    options: []
                  },
                  expressions: {

                  }
                },
                {
                    className: 'col-6 col-md-6 col-lg-6 col-xl-6',
                    key: 'Gender',
                    type: 'radio',
                    templateOptions: {
                      type: 'radio',
                      label: 'Gender',
                      required: true,
                      disabled: this.checkDisable('Gender'),
                      name: 'PlanType',
                        options: [
                          { label: 'Male', value: '1' },
                          { label: 'Female', value: '2' }
                        ],
                     
                    }
                },
                {
                  className: 'col-6 col-md-6 col-lg-6 col-xl-6',
                  key: 'Dob',
                  type: 'datepicker',
                  props: {
                    label: 'Date Of Birth',
                    required: true,
                    type: 'date',
                    datepickerOptions: {
                      max: this.dobDate
                    },
                  }
                },
                {
                  type: 'select',
                  key: 'PolicyTerm',
                  defaultValue: '',
                  className: 'col-sm-6',
                  props: {
                    label: `Policy Term`,
                    required: true,
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
                  type: 'input',
                  key: 'PayingTerm',
                  defaultValue: '',
                  className: 'col-sm-6',
                  props: {
                    label: `Paying Term`,
                    required: true,
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