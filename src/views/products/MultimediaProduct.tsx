import { Col, Image, Button } from 'react-bootstrap';
import { ImagesProduct } from '../../types/Products.types';

const MultimediaProduct = (imagesProduct: ImagesProduct) => {
     const newUUID = self.crypto.randomUUID()
     return (
          <Col xl={4} md={6} sm={12} className='p-3'>
               <article>
                    <figure style={{ height: '260px' }}>
                         <Image src={imagesProduct.secureUrl} className="w-100" style={{ height: '260px' }} />
                    </figure>
                    <div className='text-center w-100'>
                         <Button className='w-75' variant="outline-primary">Eliminar</Button>
                    </div>
               </article>
               <hr />
          </Col>
     )
}

export default MultimediaProduct