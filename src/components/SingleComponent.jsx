import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { FaRegClock, FaFutbol, FaExchangeAlt, FaStop, FaTrophy, FaMapMarkerAlt } from "react-icons/fa";
import Loader from "react-loader-spinner";
import { Tabs, Tab } from "react-bootstrap/";

function SingleComponent({ data }) {
  const history = useHistory();
  const [key, setKey] = useState("home");
  const [lineupLocal, setLineupLocal] = useState(null);
  const [lineupAway, setLineupAway] = useState(null);
  let bg = "";
  let bg1 = "";

  useEffect(() => {
    var homeTeamName = "";
    var awayTeamName = "";

    if (data.length && data[0].lineups !== null) {
      homeTeamName = data[0].homeTeam.team_name;
      awayTeamName = data[0].awayTeam.team_name;
      setLineupLocal(data[0].lineups[homeTeamName]);
      setLineupAway(data[0].lineups[awayTeamName]);
    }
    /*  if (lineupAway && lineupLocal === null) {
      setLineupLocal(data[0].lineups[homeTeamName]);
      setLineupAway(data[0].lineups[awayTeamName]);
    } */
    //console.log(lineupLocal.startXI);
  }, [data]);

  return (
    <>
      {data.length ? (
        <>
          <div className="teams-single" style={{ border: "none", margin: "0 auto", boxSizing: "contentBox" }}>
            <div>
              <img src={data[0].league.logo} alt="Local" style={{ width: 40, padding: 20 }} />
            </div>
            <div>
              <img src={data[0].league.flag} alt="away" style={{ width: 40, padding: 20 }} />
            </div>
          </div>
          {data[0].statistics !== null ? (
            <div style={{ display: "none" }}>
              <>
                {data[0].statistics["Ball Possession"].home > data[0].statistics["Ball Possession"].away
                  ? (bg = "green")
                  : (bg = "red")}
                {data[0].statistics["Ball Possession"].home < data[0].statistics["Ball Possession"].away
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
            <div className="eventos-top">
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
                      <FaTrophy color="#4139aa" style={{ margin: "0vh 1vh 0vh 0vh" }} />
                      {data[0].league.name}
                    </p>

                    <p>
                      <FaMapMarkerAlt color="#4139aa" style={{ margin: "0vh vh 0vh 1vh" }} />
                      {data[0].league.country}
                    </p>
                  </div>

                  {data[0].statistics !== null ? (
                    <>
                      <div>Possession:</div>
                      <div className="progresse-container">
                        <div
                          className="progresse"
                          style={{
                            width: `${data[0].statistics["Ball Possession"].home}`,
                            background: bg,
                          }}
                        >
                          {data[0].statistics["Ball Possession"].home}
                        </div>
                        <div
                          className="progresse"
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
                      <div className="progresse-container">
                        <div
                          className="progresse"
                          style={{
                            width: `50%`,
                            color: "black",
                          }}
                        >
                          {data[0].statistics["Fouls"].home}
                        </div>
                        <div
                          className="progresse"
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
              <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k) => setKey(k)}>
                <Tab eventKey="home" title="Events">
                  <div className="test-flex">
                    {data[0].events !== null
                      ? data[0].events.map((e, i) => {
                          return (
                            <div className="type" key={i}>
                              <FaRegClock color="#4139aa" style={{ margin: "0vh 1vh 0vh 0vh" }} /> {e.elapsed}`
                              {e.type === "Goal" ? <FaFutbol style={{ margin: "0vh 1vh 0vh 1vh" }} /> : null}
                              {e.type === "subst" ? <FaExchangeAlt style={{ margin: "0vh 1vh 0vh 1vh" }} /> : null}
                              {e.type === "Card" ? (
                                <FaStop
                                  color={e.detail === "Yellow Card" ? "yellow" : "red"}
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
                </Tab>
                <Tab eventKey="lineup" title="Line-up">
                  {lineupAway || lineupLocal !== null ? (
                    <div className="lineupContainer">
                      <div className="lineupData">
                        <h3>Local</h3>
                        {lineupLocal.startXI.map((e) => {
                          return (
                            <div className="type  ">
                              <p>{e.number}</p>
                              <p>{e.player}</p>
                              <p>{e.pos}</p>
                            </div>
                          );
                        })}
                      </div>
                      <div className="lineupData">
                        <h3>Away</h3>
                        {lineupAway.startXI.map((e) => {
                          return (
                            <div className="type">
                              <p>{e.number}</p>
                              <p>{e.player}</p>
                              <p>{e.pos}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    "No lineup available"
                  )}
                </Tab>
              </Tabs>
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
