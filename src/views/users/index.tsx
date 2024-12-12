import React, { useState } from 'react'
import { UsersController } from '../../controllers/UsersController';
import ToastContainerComponent from '../../components/common/ToastContainerComponent';
import { useShowMessageToast } from "../../hooks/useShowMessageToast";
import { MESSAGE_TOAST_ERROR_TYPE } from "../../utilities/Constants.d";
import { useNavigate } from 'react-router-dom';
import { Users } from '../../types/Users';
import { useAuth } from '../../contexts/useAuth';

function index() {
     const { user, token } = useAuth()
     const navigate = useNavigate()
     const controller = new UsersController(token)
     const [users, setUsers] = useState<Array<Users>>()
     const { ShowMessageToast } = useShowMessageToast()

     async function onGetUsers(): Promise<Array<Users>> {

          let newUsers: Array<Users> = new Array<Users>;
          await controller.Get().then((response => {
               newUsers = JSON.parse(JSON.stringify(response)) as Array<Users>;
               setUsers(newUsers);
               console.log('response: ' + response)
          }));
          return newUsers;
     };

     //TODO: REFACTORIZAR ESTA FUNCION
     //NOTE: ESTA SOLUCION NO SE DEBERIA IMPLEMENTAR YA QUE "EN TEORIA" SI NO SE TIENE UN USUARIO VALIDADO NO DEBERIA TENER ACCESO A ESTA PAGINA
     const handleClick = async (e: React.ChangeEvent<HTMLButtonElement>) => {
          e.preventDefault();
          if (user) {
               onGetUsers();
               if (token !== "") {
                    onGetUsers();
               }
               else {
                    navigate('/acceso')
                    return;
               }
          }
          else {

               ShowMessageToast(MESSAGE_TOAST_ERROR_TYPE.ERROR, 'no esta logeado')
          }
     };

     return (
          <>
               <div>Lista de usuarios</div>
               <div>
                    <ul>
                         {
                              users?.map((user) => <li key={user.id}>{user.firstName}</li>)
                         }
                    </ul>
               </div>
               <button onClick={(e: React.FormEvent<HTMLButtonElement>) => handleClick(e)} className="btn btn-primary w-100 py-2" type="button">Obtener lista</button>
               <ToastContainerComponent />

          </>
     )
}

export default index