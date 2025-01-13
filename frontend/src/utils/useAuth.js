import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const useAuth = () => {
  const router = useRouter();
  const userRole = localStorage.getItem('type');

  useEffect(() => {
    
    console.log(router.pathname);
    
    if (userRole === null) {
      if (router.pathname === '/signup') {
        return;
      } else if (router.pathname === '/signup') {
        return;
      }
    }else{
      
      switch (userRole) {
        case '3': // Student
          if (!router.pathname?.startsWith('/student')) {
            router.push('/student');
            return;
          }
          break;
        case '2': // Teacher
          if (!router.pathname?.startsWith('/teacher')) {
            router.push('/teacher');
            return;
          }
          break;
        case '1': // Admin 
          if (!router.pathname?.startsWith('/admin')) {
            router.push('/admin');
            return;
          }
          break;
        case '0': // Admin 
          if (!router.pathname?.startsWith('/super_admin')) {
            router.push('/super_admin');
            return;
          }
          break;
        default:
          router.push('/signin');
          return;
      }
    }
  }, [router.pathname]);

  return null;
};

export default useAuth;