import { Container, Card, Spinner, Carousel } from "react-bootstrap";
import { Grid } from "@mui/material";
import { isMobile } from "react-device-detect";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import LikeBtn from "./Shared/Like/LikeBtn";

// import './Home.css'

import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';

//TODO: If browsing on mobile, make picture fetched be .jpg, if it is a browser .png
//      https://stackoverflow.com/questions/39435395/reactjs-how-to-determine-if-the-application-is-being-viewed-on-mobile-or-deskto

function Epic() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [itemsDate, setItemsDate] = useState([]);
  const [dateExist, setDateExist] = useState(false);
  const [itemsImg, setItemsImg] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [year, setYear] = useState();
  const [month, setMonth] = useState();
  const [day, setDay] = useState();

  const apiImg = "https://api.nasa.gov/EPIC/api/natural/images?";
  const apiDates = "https://api.nasa.gov/EPIC/api/natural/all?";
  const apiKey = "api_key=KlkDfF9JFLyn7nS1iwrO5hDtOX3vvghSZeGWLpgd";

  let format = isMobile === true ? "jpg" : "png"; //Will load picture format depending on amount of data available.

  //https://api.nasa.gov/EPIC/archive/natural/${year}/${month}/${day}/${format}/${picId}.${format}?api_key=DEMO_KEY

  let handleChange = (date) => {
    setStartDate(date);
    setYear(date.getFullYear());
    setMonth(("0" + (date.getMonth()+1)).slice(-2));
    setDay(("0" + date.getDate()).slice(-2));
  };

  useEffect(() => {
    fetch(`${apiDates}${apiKey}`)
      .then((res) => res.json())
      .then((result) => {
        setIsLoaded(true);
        setItemsDate(result);
      })
      .then(
        fetch(`${apiImg}${apiKey}`)
          .then((res) => res.json())
          .then((result) => {
            setIsLoaded(true);
            setItemsImg(result);
          }),
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
      .catch((err) => {
        console.log(err);
      });
  }, []);
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return (
      <div class="loading-window">
        <Spinner animation="border" />
        <p class="loading-text">LOADING...</p>
      </div>
    );
  }
  return (
    <>
      <DatePicker selected={startDate} onChange={handleChange} dateFormat="yyyy-MM-dd" />
        <p>{startDate.toISOString().split("T")[0]}</p>
      <Container>
        <Card>
          <Card.Body>
            <Card.Title></Card.Title>
            <Card.Img src={`https://api.nasa.gov/EPIC/archive/natural/${year}/${month}/${day}/${format}/${itemsImg[0].image}.${format}?api_key=DEMO_KEY`}></Card.Img>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default Epic;
