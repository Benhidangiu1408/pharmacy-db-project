export interface InsertOrder{
    destination: string;
    note: string;
    distance: number;
    order_status_id: number;
    total: number;
    cust_id: number;
    cust_name: string;
    cust_phone_no: string;
    order_date: string;
    voucher_id: number;
    shipper_id: number;
    shipper_cost: number;
    order_items: string; // Assuming this is a JSON string
    employee_id: number;
}

export interface AdminOrder{
    order_id: number;
    destination: string;
    note: string;
    distance: number;
    order_status_id: number;
    total: number;
    cust_id: number;
    cust_name: string;
    cust_phone_no: string;
    order_date: string;
    voucher_id: number;
    shipper_id: number;
    shipper_name: string;
    logistic_company_name: string;
    shipping_cost: number;
    product_name: string;
    product_quantity: number;
    employee_name: string;
}

export interface EmployeeOrder{
    order_id: number;
    destination: string;
    note: string;
    distance: number;
    order_status_id: number;
    total: number;
    cust_id: number;
    cust_name: string;
    cust_phone_no: string;
    order_date: string;
    voucher_id: number;
    shipper_id: number;
    shipper_name: string;
    logistic_company_name: string;
    shipping_cost: number;
    product_name: string;
    product_quantity: number;
}

export interface OrderStatus{
     status_id:number;
     name:string;
}