import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Container, InputLabel, Button, Paper } from "@material-ui/core";
import { AdminUsersContext } from "../contexts/AdminUsersContext";
import SendOutlinedIcon from "@material-ui/icons/Send";

const AdminLogout = () => {
  const { currentAdminUser, logoutCurrentAdminUser } = useContext(
    AdminUsersContext
  );

  const history = useHistory();

  const handleClick = () => {
    logoutCurrentAdminUser();
    history.push("/admin/login");
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={0} style={{ padding: 16 }}>
        <form id="admin-logout">
          <InputLabel htmlFor="admin-logout">
            {currentAdminUser && currentAdminUser.name}
          </InputLabel>
          <Button
            variant="outlined"
            endIcon={<SendOutlinedIcon color="primary" />}
            onClick={handleClick}
            styles={{ margin: 16 }}
          >
            Logout
          </Button>
        </form>
      </Paper>
    </Container>
  );
};
export default AdminLogout;
