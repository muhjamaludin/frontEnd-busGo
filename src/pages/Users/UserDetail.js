import React from 'react'
import {Row,
  Col,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button} from 'reactstrap'
import {connect} from 'react-redux'

class Userdetail extends React.Component {
  render() {
    return (
      <>
        <Modal>
          <ModalHeader>Profile</ModalHeader>
          <ModalBody>
            Tes
          </ModalBody>
          <ModalFooter>
            <Button>Cancel</Button>
          </ModalFooter>
        </Modal>
      </>
    )
  }
}

export default Userdetail