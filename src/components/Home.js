import { Container, Card, Button, Spinner, Accordion } from "react-bootstrap";

import { useEffect, useState } from "react";

// import Tooltip from './Shared/Tooltip'

import './Home.css'
import AccordionHeader from "react-bootstrap/esm/AccordionHeader";
import AccordionBody from "react-bootstrap/esm/AccordionBody";

function Home(){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const api = 'https://api.nasa.gov/planetary/apod?'
    const apiKey = 'api_key=KlkDfF9JFLyn7nS1iwrO5hDtOX3vvghSZeGWLpgd'
    let isVideo = false;

    useEffect(() => {
        fetch(`${api}${apiKey}`).then(res => res.json())
        .then((result) => {
            setIsLoaded(true);
            setItems(result);
            console.log(result);
            if(result.media_type === 'video'){
                this.isVideo = true;
            }
        },
        (error) => {
            setIsLoaded(true);
            setError(error);
        }).catch((err) =>{
            console.log(err);
        });
    }, [isVideo]);
    if(error){
        return <div>Error: {error.message}</div>;
    }else if(!isLoaded){
        return <div class="loading-window">
            <Spinner animation="border" /><p class="loading-text">LOADING...</p>
        </div>
    }
    return(
        <Container className="main-container">
            <Card  
                border="dark" 
                variant='dark' 
                style={{ width: '55%' }}
            >
                <Card.Body style={{backgroundColor: "grey"}}>
                    <Card.Title>{items.title}</Card.Title>
                    <Card.Subtitle className="date-picture">
                        {items.copyright} - ({items.date})
                    </Card.Subtitle>
                    <a href={items.url} target="_blank" rel="noreferrer">
                        <Card.Img variant="top" src={items.url}></Card.Img>
                    </a>
                    <Card.Text style={{color: "white"}}>
                        <Accordion defaultActiveKey={0}>
                            <AccordionHeader>
                                Explanation
                            </AccordionHeader>
                            <AccordionBody>
                                {items.explanation}
                            </AccordionBody>
                        </Accordion>
                    </Card.Text>
                    {/* <Button className="before-btn" variant="primary">BEFORE</Button>
                    <Button className="after-btn"  variant="primary">NEXT</Button> */}
                    <Card.Footer><Button className="like-btn" variant="primary">LIKE</Button></Card.Footer>
                </Card.Body>
            </Card> 
        </Container>
   ) 
}

export default Home;