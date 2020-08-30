import React, { useState, useContext } from "react";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import { Link } from "react-router-dom";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import SupervisorAccountOutlinedIcon from "@material-ui/icons/SupervisorAccountOutlined";
import VpnKeyOutlinedIcon from "@material-ui/icons/VpnKeyOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import EditAttributesOutlinedIcon from "@material-ui/icons/EditAttributesOutlined";
import { AdminUsersContext } from "../contexts/AdminUsersContext";
import { loginOrLogoutTitle, loginOrLogoutRoute } from "../lib/lib";

export default function NavBar() {
  const { currentAdminUser } = useContext(AdminUsersContext);
  const [navValue, setNavValue] = useState(0);
  const handleChange = (event, newValue) => {
    setNavValue(newValue);
  };

  return (
    <BottomNavigation
      value={navValue}
      onChange={handleChange}
      showLabels
      style={{ marginBottom: 16 }}
    >
      <BottomNavigationAction
        label="Main"
        icon={<DashboardOutlinedIcon />}
        component={Link}
        to="/main"
      />
      <BottomNavigationAction
        label="Admin Signup"
        icon={<SupervisorAccountOutlinedIcon />}
        component={Link}
        to="/admin/signup"
      />
      <BottomNavigationAction
        label={loginOrLogoutTitle(currentAdminUser)}
        icon={<VpnKeyOutlinedIcon />}
        component={Link}
        to={loginOrLogoutRoute(currentAdminUser)}
      />
      currentAdminUserZ
      <BottomNavigationAction
        label="Add Student"
        icon={<PersonAddOutlinedIcon />}
        component={Link}
        to="/student/add"
      />
      <BottomNavigationAction
        label="Edit Student"
        icon={<EditAttributesOutlinedIcon />}
        component={Link}
        to="/student/edit"
      />
    </BottomNavigation>
  );
}
