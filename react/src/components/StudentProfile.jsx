import React, { useContext, useState, useEffect } from "react";
import SelectSkill from "../components/SelectSkill";
import { Container, Paper } from "@material-ui/core";
import { AdminUsersContext } from "../contexts/AdminUsersContext";
import {
  editCurrentStudent,
  currentValuesFunc,
  desiredValuesFunc,
} from "../lib/lib";
import StudentEntryForm from "../components/StudentEntryForm";
import StarRatingForm from "../components/StarRatingForm";
import { updateStudent } from "../lib/axiosLib";

const StudentProfile = () => {
  const {
    setStudentDataStore,
    studentDataStore,
    starCurrentValues,
    starDesiredValues,
    setStarCurrentValues,
    setStarDesiredValues,
    optionsList,
    setOptionsList,
    currentStudentAccount,
    setCurrentStudentAccount,
  } = useContext(AdminUsersContext);

  const [values, setValues] = useState({
    email: currentStudentAccount.email,
    first_name: currentStudentAccount.first_name,
    last_name: currentStudentAccount.last_name,
    submitted: false,
  });

  useEffect(() => {
    const currentValues = currentValuesFunc(currentStudentAccount);
    const desiredValues = desiredValuesFunc(currentStudentAccount);
    setStarCurrentValues(currentValues);
    setStarDesiredValues(desiredValues);
  }, [currentStudentAccount, setStarCurrentValues, setStarDesiredValues]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const student = editCurrentStudent(
      currentStudentAccount,
      values,
      starCurrentValues,
      starDesiredValues
    );
    const newStudentDataStore = [student, ...studentDataStore];
    setStudentDataStore(newStudentDataStore);
    updateStudent(student);
    setValues({
      email: "",
      first_name: "",
      last_name: "",
      submitted: true,
    });
    setCurrentStudentAccount(null);
    setStarCurrentValues([]);
    setStarDesiredValues([]);
  };

  const handleChange = (prop) => (event) => {
    setValues({
      ...values,
      [prop]: event.target.value,
      submitted: false,
    });
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={0} style={{ padding: 16 }}>
        <SelectSkill
          optionsList={optionsList}
          setOptionsList={setOptionsList}
        />
      </Paper>
      <Paper elevation={0} style={{ padding: 16 }}>
        <form id="edit-student" onSubmit={handleSubmit}>
          <StudentEntryForm
            values={values}
            handleChange={handleChange}
            editOrAdd={false}
          />
          <StarRatingForm setValues={setValues} values={values} />
        </form>
      </Paper>
    </Container>
  );
};
export default StudentProfile;
