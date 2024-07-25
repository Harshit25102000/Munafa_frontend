import React from 'react';
import { MDBSpinner } from 'mdb-react-ui-kit';

export default function Spinner() {
  return (
    <>
     
      <MDBSpinner className='mx-2' color='info'>
        <span className='visually-hidden'></span>
      </MDBSpinner>
     
    </>
  );
}