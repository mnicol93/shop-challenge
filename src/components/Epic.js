import { Container, Card, Spinner, Carousel } from "react-bootstrap";
import { Grid } from "@mui/material";
import { isMobile } from "react-device-detect";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import LikeBtn from "./Shared/Like/LikeBtn";

// import './Home.css'

import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { render } from "@testing-library/react";

//TODO: If browsing on mobile, make picture fetched be .jpg, if it is a browser .png
//      https://stackoverflow.com/questions/39435395/reactjs-how-to-determine-if-the-application-is-being-viewed-on-mobile-or-deskto
//      
//      Render every time datepicker is updated
//      https://reactjs.org/docs/state-and-lifecycle.html

function Epic() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [itemsImg, setItemsImg] = useState([]);
  const [startDate, setStartDate] = useState(new Date('2019-05-30'));
  const [year, setYear] = useState();
  const [month, setMonth] = useState();
  const [day, setDay] = useState();


  const apiKey = "?api_key=KlkDfF9JFLyn7nS1iwrO5hDtOX3vvghSZeGWLpgd";
  const apiImg = `https://api.nasa.gov/EPIC/api/natural/date/`;

  let format = isMobile === true ? "jpg" : "png"; //Will load picture format depending on amount of data available.

  //https://api.nasa.gov/EPIC/archive/natural/${year}/${month}/${day}/${format}/${picId}.${format}?api_key=DEMO_KEY

  let handleChange = (date) => {
    setStartDate(date);
    setYear(date.getFullYear());
    setMonth(("0" + (date.getMonth()+1)).slice(-2));
    setDay(("0" + date.getDate()).slice(-2));
  };

  useEffect(() => {
    fetch(`${apiImg}${startDate.toISOString().split("T")[0]}${apiKey}`)
        .then((res) => res.json())
        .then((result) => {
        setIsLoaded(true);
        setItemsImg(result);
        console.log(`${apiImg}${startDate.toISOString().split("T")[0]}${apiKey}`);
        console.log(result);
        },
    (error) => {
        setIsLoaded(true);
        setError(error);
    }
        )
      .catch((err) => {
        console.log(err);
      });
  }, [apiImg]);

  console.log(itemsImg);

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
        <p>{itemsImg.map}</p>
      {itemsImg.map((item)=>{
          return(
            <Container>
                <Card>
                <Card.Body>
                    <Card.Title>Hola</Card.Title>
                    <Card.Img 
                        src={
                          `https://api.nasa.gov/EPIC/archive/natural/${year}/${month}/${day}/${format}/${item.image}.${format}${apiKey}`}
                    >
                    </Card.Img>
                    <p>Year: {year} - Month: {month} - Day {day} - Format {format} <br/> Image {item.image} </p>
                </Card.Body>
                </Card>
            </Container>
          )
      })

      }
    </>
  );
}

export default Epic;
