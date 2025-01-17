import React, { useState, useRef, useEffect } from 'react';
import './home.css';
import { useLocation } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Spinner from '../../components/Spinner';
import { BACKEND_URL } from "../../config";
import NavbarComponent from '../../components/Navbar';
import NewsCarousel from '../../components/NewsCarousel';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { Line } from 'react-chartjs-2';
import Col from 'react-bootstrap/Col';
import ApexCharts from 'apexcharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Chart from 'chart.js/auto';
import Alerts from '../../components/alert';
import { fontString } from 'chart.js/helpers';
function Home() {
    // const ctx = chartRef.current.getContext('2d');
    const [show, setShow] = useState(false)
    const [stopLoss, setStopLoss] = useState('');
    const [action,setAction]=useState('')
    const [limitPrice, setLimitPrice] = useState('');
    const [variant, setVariant] = useState("");
    const [alertMessage, setAlertMessage] = useState("")
    const [isalert, setIsalert] = useState(false)
    const [isLoading, setLoading] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [error, setErrorMessage] = useState("")
    const [prices, setPrices] = useState([])
    const [indices, setIndex] = useState([])
    const [symbol,setSymbol] =useState("")
    const [datasymbol,setDataSymbol] =useState("")
    const [bid,setBid] =useState("")
    const [ask,setAsk] =useState("")
    const [isAdd, setIsAdd] = useState(false)
    const [isChart, setIsChart] = useState(false)
    const [qty, setQty] = useState(0)
    const navigate = useNavigate();


    const handleQty = (event) => {
        const newqty = event.target.value;
        setQty(newqty)
    };

    const openPopup = () => {
        setIsPopupOpen(true);
    };

    const handleMoreInfo = () => {
        const infoData={infoSymbol:datasymbol}
        console.log(infoData)
        // navigate("/MoreInfo",{state:{data:infoData}})
        const queryString = new URLSearchParams(infoData).toString();
        navigate(`/MoreInfo?${queryString}`)
    };

    const closePopup = (e) => {
        
        console.log("c")
        
        setIsPopupOpen(false);
    };

    const handleData=(action,symbol,bid,ask)=>{
        console.log("hanled data")
        setAction(action);
        setSymbol(symbol);
        setBid(bid);
        
        setAsk(ask);
        executeTrade();
    }

    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Price Overview',
                data: [],
                borderColor: 'blue',
                backgroundColor: 'rgba(0, 0, 255, 0.2)',
            },
        ],
    });

    const handleAdd = () => {
        setIsAdd(true)
    }

    const fetchChartData = (symbol) => {
        console.log(symbol);
        fetch(BACKEND_URL + '/get_chart_data', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                withCredentials: true
            },
            body: JSON.stringify({ symbol })


        })

            .then(async (response) => {
                const data = await response.json();
                if (data.success && data.data && data.data.status === 'SUCCESS') {
                    const close_vals = data.data.close;
                    const date_vals = data.data.date;
                    setChartData({
                        labels: date_vals,
                        datasets: [
                            {
                                label: `Closing Price Overview of ${symbol}`,
                                data: close_vals,
                                borderColor: 'blue',
                                backgroundColor: 'rgba(0, 0, 255, 0.2)',
                            },
                        ],
                    });


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



        // myChart = new Chart(ctx, {
        //     type: 'line',
        //     data:chartData,
        //     options: {
        //         responsive: true,
        //         maintainAspectRatio: false,
        //     },

        // });

        setIsChart(true)

    }


    const executeTrade = () => {
        console.log("running");
        fetch(BACKEND_URL + '/execute_trade', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                withCredentials: true
            },
            body: JSON.stringify({ action, qty, symbol, bid, ask,stopLoss,limitPrice })


        })
            .then(async (response) => {
                const data = await response.json();
                if (data.success && data.data && data.data.status === 'SUCCESS') {
                    setVariant("success")
                    setAlertMessage("Transaction Successfull")

                    setIsalert(true)
                    setLoading(false)

                } else {
                    setErrorMessage(data.message || 'Failed. Please try again.');
                    setVariant("danger")
                    setAlertMessage(error)
                    setLoading(false)

                    setIsalert(true)
                }
                setStopLoss("")
                setLimitPrice("")
            })
            .catch((error) => {
                setVariant("danger")
                setAlertMessage(error)
                setLoading(false)

                setIsalert(true)

            });



    };

    const update_prices=()=>{
        fetch(BACKEND_URL + '/get_all_price', {
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
                    setPrices(data.data.data)

                    setShow(true)

                } else {
                    setErrorMessage(data.message || 'Failed. Please try again.');
                    console.log(data.message)
                    setVariant("danger")
                    setAlertMessage(error)
                    setLoading(false)

                    setIsalert(true)
                    setShow(true)
                }
            })
            .catch((error) => {
                setVariant("danger")
                console.log(error)
                setAlertMessage(error)
                setLoading(false)

                setIsalert(true)
                setShow(true)

            });
    }

    useEffect(() => {
        
        setTimeout(() => {
            setIsalert(false);
        }, 3000);
        
        setShow(false);
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
            const interval = setInterval(update_prices, 5000);
        return () => clearInterval(interval);

        // if (myChart) {
        //     myChart.destroy();
        // }



        
        // if (myChart) {
        //     myChart.destroy();
        // }

        // fetch(BACKEND_URL + '/get_index_data', {
        //     method: 'GET',
        //     credentials: 'include',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         withCredentials: true
        //     },


        // })

        //     .then(async (response) => {
        //         const data = await response.json();
        //         if (data.success && data.data && data.data.status === 'SUCCESS') {
        //             setIndex(data.data.data)

        //             setShow(true)

        //         } else {
        //             setErrorMessage(data.message || 'Failed. Please try again.');
        //             console.log(data.message)
        //             setVariant("danger")
        //             setAlertMessage(error)
        //             setLoading(false)

        //             setIsalert(true)
        //             setShow(true)
        //         }
        //     })
        //     .catch((error) => {
        //         setVariant("danger")
        //         console.log(error)
        //         setAlertMessage(error)
        //         setLoading(false)

        //         setIsalert(true)
        //         setShow(true)

        //     });



        // when the component is mounted, the alert is displayed for 3 seconds
       

    }, []);



    return (
        <div>
            <NavbarComponent />
            {show ? (<div>

                <header id="header" class="d-flex align-items-center" style={{ backgroundColor: "#f2f2f2" }}>




                    <nav id="navbar" class="navbar" style={{ marginLeft: "74px" }}>
                        <ul style={{ alignItems: "center" }}>
                            {/* {indices.map((item, index) => (
                                <div key={index}>
                                    <li><a class="nav-link scrollto" href="index.html" style={{ fontWeight: "bold", color: "black" }}>{item.symbol}</a></li>
                                    <li><a class="nav-link scrollto" href="index.html#about" style={{ marginLeft: "-15px", color: "black" }}>{item.price}
                                        {item.negative ? (
                                            <>
                                            <div style={{ color: "green", marginLeft: "4px", marginRight: "4px" }}>&#x25b2;</div>
                                            <div style={{ color: "green" }}>{item.change_percent}</div>
                                            </>
                                        ) : (
                                            <>
                                            <div style={{ color: "green", marginLeft: "4px", marginRight: "4px" }}>&#x25bc;</div>
                                            <div style={{ color: "green" }}>{item.change_percent}</div>
                                            </>
                                        )}
                                        
                                    </a></li>
                                </div>
                            ))} */}
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
                <NewsCarousel/>
                <Container>
                    {isalert && (
                        <Alerts variant={variant} message={alertMessage} isalert={true} />
                    )}
                    
                    <Row>
                        <Col>
                            <div>
                                <h5 style={{ margin: "10px 0px 0px 50px", cursor: "pointer" }}>Watchlist<button style={{ "marginLeft": "10px", "background": "None" }} onClick={handleAdd}>+</button></h5>
                                {isAdd && (
                                    <form class="form-inline">
                                        <div class="form-group mb-2">
                                            <label for="staticEmail2" class="sr-only">Email</label>
                                            <input type="text" readonly class="form-control-plaintext" id="staticEmail2" value="Add to Watchlist" />
                                        </div>
                                        <div class="form-group mx-sm-3 mb-2">
                                            <label for="inputPassword2" class="sr-only">Password</label>
                                            <input type="password" class="form-control" id="inputPassword2" placeholder="Symbol" />
                                        </div>
                                        <button type="submit" class="btn btn-primary mb-2">Add</button>
                                    </form>
                                )}

                            </div>
                            <div style={{ overflowY: "scroll", height: "530px" }}>
                                {prices.map((item, index) => (
                                    <Card key={index} style={{ marginTop: "30px", width: "85%" }}>

                                        <Card.Body>
                                            <Row>
                                                <Col>
                                                    <Button onClick={() => {fetchChartData(item.symbol);setDataSymbol(item.symbol)}} style={{ background: "None", border: "None", color: "black" }}><Card.Title style={{ fontWeight: "bold" }}>{item.symbol}</Card.Title></Button>
                                                    <Row style={{marginLeft:"2%"}}>
                                                    <Col>
                                                    <Card.Text style={{fontWeight:"bold"}}>
                                                        BID 
                                                    </Card.Text>
                                                    <Card.Text >
                                                        {item.bid}
                                                    </Card.Text>

                                                    </Col>
                                                    <Col>
                                                    <Card.Text style={{fontWeight:"bold"}}>
                                                        ASK
                                                    </Card.Text>
                                                    <Card.Text>
                                                      {item.ask}
                                                    </Card.Text>
                                                    </Col>
                                                    </Row>
                                                </Col>

                                                <Col>
                                                    <Card.Text>
                                                        Price - {item.price}
                                                    </Card.Text>
                                                    <input type="number" id="quantity" name="quantity" placeholder='Qty' style={{ width: "70%" }} onChange={handleQty} />
                                                    <Popup trigger=
                                                        {<button style={{ marginTop: "10px", backgroundColor: "green", marginRight: "2px", width: "62px", height: "30px", borderRadius: "9px", color: "white",fontSize:"11px" }}> BUY </button>}
                                                        position="right center">

                                                        <div>Do you want to add stop loss or limit ?</div>
                                                        <button style={{ border: "None" }} onClick={() => {setAction("buy");setSymbol(item.symbol);setBid(item.bid);setAsk(item.ask);setIsPopupOpen(true)}} >Yes</button>
                                                        <button onClick={() =>handleData("buy",item.symbol,item.bid,item.ask)}>No</button>
                                                    </Popup>
                                                    <Popup trigger=
                                                        {<button style={{ marginTop: "10px", backgroundColor: "red", marginRight: "2px", width: "62px", height: "30px", borderRadius: "9px", color: "white",fontSize:"11px" }}> SELL </button>}
                                                        position="right center">

                                                        <div>Do you want to add stop loss or limit ?</div>
                                                        <button style={{ border: "None" }} onClick={() => {setAction("sell");setSymbol(item.symbol);setBid(item.bid);setAsk(item.ask);setIsPopupOpen(true)}}>Yes</button>
                                                        <button onClick={() => handleData("sell",item.symbol,item.bid,item.ask)}>No</button>
                                                    </Popup>
                                                </Col>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                ))}
                                {/* {classdata.map((item, index) => (
                                <Card key={index} style={{ marginTop: "30px", width: "85%" }}>

                                    <Card.Body>
                                        <Card.Title>{item.name}</Card.Title>
                                        <Card.Text>
                                            {item.description}
                                        </Card.Text>
                                        <Button variant="primary" style={{ marginTop: "10px" }} onClick={() => navigate("/attendance")}>Mark Attendance</Button>
                                    </Card.Body>
                                </Card>
                            ))} */}

                            </div>

                            {isPopupOpen && (
                                <div className="popup-overlay">
                                    <div className="popup">
                                        <h2 style={{fontSize:"22px"}}>Order Details</h2>
                                        <div className="popup-content">
                                            <div className="popup-row">
                                                <div className="popup-column">
                                                    <h3 style={{fontSize:"22px"}}>Qty</h3>
                                                    <p>{qty}</p>
                                                </div>
                                                <div className="popup-column">
                                                    <h3 style={{fontSize:"22px"}}>Stop Loss</h3>
                                                    <input
                                                        type="number"
                                                        value={stopLoss}
                                                        onChange={(e) => setStopLoss(e.target.value)}
                                                    />
                                                </div>
                                                <div   className="popup-column">
                                                    <h3 style={{fontSize:"22px"}}>Limit</h3>
                                                    <input
                                                        type="number"
                                                        value={limitPrice}
                                                        onChange={(e) => setLimitPrice(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            
                                            <button  onClick={() => {executeTrade();closePopup();}} style={{marginLeft:"34%"}}>Proceed</button>
                                            
                                          
                                           
                                            <button  onClick={closePopup} style={{marginLeft:"34%",background:"None",color:"red"}}>Cancel</button>
                                        </div>
                                        
                                    </div>
                                </div>
                            )}
                        </Col>

                        <Col>
                            {isChart && (<div style={{ marginTop: "15%" }}>

                                <div className="chart-container">

                                    {/* <canvas ref={chartRef} style={{ height: "35vh" }} /> */}

                                    <Line data={chartData} style={{ width: "35vw", height: "30vh" }} />
                                </div>
                                <Button style={{ background: "None", border: "None", color: "black", marginTop: "10px", fontWeight: "700" }} onClick={handleMoreInfo}>View More Info</Button>
                            </div>)}

                        </Col>
                    </Row>
                </Container></div>) : (
                <div style={{ width: "200%", marginTop: "200px", marginLeft: "750px" }}>
                    <Spinner />
                    <h5 style={{ marginTop: "auto", marginLeft: "auto" }} >Slow response due to API throttle</h5>
                </div>
            )}:
        </div>
    );
}

export default Home;