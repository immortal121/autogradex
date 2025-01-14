import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const useAuth = () => {
  const router = useRouter();
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch the role from localStorage on client-side
    const role = localStorage.getItem('type');
    setUserRole(role);
    setIsLoading(false); // Mark loading as complete
  }, []);

  useEffect(() => {
    if (isLoading) return; // Wait until loading is complete
    if (userRole === null || userRole === undefined) {
      if (router.pathname === '/signup' || router.pathname === '/signin' || router.pathname === undefined) {
        return; // Allow public pages
      } else {
        router.push('/signin'); // Redirect unauthenticated users
      }
    } else {
      switch (userRole) {
        case '3': // Student
          if (!router.pathname.startsWith('/student')) {
            router.push('/student');
          }
          break;
        case '2': // Teacher
          if (!router.pathname.startsWith('/teacher')) {
            router.push('/teacher');
          }
          break;
        case '1': // Admin
          if (!router.pathname.startsWith('/admin')) {
            router.push('/admin');
          }
          break;
        case '0': // Super Admin
          if (!router.pathname.startsWith('/super_admin')) {
            router.push('/super_admin');
          }
          break;
        default:
          router.push('/signin'); // Redirect for unknown roles
      }
    }
  }, [userRole, isLoading, router.pathname]);

  return null;
};

export default useAuth;
