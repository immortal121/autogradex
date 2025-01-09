import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const useAuth = () => {
  const router = useRouter();
  const userRole = localStorage.getItem('type'); 

  useEffect(() => {
    if (userRole === '3') {
      // Check if the current route is allowed for students
      const allowedStudentRoutes = ['/student', '/student/profile', '/student/courses']; 
      if (!allowedStudentRoutes.includes(router.pathname)) {
        router.push('/student'); 
      }
    } else if (userRole === '2') {
      // Allow all routes starting with '/teacher'
      if (!router.pathname.startsWith('/teacher')) {
        router.push('/teacher'); 
      }
    } else if (userRole === '1') {
      // Check if the current route is allowed for administrators
      const allowedAdminRoutes = ['/admin', '/admin/teacher', '/admin/student', '/admin/assignment']; 
      if (!allowedAdminRoutes.includes(router.pathname)) {
        router.push('/admin'); 
      }
    } else if (userRole === '0') {
      // Check if the current route is allowed for administrators
      const allowedAdminRoutes = ['/admin', '/admin/users', '/admin/settings']; 
      if (!allowedAdminRoutes.includes(router.pathname)) {
        router.push('/admin'); 
      }
    } else {
      router.push('/signup'); 
    }
  }, [router.pathname]); // Re-run the effect when the route changes

  return null; // No data to return from this hook
};

export default useAuth;