import {useState} from 'react';
import {updateScore} from "@/apis";

const useUpdateScore = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const updateUserScore = async (userId: string, score: number) => {
        setLoading(true);
        setError(null);
        try {
            return await updateScore({userId, score});
        } catch (err) {
            setError('Failed to update score');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return { updateUserScore, loading, error };
};

export default useUpdateScore;
