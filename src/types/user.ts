export interface Product {
    id: string;
    name: string;
    brand?: string;
}
export interface User {
    name: string;
    weight: number;
    height: number;
    imc?: number;
    email: string;
    category_imc?: string;
    medical_conditions?: string[];
    habits?: string[];
}