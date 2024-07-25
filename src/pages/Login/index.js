import React , { useEffect, useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,

}
from 'mdb-react-ui-kit';
import './login.css';
import Spinner from '../../components/Spinner';
import Alerts from '../../components/alert';
import { BACKEND_URL } from "../../config";
import {useNavigate} from "react-router-dom"
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("")
  const [error, setErrorMessage] = useState("")
 
  const [loading,setLoading]=useState(false)
  const [variant,setVariant]=useState("");
  const [alertMessage,setAlertMessage]=useState("")
  const [isalert,setIsalert]=useState(false)
  const [password, setPassword] = useState('');

 
  useEffect(() => {
    if (isalert) {
      const timeoutId = setTimeout(() => {
        setIsalert(false);
      }, 4000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [isalert]);

  const handleLogin = () => {
    setLoading(true)
    fetch(BACKEND_URL + '/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        withCredentials: true
      },
      body: JSON.stringify({ email ,password}),

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
    <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden'style={{height: '100vh'}}>
         {isalert && (
        <Alerts variant={variant} message={alertMessage} isalert={true} />
       )}
    <MDBRow>

      <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

        <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{color: 'hsl(218, 81%, 95%)'}}>
          With Munafa <br />
          <span style={{color: 'hsl(218, 81%, 75%)'}}>Enhance you trading Experience</span>
        </h1>

       

      </MDBCol>

      <MDBCol md='6' className='position-relative' style={{marginTop:"2%"}}>

        <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
        <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

        <MDBCard className='my-5 bg-glass' style={{marginLeft:"150px",marginRight:"150px",color:"black",backgroundColor:"black",marginTop:"200%"}}>
        <div className='d-flex justify-content-center mb-4'>
             <p style={{fontWeight:"bold",fontSize:"40px",marginTop:"20px",marginBottom:"-50px"}}>Login</p> 
            
            </div>
          <MDBCardBody className='p-5'>

          
            <MDBInput wrapperClass='mb-4' label='Email' id='form3' type='email' required onChange={(event) => setEmail(event.target.value)}/>
            <MDBInput wrapperClass='mb-4' label='Password' id='form4' type='password' required onChange={(event) => setPassword(event.target.value)}/>

            <div className='d-flex justify-content-center mb-4'>
             <p>Don't have an account ? </p> <br/>
             <p style={{color:"#5b8df1",cursor:"pointer"}} onClick={()=>navigate("/signup")}> Signup</p>
            </div>

            <MDBBtn className='w-100 mb-4' size='md' style={{backgroundColor:"#5b8df1"}} onClick={handleLogin}>Login</MDBBtn>

            {loading && (
                <Spinner />
               )}


          </MDBCardBody>
        </MDBCard>

      </MDBCol>

    </MDBRow>

  </MDBContainer>
  );
}

export default Login;