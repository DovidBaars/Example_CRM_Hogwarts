import React, { useContext, useState, useEffect } from "react";
import SelectSkill from "../components/SelectSkill";
import { Container, Paper } from "@material-ui/core";
import { AdminUsersContext } from "../contexts/AdminUsersContext";
import { validateStudentEmailInDataStore, setStudent } from "../lib/lib";
import StudentEntryForm from "../components/StudentEntryForm";
import StarRatingForm from "../components/StarRatingForm";
import { addStudent } from "../lib/axiosLib";

const AddStudent = () => {
  const {
    setStudentDataStore,
    studentDataStore,
    starCurrentValues,
    starDesiredValues,
    setStarCurrentValues,
    setStarDesiredValues,
    optionsList,
    setOptionsList,
  } = useContext(AdminUsersContext);

  const [values, setValues] = useState({
    email: "",
    first_name: "",
    last_name: "",
    submitted: false,
    emailError: false,
  });

  useEffect(() => {
    setStarCurrentValues([]);
    setStarDesiredValues([]);
  }, [setStarCurrentValues, setStarDesiredValues]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateStudentEmailInDataStore(studentDataStore, values) === true) {
      setValues({ ...values, emailError: true });
    } else {
      const student = setStudent(values, starCurrentValues, starDesiredValues);
      const newStudentDataStore = [student, ...studentDataStore];
      setStudentDataStore(newStudentDataStore);
      addStudent(student);
      setValues({
        email: "",
        first_name: "",
        last_name: "",
        submitted: true,
        emailError: false,
      });
      setStarCurrentValues([]);
      setStarDesiredValues([]);
    }
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
        <form id="add-student" onSubmit={handleSubmit}>
          <StudentEntryForm
            values={values}
            handleChange={handleChange}
            editOrAdd={true}
          />
          <StarRatingForm setValues={setValues} values={values} />
        </form>
      </Paper>
    </Container>
  );
};
export default AddStudent;
