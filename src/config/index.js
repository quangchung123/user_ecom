export const sideBarOptions = [
    {
        key: "dashboard",
        name: "Dashboard",
        route: "/admin",
        icon: '<i class="bi bi-house-fill"></i>',
        children: []
    },
    {
        key: "product",
        name: "Products",
        route: "/admin/product",
        icon: '<i class="bi bi-cart-plus-fill"></i>',
        children: []
    },
    {
        key: "categories",
        name: "Categories",
        route: "/admin/categories",
        icon: '<i class="bi bi-list-ul"></i>',
        children: []
    },
    {
        key: "order",
        name: "Order",
        route: "/admin/order",
        icon: '<i class="bi bi-bag-check-fill"></i>',
        children: []
    },
    {
        key: "users",
        name: "Users",
        route: "/admin/users",
        icon: '<i class="bi bi-person-fill"></i>',
        children: []
    }
]

export const columnProduct = [
    { key: '_id', label: '#' },
    { key: 'image', label: 'Image' },
    { key: 'name', label: 'Name' },
    { key: 'price', label: 'Price' },
    { key: 'count', label: 'Count' },
    { key: 'description', label: 'Description' },
    { key: 'action', label: 'Action' }
]
export const columnCategories = [
    { key: '_id', label: '#' },
    { key: 'title', label: 'Title' },
    { key: 'description', label: 'Description' },
    { key: 'action', label: 'Action' }
]
export const columnUser = [
    { key: '_id', label: '#' },
    { key: 'name', label: 'Name' },
    { key: 'username', label: 'Username' },
    { key: 'password', label: 'Password' },
    { key: 'action', label: 'Action' }
]

export const columnDetailProduct = [
    { key: '_id', label: '#' },
    { key: 'image', label: 'Image' },
    { key: 'name', label: 'Name' },
    { key: 'price', label: 'Price' },
    { key: 'count', label: 'Count' },
    { key: 'description', label: 'Description' },
    // {key: 'rate', Label: 'Rate'},
    // {key: 'comment', Label: 'Comment'},
]

export const columnItemCart = [
    { key: '_id', label: '#' },
    { key: 'name', label: 'Name' },
    { key: 'username', label: 'Username' },
    { key: 'password', label: 'Password' },
    { key: 'action', label: 'Action' }
]

export const tabsUser = [
    { key: 'Admin', label: 'Admin' },
    { key: 'Customer', label: 'Customer' },
]

export const titleNameList = [
    {
        title: 'Admin'
    },
    {
        title: 'Customer'
    }
]

export const initStateProduct = {
    name: "",
    price: "",
    count: "",
    description: "",
    image: "",
    categories: ""
}

export const initStateAddress = {
    name: "",
    phone: "",
    city: "",
    districts: "",
    detail: "",
}

export const initStateCategory = {
    title: "",
    description: "",
}

export const initStateUser = {
    name: "",
    username: "",
    password: ""
}

export const ratings = [
    { value: 0, label: "Tất Cả" },
    { value: 5, label: "5 Sao" },
    { value: 4, label: "4 Sao" },
    { value: 3, label: "3 Sao" },
    { value: 2, label: "2 Sao" },
    { value: 1, label: "1 Sao" }
]
export const sizes = [
    { key: 0, value: 38 },
    { key: 1, value: 39 },
    { key: 2, value: 40 },
    { key: 3, value: 41 },
    { key: 4, value: 42 },
]