import { useRef, useState, useEffect } from 'react'
import { Button, Card, Form, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import "./quiz.css"

const Dashboard = () => {

    const { currentUser, logOut } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handllogout = async () => {
        try {
            setLoading(true)
            setError("")
            await logOut()
            navigate("/login")
        } catch {
            setError("failed to logout :(")
        }

        setLoading(false)
    }


    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);
    const [Langvisible, setLangVisible] = useState(false);
    const [sideNavBarShow, setSideNavBarShow] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.scrollY;

            setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollPos]);

    return (
        <>
            <Navbar style={{ backgroundColor: "white" }} className={`navy ${visible ? 'visible' : 'hidden'}`}>
                <Container>
                    <Navbar.Brand href="#home" className='d-flex align-items-center justify-content-center'>
                        {currentUser?.photoURL != null ? <img style={{ width: "50px", borderRadius: "30px", marginRight: "10px" }} src={currentUser?.photoURL} /> :

                            <div className='divFirstLetter'>{currentUser.email[0].toUpperCase()}</div>
                        }
                        <p style={{ display: "inline", fontSize: "1rem", margin: "0" }}>{currentUser.displayName || currentUser.email}</p>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <div><button disabled={loading} onClick={handllogout} className='btn btn-danger w-100'>Log-out</button></div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
        // <div>
        //     <Card>
        //         <Card.Body>
        //             <h2 className='text-center mb-4'>Profile: </h2>
        //             {error && <Alert variant="danger">{error}</Alert>}
        //             <div>
        //                 <img src={currentUser?.photoURL} />
        //             </div>
        //             <div>
        //                 {currentUser.displayName}
        //             </div>

        //             <strong>Email: </strong> {currentUser && currentUser.email}
        //             <div> <Link className='btn btn-primary w-100 mt-3' to="/update-profile">Update Profile</Link></div>
        //         </Card.Body>
        //     </Card>
        //     <div><button disabled={loading} onClick={handllogout} className='btn btn-danger w-100 mt-3'>Log-out</button></div>
        // </div>
    )
}

export default Dashboard