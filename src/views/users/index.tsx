import React, { useState } from 'react'
import { UsersController } from '../../controllers/UsersController';
import { useAuth } from '../../hooks/useAuth';

function index() {
     const { userAuth } = useAuth();
     const token: string = userAuth.token ? userAuth.token : "";
     const controller = new UsersController(token)
     const [users, setUsers] = useState<Array<string>>()

     async function onGetUsers(): Promise<Array<string>> {

          await controller.Get().then((response => {
               setUsers(response);
               console.log('response: ' + response)
          }));
     };

     const handleClick = async (e: React.ChangeEvent<HTMLButtonElement>) => {
          e.preventDefault();

          onGetUsers();
     };

     return (
          <>
               <ul>
                    {
                         users?.map((user) => <li key={user.id}>{user.firstName}</li>)
                    }
               </ul>
               <div>Lista de usuarios</div>
               <button onClick={(e: React.FormEvent<HTMLButtonElement>) => handleClick(e)} className="btn btn-primary w-100 py-2" type="button">Obtener lista</button>
          </>
     )
}

export default index