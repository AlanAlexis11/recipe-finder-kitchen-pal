import { useState, useEffect, useCallback, memo } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChefHat } from "lucide-react";
import { useAuthStore } from "@/store/useAuthStore";

const Navigation = () => {
  const { logout, isLoggedIn } = useAuthStore();
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userData = localStorage.getItem('nutriweb_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = useCallback(async () => {
    await logout()
    navigate('/login');
  }, [navigate]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <Link to="/" className="flex items-center">
            <ChefHat className="h-8 w-8 text-green-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-900">Nutriweb</h1>
          </Link>

          {user && (
            <nav className="flex items-center space-x-4">
              <Link to="/profile">
                <Button
                  variant={isActive('/profile') ? "default" : "ghost"}
                >
                  Perfil
                </Button>
              </Link>
              <Link to="/products">
                <Button
                  variant={isActive('/products') ? "default" : "ghost"}
                >
                  Productos
                </Button>
              </Link>
              <Link to="/recipes">
                <Button
                  variant={isActive('/recipes') ? "default" : "ghost"}
                >
                  Recetas
                </Button>
              </Link>
              {
                isLoggedIn &&  <Button variant="outline" onClick={handleLogout}>
                Cerrar Sesión
              </Button>
              }
             
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default memo(Navigation);