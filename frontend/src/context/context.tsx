// Context.tsx

import { serverURL } from "@/utils/utils";
import axios from "axios";
import { usePathname } from "next/navigation";
import { createContext, useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";

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
    
    const [sectionSelected,setSectionSelected] = useState();

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
            toast.error("section "+sectionName+" already exists");
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
            toast.error("Failed to save section!"+error);
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
    
    const [subjectSelected,setSubjectSelected] = useState();

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
            toast.error("subject "+subjectName+" already exists");
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
            toast.error("Failed to save subject!"+error);
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
    
    const [classSelected,setClassSelected] = useState();

    // Get Subject
    const getClasses = async () => {
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

    // Create Class
    const createClass = async (name: string,sections: any[],subjects: any[]) => {
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
            toast.error("subject "+name+" already exists");
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
            toast.error("Failed to save subject!"+error);
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

    // Get Teacher
    // Create Teacher
    // Edit Teacher
    // Delete Teacher

    // Student

    // Get Student
    // Create Student
    // Edit Student
    // Delete Student

    // Assignment

    // Get Assignment
    // Create Assignment
    // Edit Assignment
    // Delete Assignment




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
                editSectionName,setEditSectionName,editSectionDescription,setEditSectionDescription,
                createSection,deleteSection,editSection,
                
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
                editSubjectName,setEditSubjectName,editSubjectDescription,setEditSubjectDescription,
                createSubject,deleteSubject,editSubject,
                // Class
                
                classes,
                setClasses,
                getClasses,
                classSelected,
                setClassSelected,
                className,
                setClassName,
                editClassName,setEditClassName,editClassDescription,setEditClassDescription,
                createClass,deleteClass,editClass,
                // Teacher
                // Student
                // Assignment
            }}
        >
            {children}
        </MainContext.Provider>
    );
}

export { MainContext, Context };
