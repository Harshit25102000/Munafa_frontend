import React, { useState, useRef, useEffect } from 'react';
import './home.css';
import { BACKEND_URL } from "../../config";
import NavbarComponent from '../../components/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ApexCharts from 'apexcharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Chart from 'chart.js/auto';
import Alerts from '../../components/alert';
function Home() {
    const [loading,setLoading]=useState(false)
  const [variant,setVariant]=useState("");
  const [alertMessage,setAlertMessage]=useState("")
  const [isalert,setIsalert]=useState(false)
    const [email, setEmail] = useState("")
    const [error, setErrorMessage] = useState("")
    const [classdata, setClassData] = useState([])
    const [isAdd,setIsAdd]=useState(false)
    const navigate = useNavigate();
    const [date,setDate]=useState([])
    const [close,setClose]=useState([])
    const chartRef = useRef(null);
    let myChart = null;
    const handleAdd = () => {
        setIsAdd(true)
    }

    const fetchChartData = () => {
        fetch(BACKEND_URL + '/get_fetch_data', {
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

                    setClose(data.data.close);
                    setDate(data.data.date);


                } else {
                    setErrorMessage(data.message || 'Failed. Please try again.');
                    setVariant("danger")
                    setAlertMessage(error)
                    setLoading(false)
                  
                    setIsalert(true)
                  }
                })
                .catch((error) => {
                  setVariant("danger")
                  setAlertMessage(error)
                  setLoading(false)
               
                  setIsalert(true)
        
                });

    }

    useEffect(() => {
        if (myChart) {
            myChart.destroy();
        }
        const ctx = chartRef.current.getContext('2d');
        myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: date,
                datasets: [
                    {
                        label: 'Price Overview',
                        data: close,
                        borderColor: 'blue',
                        backgroundColor: 'rgba(0, 0, 255, 0.2)',
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
            },

        });

    }, []);
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
            {isalert && (
        <Alerts variant={variant} message={alertMessage} isalert={true} />
       )}
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
                            <h5 style={{ margin: "47px 0px 0px 50px", cursor: "pointer" }}>Watchlist<button style={{"marginLeft":"10px","background":"None"}} onClick={handleAdd}>+</button></h5>
                            {isAdd && (
         <form class="form-inline">
         <div class="form-group mb-2">
             <label for="staticEmail2" class="sr-only">Email</label>
             <input type="text" readonly class="form-control-plaintext" id="staticEmail2" value="Add to Watchlist"/>
         </div>
         <div class="form-group mx-sm-3 mb-2">
             <label for="inputPassword2" class="sr-only">Password</label>
             <input type="password" class="form-control" id="inputPassword2" placeholder="Symbol"/>
         </div>
         <button type="submit" class="btn btn-primary mb-2">Add</button>
     </form>
       )}
                           
                        </div>
                        <div style={{ overflowY: "scroll", height: "530px" }}>
                            <Card style={{ marginTop: "30px", width: "85%" }}>

                                <Card.Body>
                                    <Row>
                                        <Col>
                                            <Button onClick={fetchChartData}><Card.Title style={{ fontWeight: "bold" }}>TATA</Card.Title></Button>
                                            <Card.Text>
                                                BID - 23.5
                                            </Card.Text>
                                            <Card.Text>
                                                ASK - 23.5
                                            </Card.Text>
                                        </Col>

                                        <Col>
                                            <Card.Text>
                                                Price - 23.5
                                            </Card.Text>
                                            <Button variant="primary" style={{ marginTop: "10px", backgroundColor: "green", marginRight: "2px" }} onClick={() => navigate("/attendance")}>BUY</Button>
                                            <Button variant="primary" style={{ marginTop: "10px", backgroundColor: "red", marginLeft: "2px" }} onClick={() => navigate("/attendance")}>SELL</Button>
                                        </Col>
                                    </Row>
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

                        <div style={{ marginTop: "5%" }}>
                            <div className="chart-container">
                                <canvas ref={chartRef} style={{ height: "35vh" }} />
                            </div>

                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Home;