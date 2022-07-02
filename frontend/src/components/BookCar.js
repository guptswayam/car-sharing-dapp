import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react'
import { Button, Form, Modal, Row } from 'react-bootstrap';


export default function BookCar({show, setShowModal, pricePerHour, carId, carInstance, reloadCars}) {

  const [disabled, setDisabled] = useState(false);
  const [hours, setHours] = useState(1);
  const [amount, setAmount] = useState("0")

  useEffect(() => {
    const amount = ethers.utils.parseEther(pricePerHour.toString()).mul(ethers.BigNumber.from(hours))
    setAmount(ethers.utils.formatEther(amount.toString()));
  }, [pricePerHour])

  const buyCar = async (e) => {
    try {
      setDisabled(true)
      e.preventDefault();
      await (await carInstance.bookCar(carId, hours, {value: ethers.utils.parseEther(amount.toString())})).wait();
      reloadCars()
      setShowModal(false);
    } catch (error) {
      
    }
    

    setDisabled(false);
  }

  const onHourChange = (e) => {
    setHours(e.target.value);
    if(!e.target.value) {
      setAmount("0");
      return;
    }
    const amount = ethers.utils.parseEther(pricePerHour.toString()).mul(ethers.BigNumber.from(e.target.value))
    setAmount(ethers.utils.formatEther(amount.toString()));
  }

  return (
    <div>
       <Modal show={show} onHide={() => {setShowModal(false)}}>
        <Modal.Header closeButton>
          <Modal.Title>Book Car</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='text-center m-2 mb-4'>
          <Form className="content mx-auto" onSubmit={buyCar}>
            <Row className="g-4">
              <Form.Control value={hours} onChange={onHourChange} size="lg" required={true} type="number" placeholder="Duration In Hours" step={1} min={1} />
              <Form.Control size="lg" value={amount} type="text" placeholder="Price per Hour" disabled={true} />
              <div className="d-grid px-0">
                <Button type='submit' variant="dark" size="lg" disabled={disabled}>
                  {!disabled ? "Pay" : "Paying..."}
                </Button>
              </div>
            </Row>
          </Form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}
