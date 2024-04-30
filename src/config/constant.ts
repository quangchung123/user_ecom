import {EActions} from "@/types/enum";
import {IDataAction} from "@/types";

export const sideBarOptions = [
    {
        key: "dashboard",
        name:"Danh sách shop",
        router: "/admin/shop",
        icon: "<i class=\"bi bi-shop\"></i>",
        children: [],
    },
    {
        key: "seller",
        name:"Danh sách seller",
        router: "/admin/seller",
        icon: "<i class=\"bi bi-person-video\"></i>",
        children: [],
    },
    {
        key: "order",
        name:"Quản lý đơn hàng",
        router: "/admin/order",
        icon: "<i class=\"bi bi-cart-plus\"></i>",
        children: [],
    },
    {
        key: "commission",
        name:"Quản lý hoa hồng",
        router: "/admin/commission",
        icon: "<i class=\"bi bi-sticky-fill\"></i>",
        children: [],
    },
    {
        key: "payment",
        name:"Yêu cầu rút tiền",
        router: "/admin/payment",
        icon: "<i class=\"bi bi-credit-card\"></i>",
        children: [],
    },
    {
        key: "banner",
        name: "Quản lý banner",
        router: "/admin/banner",
        icon: "<i class=\"bi bi-flag\"></i>"
    }
]
export const ulrAdmin = "";

export const user = {
    phone_number:"0842172257",
    password:"123456"
}

export const detailPopups = [
    {
        key: 1,
        name: "Thông tin chi tiết",
    },
    {
        key: 2,
        name: "Doanh thu",
    },
    {
        key: 3,
        name: "Sản phẩm",
    },
]

export const detailPopupOrder = [
    {
        key: 1,
        name: "Thông tin người mua",
    },
    {
        key: 2,
        name: "Thông tin shop",
    },
    {
        key: 3,
        name: "Thông tin sản phẩm",
    },
]

export const breakpoints = {
    'xs': '375px',
    // => @media (min-width: 425px) { ... }

    'sm': '640px',
    // => @media (min-width: 640px) { ... }

    'md': '768px',
    // => @media (min-width: 768px) { ... }

    'lg': '1024px',
    // => @media (min-width: 1024px) { ... }

    'xl': '1280px',
    // => @media (min-width: 1280px) { ... }

    '2xl': '1536px',
    // => @media (min-width: 1536px) { ... }
};
export const tabs = [
    {
        key: 1,
        name: "Hàng đợi"
    },
    {
        key: 2,
        name: "Đồng ý"
    },
    {
        key: 3,
        name: "Từ chối"
    },

]
export const tabsSeller = [
    {
        key: 1,
        name: "BD"
    },
    {
        key: 2,
        name: "BDM"
    }
]
export const tabsShop = [
    {
        key: 1,
        name: "WAIT"
    },
    {
        key: 2,
        name: "APPROVE"
    },
    {
        key: 3,
        name: "REJECT"
    }
]

export const  actions: IDataAction = [
    {
        key: 1,
        title: 'Xem chi tiết',
        value: EActions.Detail,
    },
    {
        key: 2,
        title: 'Đồng ý',
        value: EActions.Accept,
    },
    {
        key: 3,
        title: 'Từ chối',
        value: EActions.Reject,
    }
];
