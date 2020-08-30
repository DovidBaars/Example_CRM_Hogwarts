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
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import AlternateEmailOutlinedIcon from "@material-ui/icons/AlternateEmailOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import SecurityOutlinedIcon from "@material-ui/icons/SecurityOutlined";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { AdminUsersContext } from "../contexts/AdminUsersContext";
import DoneAllOutlinedIcon from "@material-ui/icons/DoneAllOutlined";
import { green } from "@material-ui/core/colors";
import SendOutlinedIcon from "@material-ui/icons/Send";
import { setAdmin } from "../lib/lib";
import { addAdmin, getAdmins } from "../lib/axiosLib";

const AdminSignup = () => {
  const { adminDataStore, setAdminDataStore } = useContext(AdminUsersContext);
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
    submitted: false,
    passwordError: false,
    emailError: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({
      ...values,
      [prop]: event.target.value,
      submitted: false,
      passwordError: false,
      emailError: false,
    });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const validatePassword = () => {
    return values.password === values.confirmPassword ? true : false;
  };

  const validateEmailFromDataStore = () => {
    const result = adminDataStore.find((admin) => {
      return admin.email === values.email;
    });
    return result !== undefined ? false : true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validatePassword() === false) {
      setValues({ ...values, passwordError: true });
    } else if (validateEmailFromDataStore() === false) {
      setValues({ ...values, emailError: true });
    } else {
      const admin = setAdmin(values);
      addAdmin(admin);
      setValues({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        showPassword: false,
        submitted: true,
        passwordError: false,
        emailError: false,
      });
    }
  };

  useEffect(() => {
    (async function setAdminsListContext() {
      const adminsArray = await getAdmins();
      setAdminDataStore(adminsArray);
    })();
  }, [setAdminDataStore]);

  return (
    <Container maxWidth="sm">
      <Paper elevation={0} style={{ padding: 16 }}>
        <form id="admin-signup" onSubmit={handleSubmit}>
          <InputLabel htmlFor="admin-signup">Admin Signup</InputLabel>
          <TextField
            focused
            label="Name"
            variant="outlined"
            type="name"
            required
            value={values.name}
            onChange={handleChange("name")}
            margin="normal"
            style={{ marginRight: 8 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleOutlinedIcon />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            error={values.emailError && true}
            helperText={values.emailError && "Admin email already exists!"}
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
          <TextField
            error={values.passwordError && true}
            helperText={values.passwordError && "Passwords do not match!"}
            autoComplete="on"
            label="Repeat Password"
            variant="outlined"
            type={values.showPassword ? "text" : "password"}
            required
            value={values.confirmPassword}
            onChange={handleChange("confirmPassword")}
            margin="normal"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SecurityOutlinedIcon />
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
            value={values.submitted ? "Submitted" : "Submit"}
            style={{
              marginTop: "25px",
              marginRight: 16,
              float: "right",
              cursor: "default",
            }}
            endAdornment={
              <InputAdornment position="end">
                {values.submitted ? (
                  <DoneAllOutlinedIcon style={{ color: green[500] }} />
                ) : (
                  <SendOutlinedIcon color="primary" />
                )}
              </InputAdornment>
            }
          />
        </form>
      </Paper>
    </Container>
  );
};
export default AdminSignup;
