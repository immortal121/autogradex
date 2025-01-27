// Context.tsx

import { serverURL } from "@/utils/utils";
import axios from "axios";
import { usePathname } from "next/navigation";
import { createContext, useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation';

const MainContext = createContext<any>(null);

function Context({ children }: { children: React.ReactNode }) {

    // Ref to hold the EventSource instance
    const eventSourceRef = useRef<EventSource | null>(null);

    // useEffect for cleaning up EventSource on component unmount
    useEffect(() => {
        return () => {
            if (eventSourceRef.current) {
                eventSourceRef.current.close();
                eventSourceRef.current = null;
                console.log("EventSource connection closed on cleanup.");
            }
        };
    }, []);
    // SideBar Controls
    const [showMenu, setShowMenu] = useState<boolean>(false);
    // User
    const [user, setUser] = useState<any[]>([]);

    const fetchUser = async () => {
        try {
            const config = {
                method: "GET",
                url: `${serverURL}/users/fetchuser`,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            };

            const response = await axios(config);
            setUser(response.data);

        } catch (error) {
            console.error("Error fetching User:", error);
            toast.error("Failed to fetch user.");
        }
    };


    // Section

    const [sections, setSections] = useState<any[]>([]);

    const [sectionName, setSectionName] = useState<string>();
    const [sectionDescription, setSectionDescription] = useState<string>();
    const [editSectionName, setEditSectionName] = useState<string>();
    const [editSectionDescription, setEditSectionDescription] = useState<string>();

    const [sectionSelected, setSectionSelected] = useState();

    // Get Section
    const getSections = async () => {
        try {
            const config = {
                method: "GET",
                url: `${serverURL}/class/sections`,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            };

            const response = await axios(config);
            setSections(response.data);

        } catch (error) {
            console.error("Error fetching sections:", error);
            toast.error("Failed to fetch sections.");
        }
    };

    // Create Section
    // Function to create a new section
    const createSection = async () => {
        if (sectionName === '' || sectionDescription === '') {
            return toast.error("Please fill all the fields!");
        }

        try {
            const config = {
                method: "POST",
                url: `${serverURL}/class/createSection`,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
                data: {
                    name: sectionName,
                    description: sectionDescription,
                },
            };

            await axios(config);
            toast.success("Section Created!");
            setSectionName("");
            setSectionDescription("");
            await getSections();
        } catch (error) {
            console.error("Error creating section :", error);
            toast.error("section " + sectionName + " already exists");
            setSectionName("");
            setSectionDescription("");
            await getSections();
        }
    };

    // Edit Section
    const editSection = async () => {
        if (sectionName === '' || sectionDescription === '') {
            return toast.error("Please fill all the fields!");
        }

        try {
            const config = {
                method: "POST",
                url: `${serverURL}/class/updateSection`,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
                data: {
                    sectionId: sectionSelected,
                    name: editSectionName,
                    description: editSectionDescription,
                },
            };

            await axios(config);
            toast.success("Updated Section Successfully");
            setEditSectionName("");
            setEditSectionDescription("");
            await getSections();
        } catch (error) {
            console.error("Error editing class:", error);
            toast.error("Failed to save section!" + error);
        }
    };

    // Delete Section
    const deleteSection = async () => {
        try {
            const config = {
                method: "POST",
                url: `${serverURL}/class/deleteSection`,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
                data: {
                    sectionId: sectionSelected,
                },
            };

            await axios(config);
            await getSections();
            setSectionSelected(-1);
            toast.success("Section deleted!");
        } catch (error) {
            console.error("Error deleting section:", error);
            toast.error("Failed to delete section");
        }
    };
    // Section

    const [subjects, setSubjects] = useState<any[]>([]);

    const [subjectName, setSubjectName] = useState<string>();
    const [subjectDescription, setSubjectDescription] = useState<string>();
    const [editSubjectName, setEditSubjectName] = useState<string>();
    const [editSubjectDescription, setEditSubjectDescription] = useState<string>();

    const [subjectSelected, setSubjectSelected] = useState();

    // Get Subject
    const getSubjects = async () => {
        try {
            const config = {
                method: "GET",
                url: `${serverURL}/class/subjects`,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            };

            const response = await axios(config);
            setSubjects(response.data);

        } catch (error) {
            console.error("Error fetching subjects:", error);
            toast.error("Failed to fetch subjects.");
        }
    };

    // Create Subject
    const createSubject = async () => {
        if (subjectName === '' || subjectDescription === '') {
            return toast.error("Please fill all the fields!");
        }

        try {
            const config = {
                method: "POST",
                url: `${serverURL}/class/createSubject`,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
                data: {
                    name: subjectName,
                    description: subjectDescription,
                },
            };

            await axios(config);
            toast.success("Subject Created!");
            setSubjectName("");
            setSubjectDescription("");
            await getSubjects();
        } catch (error) {
            console.error("Error creating subject:", error);
            toast.error("subject " + subjectName + " already exists");
            setSubjectName("");
            setSubjectDescription("");
            await getSubjects();
        }
    };

    // Edit Subject
    const editSubject = async () => {
        if (editSubjectName === '' || editSubjectDescription === '') {
            return toast.error("Please fill all the fields!");
        }

        try {
            const config = {
                method: "POST",
                url: `${serverURL}/class/updateSubject`,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
                data: {
                    subjectId: subjectSelected,
                    name: editSubjectName,
                    description: editSubjectDescription,
                },
            };

            await axios(config);
            toast.success("Updated Subject Successfully");
            setEditSubjectName("");
            setEditSubjectDescription("");
            await getSubjects();
        } catch (error) {
            console.error("Error editing subject:", error);
            toast.error("Failed to save subject!" + error);
        }
    };

    // Delete Subject
    const deleteSubject = async () => {
        try {
            const config = {
                method: "POST",
                url: `${serverURL}/class/deleteSubject`,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
                data: {
                    subjectId: subjectSelected,
                },
            };

            await axios(config);
            await getSubjects();
            setSectionSelected(-1);
            toast.success("Subject deleted!");
        } catch (error) {
            console.error("Error deleting subject:", error);
            toast.error("Failed to delete subject");
        }
    };

    // Class

    const [classes, setClasses] = useState<any[]>([]);

    const [className, setClassName] = useState<string>();
    const [editClassName, setEditClassName] = useState<string>();
    const [editClassDescription, setEditClassDescription] = useState<string>();

    const [classSelected, setClassSelected] = useState();

    // Get Subject
    const getClasses = async () => {
        try {
            const config = {
                method: "GET",
                url: `${serverURL}/class`,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            };

            const response = await axios(config);
            setClasses(response.data);

        } catch (error) {
            console.error("Error fetching classes:", error);
            toast.error("Failed to fetch classes.");
        }
    };
    const getFilteredClasses = async () => {
        try {
            const config = {
                method: "GET",
                url: `${serverURL}/class/filtered`,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            };

            const response = await axios(config);
            setClasses(response.data);

        } catch (error) {
            console.error("Error fetching classes:", error);
            toast.error("Failed to fetch classes.");
        }
    };
    // Create Class
    const createClass = async (name: string, sections: any[], subjects: any[]) => {
        if (name === '' || sections.length === 0 || subjects.length === 0) {
            return toast.error("Please fill all the fields!");
        }

        try {
            const config = {
                method: "POST",
                url: `${serverURL}/class/createClass`,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
                data: {
                    name: name,
                    sections: sections,
                    subjects: subjects
                },
            };

            await axios(config);
            toast.success("Class Created!");
            await getClasses();
        } catch (error) {
            console.error("Error creating class:", error);
            toast.error("subject " + name + " already exists");
            await getClasses();
        }
    };

    // Edit Class
    const editClass = async () => {
        if (editSubjectName === '' || editSubjectDescription === '') {
            return toast.error("Please fill all the fields!");
        }

        try {
            const config = {
                method: "POST",
                url: `${serverURL}/class/updateSubject`,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
                data: {
                    subjectId: subjectSelected,
                    name: editSubjectName,
                    description: editSubjectDescription,
                },
            };

            await axios(config);
            toast.success("Updated Subject Successfully");
            setEditSubjectName("");
            setEditSubjectDescription("");
            await getSubjects();
        } catch (error) {
            console.error("Error editing subject:", error);
            toast.error("Failed to save subject!" + error);
        }
    };

    // Delete Class
    const deleteClass = async () => {
        try {
            const config = {
                method: "POST",
                url: `${serverURL}/class/deleteSubject`,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
                data: {
                    subjectId: subjectSelected,
                },
            };

            await axios(config);
            await getSubjects();
            setSectionSelected(-1);
            toast.success("Subject deleted!");
        } catch (error) {
            console.error("Error deleting subject:", error);
            toast.error("Failed to delete subject");
        }
    };

    // Teacher
    const [teachers, setTeachers] = useState<any[]>([]);

    // Get Student
    const getTeachers = async () => {
        try {
            const config = {
                method: "GET",
                url: `${serverURL}/teacher`,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            };

            const response = await axios(config);
            setTeachers(response.data);
            return true;

        } catch (error) {
            console.error("Error fetching teachers:", error);
            toast.error("Failed to fetch teachers.");
        }
    };

    // Create Student

    const createTeacher = async (name, email, password, teaching) => {
        try {
            const config = {
                method: "POST",
                url: `${serverURL}/teacher/createTeacher`, // Assuming your backend endpoint is for teachers
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
                data: {
                    name,
                    email,
                    password,
                    teaching, // Assuming 'teaching' is an array of objects with classId, sectionId, and subjectId
                },
            };

            const response = await axios(config);

            toast.success("Teacher created successfully!");
        } catch (error) {
            console.error("Error creating teacher:", error);
            if (error.response && error.response.data) {
                toast.error(error.response.data);
            } else {
                toast.error("Error creating teacher.");
            }
        }
    };
    // Edit Student
    // Delete Teacher
    const deleteTeacher = async (userId) => {
        try {
            const config = {
                method: "POST",
                url: `${serverURL}/student/deleteStudent`,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
                data: {
                    id: userId,
                },
            };

            await axios(config);
            await getTeachers();
            toast.success("Teacher deleted!");
        } catch (error) {
            console.error("Error deleting students:", error);
            toast.error("Failed to delete students");
        }
    };

    // Student
    const [students, setStudents] = useState<any[]>([]);

    // Get Student
    const getStudents = async () => {
        try {
            const config = {
                method: "GET",
                url: `${serverURL}/student`,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            };

            const response = await axios(config);
            setStudents(response.data);

        } catch (error) {
            console.error("Error fetching students:", error);
            toast.error("Failed to fetch students.");
        }
    };

    // Create Student
    const createStudent = async (name, email, password, classId, sectionId) => {
        try {
            const config = {
                method: "POST",
                url: `${serverURL}/student/createStudent`, // Assuming your API endpoint is /students
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
                data: {
                    name,
                    email,
                    password,
                    classId,
                    sectionId,
                },
            };

            const response = await axios(config);

            toast.success("Student created successfully!");


        } catch (error) {
            console.error("Error creating student:", error);
            if (error.response.data) {
                toast.error(error.response.data);
            } else {
                toast.error("Error creating student.");
            }
        }
    };


    // Edit Student
    // Delete Student
    const deleteStudent = async (userId) => {
        try {
            const config = {
                method: "POST",
                url: `${serverURL}/student/deleteStudent`,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
                data: {
                    id: userId,
                },
            };

            await axios(config);
            await getStudents();
            toast.success("Students deleted!");
        } catch (error) {
            console.error("Error deleting students:", error);
            toast.error("Failed to delete students");
        }
    };

    // Assignment
    const [assignments, setAssignments] = useState();


    // Get Assignment
    const getAssignmnets = async () => {
        try {
            // Convert filters object to query string (e.g., ?className=10A&subject=Math)
            // const queryString = new URLSearchParams(filters).toString();

            const config = {
                method: "GET",
                url: `${serverURL}/assignment`, // Modify URL path as needed
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            };

            // Fetch assignments based on filters
            const response = await axios(config);
            console.log(response.data);

            // Assuming response.data contains the list of assignments
            setAssignments(response.data);  // Set the filtered assignments to state

        } catch (error) {
            console.error("Error fetching assignments:", error);
            toast.error("Failed to fetch assignments.");
        }
    };
    const getFilteredAssignments = async () => {
        try {
            const config = {
                method: "GET",
                url: `${serverURL}/assignment/filtered`, // Modify URL path as needed
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            };

            // Fetch assignments based on filters
            const response = await axios(config);
            // Assuming response.data contains the list of assignments
            setAssignments(response.data);  // Set the filtered assignments to state

        } catch (error) {
            // setAssignments();  // Set the filtered assignments to state

            console.error("Error fetching assignments:", error);
            toast.error("Failed to fetch assignments.");
        }
    };
    const getFilteredAssignment = async (id) => {
        try {
            const config = {
                method: "GET",
                url: `${serverURL}/assignment/getAssignment`, // Adjust this endpoint if needed
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,  // Send token in the header
                },
                params: {  // Pass the id as a query parameter (assuming the backend supports it)
                    id: id,
                }
            };

            // Fetch assignments based on the id filter
            const response = await axios(config);

            if (response.data) {
                setAssignments(response.data);
                return response.data;  // Set the assignments data to your state
            } else {
                toast.error("No assignments found for this ID.");
            }
        } catch (error) {
            console.error("Error fetching assignments:", error);
            toast.error("Failed to fetch assignments.");
        }
    };
    // Create Assignment
    const createAssignment = async (assignmentData) => {
        try {
            const config = {
                method: "POST",
                url: `${serverURL}/assignment/create`, // Replace with your actual endpoint
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
                data: assignmentData, // Payload containing assignment details
            };

            await axios(config);
            toast.success("Assignment created successfully!");
        } catch (error) {
            console.error("Error creating assignment:", error);
            toast.error("Failed to create assignment");
        }
    };

    const updateAssignmentStudents = async (assignmentId, updatedStudents) => {
        try {
            const config = {
                method: "POST",
                url: `${serverURL}/assignment/updateAssignmentStudents`, // Adjust endpoint if needed
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`, // Send token in the header
                    "Content-Type": "application/json", // Ensure content type is JSON
                },
                data: {
                    id: assignmentId, // Assignment ID to identify the record
                    students: updatedStudents, // Updated students data
                },
            };
            console.log(updatedStudents)

            // Send a request to update the students in the assignment
            const response = await axios(config);

            if (response.data) {
                console.log("Assignment students updated successfully!");
                return response.data; // Optionally return updated data if needed
            } else {
                console.log("Failed to update assignment students.");
            }
        } catch (error) {
            console.error("Error updating assignment students:", error);
            throw error; // Rethrow error to handle it in calling code if needed
        }
    };


    // get student results 


    // evaluator
    const Evaluate = async (assignmentId) => {
        try {
            const config = {
                method: "POST",
                url: `${serverURL}/assignment/EvaluateWithAI`, // Adjust endpoint if needed
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`, // Send token in the header
                    "Content-Type": "application/json", // Ensure content type is JSON
                },
                data: {
                    assignmentId: assignmentId, // Assignment ID to identify the record
                },
            };

            // Send a request to update the students in the assignment
            const response = await axios(config);

            if (response.data) {
                toast.success("Evaluated ");
                return response.data; // Optionally return updated data if needed
            } else {
                toast.error("Evaluation Failed .");
            }
        } catch (error) {
            console.error("Evaluation Failed .:", error);
            toast.error("Evaluation Failed .");
            throw error; // Rethrow error to handle it in calling code if needed
        }
    };
    const EvaluateWithDigital = async (assignmentId) => {
        try {
            const config = {
                method: "POST",
                url: `${serverURL}/assignment/EvaluateWithDigital`, // Adjust endpoint if needed
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`, // Send token in the header
                    "Content-Type": "application/json", // Ensure content type is JSON
                },
                data: {
                    assignmentId: assignmentId, // Assignment ID to identify the record
                },
            };

            // Send a request to update the students in the assignment
            const response = await axios(config);
            console.log(response);
            if (response) {
                window.location.href = `/digievaluator/${assignmentId}`;

            } else {
                toast.error("Evaluation Failed .");
            }
        } catch (error) {
            console.error("Evaluation Failed .:", error);
            toast.error("Evaluation Failed .");
            throw error; // Rethrow error to handle it in calling code if needed
        }
    };
    const EvaluateWithDigitalStudent = async (assignmentId, studentId) => {
        try {

            window.location.href = `/digievaluator/${assignmentId}/${studentId}`;


        } catch (error) {

        }
    };

    const getAssignmentStudentById = async (assignmentId, studentId) => {
        try {
            const config = {
                method: "POST",
                url: `${serverURL}/assignment/getAssignmentStudentById`, // API endpoint for getting student data
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
                data: {
                    assignmentId: assignmentId, // Assignment ID to identify the record
                    studentId: studentId,
                },
            };

            const response = await axios(config);

            if (response.data) {
                return response.data; // Return student data if successful
            } else {
                console.error("Failed to fetch student data.");
                return null; // Indicate failure
            }
        } catch (error) {
            console.error("Error fetching student data:", error);
            return null; // Indicate failure
        }
    };

    const UpdateScoresByDigitalEvaluator = async (id, students) => {
        try {
            const config = {
                method: "POST",
                url: `${serverURL}/assignment/UpdateWithDigitalEvaluator`, // API endpoint for updating scores
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
                data: {
                    id,
                    students,
                },
            };

            // Send the request
            const response = await axios(config);
            if (response.data) {
                console.log("Scores updated successfully."); // Use console.log for debugging
            } else {
                console.error("Failed to update scores.");
            }
        } catch (error) {
            console.error("Error updating scores:", error);
            throw error;
        }
    };


    //pdf to image converter

    const convertPDFToImage = async (file: any) => {
        const formData = new FormData();
        formData.append("file", file);

        try {
            const config = {
                method: "POST",
                url: `${serverURL}/pdfimg/convert-pdf`,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
                data: formData,
            };

            console.log(Array.from(formData.entries()));

            // Send the request to convert the PDF
            const response = await axios(config);

            console.log("Response from converted PDF to Image:");
            console.log(response.data);

            // Convert the response to File array
            const files = response.data.map((fileData: any, index: number) => {
                // Convert the object to a Uint8Array
                const byteArray = new Uint8Array(Object.values(fileData));

                // Create a Blob from the Uint8Array
                const blob = new Blob([byteArray], { type: "image/png" }); // Assuming the images are PNGs

                // Create a File object from the Blob
                return new File([blob], `converted_image_${index + 1}.png`, { type: "image/png" });
            });

            return files; // Return the array of File objects
        } catch (error) {
            console.error("Error converting PDF to images:", error);
            toast.error("Failed to convert PDF to images.");
            return []; // Return an empty array in case of error
        }
    };



    return (
        <MainContext.Provider
            value={{
                // Dashboard Controls
                showMenu,
                setShowMenu,
                // User
                user,
                fetchUser,
                // Section
                sections,
                setSections,
                getSections,
                sectionSelected,
                setSectionSelected,
                sectionName,
                setSectionName,
                sectionDescription,
                setSectionDescription,
                editSectionName, setEditSectionName, editSectionDescription, setEditSectionDescription,
                createSection, deleteSection, editSection,

                // Section
                subjects,
                setSubjects,
                getSubjects,
                subjectSelected,
                setSubjectSelected,
                subjectName,
                setSubjectName,
                subjectDescription,
                setSubjectDescription,
                editSubjectName, setEditSubjectName, editSubjectDescription, setEditSubjectDescription,
                createSubject, deleteSubject, editSubject,
                // Class

                classes,
                setClasses,
                getClasses, getFilteredClasses,
                classSelected,
                setClassSelected,
                className,
                setClassName,
                editClassName, setEditClassName, editClassDescription, setEditClassDescription,
                createClass, deleteClass, editClass,
                // Teacher
                teachers, setTeachers, getTeachers, createTeacher, deleteTeacher,
                // Student
                students, setStudents, getStudents, createStudent, deleteStudent,
                // Assignment
                assignments, setAssignments, createAssignment, getFilteredAssignments, getFilteredAssignment, getAssignmnets, updateAssignmentStudents,

                //pdf to image
                convertPDFToImage,
                //evalutor
                Evaluate, EvaluateWithDigital, UpdateScoresByDigitalEvaluator, getAssignmentStudentById,EvaluateWithDigitalStudent
            }}
        >
            {children}
        </MainContext.Provider>
    );
}

export { MainContext, Context };
