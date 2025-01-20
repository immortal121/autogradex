import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const useAuth = () => {
  const router = useRouter();
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return; // Ensure it runs only on the client side

    // Fetch the role from localStorage on client-side
    const role = localStorage.getItem('type');
    setUserRole(role);
    setIsLoading(false); // Mark loading as complete
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || isLoading) return; // Ensure it runs only on the client side and wait for loading to complete

    // Guard against undefined router.pathname
    if (!router?.pathname) return;

    if (userRole === null || userRole === undefined) {
      if (router.pathname === '/signup' || router.pathname === '/signin') {
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
          if (!router.pathname.startsWith('/teacher') && !router.pathname.startsWith('/digilocker')) {
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
  }, [userRole, isLoading, router?.pathname]); // Ensure safe access to router.pathname

  return null;
};

export default useAuth;
