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
    {key: '_id', label: '#'},
    {key: 'image', label: 'Image'},
    {key: 'name', label: 'Name'},
    {key: 'price', label: 'Price'},
    {key: 'count', label: 'Count'},
    {key: 'description', label: 'Description'},
    {key: 'action', label: 'Action'}
]
export const columnCategories = [
    {key: '_id', label: '#'},
    {key: 'title', label: 'Title'},
    {key: 'description', label: 'Description'},
    {key: 'action', label: 'Action'}
]
export const columnUser = [
    {key: '_id', label: '#'},
    {key: 'name', label: 'Name'},
    {key: 'username', label: 'Username'},
    {key: 'password', label: 'Password'},
    {key: 'action', label: 'Action'}
]

export const columnDetailProduct = [
    {key: '_id', label: '#'},
    {key: 'image', label: 'Image'},
    {key: 'name', label: 'Name'},
    {key: 'price', label: 'Price'},
    {key: 'count', label: 'Count'},
    {key: 'description', label: 'Description'},
    // {key: 'rate', Label: 'Rate'},
    // {key: 'comment', Label: 'Comment'},
]

export const tabsUser = [
    {key: 'Admin', label: 'Admin'},
    {key: 'Customer', label: 'Customer'},
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

export const initStateCategory = {
    title: "",
    description: "",
}

export const initStateUser = {
    name: "",
    username: "",
    password: ""
}