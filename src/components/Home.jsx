import React from "react";
import moment from "moment";
import Loader from "react-loader-spinner";
import { Link } from "react-router-dom";

import Dates from "../assets/img/calendar.png";

import Modal from "react-modal";
import Diego from "../assets/img/diego.png";

function Home({ data, viewMore, openModal, setModal }) {
  let results = "";
  if (data !== undefined) {
    results = data.results;
  }

  return (
    <>
      <>
        <div className="title-and-user">
          <p style={{ display: "inline" }}>Live {results} matches</p>
        </div>

        {data !== undefined ? (
          data.fixtures.map((e, i) => {
            let date = moment().format(e.event_date).slice(0, 10);
            let hour = moment().format(e.event_date).slice(11, 19);
            let status = "";
            if (e.status === "Second Half") {
              status = "2T";
            } else {
              status = "1T";
            }
            return (
              <div key={i}>
                <div className="card">
                  <div className="logo-container">
                    <div className="logo1">
                      <img src={e.homeTeam.logo} alt="Local" />
                    </div>
                    <div className="logo1">
                      <img src={e.awayTeam.logo} alt="Away" />
                    </div>
                  </div>
                  <div className="logo-container">
                    <div className="logo1">
                      <p>{e.homeTeam.team_name}</p>
                    </div>
                    <div className="logo1">
                      <p>{e.awayTeam.team_name}</p>
                    </div>
                  </div>
                </div>
                <div className="card-bottom">
                  <div className="date">
                    <p>
                      <img src={Dates} alt="Calendar" />
                      {date} - {hour}
                    </p>
                  </div>
                  <div className="time">
                    {status}
                    <span>
                      <Loader
                        type="Puff"
                        color="red"
                        height={10}
                        width={10}
                        style={{ display: "inline", marginLeft: 5 }}
                      />
                    </span>
                    <div className="teams-more" onClick={() => viewMore(e.fixture_id)}>
                      ...
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="loader">
            <Loader type="Oval" color="#fff" height={100} width={100} timeout={2000} />
          </div>
        )}
        <Modal
          className="modal"
          isOpen={openModal}
          ariaHideApp={false}
          style={{ overlay: { backgroundColor: "rgba(0, 0, 0, 0.75)" } }}
        >
          <div className="header">
            <p>Error</p>
            <button className="btn" onClick={() => setModal(false)}>
              X
            </button>
          </div>

          <p>Sign up to accsess</p>
          <div className="btn">
            <Link style={{ textDecoration: "none" }} to="/signup">
              <p
                style={{
                  border: "1px solid gray",
                  padding: "1vh 3vh 1vh 3vh",
                  borderRadius: 10,
                }}
              >
                Login
              </p>
            </Link>
          </div>
        </Modal>

        {results === 0 ? (
          <div className="diego">
            <img src={Diego} alt="diego" className="diego-img"></img>
          </div>
        ) : null}
      </>
    </>
  );
}

export default Home;
