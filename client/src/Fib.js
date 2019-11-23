import React, { useState, useEffect } from "react";
import axios from "axios";

const Fib = () => {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [inputVal, setInputVal] = useState("");

  useEffect(() => {
    async function fetchValues() {
      const values = await axios.get("/api/values/current");
      setValues(values.data);
    }

    async function fetchIndexes() {
      const indexes = await axios.get("/api/values/all");
      setSeenIndexes(indexes.data);
    }

    fetchValues();
    fetchIndexes();
  }, []);

  function renderValues() {
    const entries = [];

    for (let key in values) {
      entries.push(
        <div key={key}>
          {key}: {values[key]}
        </div>
      );
    }

    return entries;
  }

  function handleSubmit(event) {
    event.preventDefault();
    axios.post("/api/values", {
      index: inputVal
    });

    setInputVal("");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your index</label>
        <input
          value={inputVal}
          onChange={evt => setInputVal(evt.target.value)}
        />
        <button>Submit</button>
      </form>

      <h3>Indexes:</h3>
      {seenIndexes.map(({ number }) => number).join(",")}

      <h3>Calculated values</h3>
      {renderValues()}
    </div>
  );
};

export default Fib;
