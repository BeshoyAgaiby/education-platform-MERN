import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import dbConnection from './Database/dbConnection.js'
import globalErrorHandle from './src/middleware/globalErrorHandle.js'
import userRouter from './src/modules/user/user.route.js'
import lectureRouter from './src/modules/lecture/lecture.route.js'
import attendsRouter from './src/modules/attends/attends.route.js'
import examRouter from './src/modules/exams/exams.route.js'
import dashboardRouter from './src/modules/dashboard/dashboard.route.js'
import studentRouter from './src/modules/student/student.route.js'
const app = express()
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(cors());

app.use(express.static('uploads'));
dotenv.config();
dbConnection();

app.use('/api/v1/users',userRouter);
app.use('/api/v1/lectures', lectureRouter);
app.use('/api/v1/attends', attendsRouter);
app.use('/api/v1/exams', examRouter);
app.use('/api/v1/dashboard', dashboardRouter);
app.use('/api/v1/students', studentRouter);



app.get('/', (req, res) => res.send('Hello World!'))
app.use(globalErrorHandle);
app.use('unhandledRejection', (err) => {
    console.error('error out of mongoose', err);
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`))