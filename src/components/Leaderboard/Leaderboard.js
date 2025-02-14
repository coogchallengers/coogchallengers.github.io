import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import './Leaderboard.css';

const Leaderboard = () => {
  const { category } = useParams();
  const [activeTab, setActiveTab] = useState('individual');
  const [leaderboardData, setLeaderboardData] = useState({ individual: [], team: [] });
  const [expandedRow, setExpandedRow] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('/data/leaderboard.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        const individualLeaderboard = data
          .filter(student => {
            if (!student.Student) return false;
            if (category === 'data-science') {
              return student["Data Science Ind Total Points"] !== null;
            } else {
              return student["Data Structures Ind Total Points"] !== null;
            }
          })
          .map(student => {
            const totalPoints = parseInt(
              category === 'data-science'
                ? student["Data Science Ind Total Points"]
                : student["Data Structures Ind Total Points"]
            ) || 0;

            //console.log(student.Student, totalPoints);

            const correct = parseInt(
              category === 'data-science'
                ? (student["Data Science Individual Comp Correct Answers (500)"] || "0")
                : (student["Data Structures Individual Comp Correct Answers (500)"] || "0")
            );
            const incorrect = parseInt(
              category === 'data-science'
                ? (student["Data Science Individual Comp Incorrect Answers (250)"] || "0")
                : (student["Data Structures Individual Comp Incorrect Answers (250)"] || "0")
            );

            return {
              name: student.Student,
              totalPoints,
              details: student,
              individualDetails: {
                correct,
                incorrect,
                workshops: student["Workshops/ Socials (300)"],
                meetings: student["General Meetings (500)"],
                competitions: student["Competitions (1000)"],
                workshopQuestions: student["Workshop Questions (100)"],
                workshopAnswers: student["Workshop Answers (200)"]
              }
            };
          })
          .sort((a, b) => b.totalPoints - a.totalPoints);

        const teamMembers = data.filter(student => {
          if (!student.Student) return false;
          if (category === 'data-science') {
            return (
              student["Data Science Team Comp Correct Answers (500)"] !== null ||
              student["Data Science Team Comp Incorrect Answers (250)"] !== null
            );
          } else {
            return (
              student["Data Structures Team Comp Correct Answers (500)"] !== null ||
              student["Data Structures Team Comp Incorrect Answers (250)"] !== null
            );
          }
        });

        let teamLeaderboard = [];
        if (teamMembers.length > 0) {
          const names = teamMembers.map(member => member.Student).join(', ');
          const teamTotalPoints = parseInt(
            category === 'data-science'
              ? teamMembers[0]["Data Science Team Total Points"]
              : teamMembers[0]["Data Structures Team Total Points"]
          ) || 0;
          teamLeaderboard = [{
            names,
            totalPoints: teamTotalPoints,
            members: teamMembers
          }];
        }

        setLeaderboardData({
          individual: individualLeaderboard,
          team: teamLeaderboard
        });
        setLoading(false);
      })
      .catch(err => {
        setError(err.message)
        setLoading(false);
  });
  }, [category]);

  const toggleExpand = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const getCategoryTitle = (category) => {
    if (category === "data-science") return "Data Science Leaderboard";
    if (category === "data-structures") return "Data Structures Leaderboard";
    return "Leaderboard";
  };  

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    return <div className="leaderboard-container error">{error}</div>;
  }

  return (
    <div className="leaderboard-container">
      <h1>{getCategoryTitle(category)}</h1>

      <div className="tabs">
        {leaderboardData.individual.length > 0 && (
          <button
            className={activeTab === 'individual' ? 'active' : ''}
            onClick={() => setActiveTab('individual')}
          >
            Individual
          </button>
        )}
        {leaderboardData.team.length > 0 && (
          <button
            className={activeTab === 'team' ? 'active' : ''}
            onClick={() => setActiveTab('team')}
          >
            Team
          </button>
        )}
      </div>

      <div className="leaderboard-list">
        {leaderboardData[activeTab].length > 0 ? (
          leaderboardData[activeTab]
            .filter(entry => entry.totalPoints > 0)
            .map((entry, index) => (
              <div key={index} className="leaderboard-entry">
                <div className="leaderboard-row" onClick={() => toggleExpand(index)}>
                  {activeTab === 'individual' ? (
                    <>
                      <span className="entry-rank">{index + 1}.</span>
                      <span className="entry-name">{entry.name}</span>
                      <span className="entry-points">Total Points: {entry.totalPoints}</span>
                    </>
                  ) : (
                    <>
                      <span className="entry-rank">{index + 1}.</span>
                      <span className="entry-name">{entry.names}</span>
                      <span className="entry-points">Team Points: {entry.totalPoints}</span>
                    </>
                  )}
                </div>
                <CSSTransition
                  in={expandedRow === index}
                  timeout={300}
                  classNames="expand"
                  unmountOnExit
                >
                  <div className="expanded-info">
                    {activeTab === "team" ? (
                      <div className="team-info">
                        {entry.members.length > 0 && (
                          <>
                            <p className="member-detail">
                              <strong>Correct Answers (Team):</strong> {parseInt(
                                category === "data-science"
                                  ? (entry.members[0]["Data Science Team Comp Correct Answers (500)"] || "0")
                                  : (entry.members[0]["Data Structures Team Comp Correct Answers (500)"] || "0")
                              )}
                            </p>
                            <p className="member-detail">
                              <strong>Incorrect Answers (Team):</strong> {parseInt(
                                category === "data-science"
                                  ? (entry.members[0]["Data Science Team Comp Incorrect Answers (250)"] || "0")
                                  : (entry.members[0]["Data Structures Team Comp Incorrect Answers (250)"] || "0")
                              )}
                            </p>
                          </>
                        )}
                      </div>
                    ) : (
                      <div className="individual-info">
                        <p className="info-detail">
                          <strong>Correct Answers (Individual):</strong> {entry.individualDetails.correct}
                        </p>
                        <p className="info-detail">
                          <strong>Incorrect Answers (Individual):</strong> {entry.individualDetails.incorrect}
                        </p>
                      </div>
                    )}
                  </div>

                </CSSTransition>
              </div>
            ))
        ) : (
          <p>No {activeTab} competitions available for this category.</p>
        )}
      </div>

    </div>
  );
};

export default Leaderboard;
