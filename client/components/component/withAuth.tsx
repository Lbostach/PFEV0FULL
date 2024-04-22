import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const WithAuth = (WrappedComponent) => {
  const WithAuth = (props) => {
    const Router = useRouter();
    const token = localStorage.getItem('token');

    useEffect(() => {
      if (!token) {
        Router.replace('/login');
      }
    }, [token]);

    return <WrappedComponent {...props} />;
  };

  WithAuth.displayName = 'WithAuth';

  return WithAuth;
};

export default WithAuth;