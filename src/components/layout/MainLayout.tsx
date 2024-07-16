import { Button, Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/authSlice";

const { Content, Header } = Layout;

// const items: MenuProps["items"] = [
//   {
//     key: "Dashbord",
//     label: <NavLink to="/admin/dashboard">Dashboard</NavLink>,
//   },
//   {
//     key: "2",
//     label: "Profile",
//   },
//   {
//     key: "User Management",
//     label: "User Management",
//     children: [

//       {
//         key: "Create Admin",
//         label: <NavLink to="/admin/create-admin">Create Admin</NavLink>,
//       },
//       {
//         key: "Create Faculty",
//         label: <NavLink to="/admin/create-faculty">Create Faculty</NavLink>,
//       },
//       {
//         key: "Create Student",
//         label: <NavLink to="/admin/create-student">Create Student</NavLink>,
//       },
//     ],
//   },
// ];

const MainLayout = () => {
  const dispatch = useAppDispatch()
  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <Layout style={{ height: "100%" }}>
      <Sidebar />
      <Layout>
        <Header><Button onClick={handleLogout}>Logout</Button></Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            {/* The main content should go from here */}
            <Outlet />
          </div>
        </Content>

      </Layout>
    </Layout>
  );
};

export default MainLayout;
