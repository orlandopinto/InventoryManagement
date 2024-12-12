import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/')
    };

    return (
        <>
            <h1>BIENVENIDOS A LA PAGINA DE INICIO</h1>
            <button onClick={handleClick} className="btn btn-primary w-100 py-2" type="submit">Empecemos</button>
        </>
    )
}

export default Home