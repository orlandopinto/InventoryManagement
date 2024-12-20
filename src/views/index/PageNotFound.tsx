import { Button } from 'react-bootstrap'
import './PageNotFound.css'
import { useNavigate } from 'react-router-dom';

function PageNotFound() {
     const navigate = useNavigate();
     return (
          <>

               <div className="cont_principal cont_error_active">
                    <div className="cont_error">
                         <h1>Oops</h1>
                         <p>The Page you're looking for isn't here.</p>
                         <Button size='lg' variant='primary' onClick={() => navigate(-1)} >Volver</Button>
                         <Button size='lg' variant='primary' onClick={() => navigate('/account/login')} >Login</Button>
                    </div>
                    <div className="cont_aura_1"></div>
                    <div className="cont_aura_2"></div>
               </div>
          </>
     )
}

export default PageNotFound