import { useState, useEffect } from 'react'
import { Form, Alert, InputGroup, Button, ButtonGroup } from 'react-bootstrap'
import BookDataService from '../services/book.services'


const AddBook = ({ id, setBookId }) => {

    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")

    const [status, setStatus] = useState("Available")
    const [flag, setFlag] = useState(true)
    const [message, setMessage] = useState({ error: false, msg: "" })

    

    const handleSubmit = async (e) => {
        e.preventDefault()
        setMessage("")
        if (title === "" || author === "") {
            setMessage({ error: true, msg: "All fields are mandatory" })
            return
        }
        const newBook = {
            title: title,
            author: author,
            status: status
        }


        try {
            if(id !== undefined && id !== ""){
                await BookDataService.updateBook(id,newBook)
                setBookId("")
                setMessage({error: false, msg: "Updated successfully !"})
            }
            else{
                await BookDataService.addBooks(newBook)
                setMessage({ error: false, msg: 'New Book added successfully !' })
            }
            
        } catch (err) {
            setMessage({ error: true, msg: err.message })
        }
        setTitle("")
        setAuthor("")
        
    }

    const handleEdit = async () => {
        setMessage("")
        try{
           const docSnap = await BookDataService.getBook(id) 
           setTitle(docSnap.data().title)
           setAuthor(docSnap.data().author)
           setStatus(docSnap.data().status)
        } catch (err){
            setMessage({ error: true, msg: err.message })
        }
    }

    useEffect(() => {
        if(id !== undefined && id !== ""){
           handleEdit() 
        }
    }, [id])

    

    return (
        <>
            <div className="p-4">
                {message?.msg && (<Alert variant={message?.error ? "danger" : "success"} dismissible onClose={() => setMessage("")}>{message?.msg}</Alert>)}

                <Form onSubmit={handleSubmit}>
                    <Form.Group className='mb-3' controlId='formBookTitle'>
                        <InputGroup>
                            <InputGroup.Text id="formBookTitle">B</InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Book Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className='mb-3' controlId='formBookTitle'>
                        <InputGroup>
                            <InputGroup.Text id="formBookAuthor">A</InputGroup.Text>
                            <Form.Control
                                type="text"
                                placeholder="Book Author"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                            />
                        </InputGroup>
                    </Form.Group>

                    <ButtonGroup className='mb-3'>
                        <Button
                            disabled={flag}
                            variant="success"
                            onClick={(e) => {
                                setStatus("Available")
                                setFlag(true)
                            }}
                        >
                            Available
                        </Button>

                        <Button
                            variant="danger"
                            disabled={!flag}
                            onClick={(e) => {
                                setStatus("Not Available")
                                setFlag(false)
                            }}
                        >
                            Not Available
                        </Button>
                    </ButtonGroup>
                    <div className="d-grid gap-2">
                        <Button variant="primary" type="Submit">
                            Add / Update
                        </Button>
                    </div>
                </Form>
            </div>
        </>
    )
}

export default AddBook