import React, { FormEvent, useEffect, useRef, useState } from "react";
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
      [theme.breakpoints.down(601.1)]: {
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
      display: "inline-block",
      cursor: "pointer",
      ...theme.typography.subtitle1,
    },
    forgetPasswordLink: {
      textAlign: "end",
      marginBottom: 12,
      marginLeft: "auto",
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
    underline: {
      textDecoration: "underline",
    },
  };
});

const Form = () => {
  const classes = useStyles();
  const [newUser, setNewUser] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const usernameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    clearInputs();
  }, [newUser]);

  const clearInputs = () => {
    const email = emailInputRef.current?.value;
    const password = passwordInputRef.current?.value;
    const username = usernameInputRef.current?.value;

    setIsChecked(false);

    if (email) {
      emailInputRef.current.value = "";
    }
    if (password) {
      passwordInputRef.current.value = "";
    }
    if (username) {
      usernameInputRef.current.value = "";
    }
  };

  const formSubmitHandler = (e: FormEvent) => {
    e.preventDefault();

    clearInputs();
  };

  const checkboxChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  return (
    <div className={styles.formContainer}>
      <div className={`${styles.innerContainer} ${styles.displayFlexColumn}`}>
        <Typography variant="body1" className={classes.formTypeHeading}>
          {newUser ? "create account" : "sign in"}
        </Typography>

        <form
          className={`${styles.form} ${!newUser ? styles.formMargin : ""}`}
          onSubmit={formSubmitHandler}
        >
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
              type={!newUser ? "text" : "email"}
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

          {!newUser && (
            <Link
              className={`${classes.link} ${classes.forgetPasswordLink}`}
              color="textPrimary"
            >
              Forgot Password?
            </Link>
          )}

          <div
            className={styles.checkBoxContainer}
            style={{ marginTop: newUser ? 38 : "" }}
          >
            <FormControlLabel
              className={classes.checkbox}
              control={
                <Checkbox
                  required={newUser}
                  onChange={checkboxChangeHandler}
                  checked={isChecked}
                />
              }
              label={
                !newUser ? (
                  "Remember Me"
                ) : (
                  <React.Fragment>
                    I agree to all{" "}
                    <Link className={classes.underline}>
                      Terms & Conditions
                    </Link>
                  </React.Fragment>
                )
              }
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

        <Link className={classes.link} onClick={() => setNewUser(!newUser)}>
          {!newUser ? (
            <React.Fragment>
              Don`t have an account?{" "}
              <span className={styles.bold600}>Create Account</span>
            </React.Fragment>
          ) : (
            <React.Fragment>
              Already have an account?{" "}
              <span className={styles.bold600}>Sign In</span>
            </React.Fragment>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Form;
