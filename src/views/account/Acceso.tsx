import "./auth.css";
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { useAuth } from "../../contexts/useAuth";
import { AuthProfile } from "../../types/types";

const Acceso = () => {
     // const { loginUser } = useAuth()

     // const [email, setEmail] = useState<string>("");
     // const [password, setPassword] = useState<string>("");

     // const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     //      setEmail(e.target.value);
     // };

     // const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
     //      setPassword(e.target.value);
     // };

     // function Accesso() {
     //      const user: AuthProfile = {
     //           userName: 'opinto',
     //           email: 'opinto@gmail.com',
     //           fullName: 'Orlando Pinto',
     //           isAuthenticated: true
     //      }
     //      loginUser(user, 'tokenFromLogin');
     // }

     const handleSubmit = (e: React.FormEvent) => {
          e.preventDefault();
     }

     return (
          <section>
               <div className="container">
                    <Card className="form-signin m-auto  p-5">
                         <form onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}>
                              <h1 className="h3 mb-3 fw-normal">Login</h1>
                              <div className="form-floating">
                                   <input type="email" className="form-control" id="email" placeholder="name@example.com" value={email} onChange={handleEmailChange} required />
                                   <label htmlFor="email">Email address</label>
                              </div>
                              <div className="form-floating">
                                   <input type="password" autoComplete="true" className="form-control" id="password" placeholder="Password" value={password} onChange={handlePasswordChange} required />
                                   <label htmlFor="password">Password</label>
                              </div>
                              <button className="btn btn-primary w-100 py-2" type="submit">Login</button>
                         </form>
                    </Card>
               </div>
          </section>
     );
};

export default Acceso;

