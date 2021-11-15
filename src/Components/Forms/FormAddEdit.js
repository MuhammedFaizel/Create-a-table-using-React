import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { nanoid } from "nanoid";

function AddEditForm(props) {
  const [userData, setUserData]= useState(localStorage.getItem('userData')?JSON.parse(localStorage.getItem('userData')):[])
  const[form, setValues] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    office: '',
    home: ''
  })

  const onChange = e => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const submitFormAdd = e => {
    console.log('edit',props);
    e.preventDefault()
    const newData={
      id: nanoid(),
      name: form.name,
      office: form.office,
      email: form.email,
      phone: form.phone,
      home: form.home
    }
   const newdatas = [...userData,newData]
   setUserData(newdatas);
   localStorage.setItem('userData',JSON.stringify(newdatas))
   props.addItemToState(newdatas)
  }

  const submitFormEdit = e => {
    console.log('edit',props);
    console.log('edit',form.id);
    e.preventDefault()
    const currentData = [...userData]
    currentData.map((data,i)=>{
      if(data.id===form.id){
        currentData[i]=form
      }
    })
    setUserData(currentData)
   props.addItemToState(currentData)
   localStorage.setItem('userData',JSON.stringify(currentData))
  }

  useEffect(() => {
    if(props.item){
      const { id, name, home, email, phone, office } = props.item
      setValues({ id, name, home, email, phone, office })
    }
  }, false)

  return (
    <Form onSubmit={props.item ? submitFormEdit : submitFormAdd}>
      <FormGroup>
        <Label for="name">Name</Label>
        <Input type="text" name="name" id="name" onChange={onChange} value={form.name === null ? '' : form.name} placeholder="Enter Your Name" />
      </FormGroup>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input type="email" name="email" id="email" onChange={onChange} value={form.email === null ? '' : form.email} placeholder="Enter Your Email Id" />
      </FormGroup>
      <FormGroup>
        <Label for="phone">Phone</Label>
        <Input type="text" name="phone" id="phone" onChange={onChange} value={form.phone === null ? '' : form.phone}  placeholder="ex. 9876543210" />
      </FormGroup>
      <FormGroup>
        <Label for="home">Home Address</Label>
        <Input type="text" name="home" id="home" onChange={onChange} value={form.home === null ? '' : form.home}  placeholder="Enter Your Home Address" />
      </FormGroup><FormGroup>
        <Label for="office">office Address</Label>
        <Input type="text" name="office" id="office" onChange={onChange} value={form.office === null ? '' : form.office}  placeholder="Enter Your Office Address" />
      </FormGroup>      
      <Button>Submit</Button>
    </Form>
  )
}

export default AddEditForm