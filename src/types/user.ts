import { ImcCategory } from "./imcCategory";

export interface Product {
  id: string;
  name: string;
  brand?: string;
}
export interface User {
  id?: string;
  username: string;
  weight: number;
  height: number;
  imc?: number;
  email: string;
  userProfiles?: {
    height: number;
    weight: number;
    imc: number;
    foodType: string;
    imc_category?: ImcCategory;
  };
  category_imc?: string;
  medical_conditions?: string[];
  habits?: string[];
}
