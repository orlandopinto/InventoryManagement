import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
     const navigate = useNavigate();
     useEffect(() => {
          localStorage.removeItem("authorizaction")
          localStorage.removeItem("token")
          navigate('/account/login')
     }, [])

     return (
          <></>
     )
}

export default Logout