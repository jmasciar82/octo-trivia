import { useState, useEffect, useCallback } from 'react';

export const usePollResults = (endpoint) => {
    const [pollOptions, setPollOptions] = useState([]);

    const refreshPollOptions = useCallback(async () => {
        try {
            const response = await fetch(endpoint);
            const data = await response.json();
            setPollOptions(data);
        } catch (error) {
            console.error("Error fetching poll options:", error);
        }
    }, [endpoint]);

    useEffect(() => {
        refreshPollOptions();
        const interval = setInterval(refreshPollOptions, 1000);
        return () => clearInterval(interval);
    }, [refreshPollOptions]);

    return pollOptions;
};
