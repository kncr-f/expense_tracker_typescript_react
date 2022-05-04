import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppState } from "../store";
import { logout } from "../store/actions/userActions";

const Logout = () => {
    const { data } = useSelector((state: AppState) => state.user);
    const dispatch: any = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(logout());
    }, [dispatch]);

    if (!data.username) {
        navigate("/login", { state: { newRegister: true } });
    }

    return <div>Logout</div>;
};

export default Logout;
