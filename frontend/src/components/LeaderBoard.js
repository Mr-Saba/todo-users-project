import React, { useState, useEffect } from 'react';
import { getLeaderBoard } from '../api/api';

const LeaderBoard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchLeaderBoard = async () => {
      try {
        const response = await getLeaderBoard();
        // response.data.data 
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };

    fetchLeaderBoard();
  }, []);

  return (
    <div>
      <h2>LeaderBoard</h2>
      <div>
        {users.map(user => (
          <div
            key={user._id}
            style={{ display: 'flex', justifyContent: 'space-between', width: '300px' }}
          >
            <span>{user.username}</span>
            <span>{user.completedTasks}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaderBoard;
