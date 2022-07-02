import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import BookCar from '../components/BookCar';
import MySpinner from '../components/MySpinner';
import camaroImage from "./../assets/camaro.jpg"

const LIMIT = 5;

function Home() {

  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState([]);
  const [disabled, setDisabled] = useState();
  const [isFinished, setIsFinished] = useState(false);
  const {account} = useWeb3React();
  const [buyModal, setBuyModal] = useState(false);
  const [selectCarId, setSelectCarId] = useState(null);
  const [pricePerHour, setPricePerHour] = useState(0)
  const [reload, setReload] = useState(false)

  const carInstance = useSelector((state) => state.carContractReducer.carInstance);

  const fetchCars = async () => {
    setDisabled(true);
    let carsList = await carInstance.getAvailableCars(cars.length ? +cars[cars.length - 1].id + 1 : 1, LIMIT, Math.floor(Date.now()/1000));
    // console.log(carsList);

    if(carsList.length < LIMIT) {
      setIsFinished(true);
    }

    carsList = carsList.map(car => {
      return {
        id: car.id,
        description: car.description,
        name: car.name,
        category: car.category,
        image: camaroImage,
        price: car.pricePerHour
      }
    })
    
    const updateCarsList = cars.concat(carsList);
    setCars(updateCarsList);
    setDisabled(false)
    setLoading(false)
  }

  const reloadCars = async () => {
    setCars([]);
    setLoading(true);
    setIsFinished(false);
    setReload((prev) => !prev);
  }

  useEffect(() => {
    fetchCars();
  }, [reload])

  const loadMore = () => {
    fetchCars();
  }

  const openModal = (carId, pricePerHour) => {
    setPricePerHour(pricePerHour)
    setSelectCarId(carId)
    setBuyModal(true);
  }

  if(loading)
    return <MySpinner />

  return (
    <div className="flex justify-center">
      {cars.length > 0 ?
        <div className="px-5 container">
          <Row xs={1} md={2} lg={4} className="g-4 py-5">
            {cars.map((item, idx) => (
              <Col key={idx} className="overflow-hidden">
                <Card>
                  <Card.Img variant="top" src={item.image} />
                  <Card.Body color="secondary">
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                    <i>{item.category}</i>
                    <br />
                      {item.description}
                      
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <div className='d-grid'>
                      <Button variant="dark" size="lg" disabled={!account} onClick={() => {openModal(item.id, ethers.utils.formatEther(item.price.toString()))}}>
                        {ethers.utils.formatEther(item.price.toString())} ETH Per Hour
                      </Button>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
          
          {!isFinished && <Button className='btn btn-dark' disabled={disabled} onClick={loadMore}>Load more</Button>}
          <BookCar show={buyModal} setShowModal={setBuyModal} carId={selectCarId} pricePerHour={pricePerHour} reloadCars={reloadCars} carInstance={carInstance} />
        </div>
        : (
          <main style={{ padding: "1rem 0" }}>
            <h2>No listed Cars</h2>
          </main>
        )}
    </div>
  )
}


export default Home;