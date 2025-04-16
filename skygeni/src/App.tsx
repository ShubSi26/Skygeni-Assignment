
import './App.css'
import Barchart from './chart'
import Table from './table'

function App() {

  return (
    <>
      <div className='flex_center widthfull'>
        <div className='card flex_center'>
          <Barchart api = "http://localhost:5000/api/data1" />
        </div>
        <div className='card flex_center'>
          <Barchart api = "http://localhost:5000/api/data2"/>
        </div>
      </div>

      <div className='flex_center widthfull pt-10'>
        <div className='card flex_center'>
          <Table api = "http://localhost:5000/api/data1"/>
        </div>
        <div className='card flex_center'>
          <Table api = "http://localhost:5000/api/data2"/>
        </div>
      </div>

      
      
      
    </>
  )
}

export default App
