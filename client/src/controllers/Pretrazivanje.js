import { useEffect, useState } from "react";
import axios from "axios";

export default (query) => {
  const [content, setContent] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/query/:" + query)
      .then((res) => setContent(res.data));
  }, []);
  return content;
};
