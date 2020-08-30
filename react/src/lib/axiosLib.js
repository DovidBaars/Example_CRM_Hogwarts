import axios from "axios";
import { convertObjToArray } from "./lib";

const baseUrl = "http://127.0.0.1:5000";

export async function getAdmins() {
  const data = await axios.get(`${baseUrl}/admins`);
  const arrayOfData = convertObjToArray(data.data);
  return arrayOfData;
}

export async function getStudents() {
  const data = await axios.get(`${baseUrl}/students`);
  const arrayOfData = convertObjToArray(data.data);
  return arrayOfData;
}

export function addAdmin(adminDict) {
  return axios.post(`${baseUrl}/admins/add`, adminDict);
}

export function addStudent(studentDict) {
  return axios.post(`${baseUrl}/students/add`, studentDict);
}

export function updateAdmin(adminDict) {
  return axios.put(`${baseUrl}/admins/update`, adminDict);
}

export function updateStudent(studentDict) {
  return axios.put(`${baseUrl}/students/update`, studentDict);
}

export function deleteAdmin(adminDict) {
  return axios.put(`${baseUrl}/admins/delete`, adminDict);
}

export function deleteStudent(studentDict) {
  return axios.put(`${baseUrl}/students/delete`, studentDict);
}

export async function getSkills() {
  const data = await axios.get(`${baseUrl}/skills`);
  const newArray = [];
  console.log(data);
  data.data.map((skill) => {
    return newArray.push(skill[0]);
  });
  return newArray;
}
