import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'reactstrap'
import Button from 'reactstrap/lib/Button'
import ModalForm from './Components/Modals/Modal'
import DataTable from './Components/Tables/DataTable'


function App() {
  const [start, setStart] = useState(0)
  const [pagesize,setpagesize]= useState(2)

  const [items, setItems] = useState(JSON.parse(localStorage.getItem('userData'))||[])
 

  const addItemToState = (item) => {
    console.log('addItemToState:',item);
    setItems(item)
  } 
  
  useEffect(() => {
    const getData=()=>{
      setItems(JSON.parse(localStorage.getItem('userData')))
    }
    getData()
  },[]);
  const handlePagination = (value)=> {
    console.log(value)
    console.log(start)
    console.log(pagesize)
    if (value==="next"){
      if(pagesize>=items.length){
        return
      }
      setStart(start+2)
      setpagesize(pagesize+2)
    }
    if (value==="previous"){
      if(start===0 && pagesize===2){
        return
      }
      setStart(start-2)
      setpagesize(pagesize-2)
    }
  }
  return (
      <Container className="App">
        <Row>
          <Col>
            <h1 style={{margin: "20px 0"}}>User Data</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <DataTable addItemToState={addItemToState} items={items?items.slice(start,pagesize):[]} />
          </Col>
        </Row>
        <Row>
        <Col>
          <Button
              className="btn btn-primary"
              color="primary"
              style={{float: "left", marginRight: "10px"}}
              onClick = {()=> handlePagination("previous")}
              >
                Prev
              </Button>
          <Button
              className="btn btn-primary"
              color="primary"
              style={{float: "left", marginRight: "10px"}}
              onClick = {()=> handlePagination("next")}
              >
                Next
              </Button>
          </Col>
          </Row>
        <Row>         
          <Col>
          <br/>
            <ModalForm buttonLabel="Add Item" addItemToState={addItemToState}/>
          </Col>
        </Row>
      </Container>
  )
}

export default App