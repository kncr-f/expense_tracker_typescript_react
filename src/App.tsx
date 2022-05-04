import Register from "./components/Register";
import { Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Categories from "./components/Categories";
import Records from "./components/Records";
import AppHeader from "./components/AppHeader";
import Logout from "./components/Logout";

const { Content, Footer } = Layout;

function App() {
    return (
        <Layout>
            <AppHeader />
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
                <PrivateRoute path="/categories" component={Categories} />
                <PrivateRoute path="/records" component={Records} />
                <Routes>
                    <Route path="/logout" element={<Logout />} />
                </Routes>
            </Content>
            <Footer style={{ textAlign: "center" }}>
                Expense Tracker @ made by kncr 2022
            </Footer>
        </Layout>
    );
}

export default App;
