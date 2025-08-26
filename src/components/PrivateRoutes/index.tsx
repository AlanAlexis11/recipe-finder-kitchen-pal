import { useProductStore } from '@/store/useProductStore';
import { useRecipeStore } from '@/store/useRecipeStore';
import { useUserStore } from '@/store/useUserStore';
import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Navigation from '../Navigation';

const PrivateRoute: React.FC = () => {
    const { user, fetchUser, isLoading: isUserLoading, error } = useUserStore();
    const { products, fetchProducts, isLoading: isProductsLoading } = useProductStore();
    const { recipes, fetchRecipes, fetchCategories, categories, isLoading: isRecipesLoading } = useRecipeStore();

    useEffect(() => {
        if (!user && !isUserLoading) {
            fetchUser();
        }

        if (user) {
            const promisesToFetch: Promise<void>[] = [];

            if (products.length === 0 && !isProductsLoading) {
                promisesToFetch.push(fetchProducts());
            }
            if (recipes.length === 0 && !isRecipesLoading) {
                promisesToFetch.push(fetchRecipes());
            }

            if(categories.length === 0 && !isRecipesLoading){
                promisesToFetch.push(fetchCategories());
            }

            if (promisesToFetch.length > 0) {
                Promise.all(promisesToFetch);
            }
        }
    }, []); 

    if (error || !user) {
        return <Navigate to="/login" replace />;
    }

    return <>
        <Navigation />
        <Outlet />;
    </>
};

export default PrivateRoute;