import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const WithAuth = (WrappedComponent) => {
  const WithAuth = (props) => {
    const Router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        Router.replace('/login');
      } else {
        setIsAuthenticated(true);
      }
    }, []);

    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };

  WithAuth.displayName = 'WithAuth';

  return WithAuth;
};

export default WithAuth;