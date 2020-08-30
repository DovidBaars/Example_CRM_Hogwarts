export const getAdminsOrNull = (getAdmins) => {
  const admins = getAdmins();
  return Object.keys(admins).length < 1 ? null : admins;
};

export const getStudentsOrNull = (getStudents) => {
  const students = getStudents();
  return Object.keys(students).length < 1 ? null : students;
};

export const getAdminFromStore = (adminDataStore, values) => {
  const result = adminDataStore.find((admin) => {
    return admin.email === values.email;
  });
  return result;
};

export const validateEmailPasswordMatch = (adminDataStore, values) => {
  const result = getAdminFromStore(adminDataStore, values);
  return result.password === values.password ? true : false;
};

export const validateAdminEmailInDataStore = (adminDataStore, values) => {
  const test = getAdminFromStore(adminDataStore, values);
  return test !== undefined ? true : false;
};
//setcontext would be more 'react'

export const resetAdminLoginValues = (setValues) => {
  setValues({
    email: "",
    password: "",
    showPassword: false,
    passwordError: false,
    emailError: false,
  });
};
export const loginOrLogoutTitle = (currentAdminUser) => {
  return !currentAdminUser ? "Admin Login" : currentAdminUser.name;
};
export const loginOrLogoutRoute = (currentAdminUsers) => {
  return !currentAdminUsers ? "/admin/login" : "/admin/logout";
};

export const getStudentFromStore = (studentDataStore, values) => {
  const result = studentDataStore.find((student) => {
    return student.email === values.email;
  });
  return result;
};

export const validateEmailLastNameMatch = (studentDataStore, values) => {
  const result = getStudentFromStore(studentDataStore, values);
  return result.last_name === values.last_name ? true : false;
};

export const validateStudentEmailInDataStore = (studentDataStore, values) => {
  const test = getStudentFromStore(studentDataStore, values);
  return test !== undefined ? true : false;
};
//setcontext would be more 'react'

export const resetStudentLoginValues = (setValues) => {
  setValues({
    email: "",
    last_name: "",
    emailError: false,
    lastNameError: false,
  });
};

export const setStudent = (values, starCurrentValues, starDesiredValues) => {
  const student = {
    email: values.email,
    first_name: values.first_name,
    last_name: values.last_name,
    skills: {},
  };

  if (starCurrentValues) {
    for (const [prop1, val1] of Object.entries(starCurrentValues)) {
      if (starDesiredValues[prop1]) {
        student["skills"][prop1] = {
          current: val1,
          desired: starDesiredValues[prop1],
        };
      } else {
        student["skills"][prop1] = { current: val1, desired: 0 };
      }
    }
  }

  if (starDesiredValues) {
    for (const [prop1, val1] of Object.entries(starDesiredValues)) {
      if (starCurrentValues[prop1]) {
        student["skills"][prop1] = {
          current: starCurrentValues[prop1],
          desired: val1,
        };
      } else {
        student["skills"][prop1] = { current: 0, desired: val1 };
      }
    }
  }
  return student;
};

export const editCurrentStudent = (
  currentStudentAccount,
  values,
  starCurrentValues,
  starDesiredValues
) => {
  const student = {
    email: values.email,
    first_name: values.first_name,
    last_name: values.last_name,
    id: currentStudentAccount.id,
    skills: {},
  };

  if (starCurrentValues) {
    for (const [prop1, val1] of Object.entries(starCurrentValues)) {
      if (starDesiredValues[prop1]) {
        student["skills"][prop1] = {
          current: val1,
          desired: starDesiredValues[prop1],
        };
      } else {
        student["skills"][prop1] = { current: val1, desired: 0 };
      }
    }
  }

  if (starDesiredValues) {
    for (const [prop1, val1] of Object.entries(starDesiredValues)) {
      if (starCurrentValues[prop1]) {
        student["skills"][prop1] = {
          current: starCurrentValues[prop1],
          desired: val1,
        };
      } else {
        student["skills"][prop1] = { current: 0, desired: val1 };
      }
    }
  }
  return student;
};

export const setAdmin = (values) => {
  return { name: values.name, email: values.email, password: values.password };
};

export const studentTableColumns = [
  { title: "First Name", field: "first_name" },
  { title: "Last Name", field: "last_name" },
  {
    title: "Email",
    field: "email",
  },
];

export const setPieData = (studentsArray) => {
  const students = studentsArray;
  const data = [];
  students.forEach((student) => {
    for (const [key, value] of Object.entries(student["skills"])) {
      const itemInArray = data.find(({ skill }) => skill === key);
      if (itemInArray !== undefined) {
        const desired = itemInArray.Goal + value.desired;
        const current = itemInArray.Level + value.current;
        const index = data.findIndex(({ skill }) => skill === key);
        data[index] = { skill: key, Goal: desired, Level: current };
      } else {
        data.push({ skill: key, Goal: value.desired, Level: value.current });
      }
    }
  });
  return data;
};

export const convertObjToArray = (obj) => {
  const objArray = Object.keys(obj).map((key) => {
    return obj[key];
  });
  return objArray;
};

export const currentValuesFunc = (student) => {
  const currentValues = {};
  for (const [key, value] of Object.entries(student["skills"])) {
    currentValues[key] = value.current;
  }
  return currentValues;
};

export const desiredValuesFunc = (student) => {
  const desiredValues = {};
  for (const [key, value] of Object.entries(student["skills"])) {
    desiredValues[key] = value.desired;
  }
  return desiredValues;
};
