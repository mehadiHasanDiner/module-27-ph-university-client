import { Layout, Menu } from "antd";
import { sidebarItemGenerator } from "../../utils/sidebarItemsGenerator";
import { adminPaths } from "../../routes/admin.routes";
import { facultyPath } from "../../routes/faculty.routes";
import { studentPaths } from "../../routes/student.routes";
import { useAppSelector } from "../../redux/hooks";
import {
  TUser,
  selectCurrentUser,
  useCurrentToken,
} from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";

const { Sider } = Layout;

const userRole = {
  ADMIN: "admin",
  FACULTY: "faculty",
  STUDENT: "student",
};

const Sidebar = () => {
  const token = useAppSelector(useCurrentToken);

  let user;
  if (token) {
    user = verifyToken(token);
  }

  let sidebarItems;

  switch ((user as TUser)!.role) {
    case userRole.ADMIN:
      sidebarItems = sidebarItemGenerator(adminPaths, userRole.ADMIN);
      break;
    case userRole.FACULTY:
      sidebarItems = sidebarItemGenerator(facultyPath, userRole.FACULTY);
      break;
    case userRole.STUDENT:
      sidebarItems = sidebarItemGenerator(studentPaths, userRole.STUDENT);
      break;

    default:
      break;
  }

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      style={{ height: "100vh", position: "sticky", top: "0", left: "0" }}
    >
      <div
        style={{
          color: "white",
          textAlign: "center",
          height: "4rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>PH University</h1>
      </div>

      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>
  );
};

export default Sidebar;
