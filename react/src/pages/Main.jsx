import React, { useEffect, useContext, useState } from "react";
import StudentList from "../components/StudentList";
import { Container, Paper } from "@material-ui/core";
import { getStudents } from "../lib/axiosLib";
import { AdminUsersContext } from "../contexts/AdminUsersContext";
import { setPieData } from "../lib/lib";
import NewChart from "../components/NewChart";

const Main = () => {
  const { setStudentDataStore } = useContext(AdminUsersContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    (async function setStudentsData() {
      const studentsArray = await getStudents();
      const pieData = await setPieData(studentsArray);
      setData(pieData);
      setStudentDataStore(studentsArray);
    })();
  }, [setStudentDataStore]);

  return (
    <Container maxWidth="sm">
      <Paper elevation={0} style={{ padding: 16 }}>
        <StudentList />
        {data.length > 0 && <NewChart data={data} />}
      </Paper>
    </Container>
  );
};
export default Main;
