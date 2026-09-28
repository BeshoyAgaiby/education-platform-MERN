import axios from "axios";
import { createContext, useState } from "react";
import toast from "react-hot-toast";

// eslint-disable-next-line react-refresh/only-export-components
export const AdminContext = createContext();

export function AdminContextProvider({ children }) {
  const token = localStorage.getItem("token");
  const headers = {
    token: token,
  };
  const [users, setUsers] = useState([]);
  const [attends, setAttends] = useState([]);
  const [attend, setAttend] = useState(null);
  const[student,setStudent]=useState(null);
  const[statics,setStatics]=useState(null);
  const[search,setSearch]=useState([]);
  
  const getUsers = async () => {
    try {
      let { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/users`, {headers,});
      //console.log(data);
      setUsers(data.students);
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
    }
  };

  const getStudent = async (id) => {
    try {
      let { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/users/${id}`, {headers,});
      //console.log(data);
      setStudent(data.student);
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
    }
  };
  const ActivateAccount = async (id) => {
    try {
     await axios.put(`${import.meta.env.VITE_API_URL}/api/v1/users/${id}/activate`,{},{headers,});
     toast.success("تم التعديل بنجاح");
     return true
    } catch (err) {
      toast.error("حدث خطا في التعديل");
      console.log(err.response?.data?.message || err.message);
      return false
    }
  };
  const DeactiveAccount = async (id) => {
    try {
     await axios.put(`${import.meta.env.VITE_API_URL}/api/v1/users/${id}/deactivate`,{},{headers,});
     toast.success("تم التعديل بنجاح");
     return true
    } catch (err) {
      toast.error("حدث خطا في التعديل");
      console.log(err.response?.data?.message || err.message);
      return false
    }
  };
  const addStudent = async (values) => {
    try {
     await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/users`,values ,{headers,});
     toast.success("تم الاضافه بنجاح");
     return true
    } catch (err) {
      toast.error("حدث خطا في الاضافه");
      console.log(err.response?.data?.message || err.message);
      return false
    }
  };
  const editStudent = async (id,values) => {
    try {
    await axios.put(`${import.meta.env.VITE_API_URL}/api/v1/users/${id}`,values ,{headers,});
    toast.success("تم التعديل بنجاح");
    return true
    } catch (err) {
      toast.error("حدث خطا في التعديل");
      console.log(err.response?.data?.message || err.message);
      return false
    }
  };

  const deleteStudent = async (id) => {
    try {
    await axios.delete(`${import.meta.env.VITE_API_URL}/api/v1/users/${id}`,{headers,});
    toast.success("تم الحذف بنجاح");
    return true
    } catch (err) {
      toast.error("حدث خطا في الحذف");
      console.log(err.response?.data?.message || err.message);
      return false
    }
  };

// الجزء الخاص بامحاضرات
const addLecture = async (formData) => {
  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/lectures`,formData,{headers,});
    toast.success("تم الاضافه بنجاح");
    return true;
  } catch (err) {
    toast.error("حدث خطا في الاضافه");
    console.log(err.response?.data?.message || err.message );
    return false;
  }
};
const editLecture = async (id, formData) => {
  try {
    await axios.put(`${import.meta.env.VITE_API_URL}/api/v1/lectures/${id}`,formData,{ headers,});
    toast.success("تم التعديل بنجاح");
    return true;
  } catch (err) {
    toast.error("حدث خطا في التعديل");
    console.log(err.response?.data?.message || err.message);
    return false;
  }
};
const publishLec = async (id) => {
    try {
     await axios.put(`${import.meta.env.VITE_API_URL}/api/v1/lectures/${id}/published`,{},{headers,});
     toast.success(" تم التعديل بنجاح");
     return true
    } catch (err) {
      toast.error("حدث خطا في التعديل");
      console.log(err.response?.data?.message || err.message);
      return false
    }
  };
const unPublishLec = async (id) => {
    try {
     await axios.put(`${import.meta.env.VITE_API_URL}/api/v1/lectures/${id}/unpublished`,{},{headers,});
     toast.success(" تم التعديل بنجاح");
     return true
    } catch (err) {
      toast.error("حدث خطا في التعديل");
      console.log(err.response?.data?.message || err.message);
      return false
    }
  };
const deleteLecture = async (id) => {
  try {
    await axios.delete(`${import.meta.env.VITE_API_URL}/api/v1/lectures/${id}`,{ headers,});
     toast.success("تم الحذف التعديل");
    return true;
  } catch (err) {
    toast.error("حدث خطا في الحذف");
    console.log(err.response?.data?.message || err.message);
    return false;
  }
};

//الجزء الخاص بالامتحانات
const addExam = async (values) => {
  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/exams`,values,{headers,});
    toast.success("تم الاضافه بنجاح");
    return true;
  } catch (err) {
    toast.error("حدث خطا في الاضافه");
    console.log(err.response?.data?.message || err.message );
    return false;
  }
};
const editExam = async (id, values) => {
  try {
    await axios.put(`${import.meta.env.VITE_API_URL}/api/v1/exams/${id}`,values,{ headers,});
    toast.success("تم التعديل بنجاح");
    return true;
  } catch (err) {
    toast.error("حدث خطا في التعديل");
    console.log(err.response?.data?.message || err.message);
    return false;
  }
};
const publishExam = async (id) => {
    try {
     await axios.put(`${import.meta.env.VITE_API_URL}/api/v1/exams/${id}/published`,{},{headers,});
      toast.success("تم التعديل بنجاح");
     return true
    } catch (err) {
      toast.error("حدث خطا في التعديل");
      console.log(err.response?.data?.message || err.message);
      return false
    }
  };
const unPublishExam = async (id) => {
    try {
     await axios.put(`${import.meta.env.VITE_API_URL}/api/v1/exams/${id}/unpublished`,{},{headers,});
     toast.success(" تم التعديل بنجاح");
     return true
    } catch (err) {
      toast.error("حدث خطا في التعديل");
      console.log(err.response?.data?.message || err.message);
      return false
    }
  };
const deleteExam = async (id) => {
  try {
    await axios.delete(`${import.meta.env.VITE_API_URL}/api/v1/exams/${id}`,{headers,});
    toast.success(" تم الحذف بنجاح");
    return true;
  } catch (err) {
    toast.error("حدث خطا في الحذف");
    console.log(err.response?.data?.message || err.message);
    return false;
  }
};

//الجزء الخاص بالحضور
const getAllAttendance = async () => {
    try {
      let { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/attends`, {headers,});
     // console.log(data);
      setAttends(data.attendance);
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
    }
  };
const getOneAttendanceForAdmin = async (studentId) => {
    try {
      let { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/attends/admin/${studentId}`, {headers,});
      //console.log(data);
      setAttend(data);
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
    }
  };
const addAttendance = async (values) => {
  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/attends`,values,{headers,});
     toast.success("تم الاضافه التعديل");
    return true;
  } catch (err) {
    toast.error("حدث خطا في الاضافه");
    console.log(err.response?.data?.message || err.message );
    return false;
  }
};
const editAttendance = async (id, values) => {
  try {
    await axios.put(`${import.meta.env.VITE_API_URL}/api/v1/attends/${id}`,values,{ headers,});
    toast.success(" تم التعديل بنجاح");
    return true;
  } catch (err) {
    toast.error("حدث خطا في التعديل");
    console.log(err.response?.data?.message || err.message);
    return false;
  }
};
const deleteAttendance = async (id) => {
  try {
    await axios.delete(`${import.meta.env.VITE_API_URL}/api/v1/attends/${id}`,{ headers,});
    toast.success(" تم الحذف بنجاح");
    return true;
  } catch (err) {
    toast.error("حدث خطا في الحذف");
    console.log(err.response?.data?.message || err.message);
    return false;
  }
};

const getStats = async () => {
    try {
      let { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/dashboard/stats`, {headers,});
      //console.log(data);
      setStatics(data.stats);
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
    }
  };
const searchStudent = async (query) => {
    try {
      let { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/students/search?q=${query}`, {headers,});
      //console.log(data);
      setSearch(data.students);
    } catch (err) {
      toast.error("ربما لا يوجد طالب")
      console.log(err.response?.data?.message || err.message);
    }
  };
  return (
    <AdminContext.Provider value={{ getUsers,users,addStudent,editStudent,deleteStudent,getStudent,student, ActivateAccount,DeactiveAccount,
addLecture,editLecture,deleteLecture,publishLec,unPublishLec,addExam,editExam,unPublishExam,publishExam,deleteExam,getAllAttendance,attends,
addAttendance,editAttendance,deleteAttendance,getOneAttendanceForAdmin,attend,getStats,statics,searchStudent,search }}>
      {children}
    </AdminContext.Provider>
  );
}
