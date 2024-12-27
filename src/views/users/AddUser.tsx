import { useRef, useState } from 'react';
import { useQuery } from "react-query";
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom';
import { initializedUser, Users } from '../../types/Users.d';
import { UsersController } from '../../controllers/UsersController';
import { useAuth } from '../../contexts/useAuth';
import { MESSAGE_TOAST_ERROR_TYPE, METHOD } from '../../utilities/Constants.d';
import { useShowMessageToast } from '../../hooks/useShowMessageToast';
import Loading from '../index/Loading';
import { TokenResult } from '../../interfaces/IAccount';

function AddUser() {
  let IsAddMode: boolean = true;
  const PASSWORD_HIDE = "**********"
  const { id } = useParams<string>()
  const [originalPasswordHash, setOriginalPasswordHash] = useState('')
  const inputRef = useRef<HTMLInputElement>({} as HTMLInputElement)
  const { ShowMessageToast } = useShowMessageToast()

  const { tokenResult } = useAuth()
  const controller = new UsersController(tokenResult?.accessToken as string);

  const [formData, setFormData] = useState<Users>(initializedUser);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  if (id !== undefined) {
    IsAddMode = false;
    const { isLoading } = useQuery({
      queryKey: ['id', id],
      queryFn: async ({ queryKey }) => {
        await controller.GetById(queryKey[1] as string).then(fetchData => {
          if (fetchData !== null) {
            const response = fetchData as unknown as Users
            setOriginalPasswordHash(response.passwordHash)
            response.passwordHash = PASSWORD_HIDE
            setFormData(response)
          }
          else {
            ShowMessageToast("Se produjo un error al consultar los datos del usuario, por favor intente de nuevo!", MESSAGE_TOAST_ERROR_TYPE.ERROR);
          }
        }).catch(error => {
          ShowMessageToast(error.mess, MESSAGE_TOAST_ERROR_TYPE.ERROR);
        })
      },
    })

    if (isLoading) {
      return <Loading />
    }
  }

  const handleAddUser = async (event: any) => {
    event.preventDefault();

    await controller.Post(formData).then(fetchData => {
      if (fetchData === null) {
        ShowMessageToast("Se produjo un error al agregar al usuario, por favor intente de nuevo!", MESSAGE_TOAST_ERROR_TYPE.ERROR);
        return;
      }
      setFormData(initializedUser)
      inputRef.current?.focus();
      ShowMessageToast("Usuario registrado satisfactoriamente!", MESSAGE_TOAST_ERROR_TYPE.SUCCESS);
    }).catch(error => {
      ShowMessageToast(error.mess, MESSAGE_TOAST_ERROR_TYPE.ERROR);
      return;
    })
  }

  const handleUpdateUser = async (event: any) => {
    event.preventDefault();
    formData.passwordHash = originalPasswordHash;
    await controller.Put(formData).then(fetchData => {
      if (fetchData !== null) {
        ShowMessageToast("Datos del usuario actualizado con éxito!", MESSAGE_TOAST_ERROR_TYPE.SUCCESS);
      }
      else {
        ShowMessageToast("Se produjo un error al actualizar el usuario, por favor intente de nuevo!", MESSAGE_TOAST_ERROR_TYPE.ERROR);
      }
    }).catch(error => {
      ShowMessageToast(error.mess, MESSAGE_TOAST_ERROR_TYPE.ERROR);
      return;
    })
  };


  return (
    <>
      <div>
        <div className='header-page'>
          <div>
            <h4>Gestión de usuarios</h4>
            <p>Agregar/Actualizar Usuario</p>
          </div>
        </div>
        <div>
          <Form >
            <Card>
              <div className='container-fluid pt-2'>
                <Row>
                  <Col xl={4} md={6} sm={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control type="text" ref={inputRef} id="firstName" name="firstName" value={formData.firstName == null ? "" : formData.firstName} onChange={handleChange} />
                    </Form.Group>
                  </Col >
                  <Col xl={4} md={6} sm={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Apellido</Form.Label>
                      <Form.Control type="text" id="lastName" name="lastName" value={formData.lastName == null ? "" : formData.lastName} onChange={handleChange} />
                    </Form.Group>
                  </Col >
                  <Col xl={4} md={6} sm={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xl={4} md={6} sm={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="Password" id="passwordHash" name="passwordHash" value={formData.passwordHash} onChange={handleChange} />
                    </Form.Group>
                  </Col >
                  <Col xl={4} md={6} sm={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Teléfono</Form.Label>
                      <Form.Control type="phoneNumber" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber == null ? "" : formData.phoneNumber} onChange={handleChange} />
                    </Form.Group>
                  </Col >
                  <Col xl={4} md={6} sm={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Dirección:</Form.Label>
                      <Form.Control type="text" id="address" name="address" value={formData.address == null ? "" : formData.address} onChange={handleChange} />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xl={12}>
                    <Form.Group className="mb-3 buttons-section">
                      {IsAddMode
                        ?
                        <Button variant='primary' onClick={handleAddUser}>Guardar</Button>
                        :
                        <Button variant='primary' onClick={handleUpdateUser}>Actualizar</Button>
                      }
                      <Link to="/users" className='btn btn-secondary'><span>Volver</span></Link>
                    </Form.Group>
                  </Col>
                </Row>
              </div>
            </Card>
          </Form>
        </div>
      </div>
    </>
  )
}

export default AddUser