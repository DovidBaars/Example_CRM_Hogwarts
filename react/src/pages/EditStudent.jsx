import React, { useContext } from "react";
import { Container, Paper } from "@material-ui/core";
import { AdminUsersContext } from "../contexts/AdminUsersContext";
import StudentAccountLogin from "../components/StudentAccountLogin";
import StudentProfile from "../components/StudentProfile";

const EditStudent = () => {
  const { currentStudentAccount } = useContext(AdminUsersContext);
  return (
    <Container maxWidth="sm">
      <Paper elevation={0} style={{ padding: 16 }}>
        <StudentAccountLogin />
        {currentStudentAccount && <StudentProfile />}
      </Paper>
    </Container>
  );
};
export default EditStudent;
