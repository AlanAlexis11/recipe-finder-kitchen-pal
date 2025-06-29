
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock, ChefHat, Search, Utensils, AlertCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import { recipes, Recipe } from "@/data/recipes";

const Recipes = () => {
  const [user, setUser] = useState<any>(null);
  const [userProducts, setUserProducts] = useState<string[]>([]);
  const [availableRecipes, setAvailableRecipes] = useState<Recipe[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("Todas");
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
    const userData = localStorage.getItem('nutriweb_user');
    if (!userData) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);

    // Load user products
    const savedProducts = localStorage.getItem(`nutriweb_products_${parsedUser.id}`);
    const products = savedProducts ? JSON.parse(savedProducts) : [];
    setUserProducts(products);

    // Filter available recipes
    const available = recipes.filter(recipe => {
      return recipe.ingredients.every(ingredient => 
        products.some((product: string) => 
          product.toLowerCase().includes(ingredient.toLowerCase()) ||
          ingredient.toLowerCase().includes(product.toLowerCase())
        )
      );
    });

    setAvailableRecipes(available);
  }, [navigate]);

  const categories = ["Todas", ...Array.from(new Set(recipes.map(recipe => recipe.category)))];

  const filteredRecipes = availableRecipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.ingredients.some(ingredient => 
                           ingredient.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    const matchesCategory = selectedCategory === "Todas" || recipe.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Fácil": return "bg-green-100 text-green-800";
      case "Intermedio": return "bg-yellow-100 text-yellow-800";
      case "Difícil": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getAvailableIngredients = (recipeIngredients: string[]) => {
    return recipeIngredients.filter(ingredient =>
      userProducts.some(product =>
        product.toLowerCase().includes(ingredient.toLowerCase()) ||
        ingredient.toLowerCase().includes(product.toLowerCase())
      )
    );
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navigation />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Recetas Disponibles</h1>
          <p className="text-gray-600">
            Recetas que puedes preparar con los productos de tu heladera
          </p>
        </div>

        {userProducts.length === 0 ? (
          <Alert className="mb-8">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              No tienes productos registrados en tu heladera. 
              <Button asChild variant="link" className="px-2">
                <a href="/products">Agregar productos</a>
              </Button>
              para ver recetas disponibles.
            </AlertDescription>
          </Alert>
        ) : (
          <>
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="flex-1">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
                  <Input
                    placeholder="Buscar recetas o ingredientes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            <div className="mb-6 text-center">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {filteredRecipes.length} receta{filteredRecipes.length !== 1 ? 's' : ''} disponible{filteredRecipes.length !== 1 ? 's' : ''}
              </Badge>
            </div>

            {filteredRecipes.length === 0 ? (
              <Alert>
                <ChefHat className="h-4 w-4" />
                <AlertDescription>
                  No hay recetas disponibles con los ingredientes actuales. 
                  Intenta agregar más productos a tu heladera o busca algo diferente.
                </AlertDescription>
              </Alert>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRecipes.map((recipe) => (
                  <Card key={recipe.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2">{recipe.name}</CardTitle>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className={getDifficultyColor(recipe.difficulty)}>
                              {recipe.difficulty}
                            </Badge>
                            <Badge variant="outline">{recipe.category}</Badge>
                          </div>
                        </div>
                        <Utensils className="h-6 w-6 text-gray-400" />
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {recipe.cookingTime} minutos
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="mb-4">
                        <h4 className="font-medium text-sm mb-2">Ingredientes necesarios:</h4>
                        <div className="flex flex-wrap gap-1">
                          {recipe.ingredients.map((ingredient, index) => {
                            const available = getAvailableIngredients([ingredient]).length > 0;
                            return (
                              <Badge
                                key={index}
                                variant={available ? "default" : "outline"}
                                className={`text-xs ${
                                  available 
                                    ? "bg-green-100 text-green-800" 
                                    : "bg-gray-100 text-gray-600"
                                }`}
                              >
                                {ingredient}
                              </Badge>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-sm mb-2">Instrucciones:</h4>
                        <ol className="text-sm text-gray-600 space-y-1">
                          {recipe.instructions.map((instruction, index) => (
                            <li key={index} className="flex">
                              <span className="text-green-600 font-medium mr-2 min-w-[1.5rem]">
                                {index + 1}.
                              </span>
                              <span>{instruction}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Recipes;
