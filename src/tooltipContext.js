import React, { useState, createContext } from "react";

const tooltipContext = createContext();

function useTooltip() {
  const [tooltip, setTooltip] = useState(false);

  return { tooltip, setTooltip };
}

export { useTooltip, tooltipContext };
