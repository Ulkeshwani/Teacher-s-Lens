import React, { Component } from "react";
import SignupPoster from "Assets/Aminated posters/SignupPoster.animation";
import Footer from "Components/Footer/Footer.component";
import SignUp from "Components/Signup/Signup.component";
import Navigation from "Components/Nav bar/Navigation.component";

import "./SignupPage.styles.css";

class SignupPage extends Component {
  render() {
    return (
      <div className="_signup_page_wrapper">
        <Navigation />
        <section className="_signup_page_container">
          <article className="_signup_poster">
            <SignupPoster />
          </article>
          <article className="_signup_container">
            <SignUp />
          </article>
        </section>
        <Footer />
      </div>
    );
  }
}

export default SignupPage;
