import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import MySpinner from "../components/MySpinner";
import camaroImage from "./../assets/camaro.jpg";

function MyBookings() {
  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState([]);
  const { account } = useWeb3React();

  const carInstance = useSelector(
    (state) => state.carContractReducer.carInstance
  );

  const fetchMyCars = async () => {
    setLoading(true);
    const filter = carInstance.filters.CarBooked(null, account);
    let carsList = await carInstance.queryFilter(filter);
    carsList = carsList.map((car) => ({
      id: car.args.id,
      name: car.args.name,
      category: car.args.category,
      image: camaroImage,
      amount: car.args.amount,
      bookedAt: car.args.bookedAt * 1000,
      bookedTill: car.args.bookedAt * 1000 + car.args.duration * 1000,
    }));
    carsList.reverse();
    // console.log(carsList)
    setCars(carsList);
    setLoading(false);
  };

  useEffect(() => {
    fetchMyCars();
  }, []);

  if (loading) return <MySpinner />;

  return (
    <div className="flex justify-center">
      {cars.length > 0 ? (
        <div className="px-5 container">
          <Row xs={1} md={2} lg={3} className="g-5 py-5">
            {cars.map((item, idx) => (
              <Col key={idx} className="overflow-hidden">
                <Card>
                  <Card.Img variant="top" src={item.image} />
                  <Card.Body color="secondary">
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>
                      
                    <b>Booked At :</b>{" "}
                      {new Date(item.bookedAt).toLocaleString("en-IN", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                      <br></br>
                      <b>Booked Till :</b>{" "}
                      {new Date(item.bookedTill).toLocaleString("en-IN", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <div className="d-grid"><span>Amount: <b>{ethers.utils.formatEther(item.amount)} ETH</b></span></div>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ) : (
        <main style={{ padding: "1rem 0" }}>
          <h2>No Booking Found</h2>
        </main>
      )}
    </div>
  );
}

export default MyBookings;
