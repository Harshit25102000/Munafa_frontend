import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

function Alerts(props) {
    
  

  
    return (
      <Alert variant={props.variant}  style={{width:"30%",margin:"auto"}}>
        <Alert.Heading>{props.message}</Alert.Heading>
      
      </Alert>
    );
 
}

export default Alerts;