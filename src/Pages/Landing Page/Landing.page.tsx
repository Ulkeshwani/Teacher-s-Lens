import LandingPoster from "Assets/Aminated posters/LandingPoster.animation";
import Footer from "Components/Footer/Footer.component";
import Login from "Components/Login/Login.component";
import Navigation from "Components/Nav bar/Navigation.component";
import React, { Component } from "react";
import "./Landing.styles.css";
class Landing extends Component {
  render() {
    return (
      <div className="landing_wrapper">
        <Navigation />
        <section className="landing_container">
          <article className="landing_poster">
            <LandingPoster />
          </article>
          <article className="login_container">
            <Login />
          </article>
        </section>
        <Footer />
      </div>
    );
  }
}

export default Landing;
