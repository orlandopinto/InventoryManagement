import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
     const navigate = useNavigate();
     useEffect(() => {
          localStorage.removeItem("user")
          localStorage.removeItem("token")
          navigate('/login')
     }, [])
}

export default Logout