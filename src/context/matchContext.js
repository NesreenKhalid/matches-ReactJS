import React, { createContext , useState } from "react";

export const MatchContext = createContext();

const MatchContextProvider = (props) => {
  const [matches, setMatches] = useState([]);
  const [selectedDate, setSelectedDate] = useState('')
  
  return (
    <MatchContext.Provider value={{ matches, setMatches, selectedDate, setSelectedDate}}>
      {props.children}
    </MatchContext.Provider>
  );
};

export default MatchContextProvider;