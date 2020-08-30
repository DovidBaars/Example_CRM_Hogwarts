import React, { Fragment } from "react";
import {
  TextField,
  InputAdornment,
  InputLabel,
  Input,
} from "@material-ui/core";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import AlternateEmailOutlinedIcon from "@material-ui/icons/AlternateEmailOutlined";
import DoneAllOutlinedIcon from "@material-ui/icons/DoneAllOutlined";
import { green } from "@material-ui/core/colors";
import SendOutlinedIcon from "@material-ui/icons/Send";

const StudentEntryForm = ({ values, handleChange, editOrAdd }) => {
  return (
    <Fragment>
      <InputLabel htmlFor="add-student">Add Student</InputLabel>
      {editOrAdd && (
        <TextField
          error={values.emailError && true}
          helperText={values.emailError && "Student email already exists!"}
          focused
          label="Email"
          variant="outlined"
          type="email"
          required
          value={values.email}
          onChange={handleChange("email")}
          margin="normal"
          style={{ marginRight: 8 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AlternateEmailOutlinedIcon />
              </InputAdornment>
            ),
          }}
        />
      )}
      <TextField
        label="First Name"
        variant="outlined"
        type="text"
        required
        value={values.first_name}
        onChange={handleChange("first_name")}
        margin="normal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircleOutlinedIcon />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Last Name"
        variant="outlined"
        type="text"
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
    </Fragment>
  );
};
export default StudentEntryForm;
