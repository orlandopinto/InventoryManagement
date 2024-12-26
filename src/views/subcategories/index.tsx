import { Col, Row } from 'react-bootstrap'
import UploadImages from '../../components/common/UploadImages'

function index() {
     return (
          <Row>
               <Col sm={12}>
                    <UploadImages />
               </Col>
          </Row>
     )
}

export default index