import { ethers } from 'ethers';
import React, { useState } from 'react'
import { Row, Form, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function CreateCar() {

  const [name, setName] = useState("");
  const [pricePerHour, setPricePerHour] = useState("");
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  
  const carInstance = useSelector((state) => state.carContractReducer.carInstance);

  const addCar = async (e) => {
    try {
      e.preventDefault();
    if(+pricePerHour === 0) {
      alert("Price can't be zero");
      return;
    }
    setDisabled(true)
    await (await carInstance.addCar(name, description, category, ethers.utils.parseEther(pricePerHour.toString()))).wait();
    navigate("/");
    } catch (error) {
      setDisabled(false);
    }
    
  }

  return (
    <div className="container-fluid mt-5">
      <div className="row">
        <main role="main" className="col-lg-12 mx-auto" style={{ maxWidth: '1000px' }}>
          <h2 className='mb-4'>Register Car</h2>
          <Form className="content mx-auto" onSubmit={addCar}>
            <Row className="g-4">
              <Form.Control onChange={(e) => setName(e.target.value)} size="lg" required={true} type="text" placeholder="Name" />
              <Form.Control onChange={(e) => setPricePerHour(e.target.value)} size="lg" required={true} type="number" placeholder="Price per Hour" min={0} step={0.01} />
              <Form.Control onChange={(e) => setDescription(e.target.value)} size="lg" required={true} type="text" placeholder="Description" />
              <Form.Control onChange={(e) => setCategory(e.target.value)} size="lg" required={true} type="text" placeholder="Category" />
              <div className="d-grid px-0">
                <Button type='submit' variant="primary" size="lg" disabled={disabled}>
                  {!disabled ? "List Car" : "Listing..."}
                </Button>
              </div>
            </Row>
          </Form>
        </main>
      </div>
    </div>
  )
}

export default CreateCar;