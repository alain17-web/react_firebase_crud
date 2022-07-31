import { Container, Navbar, Row, Col } from 'react-bootstrap'
import './App.css';
import AddBook from './components/AddBook';
import BooksList from './components/BooksList';
import { useState } from 'react'

function App() {

  const [bookId, setBookId] = useState("")

  const handleGetBookId = (id) => {
    console.log("id of doc",id)
    setBookId(id)
  }

  return (
    <>
    <Navbar bg="dark" variant="dark" className="header">
        <Container>
          <Navbar.Brand href="#home">Library - Firebase CRUD</Navbar.Brand>
        </Container>
      </Navbar>
      <Container style={{ width: "400px" }}>
        <Row>
          <Col>
            <AddBook  id={bookId} setBookId={setBookId}/>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row>
          <Col>
            <BooksList  getBookId={handleGetBookId}/>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
   
