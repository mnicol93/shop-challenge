import { Container, Card, Spinner, Accordion } from "react-bootstrap";
import { Grid } from '@mui/material';
import { isMobile } from "react-device-detect"; //If mobile the image format will be '.jpg' otherwise '.png' for data saving.
import { useEffect, useState } from "react";

import LikeBtn from './Shared/Like/LikeBtn';

// import './Home.css'

import AccordionHeader from "react-bootstrap/esm/AccordionHeader";
import AccordionBody from "react-bootstrap/esm/AccordionBody";

//TODO: If browsing on mobile, make picture fetched be .jpg, if it is a browser .png
//      https://stackoverflow.com/questions/39435395/reactjs-how-to-determine-if-the-application-is-being-viewed-on-mobile-or-deskto

function Epic(){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [itemsDate, setItemsDate] = useState([]);
    const [itemsImg, setItemsImg] = useState([]);
    const apiImg = 'https://api.nasa.gov/EPIC/api/natural/images?'
    const apiDates = 'https://api.nasa.gov/EPIC/api/natural/all?'
    const apiKey = 'api_key=KlkDfF9JFLyn7nS1iwrO5hDtOX3vvghSZeGWLpgd'
    //https://api.nasa.gov/EPIC/archive/natural/${year}/${month}/${day}/${format}/${picId}.${format}?api_key=DEMO_KEY

    useEffect(() => {
        fetch(`${apiDates}${apiKey}`).then(res => res.json())
        .then((result) => {
            setIsLoaded(true);
            setItemsDate(result);  
        }).then(fetch(`${apiImg}${apiKey}`).then(res => res.json())
        .then((result)=>{
            console.log(result);
            setIsLoaded(true);
            setItemsImg(result);    
        }),
        (error) => {
            setIsLoaded(true);
            setError(error);
        }).catch((err) =>{
            console.log(err);
        });
    }, []);
    console.log(itemsDate);
    console.log(itemsImg);
    if(error){
        return <div>Error: {error.message}</div>;
    }else if(!isLoaded){
        return <div class="loading-window">
            <Spinner animation="border" /><p class="loading-text">LOADING...</p>
        </div>
    }



    return(
      <>
      <p style={{color: "white"}}>{isMobile ? 'MOBILE' : 'BROWSER'}</p>
        {itemsDate.map((item)=>{
            return <p>{item.date}<br></br> - {itemsImg.map((img)=>{
                return <p>{img.image} <br/></p>
            })}</p>
        })}
        
      </>
    );
}

export default Epic;