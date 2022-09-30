import { Navigate } from "react-router-dom";

type Props = {
  children: any;
  isLogged: any;
};

const PublicRoutes = ({ children, isLogged }: Props) => {
  return isLogged ? <Navigate to="/" /> : children;
};

export default PublicRoutes;
