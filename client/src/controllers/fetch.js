import axios from "axios";

export default (url) => {
  let data;
  axios
    .get(url)
    .then((response) => response.data)
    .then((data) => (data = data))
    .catch((err) => console.log(err));
};
