import React from "react";
import Navbar from "../utilities/Navbar";
import Footer from "../utilities/Footer";
import UploadPosts from '../utilities/UploadPosts'
import GetPosts from '../utilities/GetPosts'

const Home = () => {
 
  return (
    <div>
      <Navbar />
      <UploadPosts/>
      <GetPosts/>
      <Footer />
    </div>
  );
};

export default Home;
