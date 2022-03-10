import { useState } from "react";

export const ContentContext = React.createContext();

const Store = ({ children }) => {
  const [content, setContent] = useState();
};
