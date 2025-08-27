import { useAuthStore } from "@/store/useAuthStore";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { isLoggedIn, isLoading } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading) {
      if (isLoggedIn) {
        navigate("/profile", { replace: true });
      }
    }
  }, [isLoggedIn, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader size={48} className="animate-spin" />
      </div>
    );
  }

  return children;
};

export default PublicRoute;
