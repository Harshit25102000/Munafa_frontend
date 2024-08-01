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
import { set } from 'rsuite/esm/internals/utils/date';
function Portfolio() {
    const [show, setShow] = useState(false)
    const [currentVal, setCurrentVal] = useState()
    const [returns, setReturns] = useState()
    const [totaInvested, setTotalInvested] = useState()
    const [shares, setShares] = useState([])
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


        fetch(BACKEND_URL + '/get_portfolio', {
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
                    setCurrentVal(data.data.current_val)
                    setReturns(data.data.returns)
                    setShares(data.data.shares)
                    setTotalInvested(data.data.total_invested)
                    setShow(true)


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
            {show ? (
                <Container>
                    <Row style={{ marginTop: "2%", marginLeft: "10%" }}>
                        <Col>
                            <div>
                                <h3>Invested</h3>
                                <h4>Rs {totaInvested}</h4>
                            </div>
                        </Col>
                        <Col>
                            <div>
                                <h3>Current Value</h3>
                                <h4>Rs {currentVal}</h4>
                            </div>
                        </Col>
                        <Col>
                            <div>
                                <h3>Returns</h3>
                                <h4>{returns} %</h4>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        {shares.map((item, index) => (
                            <div className='col-md-4' key={index}>
                                <Card style={{ marginTop: "30px", width: "85%" }}>

                                    <Card.Body>


                                        <Card.Title style={{ fontWeight: "bold" }}>{item.symbol}</Card.Title>
                                        <Row>
                                            <Col>
                                                <Card.Text>
                                                    Qty - {item.qty}
                                                </Card.Text>
                                                <Card.Text>
                                                    Invested - Rs {item.invested}
                                                </Card.Text>
                                            </Col>
                                            <Col>

                                                <Card.Text>
                                                    Price - Rs {item.price}
                                                </Card.Text>
                                                <Card.Text>
                                                    Current value - Rs {item.current_value}
                                                </Card.Text>

                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>


                            </div>
                        ))}

                       
                    </Row>
                </Container>) : (
                <div style={{ width: "200%", marginTop: "200px", marginLeft: "750px" }}>
                    <Spinner />
                    <h5 style={{ marginTop: "auto", marginLeft: "auto" }} >Slow response due to API throttle</h5>
                </div>
            )}:
        </div>
    );
}

export default Portfolio;