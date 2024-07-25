import React, { useState, useEffect } from 'react';
import './home.css';
import { BACKEND_URL } from "../../config";
import NavbarComponent from '../../components/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
function Home() {

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
            <header id="header" class="d-flex align-items-center" style={{ backgroundColor: "#f2f2f2" }}>




                <nav id="navbar" class="navbar" style={{ marginLeft: "74px" }}>
                    <ul style={{ alignItems: "center" }}>
                        <li><a class="nav-link scrollto" href="index.html" style={{ fontWeight: "bold", color: "black" }}>Nifty</a></li>
                        <li><a class="nav-link scrollto" href="index.html#about" style={{ marginLeft: "-15px", color: "black" }}>3456<div
                            style={{ color: "green", marginLeft: "4px", marginRight: "4px" }}>&#x25b2;</div>
                            <div style={{ color: "green" }}>+0.02%</div>
                        </a></li>

                        <li><a class="nav-link scrollto" href="index.html" style={{ fontWeight: "bold", color: "black" }}>Sensex</a></li>
                        <li><a class="nav-link scrollto" href="index.html#about" style={{ marginLeft: "-15px", color: "black" }}>4390<div
                            style={{ color: "green", marginLeft: "4px", marginRight: "4px" }}>&#x25b2;</div>
                            <div style={{ color: "green" }}>+0.01%</div>
                        </a></li>

                        <li><a class="nav-link scrollto" href="index.html" style={{ fontWeight: "bold", color: "black" }}>NiftyB</a></li>
                        <li><a class="nav-link scrollto" href="index.html#about" style={{ marginLeft: "-15px", color: "black" }}>3456<div
                            style={{ color: "red", marginLeft: "4px", marginRight: "4px" }}>&#x25bc;</div>
                            <div style={{ color: "red" }}>-0.02%</div>
                        </a></li>

                        <li><a class="nav-link scrollto" href="index.html" style={{ fontWeight: "bold", color: "black" }}>NiftyMidCap</a></li>
                        <li><a class="nav-link scrollto" href="index.html#about" style={{ marginLeft: "-15px", color: "black" }}>56<div
                            style={{ color: "green", marginLeft: "4px", marginRight: "4px" }}>&#x25b2;</div>
                            <div style={{ color: "green" }}>+0.12%</div>
                        </a></li>

                        <li><a class="nav-link scrollto" href="index.html" style={{ fontWeight: "bold", color: "black" }}>NiftyIT</a></li>
                        <li><a class="nav-link scrollto" href="index.html#about" style={{ marginLeft: "-15px", color: "black" }}>456<div
                            style={{ color: "red", marginLeft: "4px", marginRight: "4px" }}>&#x25bc;</div>
                            <div style={{ color: "red" }}>-0.02%</div>
                        </a></li>



                    </ul>

                </nav>


            </header>

            <Container>

                <Row>
                    <Col>
                        <div>
                            <h5 style={{ margin: "47px 0px 0px 50px", cursor: "pointer" }}>Watchlist</h5>
                        </div>
                        <div style={{ overflowY: "scroll", height: "530px" }}>
                            <Card style={{ marginTop: "30px", width: "85%" }}>

                                <Card.Body>
                                    <div class="d-flex justify-content-between">
                                        <div>
                                            <Card.Title>TATA</Card.Title>
                                            <Card.Text>
                                                Rs 312.78
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
                            {classdata.map((item, index) => (
                                <Card key={index} style={{ marginTop: "30px", width: "85%" }}>

                                    <Card.Body>
                                        <Card.Title>{item.name}</Card.Title>
                                        <Card.Text>
                                            {item.description}
                                        </Card.Text>
                                        <Button variant="primary" style={{ marginTop: "10px" }} onClick={() => navigate("/attendance")}>Mark Attendance</Button>
                                    </Card.Body>
                                </Card>
                            ))}

                        </div>
                    </Col>
                    <Col>

                        <div style={{marginTop:"5%"}}>

                            <h3 style={{marginBottom:"5%"}}>Add something to your watchlist</h3>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <button class="btn btn-outline-secondary" type="button">Add</button>
                                </div>
                                <input type="text" class="form-control" placeholder="" aria-label="" aria-describedby="basic-addon1"/>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Home;