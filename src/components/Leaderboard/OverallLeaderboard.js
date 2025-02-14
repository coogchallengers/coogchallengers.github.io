import React, { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import "./Leaderboard.css";

const OverallLeaderboard = () => {
  const [students, setStudents] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/data/leaderboard.json")
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        const filteredData = data
          .filter((student) => student.Student && student["Total Points"] !== null)
          .map((student) => ({
            name: student.Student,
            totalPoints: parseInt(student["Total Points"], 10) || 0,
            details: student,
          }))
          .sort((a, b) => b.totalPoints - a.totalPoints);

        setStudents(filteredData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false);
  });
  }, []);

  const toggleExpand = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
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
      <h1>Overall Leaderboard</h1>

      <div className="leaderboard-list">
        {students.length > 0 ? (
          students.map((entry, index) => (
            <div key={index} className="leaderboard-entry">
              <div className="leaderboard-row" onClick={() => toggleExpand(index)}>
                <span className="entry-rank">{index + 1}.</span>
                <span className="entry-name">{entry.name}</span>
                <span className="entry-points">Total Points: {entry.totalPoints}</span>
              </div>

              <CSSTransition
                in={expandedRow === index}
                timeout={300}
                classNames="expand"
                unmountOnExit
              >
                <div className="expanded-info">
                  <p className="info-detail">
                    <strong>Workshops/Socials:</strong> {entry.details["Workshops/ Socials (300)"] || 0}
                  </p>
                  <p className="info-detail">
                    <strong>General Meetings:</strong> {entry.details["General Meetings (500)"] || 0}
                  </p>
                  <p className="info-detail">
                    <strong>Competitions:</strong> {entry.details["Competitions (1000)"] || 0}
                  </p>
                  <p className="info-detail">
                    <strong>Workshop Questions:</strong> {entry.details["Workshop Questions (100)"] || 0}
                  </p>
                  <p className="info-detail">
                    <strong>Workshop Answers:</strong> {entry.details["Workshop Answers (200)"] || 0}
                  </p>
                </div>
              </CSSTransition>
            </div>
          ))
        ) : (
          <p>No data available.</p>
        )}
      </div>
    </div>
  );
};

export default OverallLeaderboard;
