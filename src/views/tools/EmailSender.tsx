import { ChangeEvent, SyntheticEvent, useState } from 'react'
import { Form, Button, Card, Col, Row } from 'react-bootstrap'
// import { Html } from "@react-email/components";
// import { Resend } from 'resend';

// import sgMail from "@sendgrid/mail";


function EmailSender() {
     const [validated, setValidated] = useState(false);

     const ApiKey = import.meta.env.VITE_SENDGRID_API_KEY;

     const initializeValues = {
          nameSender: "",
          emailSender: "",
          subject: "",
          message: ""
     }

     const [formData, setFormData] = useState(initializeValues);

     const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
          setFormData({
               ...formData,
               [event.target.id]: event.target.value,
          });
     };

     const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
          e.preventDefault();
          if (e.currentTarget.checkValidity() === false) {
               setValidated(true);
          }
          else {
               onSendEmail();
          }
     }

     const onSendEmail = () => {
          const message = {
               to: 'orlandojavierpinto@gmail.com',
               from: formData.emailSender,
               subject: formData.subject,
               html: `
                    <p><strong>${formData.nameSender}</strong></p>
                    <p>${formData.message}</p>
               `
          };

          // sgMail.send(message)
          //      .then(() => {
          //           console.log('message sent')
          //      })
          //      .catch((err) => {
          //           console.log('error: ' + err)
          //      })
     }

     const handleReset = (e: any) => {
          setFormData(initializeValues)
     }

     return (
          <>
               <div>
                    <div className='header-page'>
                         <div>
                              <h4>Emails</h4>
                              <p>Gestor de correo electrónico</p>
                         </div>
                    </div>
                    <div>
                         <Card className='m-auto  p-4'>
                              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                   <Row>
                                        <Col xl={12}>
                                             <Form.Group className="mb-3">
                                                  <Form.Label>Nombre:</Form.Label>
                                                  <Form.Control type="text" id="nameSender" name="nameSender" value={formData.nameSender} onChange={handleChange} required />
                                             </Form.Group>
                                        </Col >
                                   </Row>
                                   <Row>
                                        <Col xl={12}>
                                             <Form.Group className="mb-3">
                                                  <Form.Label>Correo electrónico:</Form.Label>
                                                  <Form.Control type="email" id="emailSender" name="emailSender" value={formData.emailSender} onChange={handleChange} required />
                                             </Form.Group>
                                        </Col >
                                   </Row>
                                   <Row>
                                        <Col xl={12}>
                                             <Form.Group className="mb-3">
                                                  <Form.Label>Asunto:</Form.Label>
                                                  <Form.Control type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
                                             </Form.Group>
                                        </Col >
                                   </Row>
                                   <Row>
                                        <Col xl={12}>
                                             <Form.Group className="mb-3">
                                                  <Form.Label>Mensage:</Form.Label>
                                                  <Form.Control as="textarea" rows={3} id="message" name="message" value={formData.message} onChange={handleChange} required />
                                             </Form.Group>
                                        </Col >
                                   </Row>
                                   <Row>
                                        <Col xl={12} className="gap-2 d-flex">
                                             <div>

                                                  <Button className="px-5" size="lg" id="btnSubmit" type="submit" variant='primary'>Enviar</Button>
                                             </div>
                                             <div>
                                                  <Button className="px-5" size="lg" id="btnReset" type="button" variant='outline-primary' onClick={(e) => handleReset(e)} >Reestablecer</Button>
                                             </div>
                                        </Col>
                                   </Row>
                              </Form>
                         </Card>

                    </div>
               </div>

          </>
     )
}

export default EmailSender