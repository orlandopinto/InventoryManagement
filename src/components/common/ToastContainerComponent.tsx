import React from 'react'
import { ToastContainer } from 'react-toastify';

function ToastContainerComponent() {
     return (
          <ToastContainer
               position="top-right"
               autoClose={5000}
               hideProgressBar
               newestOnTop={false}
               closeOnClick
               rtl={false}
               pauseOnFocusLoss
               draggable
               pauseOnHover
               theme="colored"
          />
     )
}

export default ToastContainerComponent