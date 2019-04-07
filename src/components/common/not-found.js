import React from "react";
import Blankslate from "./blankslate";

const NotFound = () => (
  <main className="App-main">
    <div className="container-lg py-4">
      <Blankslate>
        <h3>Not found</h3>
        <p>The page you are looking for could not be found.</p>
      </Blankslate>
    </div>
  </main>
);

export default NotFound;
