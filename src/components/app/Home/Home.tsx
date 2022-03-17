import React from "react";
import styles from "./Home.module.css";
import { Card, Typography, makeStyles, Button } from "@material-ui/core";
import { useAppContext } from "../../../store/context/appContext";
import Loading from "../../partials/Loading/Loading";

const useStyles = makeStyles({
  heading: {
    textTransform: "capitalize",
  },
  card: {
    marginTop: 50,
    padding: 50,
    boxShadow: "0 1px 3px rgba(0,0,0,.4)",
  },
  btn: {
    marginTop: 20,
    borderRadius: 2,
    textTransform: "capitalize",
    boxShadow: "0 2px 2px rgba(0,0,0,.1)",
    outline: "1px solid #afadad",
    height: 40,
    width: 80,
  },
});

const Home = () => {
  const ctx = useAppContext();
  if (!ctx) return null;
  const { activeUser, setActiveUser, setIsLoading, isLoading } = ctx;

  const classes = useStyles();

  const logoutHandler = () => {
    setIsLoading(true);
    setTimeout(() => {
      setActiveUser(null);
      setIsLoading(false);
      localStorage.setItem("userId", "");
    }, 1000);
  };

  if (!activeUser) return null;
  return (
    <div className={styles.home}>
      <Card className={classes.card}>
        <Typography className={classes.heading} variant="h2">
          Welcome {activeUser.name}
        </Typography>

        <Button
          onClick={logoutHandler}
          variant="contained"
          disableElevation
          color="secondary"
          className={classes.btn}
          disabled={isLoading}
        >
          {!isLoading ? "Logout" : <Loading />}
        </Button>
      </Card>
    </div>
  );
};

export default Home;
