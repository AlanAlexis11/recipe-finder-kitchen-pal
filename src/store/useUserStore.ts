import { create } from "zustand";
import axios from "axios";
import { Product, User } from "@/types/user";

interface UserStore {
    user: User | null;
    userProducts: Product[];
    isLoading: boolean;
    error: string | null;
    setUser: (user: User) => void;
    addProduct: (product: Product) => Promise<void>;
    updateUser: (data: Partial<User>) => Promise<void>;
    deleteProduct: (productId: string) => Promise<void>;
    fetchUser: () => Promise<void>;
}
const USER_ID = 1;

const API_BASE_URL = import.meta.env.VITE_API_BACKEND_URL || 'http://localhost:3000';

export const useUserStore = create<UserStore>((set, get) => ({
    user: null,
    isLoading: false,
    error: null,
    userProducts: [],
    setUser: (user) => set({ user }),
    updateUser: async (data) => {
        try {
            const updatedUser = { ...get().user, ...data };
            const res = await axios.patch(`${API_BASE_URL}/users/1`, updatedUser);
            set({ user: res?.data?.data as User });
        } catch (error) {
            console.error("Error updating user:", error);
        }
    },
    // ✅ Método para agregar un nuevo producto
    addProduct: async (product: Product) => {
        try {
            const url = `${API_BASE_URL}/users/${USER_ID}/products/${product?.id}`;

            await axios.post(url);
            set((state) => ({ userProducts: [...state.userProducts, product] }));
        } catch (err) {
            console.error("Failed to add product:", err);
            set({ error: "Failed to add product." });
        }
    },
    deleteProduct: async (productId) => {
        try {
            // Ruta para eliminar un producto
            await axios.delete(`${API_BASE_URL}/users/${USER_ID}/products/${productId}`);
            // Actualiza el estado filtrando el producto eliminado
            set((state) => ({
                userProducts: state.userProducts.filter(product => product.id !== productId)
            }));
        } catch (err) {
            console.error("Failed to delete product:", err);
            set({ error: "Failed to delete product." });
        }
    },
    fetchUser: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(`${API_BASE_URL}/users/1`);
            if (response.data) {
                const fetchedUser = response.data;
                set({ user: fetchedUser?.data as User, userProducts: fetchedUser?.data?.products, isLoading: false });
            } else {
                set({ isLoading: false, error: 'User data not found.' });
            }
        } catch (err) {
            console.error("Failed to fetch user:", err);
            set({ isLoading: false, error: "Failed to fetch user data." });
        }
    },
}));