import './App.css';
import Form from './components/Form';
import Data from './components/Data';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';


function App() {

  let result = null;
  const [show, setShow] = useState(false);
  const [userDetails, setUserDetails] = useState({
    id: "",
    fullName: "",
    userName: "",
    email: "",
    profilePic: "",
    password: ""
  });

  const handleDelete = (id) => {
    fetch(`http://localhost:3030/api/users/${userDetails.id}`, {
      method: 'DELETE'
      // Si sale bien hago un then con un mensaje de borrado exitoso, sino un catch de que hubo un problema
    })
      .then(resOk => result = resOk).catch(err => result = err);
    handleClose();
    console.log(result);
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="App">
        <header>
          <h2>API Client</h2>
          <p>For testing purpose only - Sebastian Code</p>
        </header>
        <main className='container'>
          <Form title="Form Component" />
          <Data title="Data component" handleShow={handleShow} setUserDetails={setUserDetails} />

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>{userDetails.fullName}</p>
              <p>{userDetails.userName}</p>
              <p>{userDetails.email}</p>
              <p>{userDetails.profilePic}</p>
              <p>{userDetails.password}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleDelete}>
                Borrar
              </Button>
              <Button variant="primary" onClick={handleClose}>
                Cancelar
              </Button>
            </Modal.Footer>
          </Modal>

        </main>
      </div>
    </>
  )
}

export default App;
