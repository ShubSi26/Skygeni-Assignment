
import './App.css'
import Barchart from './chart'

function App() {

  return (
    <>
      <div className='flex_center'>
        <div className='card flex_center'>
          <Barchart api = "http://localhost:5000/api/data1" />
        </div>
        <div className='card flex_center'>
          <Barchart api = "http://localhost:5000/api/data2"/>
        </div>
        
        
      </div>
      
    </>
  )
}

export default App
