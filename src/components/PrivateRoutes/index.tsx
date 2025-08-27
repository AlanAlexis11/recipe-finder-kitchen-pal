import { useProductStore } from "@/store/useProductStore";
import { useRecipeStore } from "@/store/useRecipeStore";
import { useUserStore } from "@/store/useUserStore";
import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Navigation from "../Navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { Loader } from "lucide-react";

const PrivateRoute: React.FC = () => {
  const { fetchUser, isLoading: isUserLoading, error } = useUserStore();
  const { isLoggedIn, isLoading, user } = useAuthStore();
  const { products, fetchProducts, isLoading: isProductsLoading } = useProductStore();
  const { recipes, fetchRecipes, fetchCategories, categories, isLoading: isRecipesLoading } = useRecipeStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !isUserLoading) {
      fetchUser();
    }

    const promisesToFetch: Promise<void>[] = [];

    if (products.length === 0 && !isProductsLoading) {
      promisesToFetch.push(fetchProducts());
    }
    if (recipes.length === 0 && !isRecipesLoading) {
      promisesToFetch.push(fetchRecipes());
    }

    if (categories.length === 0 && !isRecipesLoading) {
      promisesToFetch.push(fetchCategories());
    }

    if (promisesToFetch.length > 0) {
      Promise.all(promisesToFetch);
    }
  }, []);

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, isLoading]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader size={48} className="animate-spin" />
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Navigation />
      <Outlet />;
    </>
  );
};

export default PrivateRoute;
