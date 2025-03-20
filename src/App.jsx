import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Layout from "antd/es/layout/layout";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Dashboard/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "./Redux/Features/Auth/UserSlice";
import Dashboard from "./components/Dashboard/Dashboard";

const { Sider, Header, Content } = Layout;

function App() {
  // const [collapsed, setCollapsed] = useState(false);
  // const user = useSelector((state) => selectUser(state));
  // const dispatch = useDispatch();
  
  // const logoutHandeler = () => {
  //   dispatch(logout());
  // };

  return (
   <Dashboard/>
  );
}

export default App;