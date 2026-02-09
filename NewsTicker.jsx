// client/src/NewsTicker.jsx
import React from "react";

function NewsTicker({ narration }) {
  if (!narration) return <div>Waiting for market data...</div>;

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", marginTop: "10px" }}>
      <h2>Market News & Analysis</h2>
      {/* Using pre-wrap to respect line breaks from the AI */}
      <p style={{ whiteSpace: "pre-wrap" }}>{narration}</p>
    </div>
  );
}

export default NewsTicker;
