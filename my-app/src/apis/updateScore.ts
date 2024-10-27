import axios from 'axios';

interface UpdateScorePayload {
    userId: string;
    score: number;
}

export const updateScore = async (payload: UpdateScorePayload) => {
    const response = await axios.post('http://localhost:3001/leaderboards/update', payload);
    return response.data;
};
