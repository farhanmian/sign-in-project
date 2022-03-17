import React from "react";
import "./App.css";
import About from "./components/app/About/About";
import Form from "./components/app/Form/Form";
import Home from "./components/app/Home/Home";
import Loading from "./components/partials/Loading/Loading";
import { useAppContext } from "./store/context/appContext";

function App() {
  const ctx = useAppContext();
  if (!ctx) return null;
  const { activeUser, isInitialLoading } = ctx;

  return (
    <section className="App">
      {!isInitialLoading && !activeUser ? (
        <React.Fragment>
          <About />
          <Form />
        </React.Fragment>
      ) : (
        <Home></Home>
      )}

      {isInitialLoading && (
        <div className="loadingContainer">
          <Loading />
        </div>
      )}
    </section>
  );
}

export default App;
