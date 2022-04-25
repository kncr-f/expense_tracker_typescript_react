import Register from "./components/Register";
import { Routes, Route } from "react-router-dom";
import { Layout, Menu } from "antd";
import Login from "./components/Login";

const { Header, Content, Footer } = Layout;

function App() {
    return (
        <Layout>
            <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
                <div className="logo" />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={["2"]}
                >
                    <Menu.Item key="1">nav 1</Menu.Item>
                    <Menu.Item key="2">nav 2</Menu.Item>
                    <Menu.Item key="3">nav 3</Menu.Item>
                </Menu>
            </Header>
            <Content
                className="site-layout"
                style={{ padding: "50px", marginTop: 64 }}
            >
                <Routes>
                    <Route path="/register" element={<Register />} />
                </Routes>
                <Routes>
                    <Route path="/login" element={<Login />} />
                </Routes>
            </Content>
            <Footer style={{ textAlign: "center" }}>
                Expense Tracker @ made by kncr 2022
            </Footer>
        </Layout>
    );
}

export default App;
