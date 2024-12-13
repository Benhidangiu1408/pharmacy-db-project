export interface InsertEmployee{
    name: string;
    address: string;
    account: string;
    password: string;
    phone_no: string;
    working_type: string;
    job_type: string;
    credential: string;
}

export interface Employee{
    id:number;
    name: string;
    address: string;
    account: string;
    password: string;
    phone_no: string;
    working_type: string;
    job_type: string;
    credential: string;
}

export interface UpdateEmployeePassword{
    id:number;
    new_password:string;
}

export interface UpdateEmployeeJobType{
    id:number;
    new_job_type:string
}