
export const MENU: any[] = [
    {
        id: 1,
        label: 'MENUITEMS.MENU.TEXT',
        isTitle: true
    },
    {
        id: 2,
        label: 'MENUITEMS.DASHBOARDS.TEXT',
        icon: 'ri-dashboard-line',
        badge: {
            variant: 'success',
            text: 'MENUITEMS.DASHBOARDS.BADGE',
        },
        link: '/'
    },
    {
        id: 3,
        label: 'MENUITEMS.PRODUCTS.TEXT',
        icon: 'ri-store-2-line',
        subItems: [
            {
                id: 1,
                label: 'MENUITEMS.PRODUCTS.ITEMS.PRODUCTS',
                link: '/products',
                parentId: 3
            },
            {
                id: 2,
                label: 'MENUITEMS.PRODUCTS.ITEMS.ADDPRODUCT',
                link: '/products/add-product',
                parentId: 3
            },
            // {
            //     id: 3,
            //     label: 'MENUITEMS.PRODUCTS.ITEMS.PRODUCTDETAILS',
            //     link: '/products/details',
            //     parentId: 3
            // }
        ]
    },
    {
        id: 4,
        label: 'MENUITEMS.CUSTOMERS.TEXT',
        icon: 'ri-user-2-line',
        subItems: [
            {
                id: 1,
                label: 'MENUITEMS.CUSTOMERS.ITEMS.CUSTOMERS',
                link: '/customers',
                parentId: 4
            },
            {
                id: 2,
                label: 'MENUITEMS.CUSTOMERS.ITEMS.ADDCUSTOMER',
                link: '/customers/add-customer',
                parentId: 4
            },
            // {
            //     id: 3,
            //     label: 'MENUITEMS.CUSTOMERS.ITEMS.CUSTOMERDETAILS',
            //     link: '/products/details',
            //     parentId: 4
            // }
        ]
    },
    {
        id: 5,
        label: 'MENUITEMS.STAFFS.TEXT',
        icon: 'ri-user-2-line',
        subItems: [
            {
                id: 1,
                label: 'MENUITEMS.STAFFS.ITEMS.STAFFS',
                link: '/staffs',
                parentId: 5
            },
            {
                id: 2,
                label: 'MENUITEMS.STAFFS.ITEMS.ADDSTAFF',
                link: '/staffs/add-staff',
                parentId: 5
            },
            // {
            //     id: 3,
            //     label: 'MENUITEMS.STAFFS.ITEMS.STAFFDETAILS',
            //     link: '/products/details',
            //     parentId: 5
            // }
        ]
    },
   
    // {
    //     id: 69,
    //     label: 'MENUITEMS.MULTILEVEL.TEXT',
    //     icon: 'ri-share-line',
    //     subItems: [
    //         {
    //             id: 70,
    //             label: 'MENUITEMS.MULTILEVEL.LIST.LEVEL1.1',
    //             link: 'javascript: void(0);',
    //             parentId: 69
    //         },
    //         {
    //             id: 71,
    //             label: 'MENUITEMS.MULTILEVEL.LIST.LEVEL1.2',
    //             parentId: 69,
    //             subItems: [
    //                 {
    //                     id: 72,
    //                     label: 'MENUITEMS.MULTILEVEL.LIST.LEVEL1.LEVEL2.1',
    //                     link: 'javascript: void(0);',
    //                     parentId: 71,
    //                 },
    //                 {
    //                     id: 73,
    //                     label: 'MENUITEMS.MULTILEVEL.LIST.LEVEL1.LEVEL2.2',
    //                     link: 'javascript: void(0);',
    //                     parentId: 71,
    //                 }
    //             ]
    //         },
    //     ]
    // }
];
