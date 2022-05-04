import { Form, Input, Button, Result } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { AppState } from "../store";
import { login } from "../store/actions/userActions";
import { LoginForm, UserDispatch } from "../types/user";
import showError from "../utils/showError";
import showSuccess from "../utils/showSuccess";

export function useLocationState<T = unknown>() {
    const { state } = useLocation();
    return state as Partial<T> | null;
}

const Login = () => {
    const navigate = useNavigate();
    const location = useLocationState<{ newRegister?: boolean }>();
    //console.log("newRegister...", location?.newRegister);
    const dispatch: UserDispatch = useDispatch();
    const handleSubmit = (values: LoginForm) => {
        dispatch(login(values));
    };
    const { data, error } = useSelector((state: AppState) => state.user);

    useEffect(() => {
        error && showError(error);
    }, [error]);

    useEffect(() => {
        data.username && showSuccess("You have successfully logged in!");
    }, [data.username]);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/");
        }
    }, [data, navigate]);

    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={handleSubmit}
            autoComplete="off"
        >
            <h2 style={{ textAlign: "center", marginBottom: 40 }}>
                Please Login
            </h2>

            {location?.newRegister && (
                <Result
                    status="success"
                    title="You successfully signed up!"
                    subTitle="Please login using your
                    credentials."
                />
            )}
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    { required: true, message: "Please input your username!" },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[
                    { required: true, message: "Please input your password!" },
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default Login;
