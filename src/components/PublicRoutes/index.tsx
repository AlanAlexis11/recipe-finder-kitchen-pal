import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { isLoggedIn, isLoading } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isLoggedIn) {
      navigate("/profile", { replace: true });
    }
  }, [isLoggedIn, isLoading]);

  return children;
};

export default PublicRoute;
