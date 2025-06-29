
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChefHat, User, ShoppingCart, BookOpen } from "lucide-react";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in (mock check)
    const user = localStorage.getItem('nutriweb_user');
    setIsLoggedIn(!!user);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <ChefHat className="h-8 w-8 text-green-600 mr-2" />
              <h1 className="text-2xl font-bold text-gray-900">Nutriweb</h1>
            </div>
            <nav className="flex items-center space-x-4">
              {isLoggedIn ? (
                <>
                  <Link to="/profile">
                    <Button variant="ghost">Perfil</Button>
                  </Link>
                  <Link to="/products">
                    <Button variant="ghost">Productos</Button>
                  </Link>
                  <Link to="/recipes">
                    <Button variant="ghost">Recetas</Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      localStorage.removeItem('nutriweb_user');
                      setIsLoggedIn(false);
                    }}
                  >
                    Cerrar Sesión
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost">Iniciar Sesión</Button>
                  </Link>
                  <Link to="/register">
                    <Button>Registrarse</Button>
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Descubre recetas con lo que tienes en casa
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Gestiona tu perfil nutricional, registra los productos de tu heladera y encuentra recetas perfectas para ti.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="text-center">
            <CardHeader>
              <User className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle>Perfil Nutricional</CardTitle>
              <CardDescription>
                Registra tu peso y altura para calcular tu IMC automáticamente
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <ShoppingCart className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Tu Heladera</CardTitle>
              <CardDescription>
                Mantén una lista actualizada de los productos que tienes disponibles
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <BookOpen className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle>Recetas Personalizadas</CardTitle>
              <CardDescription>
                Encuentra recetas que puedas preparar con tus ingredientes actuales
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {!isLoggedIn && (
          <div className="text-center">
            <Link to="/register">
              <Button size="lg" className="mr-4">
                Comenzar Ahora
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg">
                Ya tengo cuenta
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
