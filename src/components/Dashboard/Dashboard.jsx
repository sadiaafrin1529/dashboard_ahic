import { Button } from 'antd'
import '../../App.css'
import Layout from 'antd/es/layout/layout'
import { useState } from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import Sidebar from './Sidebar'
import { Link, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectUser } from '../../Redux/Features/Auth/UserSlice'

const { Sider, Header, Content } = Layout

function Dashboard() {
  const [collapsed, setCollapsed] = useState(false)
  const user = useSelector((state) => selectUser(state));
  const dispatch = useDispatch()
  const logoutHandeler = ()=>{
    dispatch(logout())
  }

  return (
    <Layout className="min-h-screen">
      {/* Responsive Sidebar */}
      <Sider
        theme="light"
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="sider transition-all duration-300 shadow-lg"
        style={{ background: "white" }}
        width={250}
        breakpoint="lg"
        collapsedWidth="80"
      >
        <Sidebar collapsed={collapsed} />
      </Sider>

      <Layout>
        {/* Responsive Header */}
        <Header className="header flex items-center justify-between px-4 sm:px-5 md:px-6 bg-white shadow-md">
          <div className="flex items-center gap-2">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="trigger-btn text-xl flex items-center"
            />
            <h4 className="font-semibold text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl truncate">
              <span className="hidden sm:inline">Welcome, </span>
              <span className="text-blue-600 truncate">{user?.name}</span>
            </h4>
          </div>

          {/* Responsive Auth Section */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            {user ? (
              <button
                onClick={logoutHandeler}
                className="text-red-500 font-medium text-sm sm:text-base hover:text-red-700 transition-colors duration-200"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="text-blue-600 font-medium text-sm sm:text-base hover:text-blue-800 transition-colors duration-200"
              >
                Login
              </Link>
            )}
          </div>
        </Header>

        {/* Responsive Content Area */}
        <Content className="content p-3 sm:p-2 md:p-5 lg:p-6">
        <div
            style={{
             
              minHeight: "87vh",
            }}
          >
            <Outlet />
            {/* {matchDashbord && <DashbordContent/>} */}
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default Dashboard
