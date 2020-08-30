import React, { useContext } from "react";
import { Paper } from "@material-ui/core";
import { AdminUsersContext } from "../contexts/AdminUsersContext";
import { studentTableColumns } from "../lib/lib";
import { useHistory } from "react-router-dom";
import MaterialTable from "material-table";
import { deleteStudent } from "../lib/axiosLib";

const StudentList = () => {
  const {
    studentDataStore,
    setStudentDataStore,
    setCurrentStudentAccount,
    currentAdminUser,
  } = useContext(AdminUsersContext);

  const history = useHistory();

  const handleClick = (email) => {
    const studentClicked = studentDataStore.find((student) => {
      return student.email === email;
    });
    setCurrentStudentAccount(studentClicked);
    history.push("/student/edit");
  };

  return (
    <Paper>
      {studentDataStore !== [] && studentDataStore !== null && (
        <MaterialTable
          style={{ marginBottom: 16 }}
          title="Hogwarts"
          columns={studentTableColumns}
          data={studentDataStore}
          onRowClick={(event, rowData) => handleClick(rowData.email)}
          editable={
            currentAdminUser && {
              onRowDelete: (oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    const dataDelete = [...studentDataStore];
                    const index = oldData.tableData.id;
                    dataDelete.splice(index, 1);
                    setStudentDataStore([...dataDelete]);
                    resolve();
                  }, 1000);
                  deleteStudent(oldData);
                }),
            }
          }
        />
      )}
    </Paper>
  );
};
export default StudentList;
