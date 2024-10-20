import { useEffect } from 'react';

const useVisitorTracking = () => {
    useEffect(() => {
        // Function to track the visitor
        const trackVisitor = async () => {
            try {
                await fetch('http://swember.in/track_visitor.php', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
            } catch (error) {
                console.error('Error tracking visitor:', error);
            }
        };

        trackVisitor();

        // Function to track session duration
        const sessionStart = Date.now();
        const handleBeforeUnload = async () => {
            const sessionDuration = Math.floor((Date.now() - sessionStart) / 1000); // duration in seconds
            await fetch('http://swember.in/track_session_duration.php', {
                method: 'POST',
                body: JSON.stringify({ session_duration: sessionDuration }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);
};

export default useVisitorTracking;
