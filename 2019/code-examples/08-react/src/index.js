import React, { useState } from "react";
import { render } from "react-dom";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(c => ++c)}>Clicked {count} times</button>
  );
}

render(<Counter />, document.body);
