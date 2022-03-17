import React, { FormEvent, useRef, useState } from "react";
import {
  Typography,
  makeStyles,
  FormControl,
  InputLabel,
  Input,
  Link,
  FormControlLabel,
  Checkbox,
  Button,
} from "@material-ui/core";
import styles from "./Form.module.css";

const useStyles = makeStyles((theme) => {
  return {
    formTypeHeading: {
      textTransform: "uppercase",
      marginBottom: 52,
      [theme.breakpoints.down(501.1)]: {
        marginBottom: 30,
      },
      [theme.breakpoints.down(401.1)]: {
        marginBottom: 20,
      },
    },
    input: {
      height: 62,
      fontSize: 15,
      fontWeight: 500,
      "& .MuiInputLabel-shrink": {
        transform: "translate(0, 1.5px) scale(.85)",
      },
    },
    inputLabel: {
      ...theme.typography.body2,
      color: theme.palette.primary.main,
    },
    link: {
      display: "block",
      cursor: "pointer",
      ...theme.typography.subtitle1,
    },
    forgetPasswordLink: {
      textAlign: "end",
      marginBottom: 12,
      marginTop: 8,
    },
    submitBtn: {
      minWidth: "100%",
      maxWidth: "100%",
      height: 40,
      borderRadius: 0,
      outline: "1px solid #000",
      "& > :first-child": theme.typography.body2,
    },
    checkbox: {
      height: 20,
      "& > :last-child": theme.typography.body2,
      "& .Mui-checked": {
        color: "#1976D2",
      },
    },
    marginBottom4: {
      marginBottom: 4,
    },
  };
});

const Form = () => {
  const classes = useStyles();
  const [newUser, setNewUser] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const usernameInputRef = useRef<HTMLInputElement>(null);

  const formSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    const email = emailInputRef.current?.value;
    const password = passwordInputRef.current?.value;
    const username = usernameInputRef.current?.value;
    if (email && password) {
      emailInputRef.current.value = "";
      passwordInputRef.current.value = "";
    }
    if (username) {
      usernameInputRef.current.value = "";
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={`${styles.innerContainer} ${styles.displayFlexColumn}`}>
        <Typography variant="body1" className={classes.formTypeHeading}>
          {newUser ? "create account" : "sign in"}
        </Typography>

        <form className={styles.form} onSubmit={formSubmitHandler}>
          <FormControl
            fullWidth
            variant="standard"
            className={`${classes.input} ${classes.marginBottom4}`}
            required
          >
            <InputLabel className={classes.inputLabel} htmlFor="email">
              {!newUser ? "Username/Email" : "Email"}
            </InputLabel>
            <Input
              id="email"
              className={classes.input}
              inputRef={emailInputRef}
            />
          </FormControl>

          {newUser && (
            <FormControl
              fullWidth
              variant="standard"
              className={`${classes.input} ${classes.marginBottom4}`}
              required
            >
              <InputLabel className={classes.inputLabel} htmlFor="username">
                Username
              </InputLabel>
              <Input
                id="username"
                className={classes.input}
                inputRef={usernameInputRef}
              />
            </FormControl>
          )}

          <FormControl
            fullWidth
            variant="standard"
            className={classes.input}
            required
          >
            <InputLabel className={classes.inputLabel} htmlFor="password">
              Password
            </InputLabel>
            <Input
              id="password"
              className={classes.input}
              type="password"
              inputRef={passwordInputRef}
            />
          </FormControl>

          <Link
            className={`${classes.link} ${classes.forgetPasswordLink}`}
            color="textPrimary"
          >
            Forgot Password?
          </Link>

          <div className={styles.checkBoxContainer}>
            <FormControlLabel
              className={classes.checkbox}
              control={<Checkbox />}
              label="Remember Me"
            />
          </div>

          <Button
            type="submit"
            className={classes.submitBtn}
            variant="contained"
            color="secondary"
            disableElevation
          >
            {newUser ? "sign up" : "sign in"}
          </Button>
        </form>

        {!newUser ? (
          <Link className={classes.link} onClick={() => setNewUser(!newUser)}>
            Don`t have an account? <b>Create Account</b>
          </Link>
        ) : (
          <Link className={classes.link} onClick={() => setNewUser(!newUser)}>
            Already have an account? <b>Sign In</b>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Form;
