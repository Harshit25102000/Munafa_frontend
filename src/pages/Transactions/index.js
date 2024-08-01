import React, { useState, useEffect } from 'react';
import Spinner from '../../components/Spinner';
import { BACKEND_URL } from "../../config";
import NavbarComponent from '../../components/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
function Transactions() {
    const [show, setShow] = useState(false)
    const [data,setData]=useState([])
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

                    setShow(true)


                } else {
                    navigate("/");

                }
            })
            .catch((error) => {
                navigate("/");

            });

            fetch(BACKEND_URL + '/get_transactions', {
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
                        console.log(data.data)
                        setData(data.data.data)
                        setShow(true)
    
    
                    } else {
                        console.log(data.data)
    
                    }
                })
                .catch((error) => {
                    console.log(error)
    
                });


    }, []);



    return (
        <div>
            <NavbarComponent />
            {show ? (
                <Container>
                    <h2 style={{ marginTop: "5%","textAlignLast":"center"}}>Your Transactions</h2>
                    {data.map((item, index) => (
                    <Card key={index} style={{ marginTop: "6%", width: "60%",marginLeft:"auto",marginRight:"auto"}}>

                        <Card.Body>

                            
                            <Card.Title style={{ fontWeight: "bold" }}>{item.action}</Card.Title>
                            <Row>
                                <Col>
                                    <Card.Text>
                                        Symbol - {item.symbol}
                                    </Card.Text>
                                    <Card.Text>
                                        qty - {item.qty}
                                    </Card.Text>
                                </Col>
                                <Col>

                                    <Card.Text>
                                        Total Amount - Rs {item.amount}
                                    </Card.Text>
                                    <Card.Text>
                                        Price - Rs {item.rate}
                                    </Card.Text>

                                </Col>
                                <Col>
                                    <Card.Text>
                                        Date - {item.date}
                                    </Card.Text>
                                    <Card.Text>
                                        Time - {item.time}
                                    </Card.Text>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>

                     ))}
                </Container>) : (
                <div style={{ width: "200%", marginTop: "200px", marginLeft: "750px" }}>
                    <Spinner />
                    <h5 style={{ marginTop: "auto", marginLeft: "auto" }} >Slow response due to API throttle</h5>
                </div>
            )}:
        </div>
    );
}

export default Transactions;