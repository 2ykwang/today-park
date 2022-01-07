import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import video from "../video/mainVideo.mp4";
import { BasicLink } from "../components/BasicLink";

function Home() {
  return (
    <>
      <Header />
      <section className="home">
        <div className="video">
          <video width="100%" height="100%" muted autoPlay loop>
            <source src={video} type="video/mp4" />
          </video>
          <BasicLink to="/search" className="findPark">
            공원 찾으러 가기
          </BasicLink>
          <BasicLink to="#">
            {/* <img src="../image/scrollDown.png" alt="scrollDown" /> */}
          </BasicLink>
        </div>
      </section>
    </>
  );
}

export default Home;
