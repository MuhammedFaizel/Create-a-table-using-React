import React, { useState } from 'react'
import { Table, Button } from 'reactstrap';
import ModalForm from '../Modals/Modal'

function DataTable(props){
  const deleteItem = id => {
    let confirmDelete = window.confirm('Delete item forever?')
    let userData=JSON.parse(localStorage.getItem('userData'))
    if(confirmDelete){
      userData.map((data,i)=>{
        if(data.id===id){
         userData.splice(i, 1);
         props.addItemToState(userData)}
      })
      localStorage.setItem('userData',userData!=null?JSON.stringify(userData):{})

    }
  }

  const items = props.items?props.items.map(item => {
    return (
      <tr key={item.id}>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.phone}</td>
        <td>{item.home}</td>
        <td>{item.office}</td>
        <td>
          <div style={{width:"110px"}}>
            <ModalForm buttonLabel="Edit" item={item} addItemToState={props.addItemToState} />
            {' '}
            <Button color="danger" onClick={() => deleteItem(item.id)}>Del</Button>
          </div>
        </td>
      </tr>
      )
    }):[]

  return (
    <Table responsive hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Home Address</th>
          <th>Office Address</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
      {items}
      </tbody>
    </Table>
  )
}

export default DataTable