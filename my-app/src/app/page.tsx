'use client'
import React, { useEffect, useState } from 'react';
import useSocket from '../hooks/useSocket';
import useUpdateScore from '../hooks/useUpdateScore';
import {getIdFromLocalStorage} from "@/utils";

interface LeaderboardEntry {
    userId: string;
    score: number;
}

const Leaderboard: React.FC = () => {
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [userId, setUserId] = useState(getIdFromLocalStorage());
    const [score, setScore] = useState(0);

    const { on, off } = useSocket('http://localhost:3001');
    const { updateUserScore, loading, error } = useUpdateScore();

    useEffect(() => {
        handleUpdateScore();
    }, []);

    useEffect(() => {
        const handleUpdateLeaderboard = (data: LeaderboardEntry[]) => {
            setLeaderboard(data);
        };

        on('leaderboard', handleUpdateLeaderboard);

        return () => {
            off('leaderboard');
        };
    }, [on, off]);

    const handleUpdateScore = async () => {
        await updateUserScore(userId, score);
        setScore(Math.random() * 100);
    };

    return (
        <div>
            <h1>Real-Time Leaderboard</h1>
            <h2>userID: {userId}</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {leaderboard.map((entry) => (
                    <li key={entry.userId}>
                        {entry.userId}: {entry.score}
                    </li>
                ))}
            </ul>
            <div>
                <input
                    type="text"
                    placeholder="User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Score"
                    value={score}
                    onChange={(e) => setScore(Number(e.target.value))}
                />
                <button onClick={handleUpdateScore} disabled={loading}>
                    {loading ? 'Updating...' : 'Update Score'}
                </button>
            </div>
        </div>
    );
};

export default Leaderboard;
