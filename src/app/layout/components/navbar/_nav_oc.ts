


export const navSubItem: any[] = [
  // {
  //   "link": "/Admin/productList/productDetails",
  //   "title": "Product Details",
  //   "icon": null
  // },
  // {
  //   "link": "/Admin/productList/productDetails/sectionDetails",
  //   "title": "Sections",
  //   "icon": null
  // },
  // {
  //   "link": "/Admin/productList/productDetails/coverDetails",
  //   "title": "Covers",
  //   "icon": null
  // },
  // {
  //   "link": "#",
  //   "title": "Attachment",
  //   "icon": null
  // },
  {
    "link": "Home",
    "title": "Dashboard",
    "icon": 'keypad-outline'
  },
  {
    "link": "Home/existingQuotes/customerSelection",
    "title": "New Quote",
    "icon": "settings-outline"
  },
  {
    "link": "Home/existingQuotes",
    "title": "Existing Quote",
    "icon": 'list-outline'
  },
  {
    "link": "Home/customer",
    "title": "Customer",
    "icon": "keypad-outline",
  },
  {
    "link": "/",
    "title": "Referral",
    "icon": "layers-outline",
    "children": [
        {
            "link": "Home/referralPending",
            "title": "Pending Quotess",
            "icon": null,
            "children": null
        },
        {
            "link": "Home/referralApproved",
            "title": "Approved Quotes",
            "icon": null,
            "children": null
        },
        {
            "link": "Home/referralRejected",
            "title": "Rejected Quotes",
            "icon": null,
            "children": null
        }
    ]
  }
];
