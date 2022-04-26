import { Navigate, Route, RouteProps, Routes } from "react-router-dom";

interface PrivateRouteProps extends RouteProps {
    component: React.FC<any>;
}

const PrivateRoute = ({
    component: Component,
    ...theRest
}: PrivateRouteProps) => {
    const token = localStorage.getItem("token");
    if (token) {
        return (
            <Routes>
                <Route {...theRest} element={<Component animate={true} />} />
            </Routes>
        );
    } else {
        return <Navigate to="/login" />;
    }
};

export default PrivateRoute;
