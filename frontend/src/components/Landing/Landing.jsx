import React, { useRef } from "react";
import styles from "./Landing.module.css";
import ScrollSnapItem from "../UI/ScrollSnap/ScrollSnapItem";
import { FaArrowRight, FaArrowUp } from "react-icons/fa";
import easy from "@assets/easy.png";
import supervise from "@assets/supervise.png";
import time from "@assets/time.png";
import bannerpic from "@assets/bannerpic.png";

const Landing = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <ScrollSnapItem className={styles.banner}>
        <section className={styles.intro}>
          <h1 className={styles.h1}>
            Are you an aspiring
            <br />
            <span className={styles.main}>ENTREPRENEUR</span>
            <br />
            <span className={styles.sub}>
              struggling to determine if your idea has potential?
            </span>
          </h1>

          <h3 className={styles.subsub}>
            Look no further, Spring Board is here to help!
          </h3>

          <button className={styles.floating_button}>
            Register Now &nbsp;&nbsp;
            <FaArrowRight className={styles.arrow} />
          </button>
        </section>
      </ScrollSnapItem>

      <ScrollSnapItem className={styles.banner2}>
        <div className={styles.descriptions}>
          <div className={styles.time}>
            <img
              alt="time"
              src={time}
              className={styles.timee}
              loading="lazy"
            />
            <h3 className={styles.name}>Time Efficient</h3>
            <p>
              SPringBoard is efficient when it comes to evaluating your startup
              idea. It doesn’t take too much time, and you can expect fast and
              reliable results.
            </p>
          </div>

          <div className={styles.supervise}>
            <img
              alt="supervise"
              src={supervise}
              className={styles.supervisee}
              loading="lazy"
            />
            <h3 className={styles.name}>Supervise</h3>
            <p>
              Provides feedback, recommendations and references for you to
              utilize. Allows you to be guided on how to improve your startup
              idea.
            </p>
          </div>

          <div className={styles.easy}>
            <img
              alt="easy"
              src={easy}
              className={styles.easyy}
              loading="lazy"
            />
            <h3 className={styles.name}>Easy to use</h3>
            <p>
              Gives you templates that you can choose from to further evaluate
              your startup ideas. This creates an opportunity to expand the
              potential of your ideas.
            </p>
          </div>
        </div>
      </ScrollSnapItem>

      <ScrollSnapItem className={styles.banner3}>
        <div className={styles.container}>
          <h1 className={styles.slogan}>
            Sign up today and start validating your startup idea like a PRO!
          </h1>
          <div class={styles.centeredImage}>
            <img
              alt="bannerpic"
              src={bannerpic}
              className={styles.bannerpic}
              loading="lazy"
            />
          </div>

          <button className={styles.sfloating_button}>
            Sign Up &nbsp;&nbsp;
            <FaArrowRight className={styles.arrow} />
          </button>
        </div>
      </ScrollSnapItem>

      <ScrollSnapItem className={styles.banner4}>
        <div className={styles.bot}>
          <h3 className={styles.subsub}>Back at the Top</h3>
          <button className={styles.back} onClick={scrollToTop}>
            <FaArrowUp className={styles.arrow} />
          </button>
        </div>
      </ScrollSnapItem>
      <div className={styles.footer}></div>
    </>
  );
};

export default Landing;
