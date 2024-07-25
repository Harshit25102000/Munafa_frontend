import React, { useState, useEffect } from 'react';

import { BACKEND_URL } from "../../config";
import NavbarComponent from '../../components/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
function Portfolio() {

    const [email, setEmail] = useState("")
    const [error, setErrorMessage] = useState("")
    const [classdata, setClassData] = useState([])
    const navigate = useNavigate();
    useEffect(() => {


        fetch(BACKEND_URL + '/@me', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                withCredentials: true
            },


        })

            .then(async (response) => {
                const data = await response.json();
                if (data.success && data.data && data.data.status === 'SUCCESS') {

                    ;


                } else {
                    navigate("/");

                }
            })
            .catch((error) => {
                navigate("/");

            });



    }, []);



    return (
        <div>
            <NavbarComponent />
            <Container>
                <Row style={{ marginTop: "2%", marginLeft: "10%" }}>
                    <Col>
                        <div>
                            <h3>Invested</h3>
                            <h4>Rs 4000</h4>
                        </div>
                    </Col>
                    <Col>
                        <div>
                            <h3>Current Value</h3>
                            <h4>Rs 8000</h4>
                        </div>
                    </Col>
                    <Col>
                        <div>
                            <h3>Returns</h3>
                            <h4>50%</h4>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <div className='col-md-4'>
                        <Card style={{ marginTop: "30px", width: "85%" }}>

                            <Card.Body>
                                <div class="d-flex justify-content-between">
                                    <div>
                                        <Card.Title style={{ fontWeight: "bold" }}>TATA</Card.Title>
                                        <Card.Text>
                                            Bought at - Rs 312.78
                                        </Card.Text>
                                        <Card.Text>
                                            Current value - Rs 314.78
                                        </Card.Text>
                                    </div>
                                    <div>
                                        <div class="d-flex flex-column">
                                            <Button variant="primary" style={{ marginTop: "10px", backgroundColor: "green" }} onClick={() => navigate("/attendance")}>BUY</Button>
                                            <Button variant="primary" style={{ marginTop: "10px", backgroundColor: "red" }} onClick={() => navigate("/attendance")}>SELL</Button>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>

                        
                    </div>

                    <div className='col-md-4'>
                        <Card style={{ marginTop: "30px", width: "85%" }}>

                            <Card.Body>
                                <div class="d-flex justify-content-between">
                                    <div>
                                        <Card.Title style={{ fontWeight: "bold" }}>TATA</Card.Title>
                                        <Card.Text>
                                            Bought at - Rs 312.78
                                        </Card.Text>
                                        <Card.Text>
                                            Current value - Rs 314.78
                                        </Card.Text>
                                    </div>
                                    <div>
                                        <div class="d-flex flex-column">
                                            <Button variant="primary" style={{ marginTop: "10px", backgroundColor: "green" }} onClick={() => navigate("/attendance")}>BUY</Button>
                                            <Button variant="primary" style={{ marginTop: "10px", backgroundColor: "red" }} onClick={() => navigate("/attendance")}>SELL</Button>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>

                        
                    </div>

                    <div className='col-md-4'>
                        <Card style={{ marginTop: "30px", width: "85%" }}>

                            <Card.Body>
                                <div class="d-flex justify-content-between">
                                    <div>
                                        <Card.Title style={{ fontWeight: "bold" }}>TATA</Card.Title>
                                        <Card.Text>
                                            Bought at - Rs 312.78
                                        </Card.Text>
                                        <Card.Text>
                                            Current value - Rs 314.78
                                        </Card.Text>
                                    </div>
                                    <div>
                                        <div class="d-flex flex-column">
                                            <Button variant="primary" style={{ marginTop: "10px", backgroundColor: "green" }} onClick={() => navigate("/attendance")}>BUY</Button>
                                            <Button variant="primary" style={{ marginTop: "10px", backgroundColor: "red" }} onClick={() => navigate("/attendance")}>SELL</Button>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>

                        
                    </div>

                    <div className='col-md-4'>
                        <Card style={{ marginTop: "30px", width: "85%" }}>

                            <Card.Body>
                                <div class="d-flex justify-content-between">
                                    <div>
                                        <Card.Title style={{ fontWeight: "bold" }}>TATA</Card.Title>
                                        <Card.Text>
                                            Bought at - Rs 312.78
                                        </Card.Text>
                                        <Card.Text>
                                            Current value - Rs 314.78
                                        </Card.Text>
                                    </div>
                                    <div>
                                        <div class="d-flex flex-column">
                                            <Button variant="primary" style={{ marginTop: "10px", backgroundColor: "green" }} onClick={() => navigate("/attendance")}>BUY</Button>
                                            <Button variant="primary" style={{ marginTop: "10px", backgroundColor: "red" }} onClick={() => navigate("/attendance")}>SELL</Button>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>

                        
                    </div>

                    <div className='col-md-4'>
                        <Card style={{ marginTop: "30px", width: "85%" }}>

                            <Card.Body>
                                <div class="d-flex justify-content-between">
                                    <div>
                                        <Card.Title style={{ fontWeight: "bold" }}>TATA</Card.Title>
                                        <Card.Text>
                                            Bought at - Rs 312.78
                                        </Card.Text>
                                        <Card.Text>
                                            Current value - Rs 314.78
                                        </Card.Text>
                                    </div>
                                    <div>
                                        <div class="d-flex flex-column">
                                            <Button variant="primary" style={{ marginTop: "10px", backgroundColor: "green" }} onClick={() => navigate("/attendance")}>BUY</Button>
                                            <Button variant="primary" style={{ marginTop: "10px", backgroundColor: "red" }} onClick={() => navigate("/attendance")}>SELL</Button>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>

                        
                    </div>

                    <div className='col-md-4'>
                        <Card style={{ marginTop: "30px", width: "85%" }}>

                            <Card.Body>
                                <div class="d-flex justify-content-between">
                                    <div>
                                        <Card.Title style={{ fontWeight: "bold" }}>TATA</Card.Title>
                                        <Card.Text>
                                            Bought at - Rs 312.78
                                        </Card.Text>
                                        <Card.Text>
                                            Current value - Rs 314.78
                                        </Card.Text>
                                    </div>
                                    <div>
                                        <div class="d-flex flex-column">
                                            <Button variant="primary" style={{ marginTop: "10px", backgroundColor: "green" }} onClick={() => navigate("/attendance")}>BUY</Button>
                                            <Button variant="primary" style={{ marginTop: "10px", backgroundColor: "red" }} onClick={() => navigate("/attendance")}>SELL</Button>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>

                        
                    </div>
                </Row>
            </Container>
        </div>
    );
}

export default Portfolio;