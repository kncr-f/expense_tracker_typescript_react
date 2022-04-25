import { Form, Input, Button, Result } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../utils/api";
import showError from "../utils/showError";

export function useLocationState<T = unknown>() {
    const { state } = useLocation();
    return state as Partial<T> | null;
}

const Login = () => {
    const navigate = useNavigate();
    const location = useLocationState<{ newRegister?: boolean }>();
    //console.log("newRegister...", location?.newRegister);

    const onFinish = async (values: any) => {
        console.log("Success:", values);
        try {
            await api.post("/users/login", values);
            navigate("/");
        } catch (error) {
            console.log({ error });
            showError((error as any).response.data.errorMessage);
        }
    };

    const onFinishFailed = (error: any) => {
        console.log("Failed:", error);
        showError((error as any).response.data.errorMessage);
    };

    return (
        <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <h2 style={{ textAlign: "center", marginBottom: 40 }}>
                Please Login
            </h2>
            <Result
                status="success"
                title="You successfully signed up!"
                subTitle="Please login using your
                    credentials."
            />
            {location?.newRegister && (
                <p>
                    You successfully signed up. Please login using your
                    credentials.
                </p>
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
