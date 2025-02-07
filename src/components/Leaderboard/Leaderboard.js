import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import './Leaderboard.css';

const Leaderboard = () => {
  // "category" should be either "data-science" or "data-structures"
  const { category } = useParams();
  const [activeTab, setActiveTab] = useState('individual');
  const [leaderboardData, setLeaderboardData] = useState({ individual: [], team: [] });
  const [expandedRow, setExpandedRow] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/data/leaderboard.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Build the Individual Leaderboard
        const individualLeaderboard = data
          .filter(student => {
            // Only include students with a valid name and non-null individual total points.
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

            // Individual breakdown (if available)
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

        // Build the Team Leaderboard
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
          // Create a single team row.
          // Instead of showing each member's points, we show the team names (comma‑separated)
          // along with a single team score (from the first member's team total points).
          const names = teamMembers.map(member => member.Student).join(', ');
          const teamTotalPoints = parseInt(
            category === 'data-science'
              ? teamMembers[0]["Data Science Team Total Points"]
              : teamMembers[0]["Data Structures Team Total Points"]
          ) || 0;
          teamLeaderboard = [{
            names,
            totalPoints: teamTotalPoints,
            members: teamMembers // for the expanded view if needed
          }];
        }

        setLeaderboardData({
          individual: individualLeaderboard,
          team: teamLeaderboard
        });
      })
      .catch(err => setError(err.message));
  }, [category]);

  const toggleExpand = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  if (error) {
    return <div className="leaderboard-container error">{error}</div>;
  }

  return (
    <div className="leaderboard-container">
      <h1>{category.replace('-', ' ')} Leaderboard</h1>

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
          leaderboardData[activeTab].map((entry, index) => (
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
                  {activeTab === 'team' ? (
                    entry.members.map((member, idx) => {
                      const correct = parseInt(
                        category === 'data-science'
                          ? (member["Data Science Team Comp Correct Answers (500)"] || "0")
                          : (member["Data Structures Team Comp Correct Answers (500)"] || "0")
                      );
                      const incorrect = parseInt(
                        category === 'data-science'
                          ? (member["Data Science Team Comp Incorrect Answers (250)"] || "0")
                          : (member["Data Structures Team Comp Incorrect Answers (250)"] || "0")
                      );
                      return (
                        <div key={idx} className="team-member-info">
                          <p className="member-name"><strong>{member.Student}</strong></p>
                          <p className="member-detail">
                            <strong>Correct Answers (Team):</strong> {correct}
                          </p>
                          <p className="member-detail">
                            <strong>Incorrect Answers (Team):</strong> {incorrect}
                          </p>
                          <p className="member-detail">
                            <strong>Workshops/Socials:</strong> {member["Workshops/ Socials (300)"]}
                          </p>
                          <p className="member-detail">
                            <strong>General Meetings:</strong> {member["General Meetings (500)"]}
                          </p>
                          <p className="member-detail">
                            <strong>Competitions:</strong> {member["Competitions (1000)"]}
                          </p>
                        </div>
                      );
                    })
                  ) : (
                    <div className="individual-info">
                      <p className="info-detail">
                        <strong>Workshops/Socials:</strong> {entry.individualDetails.workshops}
                      </p>
                      <p className="info-detail">
                        <strong>General Meetings:</strong> {entry.individualDetails.meetings}
                      </p>
                      <p className="info-detail">
                        <strong>Competitions:</strong> {entry.individualDetails.competitions}
                      </p>
                      <p className="info-detail">
                        <strong>Correct Answers (Individual):</strong> {entry.individualDetails.correct}
                      </p>
                      <p className="info-detail">
                        <strong>Incorrect Answers (Individual):</strong> {entry.individualDetails.incorrect}
                      </p>
                      <p className="info-detail">
                        <strong>Workshop Questions:</strong> {entry.individualDetails.workshopQuestions}
                      </p>
                      <p className="info-detail">
                        <strong>Workshop Answers:</strong> {entry.individualDetails.workshopAnswers}
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
