// src/models/product.ts (or a similar path within your project)

export interface Product {
    id: number;
    employee_id: number | null; // Assuming employee_id can be null
    name: string;
    description: string;
    origin: string;
    tag: string;
    storage_condition: string;
    country_of_origin: string;
    price: number;
    directions_for_use: string;
    certificate: string;
    warning: string;
    intended_user: string;
    total_amount_from_batch: number;
    type: string
  }