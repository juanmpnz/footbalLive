import React from "react";
import { useHistory } from "react-router-dom";
import {
  FaRegClock,
  FaFutbol,
  FaExchangeAlt,
  FaStop,
  FaTrophy,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Loader from "react-loader-spinner";

function SingleComponent({ data }) {
  const history = useHistory();
  let bg = "";
  let bg1 = "";

  return (
    <>
      {data.length ? (
        <>
          {data[0].statistics !== null ? (
            <div style={{ display: "none" }}>
              <>
                {data[0].statistics["Ball Possession"].home >
                data[0].statistics["Ball Possession"].away
                  ? (bg = "green")
                  : (bg = "red")}
                {data[0].statistics["Ball Possession"].home <
                data[0].statistics["Ball Possession"].away
                  ? (bg1 = "green")
                  : (bg1 = "red")}
              </>
            </div>
          ) : null}

          <div className="single-container">
            <div className="teams-single">
              <div className="local">
                <img src={data[0].homeTeam.logo} alt="Local" />
              </div>
              <div className="results">
                {data[0].goalsHomeTeam} - {data[0].goalsAwayTeam}
                <p>{data[0].elapsed + "'"}</p>
              </div>

              <div className="away">
                <img src={data[0].awayTeam.logo} alt="Local" />
              </div>
            </div>
            <div className="status">{data[0].status}</div>
            <div className="eventos">
              <br />
              {data[0] !== null ? (
                <>
                  <div
                    className="type"
                    style={{
                      margin: "0 auto",
                      textAlign: "center",
                    }}
                  >
                    <p>{data[0].venue}</p>
                  </div>
                  <div
                    className="type"
                    style={{
                      margin: "0 auto",
                      textAlign: "center",
                    }}
                  >
                    <p>
                      <FaTrophy
                        color="#4139aa"
                        style={{ margin: "0vh 1vh 0vh 0vh" }}
                      />
                      {data[0].league.name}
                    </p>

                    <p>
                      <FaMapMarkerAlt
                        color="#4139aa"
                        style={{ margin: "0vh vh 0vh 1vh" }}
                      />
                      {data[0].league.country}
                    </p>
                  </div>

                  <div
                    className="teams-single"
                    style={{ border: "none", margin: "0 auto" }}
                  >
                    <div className="local">
                      <img
                        src={data[0].league.logo}
                        alt="Local"
                        style={{ width: 40, padding: 20 }}
                      />
                    </div>
                    <div className="away">
                      <img
                        src={data[0].league.flag}
                        alt="Local"
                        style={{ width: 40, padding: 20 }}
                      />
                    </div>
                  </div>
                  {data[0].statistics !== null ? (
                    <>
                      <div>Possession:</div>
                      <div className="progress-container">
                        <div
                          className="progress"
                          style={{
                            width: `${data[0].statistics["Ball Possession"].home}`,
                            background: bg,
                          }}
                        >
                          {data[0].statistics["Ball Possession"].home}
                        </div>
                        <div
                          className="progress"
                          style={{
                            width: `${data[0].statistics["Ball Possession"].away}`,
                            background: bg1,
                          }}
                        >
                          {data[0].statistics["Ball Possession"].away}
                        </div>{" "}
                      </div>
                    </>
                  ) : null}

                  <br />

                  {data[0].statistics !== null ? (
                    <>
                      <div>Fouls:</div>
                      <div className="progress-container">
                        <div
                          className="progress"
                          style={{
                            width: `50%`,
                            color: "black",
                          }}
                        >
                          {data[0].statistics["Fouls"].home}
                        </div>
                        <div
                          className="progress"
                          style={{
                            width: `50%`,
                            color: "black",
                          }}
                        >
                          {data[0].statistics["Fouls"].away}
                        </div>
                      </div>
                    </>
                  ) : null}
                </>
              ) : (
                "No events"
              )}
            </div>
            <div className="eventos">
              <h3>Events:</h3>
              {data[0].events !== null
                ? data[0].events.map((e, i) => {
                    return (
                      <div className="type" key={i}>
                        <FaRegClock
                          color="#4139aa"
                          style={{ margin: "0vh 1vh 0vh 0vh" }}
                        />{" "}
                        {e.elapsed}`
                        {e.type === "Goal" ? (
                          <FaFutbol style={{ margin: "0vh 1vh 0vh 1vh" }} />
                        ) : null}
                        {e.type === "subst" ? (
                          <FaExchangeAlt
                            style={{ margin: "0vh 1vh 0vh 1vh" }}
                          />
                        ) : null}
                        {e.type === "Card" ? (
                          <FaStop
                            color={
                              e.detail === "Yellow Card" ? "yellow" : "red"
                            }
                            style={{ margin: "0vh 1vh 0vh 1vh" }}
                          />
                        ) : null}
                        <p>{e.teamName}</p>
                        <p>- {e.player}</p>
                      </div>
                    );
                  })
                : "No events"}
            </div>
          </div>
          <div className="btn-back">
            <button onClick={() => history.push("/")}>Back</button>
          </div>
        </>
      ) : (
        <>
          <br />
          <div className="loader">
            <Loader
              type="Oval"
              color="#fff"
              height={100}
              width={100}
              timeout={2000} //3 secs
            />
          </div>
        </>
      )}
    </>
  );
}

export default SingleComponent;
