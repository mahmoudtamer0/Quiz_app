import { useState, useRef } from 'react'
import { Alert, Button, Card, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import "./quiz.css"
const ForgotPassword = () => {
    const { resetPassword } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const emailRef = useRef()

    const handlesubmit = async (e) => {
        e.preventDefault()
        try {
            setError("")
            setLoading(true)
            await resetPassword(emailRef.current.value);
        } catch (error) {
            console.log(error)
            setError("failed to login :(")
        }
        setLoading(false)
    }
    return (
        <div className='mainDivOf'>
            <Card style={{ width: "400px" }}>
                <Card.Body>
                    <h2 className='text-center mb-4'>Forgot Password</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handlesubmit}>
                        <Form.Group className='mb-3'>
                            <Form.Label htmlFor='email'>Email: </Form.Label>
                            <Form.Control ref={emailRef} type='email' id='email' />
                        </Form.Group>
                        <Form.Group>
                            <Button disabled={loading} variant='primary' type='submit' className='w-100'>
                                ForgotPassword
                            </Button>
                        </Form.Group>
                    </Form>
                    <div className='w-100 text-center mt-3'>
                        <Link to='/Login'>Login</Link>
                    </div>
                </Card.Body>
            </Card>

        </div>
    )
}

export default ForgotPassword;