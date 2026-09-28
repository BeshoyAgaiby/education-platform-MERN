import userModel from "../../../Database/models/userModel.js";
import AppError from "../../utils/AppError.js";
import CatchError from "../../utils/CatchAsyncError.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const addStudent = CatchError(async (req, res,next) => {
    const {  studentCode, email } = req.body;
    const existingStudent = await userModel.findOne({studentCode: studentCode.toUpperCase(),});

    if (existingStudent) {
      return next(new AppError("Student code already exists", 409));
    }

    if (email) {
      const existingEmail = await userModel.findOne({ email });

      if (existingEmail) {
        return next(new AppError("Email already exists", 409));
      }
    }

    const student = await userModel.create(req.body);
    res.status(201).json({message: "success",student});
  }) 

const studentAccess = CatchError(async (req, res,next) => {
    const { studentCode } = req.body;

    if (!studentCode) return next(new AppError("Student code is required", 400));

    const student = await userModel.findOne({
      studentCode: studentCode.toUpperCase(),
      role: "student",
      isActive: true,
    });

    if (!student) return next(new AppError("Invalid student code", 404));
    const token = jwt.sign({id: student._id,role:student.role},process.env.SECRET_KEY,{expiresIn: "7d",}
  );
    res.status(200).json({message: `Welcome ${student.name}`,student,token});
  })
const addAdmin = CatchError(async (req, res, next) => {
  const { name, email, password } = req.body;

  const existingAdmin = await userModel.findOne({email: email.toLowerCase(),});

  if (existingAdmin) return next(new AppError("Email already exists", 409));


  const hashedPassword = await bcrypt.hash(password, 12);

  const admin = await userModel.create({
    name,
    email: email.toLowerCase(),
    password: hashedPassword,
    role: "admin",
  });

  res.status(201).json({
    message: "Admin created successfully",
    admin: {
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    },
  });
});
const adminLogin = CatchError(async (req, res, next) => {
  const { email, password } = req.body;

  const admin = await userModel.findOne({
    email: email.toLowerCase(),
    role: "admin",
    isActive: true,
  });

  if (!admin) return next(new AppError("Invalid email or password", 401));


  const isPasswordCorrect = await bcrypt.compare(
    password,
    admin.password
  );

  if (!isPasswordCorrect) {
    return next(new AppError("Invalid email or password", 401));
  }

  const token = jwt.sign({ id: admin._id,role:admin.role },process.env.SECRET_KEY,{expiresIn: "7d"}
  );

  res.status(200).json({message: "Login successful",
    token,
    admin: {
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    },
  });
});
  
const getAllStudents = CatchError(async (req, res,next) => {
    const students = await userModel.find({role: "student"});
    res.status(200).json({ message: "success",students})
  })


const getStudent = CatchError(async (req, res,next) => {
    const { id } = req.params;

    const student = await userModel.findOne({_id: id,role: "student"});
    if (!student) return next(new AppError("Student not found", 404));

    res.status(200).json({message: "success",student});
})


const updateStudent = CatchError(async (req, res, next) => {
  const { id } = req.params;
  
  const student = await userModel.findOne({ _id: id,role: "student",});
  if (!student)  return next(new AppError("Student not found", 404));
  
  const updatedStudent = await userModel.findByIdAndUpdate(id,req.body,{returnDocument:"after",runValidators: true,});

  res.status(200).json({
    message: "success",
    student: updatedStudent,
  });
});


const deactivateStudent = CatchError( async (req, res,next) => {
    const { id } = req.params;

    const student = await userModel.findOneAndUpdate(
      {
        _id: id,
        role: "student",
      },
      {
        isActive: false,
      },
      {
        new: true,
      }
    );

    if (!student) return next(new AppError("Student not found", 404));

    res.status(200).json({
      message: "Student deactivated successfully",
      student,
    })
  })

 const activateStudent = CatchError(async (req, res,next) => {
    const { id } = req.params;

    const student = await userModel.findOneAndUpdate(
      {
        _id: id,
        role: "student",
      },
      {
        isActive: true,
      },
      {
        new: true,
      }
    );

    if (!student) return next(new AppError("Student not found", 404));

    res.status(200).json({
      message: "Student activated successfully",
      student,
    })
  }) 


const deleteStudent = CatchError(async (req, res,next) => {
    const { id } = req.params;

    const student = await userModel.findByIdAndDelete(id,{new: true,});
    if (!student) return next(new AppError("Student not found", 404));

    res.status(200).json({
      message: "deleted successfully",
    });
  })

  export {addStudent, studentAccess, addAdmin, adminLogin,getAllStudents, getStudent, updateStudent, deactivateStudent, activateStudent, deleteStudent};
  
