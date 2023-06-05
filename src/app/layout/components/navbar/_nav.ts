


export const navItems: any[] = 
[
  {
      "link": "/Admin",
      "title": "DashBoard",
      "icon": 'home-outline'
  },
  {
    "link": "/Admin/companyList",
    "title": "Company Configuration",
    "icon": 'keypad-outline'
  },
  {
    "link": "/Admin/productList",
    "title": "Product Configuration",
    "icon": "settings-outline"
  },
  {
      "link": "#",
      "title": "LOGIN CREATION",
      "icon": "person-add-outline",
      "children": [
        {
            "link": "/Admin/brokersList",
            "title": "Broker Creation",
            "icon": null
        },
        {
            "link": "/Admin/userList",
            "title": "User (Broker Emp) ",
            "icon": null,
            "children": null
        },
        {
            "link": "/Admin/issuerList",
            "title": "Insurance Employee Creation",
            "icon": null,
            "children": null
        },
      ]
  },
  
  {
      "link": "#",
      "title": "MASTERS",
      "icon": "list-outline",
      "children": [
        //   {
        //       "link": "/getallinscompanydetails",
        //       "title": "Company Master",
        //       "icon": null,
        //       "children": null
        //   },
        //   {
        //       "link": "/getallregiondetails",
        //       "title": "Region Master",
        //       "icon": null,
        //       "children": null
        //   },
        //   {
        //       "link": "/getallbranchdetails",
        //       "title": "Branch Master",
        //       "icon": null,
        //       "children": null
        //   },
        //   {
        //       "link": "/getallproductdetails",
        //       "title": "Product Master",
        //       "icon": null,
        //       "children": null
        //   },
        //   {
        //       "link": "/getallreferaldetails",
        //       "title": "Referal Master",
        //       "icon": null,
        //       "children": null
        //   },
        //   {
        //       "link": "/getallsectiondetails",
        //       "title": "Section Master",
        //       "icon": null,
        //       "children": null
        //   },
        //   {
        //       "link": "/getallcoverdetails",
        //       "title": "Cover Master",
        //       "icon": null,
        //       "children": null
        //   },
            {
                "link": "/Admin/countryMaster",
                "title": "Bank Master",
                "icon": null,
                "children": null
            },
            {
                "link": "/Admin/countryMaster",
                "title": "Country Master",
                "icon": null,
                "children": null
            },
            // {
            //     "link": "/getallcountrydetails",
            //     "title": "Commodity Master",
            //     "icon": null,
            //     "children": null
            // },
            // {
            //     "link": "/getallcurrencydetails",
            //     "title": "Currency Master",
            //     "icon": null,
            //     "children": null
            // },
        //   {
        //       "link": "/getallbankdetails",
        //       "title": "Bank Master",
        //       "icon": null,
        //       "children": null
        //   },
         
        //   {
        //       "link": "/getallstatedetails",
        //       "title": "State Master",
        //       "icon": null,
        //       "children": null
        //   },
        //   {
        //       "link": "/getallcitydetails",
        //       "title": "City Master",
        //       "icon": null,
        //       "children": null
        //   }
      ]
  },
  {
      "link": "/",
      "title": "Referral",
      "icon": "layers-outline",
      "children": [
          {
              "link": "/referal",
              "title": "Pending Quotes",
              "icon": null,
              "children": null
          },
          {
              "link": "/referal",
              "title": "Approved Quotes",
              "icon": null,
              "children": null
          },
          {
              "link": "/referal",
              "title": "Rejected Quotes",
              "icon": null,
              "children": null
          }
      ]
  }
];
