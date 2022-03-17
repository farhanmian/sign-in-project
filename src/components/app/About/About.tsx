import React from "react";
import styles from "./About.module.css";
import logo from "../../../assets/img/logo.png";
import { Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    heading: {
      marginBottom: 12,
    },
    tagline: {
      marginBottom: 4,
    },
    text: {
      lineHeight: "30px",
      [theme.breakpoints.down(801.1)]: {
        lineHeight: "24px",
      },
      [theme.breakpoints.down(401.1)]: {
        lineHeight: "18px",
      },
    },
  };
});

const About = () => {
  const classes = useStyles();
  return (
    <div className={styles.about}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="logo" />
      </div>

      <div className={styles.textContainer}>
        <Typography variant="h6" className={classes.tagline}>
          Write tagline here
        </Typography>
        <Typography variant="h2" className={classes.heading}>
          Lorem ipsum dolor sit amet
        </Typography>
        <Typography variant="body2" className={classes.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
      </div>
    </div>
  );
};

export default About;
