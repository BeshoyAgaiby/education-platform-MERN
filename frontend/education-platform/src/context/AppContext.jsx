import axios from "axios";
import { createContext, useState } from "react";
// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();
const token = localStorage.getItem("token");

export function AppContextProvider({ children }) {
  const [lectures, setLectures] = useState([]);
  const [lecture, setLecture] = useState(null);
  const [exams, setExams] = useState([]);
  const [exam, setExam] = useState(null);
  const [attendance, setAttendance] = useState([]);
  const [attendanceStats, setAttendanceStats] = useState(null);

  const headers = {
    token: token,
  };

const getLectures=async()=>{
  try{
   const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/lectures`,{headers});
    //console.log(data.lectures);
    setLectures(data.lectures)
  }catch (err){
  console.log(err.response?.data?.message || err.message);
  }
}
const getLecture=async(id)=>{
  try{
   const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/lectures/${id}`,{headers});
   //console.log(data.lecture);
    setLecture(data.lecture)
  }catch (err){
  console.log(err.response?.data?.message || err.message);
  }
}

const getExams=async()=>{
  try{
   const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/exams`,{headers});
    //console.log(data.exams);
    setExams(data.exams)
  }catch (err){
  console.log(err.response?.data?.message || err.message);
  }
}

const getExam=async(id)=>{
  try{
   const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/exams/${id}`,{headers});
    //console.log(data.exam);
    setExam(data.exam)
  }catch (err){
  console.log(err.response?.data?.message || err.message);
  }
}

const getMyAttendance=async()=>{
 try {
   let {data}=await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/attends/my_attendance`,{headers});
  setAttendance(data.attendance);
  setAttendanceStats({
      totalLectures: data.totalLectures,
      presentLectures: data.presentLectures,
      absentLectures: data.absentLectures,
      attendancePercentage: data.attendancePercentage,
    });
 } catch (err) {
  console.log(err.response?.data?.message || err.message);
 }
}
  return <AppContext.Provider value={{getLectures,lectures,getExams,exams,getLecture,lecture,exam,getExam,
  getMyAttendance,attendance,attendanceStats}} >
    {children}
    </AppContext.Provider>;
}
