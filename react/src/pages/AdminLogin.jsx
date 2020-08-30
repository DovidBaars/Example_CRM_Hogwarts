import React, { useContext, useState, useEffect } from "react";
import {
  Container,
  TextField,
  InputAdornment,
  IconButton,
  Paper,
  InputLabel,
  Input,
} from "@material-ui/core";
import AlternateEmailOutlinedIcon from "@material-ui/icons/AlternateEmailOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { AdminUsersContext } from "../contexts/AdminUsersContext";
import SendOutlinedIcon from "@material-ui/icons/Send";
import {
  validateEmailPasswordMatch,
  getAdminFromStore,
  validateAdminEmailInDataStore,
  resetAdminLoginValues,
} from "../lib/lib";
import { getAdmins, getSkills, getStudents } from "../lib/axiosLib";

const AdminLogin = () => {
  const {
    adminDataStore,
    setCurrentAdminUser,
    setAdminDataStore,
    setOptionsList,
    setStudentDataStore,
  } = useContext(AdminUsersContext);
  const [values, setValues] = useState({
    email: "",
    password: "",
    showPassword: false,
    emailError: false,
    passwordError: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({
      ...values,
      [prop]: event.target.value,
      emailError: false,
      passwordError: false,
    });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateAdminEmailInDataStore(adminDataStore, values) === false) {
      setValues({ ...values, emailError: true });
    } else if (validateEmailPasswordMatch(adminDataStore, values) === false) {
      setValues({ ...values, passwordError: true });
    } else {
      const admin = getAdminFromStore(adminDataStore, values);
      setCurrentAdminUser(admin);
      resetAdminLoginValues(setValues);
    }
  };

  useEffect(() => {
    (async function setAdminsAndSkillsListContext() {
      const adminsArray = await getAdmins();
      setAdminDataStore(adminsArray);
      const skills = await getSkills();
      const reformattedArray = skills.map((skill) => {
        let rObj = {};
        rObj["title"] = skill;
        return rObj;
      });
      setOptionsList([...reformattedArray]);
      const studentsArray = await getStudents();
      setStudentDataStore(studentsArray);
    })();
  }, [setAdminDataStore, setOptionsList, setStudentDataStore]);

  return (
    <Container maxWidth="sm">
      <Paper elevation={0} style={{ padding: 16 }}>
        <form id="admin-login" onSubmit={handleSubmit}>
          <InputLabel htmlFor="admin-login">Admin Login</InputLabel>
          <TextField
            autoComplete="on"
            error={values.emailError && true}
            helperText={
              values.emailError && "The entered email does not exist!"
            }
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
            error={values.passwordError && true}
            helperText={
              values.passwordError &&
              "The entered email and password do not match!"
            }
            autoComplete="on"
            label="Password"
            variant="outlined"
            type={values.showPassword ? "text" : "password"}
            required
            value={values.password}
            onChange={handleChange("password")}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
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
              float: "right",
              cursor: "default",
            }}
            endAdornment={
              <InputAdornment position="end">
                <SendOutlinedIcon color="primary" />
              </InputAdornment>
            }
          />
        </form>
      </Paper>
    </Container>
  );
};
export default AdminLogin;
