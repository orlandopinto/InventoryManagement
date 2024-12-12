import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
     const navigate = useNavigate();
     useEffect(() => {
          localStorage.removeItem("user")
          localStorage.removeItem("token")
          navigate('/acceso')
     }, [])

     return (
          <></>
     )
}

export default Logout