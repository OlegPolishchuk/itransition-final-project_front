import React, {useEffect} from 'react';
import logo from './logo.svg';
import axios from "axios";


function App() {

  useEffect(() => {
    axios.get('http://localhost:5000')
  }, [])

  return (
    <div className="App">

    </div>
  );
}

export default App;
