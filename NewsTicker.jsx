import React from "react";

function NewsTicker({ narration }) {
  return (
    <div>
      <h2>Market News</h2>
      <p>{narration}</p>
    </div>
  );
}

export default NewsTicker;
