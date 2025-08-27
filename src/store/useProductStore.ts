import { create } from "zustand";
import { Product } from "@/types/user";
import axiosInstance from "@/service/api";

interface ProductStore {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  setProducts: (products: Product[]) => void;
  fetchProducts: () => Promise<void>;
  addProduct: (product: Product) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
}

const USER_ID = 1;

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  isLoading: false,
  error: null,

  fetchProducts: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/products`);
      if (response.data && response.data) {
        set({ products: response.data, isLoading: false });
      } else {
        set({ isLoading: false, error: "Product data not found." });
      }
    } catch (err) {
      console.error("Failed to fetch products:", err);
      set({ isLoading: false, error: "Failed to fetch product data." });
    }
  },

  addProduct: async (product: Product) => {
    try {
      const url = `/users/${USER_ID}/products/${product?.id}`;

      const response = await axiosInstance.post(url);
      set((state) => ({ products: [...state.products, response.data] }));
    } catch (err) {
      console.error("Failed to add product:", err);
      set({ error: "Failed to add product." });
    }
  },
  setProducts: (products) => set({ products }),
  deleteProduct: async (productId) => {
    try {
      await axiosInstance.delete(`/users/${USER_ID}/products/${productId}`);
      set((state) => ({
        products: state.products.filter((product) => product.id !== productId),
      }));
    } catch (err) {
      console.error("Failed to delete product:", err);
      set({ error: "Failed to delete product." });
    }
  },
}));
