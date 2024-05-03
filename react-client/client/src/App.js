import React, { useCallback, useEffect, useState } from 'react';
import { socket } from './socket/socketConnection';
import PerfComponent from './Component/PerfComponent';

const App = () => {
  const [clientsData, setClientsData] = useState([]);
  const onDataFromServer = useCallback((data) => {
    setClientsData(Object.values(data));
  }, [])

  useEffect(() => {
    socket.on("dataFromServer", onDataFromServer);
    return () => {
      socket.off("dataFromServer", onDataFromServer);
    }
  }, [])


  return (
    <div className='container'>
      <h2 className='pf-text'>Performance Moniter</h2>
      <h2 className='cc-text'>Connected Client {clientsData.length}</h2>
      <div className='main-div'>
        {
          clientsData.map((item) => <PerfComponent {...item} />)
        }
      </div>
    </div>
  )
}

export default App
