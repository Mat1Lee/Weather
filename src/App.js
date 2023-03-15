import React from 'react';
import { MDBBtn, MDBContainer } from 'mdb-react-ui-kit';
import Main from './components/main';
function App() {
  return (
    <MDBContainer fluid>
      <div
        className='d-flex justify-content-center align-items-center'
        style={{ height: '100vh' }}
      >
        <Main/>
      </div>
    </MDBContainer>
  );
}

export default App;
