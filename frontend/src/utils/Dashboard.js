import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import { green } from '@mui/material/colors';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
    },
  },
};

const studentData = {
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [
    {
      label: 'New Students',
      data: [12, 19, 3, 5, 2],
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    },
  ],
};

const teacherData = {
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [
    {
      label: 'New Teachers',
      data: [3, 5, 2, 8, 1],
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    },
  ],
};

const classData = {
  labels: ['January', 'February', 'March', 'April', 'May'],
  datasets: [
    {
      label: 'New Classes',
      data: [1, 3, 2, 4, 1],
      backgroundColor: 'rgba(255, 206, 86, 0.2)',
      borderColor: 'rgba(255, 206, 86, 1)',
      borderWidth: 1,
    },
  ],
};

const AdminDashboard = () => {
  const [studentDataState, setStudentDataState] = useState(studentData);
  const [teacherDataState, setTeacherDataState] = useState(teacherData);
  const [classDataState, setClassDataState] = useState(classData);
  const [studentCount, setStudentCount] = useState({
    totalStudents: Math.floor(Math.random() * 500) + 200,
    newStudents: Math.floor(Math.random() * 50) + 10,
  });

  const [teacherCount, setTeacherCount] = useState({
    totalTeachers: Math.floor(Math.random() * 100) + 50,
    newTeachers: Math.floor(Math.random() * 10) + 2,
  });

  const [classCount, setClassCount] = useState({
    totalClasses: Math.floor(Math.random() * 50) + 20,
    newClasses: Math.floor(Math.random() * 5) + 1,
  });

  const [sectionCount, setSectionCount] = useState({
    totalSections: Math.floor(Math.random() * 100) + 40,
    newSections: Math.floor(Math.random() * 5) + 1,
  });

  useEffect(() => {
    // Simulate data fetching (replace with actual API calls)
    const intervalId = setInterval(() => {
      setStudentCount({
        totalStudents: Math.floor(Math.random() * 500) + 200,
        newStudents: Math.floor(Math.random() * 50) + 10,
      });
      setTeacherCount({
        totalTeachers: Math.floor(Math.random() * 100) + 50,
        newTeachers: Math.floor(Math.random() * 10) + 2,
      });
      setClassCount({
        totalClasses: Math.floor(Math.random() * 50) + 20,
        newClasses: Math.floor(Math.random() * 5) + 1,
      });
      setSectionCount({
        totalSections: Math.floor(Math.random() * 100) + 40,
        newSections: Math.floor(Math.random() * 5) + 1,
      });
    }, 3000); // Update data every 3 seconds

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Simulate new data points (replace with actual API calls)
      const newStudentData = {
        ...studentDataState,
        datasets: [
          {
            ...studentDataState.datasets[0],
            data: [
              ...studentDataState.datasets[0].data.slice(1), 
              Math.floor(Math.random() * 15) + 5, 
            ],
          },
        ],
      };
      setStudentDataState(newStudentData);

      // Similar updates for teacherData and classData
      const newTeacherData = {
        ...teacherDataState,
        datasets: [
          {
            ...teacherDataState.datasets[0],
            data: [
              ...teacherDataState.datasets[0].data.slice(1), 
              Math.floor(Math.random() * 10) + 2, 
            ],
          },
        ],
      };
      setTeacherDataState(newTeacherData);

      const newClassData = {
        ...classDataState,
        datasets: [
          {
            ...classDataState.datasets[0],
            data: [
              ...classDataState.datasets[0].data.slice(1), 
              Math.floor(Math.random() * 5) + 1, 
            ],
          },
        ],
      };
      setClassDataState(newClassData);
    }, 1000*20); // Update data every 3 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Grid container spacing={3}>
         <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div" sx={{ color: green[700] }}>
              Total Students
            </Typography>
            <Typography variant="h3" component="div">
              {studentCount.totalStudents}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              New Students: {studentCount.newStudents}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div" sx={{ color: green[700] }}>
              Total Teachers
            </Typography>
            <Typography variant="h3" component="div">
              {teacherCount.totalTeachers}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              New Teachers: {teacherCount.newTeachers}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div" sx={{ color: green[700] }}>
              Total Classes
            </Typography>
            <Typography variant="h3" component="div">
              {classCount.totalClasses}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              New Classes: {classCount.newClasses}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={3}>
        <Card>
          <CardContent>
            <Typography variant="h5" component="div" sx={{ color: green[700] }}>
              Total Sections
            </Typography>
            <Typography variant="h3" component="div">
              {sectionCount.totalSections}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              New Sections: {sectionCount.newSections}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Line data={studentDataState} options={{ ...options, plugins: { title: { display: true, text: 'New Students Trend' } } }} /> 
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Line data={teacherDataState} options={{ ...options, plugins: { title: { display: true, text: 'New Teachers Trend' } } }} /> 
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Line data={classDataState} options={{ ...options, plugins: { title: { display: true, text: 'New Classes Trend' } } }} /> 
          </CardContent>
        </Card>
      </Grid>
      {/* ... (Your existing Doughnut and Bar charts) */}
    </Grid>
  );
};

export default AdminDashboard;