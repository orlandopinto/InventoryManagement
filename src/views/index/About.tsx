import React, { useEffect, useState } from 'react'
import { METHOD } from '../../utilities/Constants.d';
import ApiManager from '../../utilities/ApiManager';
//import service from '../services/service';
import { ApiRequestOptions } from '../../types/types';
import { Users } from '../../types/Users';

const About = () => {
    const [data, setData] = useState<string[][]>([]);

    const dataToSend: Users = {
        id: "3becded4-8a81-44a7-8250-4aa748c6811a",
        userName: "Developer@DeveloperLife.com",
        normalizedUserName: "Developer@DeveloperLife.com",
        email: "Developer@DeveloperLife.com",
        normalizedEmail: "Developer@DeveloperLife.com",
        emailConfirmed: true,
        passwordHash: "AQAAAAEAACcQAAAAEM80BQCFiMdzGt6MczKn/iKMW7cU6uEf3iXYgs8GTt9Aym5BoHGmkWwxcnD+ZfxGZg==",
        phoneNumber: "121212221",
        phoneNumberConfirmed: true,
        twoFactorEnabled: false,
        lockoutEnd: null,
        lockoutEnabled: false,
        accessFailedCount: 0,
        address: null,
        birthDate: null,
        firstName: "Developer",
        lastName: "Life",
        zipCode: 29292,
        isAdmin: false,
        roleId: null
    }

    const options: ApiRequestOptions<string[]> = {
        method: METHOD.GET,
        //id: "3f561d7f-b2a5-48d4-a1f7-6285698e8091",
    }

    // const options2: ApiRequestOptions<Users> = {
    //     method: METHOD.GET,
    //     id: "3f561d7f-b2a5-48d4-a1f7-6285698e8091",//=> PARA NUEVO REGISTRO TIENE QUE SER UNO NUEVO, PARA ACTUALIZAR COMENTAR ESTA LINEA
    //     entity: dataToSend
    // }

    useEffect(() => {
        //VERIFICAR LAS OPCIONES
        //PARA CONSULTAR UNO O TODOS LOS REGISTROS
        // ApiManager<string[]>(options).then(data => {
        //     setData(data)
        //     console.log(data)
        // })

        //PARA AGREGAR UNO NUEVO O ACTUALIZAR
        // ApiManager<Users>(options2).then(data => {
        //     setData(data)
        //     console.log(JSON.stringify(data))
        // })
    }, []);

    return (
        <div>
            <h1>ACERCA DE</h1>
            <p>About page content.</p>
        </div>
    );
}

export default About