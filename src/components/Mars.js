import { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Pagination from '@mui/material/Pagination'
import Grid from '@mui/material/Grid'

import './Mars.css'

export default function Mars(){
    let page = 2;
    let sol = 100;
    let totalPages = 0;
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [ppage, setPpage] = useState(10);
    const apiKey = "api_key=WnOxA7IphY4Xd6pLKxxEFoo54A0QaoSdi3qjfcDw"
    const apiKey2 = "api_key=KlkDfF9JFLyn7nS1iwrO5hDtOX3vvghSZeGWLpgd";
      const apiImg = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&page=${page}&${apiKey}`;
    let handleChange = (event)=>{
        setPpage(event.target.value);
    }

    useEffect(()=>{
        fetch(apiImg).then((res) => res.json())
        .then((result) => {
            setIsLoaded(true);
            setItems(result);
            console.log(result);
        },
        (error)=>{
            setIsLoaded(true);
            setError(error);
        }).catch((err)=>{
            console.log(err);
        })
    }, [apiImg]);

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
  return(
      <>
      <div className='box-perpage'>
       <Box className="box-perpage" sx={{maxWidth: 180}}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">PerPage</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={ppage}
                    label="page"
                    onChange={handleChange}
                >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={25}>25</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                </Select>
            </FormControl>
        </Box>   
        </div>
        <Grid container spacing={2}>

        </Grid>
        <footer className="pagination"><Pagination count={10} variant="outlined" /></footer>
      </>
       
)}
