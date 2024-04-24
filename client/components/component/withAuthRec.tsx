import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const WithAuthRec = (WrappedComponent) => {
  const WithAuthRec = (props) => {
    const Router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem('token');
      const idRecruteur = localStorage.getItem('idRecruteur');
      if (!token && !idRecruteur) {
        Router.replace('/recruiter/login');
      } else {
        setIsAuthenticated(true);
      }
    }, []);

    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };

  WithAuthRec.displayName = 'WithAuthRec';

  return WithAuthRec;
};

export default WithAuthRec;