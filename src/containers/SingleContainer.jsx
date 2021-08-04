import React, { useState, useEffect } from "react";
import axios from "axios";
import SingleComponent from "../components/SingleComponent";
import { useParams } from "react-router-dom";
function SingleContainer() {
  const { id } = useParams();
  const [data, setData] = useState([]);

  const options = {
    method: "GET",
    url: "https://api-football-v1.p.rapidapi.com/v2/fixtures/id/" + id,
    headers: {
      "x-rapidapi-key": "734ffd471bmsh68e9a4996bead63p1a0350jsnacd10ba8bc28",
      "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
    },
  };

  useEffect(() => {
    let mounted = true;
    let timeOut = 20000;
    if (data.length === 0) timeOut = 1;
    if (mounted) {
      setTimeout(() => {
        axios
          .request(options)
          .then(function (response) {
            setData(response.data.api.fixtures);
          })
          .catch(function (error) {
            console.error(error);
          });
      }, timeOut);
    }
    return () => (mounted = false);
  }, [data]);

  return <SingleComponent data={data} />;
}

export default SingleContainer;
