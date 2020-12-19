import React, { useState, useEffect } from "react";
import image1 from "../assets/images/social-media-1.png";
import image2 from "../assets/images/social-media-2.png";
import image3 from "../assets/images/social-media-3.png";
import image4 from "../assets/images/social-media-4.png";
import Carousel from "react-bootstrap/Carousel";
import { Paper } from "@material-ui/core";
import Typewriter from 'typewriter-effect/dist/core';


const Charts = () => {
  const imagesSourceArray = [image1, image2, image3, image4];
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect (()=> {

    var app = document.getElementById('app');
  var typewriter = new Typewriter(app, {
    loop: false,
    delay: 35,
  });

  typewriter
        .pauseFor(200)
        .typeString('<h2>Come And Join One Of The Largest Social Networking Platform</h2>')
        .start()

  }, [])

  

 
  return (
    <Paper elevation={3} 
    style={{display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    height: "83vh",
    flexDirection: "column",
    paddingTop: "10px",
    textAlign: "center",
    userSelect: "none",
  }}>
      <div id="app" style={{padding: "0px 30px", color: "primary", opacity: "0.7"}}>
      
      </div>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        {imagesSourceArray.map((curr , ind) => {
          return (
            <Carousel.Item key={ind} interval={1000}>
              <img
                className="d-block w-80 h-80 img-fluid"
                style={{height: "400px"}}
                src={curr}
                alt="display"
              />
            </Carousel.Item>
          );
        })}
      </Carousel>
    </Paper>
  );
};

export default Charts;
