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
import { UserType } from "../../../store/types/types";
import { useAppContext } from "../../../store/context/appContext";
import Loading from "../../partials/Loading/Loading";
import { getDatabase, set, ref } from "firebase/database";
const db = getDatabase();

const useStyles = makeStyles((theme) => {
  return {
    formTypeHeading: {
      textTransform: "uppercase",
      marginBottom: 52,
      [theme.breakpoints.down(601.1)]: {
        marginBottom: 40,
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
      "& > :last-child": {
        ...theme.typography.body2,
        color: theme.palette.text.primary,
      },
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
    error: {
      width: "max-content",
      position: "absolute",
      top: 40,
      fontWeight: 600,
      [theme.breakpoints.down(600)]: {
        top: 35,
      },
    },
  };
});

const Form = () => {
  const ctx = useAppContext();
  if (!ctx) return null;
  const { setActiveUser, users, setUsers, isLoading, setIsLoading } = ctx;

  const classes = useStyles();

  const [newUser, setNewUser] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const usernameInputRef = useRef<HTMLInputElement>(null);

  /**
   * clearing inputs whenever newUser state changes
   */
  useEffect(() => {
    clearInputs();
    setEmailError(false);
    setError(false);
  }, [newUser]);

  /**
   * if user checked remember-me then filling user detail on another login
   */
  useEffect(() => {
    const id = localStorage.getItem("remember");
    const remember = id ? +id : null;

    if (!remember || users.length === 0) return;

    const details = users
      .filter((user: { id: number }) => user && user.id === remember)
      .pop();

    if (emailInputRef.current && passwordInputRef.current && details) {
      emailInputRef.current.value = details.email;
      passwordInputRef.current.value = details.password;
    }
  }, [users]);

  /**
   * clear input handler
   */
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

  /**
   * creating account and sending user data to firebase
   */
  const createAccount = (name: string, email: string, password: string) => {
    const id = (Math.random() * 1000).toFixed();
    const user = {
      name,
      email,
      password,
      id: +id,
    };

    const existingEmail =
      users.length > 0 &&
      users.filter((item: { email: string }) => item.email === email).pop();

    if (existingEmail) {
      setEmailError(true);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setUsers((prev) => (prev ? [...prev, user] : [user]));
      set(ref(db, "users/" + users.length), user);
      setActiveUser(user);
      setIsLoading(false);
    }, 2000);
  };

  /**
   * sign-in handler
   */
  const signIn = (email: string, password: string) => {
    const type = email.includes("@") ? "email" : "name";

    const matchedUser = users
      .filter((item: UserType) =>
        type === "email"
          ? item.email === email && item.password === password
          : item.name === email && item.password === password
      )
      .pop();

    if (!matchedUser) {
      setError(true);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setActiveUser(matchedUser);
      localStorage.setItem("userId", `${matchedUser.id}`);
      if (isChecked) {
        localStorage.setItem("remember", `${matchedUser.id}`);
      } else {
        localStorage.setItem("remember", "");
      }
    }, 2000);
  };

  /**
   * function that runs on form submit
   */
  const formSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    const email = `${emailInputRef.current?.value}`;
    const password = `${passwordInputRef.current?.value}`;
    const username = `${usernameInputRef.current?.value}`;

    setEmailError(false);
    setError(false);

    if (newUser) {
      createAccount(username, email, password);
    } else {
      signIn(email, password);
    }
    // clearInputs();
  };

  /**
   * a simple checkbox change handler
   */
  const checkboxChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  return (
    <div className={styles.formContainer}>
      <div className={`${styles.innerContainer} ${styles.displayFlexColumn}`}>
        <Typography variant="body1" className={classes.formTypeHeading}>
          {newUser ? "create account" : "sign in"}
        </Typography>

        {emailError && (
          <Typography className={classes.error} variant="body2" color="error">
            Email already in use!
          </Typography>
        )}

        {error && (
          <Typography className={classes.error} variant="body2" color="error">
            Invalid Credentials!
          </Typography>
        )}

        <form className={styles.form} onSubmit={formSubmitHandler}>
          <FormControl
            fullWidth
            variant="standard"
            className={`${classes.input} ${classes.marginBottom4}`}
            required
            disabled={isLoading}
            error={emailError || error}
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
              disabled={isLoading}
              error={error}
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
            disabled={isLoading}
            error={error}
          >
            <InputLabel className={classes.inputLabel} htmlFor="password">
              Password
            </InputLabel>
            <Input
              id="password"
              className={classes.input}
              type="password"
              inputRef={passwordInputRef}
              inputProps={{ minLength: 6 }}
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
              disabled={isLoading}
              control={
                <Checkbox
                  required={newUser}
                  onChange={checkboxChangeHandler}
                  checked={isChecked}
                  disabled={isLoading}
                />
              }
              label={
                !newUser ? (
                  "Remember Me"
                ) : (
                  <React.Fragment>
                    I agree to all{" "}
                    <Link color="textPrimary" className={classes.underline}>
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
            disabled={isLoading}
          >
            {!isLoading ? newUser ? "sign up" : "sign in" : <Loading />}
          </Button>
        </form>

        <Link
          className={classes.link}
          color="textSecondary"
          onClick={() => setNewUser(!newUser)}
        >
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
