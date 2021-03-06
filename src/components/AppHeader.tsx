import { Menu } from "antd";
import { Header } from "antd/lib/layout/layout";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { AppState } from "../store";
import { isLoggedIn } from "../store/actions/userActions";

const AppHeader = () => {
    const { data, loading } = useSelector((state: AppState) => state.user);

    const dispatch: any = useDispatch();

    useEffect(() => {
        dispatch(isLoggedIn());
    }, [dispatch]);

    const { pathname } = useLocation();

    return (
        <>
            <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
                <div className="logo" />
                <Menu theme="dark" mode="horizontal" selectedKeys={[pathname]}>
                    {data.username ? (
                        <>
                            <Menu.Item key="/records">
                                <Link to={"records"}>Records</Link>
                            </Menu.Item>
                            <Menu.Item key="/categories">
                                <Link to={"/categories"}>Categories</Link>
                            </Menu.Item>
                            <Menu.Item key="/logout">
                                <Link to={"/logout"}>LogOut</Link>
                            </Menu.Item>
                        </>
                    ) : loading ? null : (
                        <Menu.Item key="/login">
                            <Link to={"/login"}>Login</Link>
                        </Menu.Item>
                    )}
                </Menu>
            </Header>
        </>
    );
};

export default AppHeader;
