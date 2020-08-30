import React, { useContext, useState } from "react";
import {
  TextField,
  InputAdornment,
  InputLabel,
  Input,
  Paper,
} from "@material-ui/core";
import AlternateEmailOutlinedIcon from "@material-ui/icons/AlternateEmailOutlined";
import { AdminUsersContext } from "../contexts/AdminUsersContext";
import SendOutlinedIcon from "@material-ui/icons/Send";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import {
  validateEmailLastNameMatch,
  getStudentFromStore,
  validateStudentEmailInDataStore,
  resetStudentLoginValues,
} from "../lib/lib";

const StudentAccountLogin = () => {
  const { studentDataStore, setCurrentStudentAccount } = useContext(
    AdminUsersContext
  );
  const [values, setValues] = useState({
    email: "",
    last_name: "",
    emailError: false,
    lastNameError: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({
      ...values,
      [prop]: event.target.value,
      emailError: false,
      lastNameError: false,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (studentDataStore !== null) {
      if (validateStudentEmailInDataStore(studentDataStore, values) === false) {
        setValues({ ...values, emailError: true });
      } else if (
        validateEmailLastNameMatch(studentDataStore, values) === false
      ) {
        setValues({ ...values, lastNameError: true });
      } else {
        const student = getStudentFromStore(studentDataStore, values);
        setCurrentStudentAccount(student);
        resetStudentLoginValues(setValues);
      }
    }
  };

  return (
    <Paper style={{ padding: 8, marginBottom: 16 }}>
      <form id="student-account-login" onSubmit={handleSubmit}>
        <InputLabel htmlFor="student-account-login">
          Student Account Login
        </InputLabel>
        <TextField
          autoComplete="on"
          error={values.emailError && true}
          helperText={values.emailError && "The entered email does not exist!"}
          focused
          label="Email"
          variant="outlined"
          type="email"
          required
          value={values.email}
          onChange={handleChange("email")}
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AlternateEmailOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          error={values.lastNameError && true}
          helperText={
            values.lastNameError &&
            "The entered email and last name do not match!"
          }
          autoComplete="on"
          label="Last Name"
          variant="outlined"
          type={"text"}
          required
          value={values.last_name}
          onChange={handleChange("last_name")}
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />
        <Input
          type="submit"
          value="Login"
          style={{
            marginTop: "25px",
            marginRight: 16,
            cursor: "default",
            padding: 8,
          }}
          endAdornment={
            <InputAdornment position="end">
              <SendOutlinedIcon color="primary" />
            </InputAdornment>
          }
        />
      </form>
    </Paper>
  );
};
export default StudentAccountLogin;
