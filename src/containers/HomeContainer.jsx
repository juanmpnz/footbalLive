import React, { useState, useEffect } from "react";
import axios from "axios";
import Home from "../components/Home";
import { useHistory } from "react-router-dom";

function HomeContainer({ user }) {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);

  const options = {
    method: "GET",
    url: "https://api-football-v1.p.rapidapi.com/v2/fixtures/live",
    headers: {
      "x-rapidapi-key": "734ffd471bmsh68e9a4996bead63p1a0350jsnacd10ba8bc28",
      "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
    },
  };

  useEffect(() => {
    let mounted = true;
    let timeOut = 100000;
    if (data.length === 0) timeOut = 1;
    if (mounted) {
      setTimeout(() => {
        axios
          .request(options)
          .then(function (response) {
            setData(response.data);
          })
          .catch(function (error) {
            console.error(error);
          });
      }, timeOut);
    }
    return () => (mounted = false);
  }, [data]);

  const viewMore = (id) => {
    if (user !== null) {
      return history.push("/details/" + id);
    } else {
      setModal(true);
    }
  };

  return (
    <Home
      data={data.api}
      viewMore={viewMore}
      openModal={modal}
      setModal={setModal}
    />
  );
}

export default HomeContainer;
