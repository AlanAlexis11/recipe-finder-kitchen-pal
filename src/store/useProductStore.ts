import { create } from "zustand";
import axios from "axios";
import { Product } from "@/types/user";

interface ProductStore {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  setProducts: (products: Product[]) => void;
  fetchProducts: () => Promise<void>;
  addProduct: (product: Product) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
}

const API_BASE_URL = import.meta.env.VITE_API_BACKEND_URL || 'http://localhost:3000';
const USER_ID = 1;

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get(`${API_BASE_URL}/products`);
      if (response.data && response.data) {
        set({ products: response.data, isLoading: false });
      } else {
        set({ isLoading: false, error: 'Product data not found.' });
      }
    } catch (err) {
      console.error("Failed to fetch products:", err);
      set({ isLoading: false, error: "Failed to fetch product data." });
    }
  },

  addProduct: async (product: Product) => {
    try {
      const url = `${API_BASE_URL}/users/${USER_ID}/products/${product?.id}`;

      const response = await axios.post(url);
      set((state) => ({ products: [...state.products, response.data] }));
    } catch (err) {
      console.error("Failed to add product:", err);
      set({ error: "Failed to add product." });
    }
  },
  setProducts: (products) => set({ products }),
  deleteProduct: async (productId) => {
    try {
      await axios.delete(`${API_BASE_URL}/users/${USER_ID}/products/${productId}`);
      set((state) => ({
        products: state.products.filter(product => product.id !== productId)
      }));
    } catch (err) {
      console.error("Failed to delete product:", err);
      set({ error: "Failed to delete product." });
    }
  },
}));