import React, { useState,useEffect }from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  
}
  from 'mdb-react-ui-kit';
import './signup.css';
import { BACKEND_URL } from "../../config";
import Spinner from '../../components/Spinner';
import Alerts from '../../components/alert';
import { useNavigate } from "react-router-dom";
function Signup() {
  const [showsignup, setShowsignup] = useState(false);
  const [showotp, setShowotp] = useState(false);
  const [showemail, setShowemail] = useState(true);
  const [email, setEmail] = useState("")
  const [error, setErrorMessage] = useState("")
  const [otp, setOTP] = useState("")
  const [isValid, setIsValid] = useState(false)
  const [loading,setLoading]=useState(false)
  const [variant,setVariant]=useState("");
  const [alertMessage,setAlertMessage]=useState("")
  const [isalert,setIsalert]=useState(false)
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [name,setName] = useState("")
  const navigate = useNavigate();
  



  useEffect(() => {
    document.body.classList.add('signup-body');
    const rootElement = document.getElementById('root');
    if (rootElement) {
      rootElement.classList.add('signup-root');
    }

    // Remove the class when the component unmounts
   
      

    if (isalert) {
      const timeoutId = setTimeout(() => {
        setIsalert(false);
      }, 4000);

      return () => {
        clearTimeout(timeoutId);
        document.body.classList.remove('signup-body');
        if (rootElement) {
          rootElement.classList.remove('my-page-root');
        }
      };
    }
  }, [isalert]);

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);

    
  };

  const handlePassword1Change = (event) => {
    const newPassword = event.target.value;
    setPassword1(newPassword);
    setPasswordsMatch(newPassword === password2);
  };

  const handlePassword2Change = (event) => {
    const newPassword = event.target.value;
    setPassword2(newPassword);
    setPasswordsMatch(newPassword === password1);
  };

  const handleSendotp = () => {
    

    setLoading(true)
    
      console.log(BACKEND_URL)
      fetch(`${BACKEND_URL}/send_signup_otp`, {
        method: 'POST',
       
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          withCredentials: true
        },
        body: JSON.stringify({ email }),

      })
      
        .then(async (response) => {
          const data = await response.json(); 
          if (data.success && data.data && data.data.status === 'SUCCESS') {
            setVariant("success")
            setAlertMessage("OTP sent")
           
            setIsalert(true)
            setLoading(false)
            setShowotp(!showotp);
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

  


  };

  const handleVerifyotp = () => {
    setLoading(true)
    fetch(BACKEND_URL + '/teacher/verify_signup_otp', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        withCredentials: true
      },
      body: JSON.stringify({ email , otp}),

    })
  
      .then(async (response) => {
        const data = await response.json(); 
        if (data.success && data.data && data.data.status === 'SUCCESS') {
            setVariant("success")
            setAlertMessage("OTP Verified")
            setIsalert(false)
            setIsalert(true)
            setLoading(false)
            setShowotp(!showotp);
            setShowemail(!showemail);
            setShowsignup(!showsignup);
        } else {
          setErrorMessage(data.message || 'Failed. Please try again.');
       
          setVariant("danger")
          setAlertMessage(error)
         
          setIsalert(true)
          setLoading(false)
        }
      })
      .catch((error) => {
        setVariant("danger")
          setAlertMessage(error)
          setIsalert(false)
          setIsalert(true)
          setLoading(false)

      });


  };

  const handleSignup = () => {
    setLoading(true)
    fetch(BACKEND_URL + '/teacher/signup', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        withCredentials: true
      },
      body: JSON.stringify({ email , name,password1,password2}),

    })

      .then(async (response) => {
        const data = await response.json(); 
        if (data.success && data.data && data.data.status === 'SUCCESS') {
            navigate("/home");
            setLoading(false)
           
        } else {
          setErrorMessage(data.message || "Ooops Try again");
        
          setVariant("danger")
          setAlertMessage(error)
         
          setIsalert(true)
          setLoading(false)
        }
      })
      .catch((error) => {
        setVariant("danger")
          setAlertMessage(error)
          setIsalert(false)
          setIsalert(true)
          setLoading(false)

      });


  };



  return (
    <div>
       {isalert && (
        <Alerts variant={variant} message={alertMessage} isalert={true} />
       )}
    <MDBContainer fluid style={{ height: '100vh' }}>
       
      <MDBCard className='text-black m-5' style={{ borderRadius: '25px' }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

              <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
           
              {showsignup && (
                <div>
                  <div className="d-flex flex-row align-items-center mb-4 ">
                    <MDBIcon fas icon="user me-3" size='lg' />
                    <MDBInput label='Your Name' id='form1' type='text' className='w-100' style={{width:"100%"}} onChange={(event) => setName(event.target.value)} required/>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="envelope me-3" size='lg' />
                    <MDBInput label={email} id='form2' type='email' readOnly/>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="lock me-3" size='lg' />
                    <MDBInput label='Password' id='form3' type='password'  onChange={handlePassword1Change} required/>
                  </div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="key me-3" size='lg' />
                    <MDBInput label='Repeat your password' id='form4'  onChange={handlePassword2Change} type='password' required/>
                  </div>

                  {!passwordsMatch && (
                  <p style={{color:"red"}}>Passwords do not match</p>
                  )}
                   {passwordsMatch && (
                  <MDBBtn className='mb-4' size='lg' onClick={handleSignup}>Sign Up</MDBBtn>
                  )}
                </div>
              )}

              {showemail && (
                <div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    <MDBIcon fas icon="envelope me-3" size='lg' />
                    <MDBInput label='Your Email' id='form2' type='email' onChange={handleEmailChange}/>

                  </div>
             
                 
                    <MDBBtn className='mb-4' size='lg' style={{ marginLeft: "70px" }} onClick={handleSendotp}>Send OTP</MDBBtn>
              
                </div>
              )}
               {loading && (
                <Spinner />
               )}

              {showotp && (
                <div>

                  <div className="d-flex flex-row align-items-center mb-4">
                    
                    <MDBInput label='Enter OTP' id='form2' type='text' onChange={(otp) => setOTP(otp.target.value)} />

                  </div>
              
                  
                    <MDBBtn className='mb-4' size='lg' style={{ marginLeft: "50px" }} onClick={handleVerifyotp}>Verify OTP</MDBBtn>
               
                </div>
              )}

        <p style={{color:"#5b8df1",cursor:"pointer"}} onClick={()=>navigate("/")}> Back to Login</p>

            </MDBCol>

            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src={require('../../assets/signup.png')} fluid />
            </MDBCol>

          </MDBRow>
        </MDBCardBody>
      </MDBCard>

    </MDBContainer>
    </div>
  );
}

export default Signup;