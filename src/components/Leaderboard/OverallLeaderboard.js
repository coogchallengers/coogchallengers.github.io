import React, { useState, useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './OverallLeaderboard.css';

const OverallLeaderboard = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/data/leaderboard.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Filter out students with no name or missing Total Points.
        const filteredData = data.filter(
          (student) => student.Student && student["Total Points"] !== null
        );

        // Map the data to a simpler structure and parse Total Points as a number.
        const studentsData = filteredData.map((student) => ({
          name: student.Student,
          totalPoints: parseInt(student["Total Points"], 10) || 0,
        }));

        // Sort the students in descending order based on total points.
        studentsData.sort((a, b) => b.totalPoints - a.totalPoints);

        setStudents(studentsData);
      })
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <div className="overall-leaderboard error">{error}</div>;
  }

  return (
    <div className="overall-leaderboard">
      <h1>Overall Leaderboard</h1>
      {students.length > 0 ? (
        <TransitionGroup component="ul" className="leaderboard-list">
          {students.map((student, index) => (
            <CSSTransition key={index} timeout={300} classNames="fade">
              <li className="leaderboard-entry">
                <span className="entry-rank">{index + 1}.</span>
                <span className="entry-name">{student.name}</span>
                <span className="entry-points">Total Points: {student.totalPoints}</span>
              </li>
            </CSSTransition>
          ))}
        </TransitionGroup>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default OverallLeaderboard;
