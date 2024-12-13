import React, { useEffect, useState } from 'react'
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
     const controller = new UsersController(token as string)
     const [users, setUsers] = useState<Users[]>([])
     const { ShowMessageToast } = useShowMessageToast()

     useEffect(() => {
          onGetUsers();

     }, [])

     async function onGetUsers(): Promise<string> {
          let newUsers: string = "";
          await controller.Get().then((response => {
               newUsers = JSON.parse(JSON.stringify(response));
               const arr = []
               //Object.keys(newUsers).forEach(key => arr.push({ name: key, value: newUsers[key] }))
               setUsers(JSON.parse(newUsers));
               const { id } = users[0];
               console.log(id)
               // const ofType = users as Users[];

               // const converted: Users[] = ofType.map(item => ({
               //      id: item.id,
               //      userName: item.userName,
               //      normalizedUserName: item.normalizedUserName,
               //      email: item.email,
               //      normalizedEmail: item.normalizedEmail,
               //      emailConfirmed: item.emailConfirmed,
               //      passwordHash: item.passwordHash,
               //      phoneNumber: item.phoneNumber,
               //      phoneNumberConfirmed: item.phoneNumberConfirmed,
               //      twoFactorEnabled: item.twoFactorEnabled,
               //      lockoutEnd: item.lockoutEnd,
               //      lockoutEnabled: item.lockoutEnabled,
               //      accessFailedCount: item.accessFailedCount,
               //      address: item.address,
               //      birthDate: item.birthDate,
               //      firstName: item.firstName,
               //      lastName: item.lastName,
               //      zipCode: item.zipCode,
               //      isAdmin: item.isAdmin,
               //      roleId: item.roleId
               // }));

               //console.log(converted)

               // interface MyObj {
               //      id: string;
               //      userName: number;
               // }

               // let obj: Users[] = JSON.parse(newUsers);
               // console.log(obj.filter(f=> f.id ==='result'))
               // //let obj: MyObj[] = JSON.parse('[{ "id": "1", "userName": "opinto" },{ "id": "2", "userName": "jrondon" }]');
               // obj.map(data => {
               //      console.log(data.id);
               //      console.log(data.userName);
               // })


               // let object = JSON.parse(newUsers);
               // let array = Object.keys(object).map(function (k) {
               //      console.log('result: + ' + JSON.stringify(object[k]))
               //      console.log('*****************************')
               // });

          }));
          return newUsers;
     };




     //TODO: REFACTORIZAR ESTA FUNCION
     //NOTE: ESTA SOLUCION NO SE DEBERIA IMPLEMENTAR YA QUE "EN TEORIA" SI NO SE TIENE UN USUARIO VALIDADO NO DEBERIA TENER ACCESO A ESTA PAGINA
     const handleClick = async (e: React.ChangeEvent<HTMLButtonElement>) => {
          e.preventDefault();
          onGetUsers();
          // if (token !== "") {
          //      navigate('/login')
          //      return;
          // }
     };

     return (
          <>
               <div>Lista de usuarios</div>
               <div>
                    <ul>
                         {/* {
                              Object.entries(users).map(
                                   ([key, value]) => ({ [key]: value })
                              );
                         } */}
                    </ul>
               </div>
               <button onClick={(e: React.FormEvent<HTMLButtonElement>) => handleClick(e)} className="btn btn-primary w-100 py-2" type="button">Obtener lista</button>
               <ToastContainerComponent />

          </>
     )
}

export default index