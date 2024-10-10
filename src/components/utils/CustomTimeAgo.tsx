import React, { useState, useEffect } from 'react';

interface CustomTimeAgoProps {
  date: string | number | Date;
}

const CustomTimeAgo: React.FC<CustomTimeAgoProps> = ({ date }) => {
  const [timeAgo, setTimeAgo] = useState<string>('');

  useEffect(() => {
    const updateTimeAgo = () => {
      const now = new Date();
      const pastDate = new Date(date);
      const diffInSeconds = Math.floor((now.getTime() - pastDate.getTime()) / 1000);

      if (diffInSeconds < 60) {
        setTimeAgo(`${diffInSeconds} second${diffInSeconds !== 1 ? 's' : ''}`);
      } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        setTimeAgo(`${minutes} minute${minutes !== 1 ? 's' : ''}`);
      } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        setTimeAgo(`${hours} hour${hours !== 1 ? 's' : ''}`);
      } else {
        const monthsDiff = (now.getFullYear() - pastDate.getFullYear()) * 12 + now.getMonth() - pastDate.getMonth();
        const daysDiff = Math.floor((now.getTime() - pastDate.getTime()) / (1000 * 60 * 60 * 24)) % 30;

        if (monthsDiff > 0) {
          setTimeAgo(`${monthsDiff} month${monthsDiff > 1 ? 's' : ''}, ${daysDiff} day${daysDiff !== 1 ? 's' : ''}`);
        } else {
          setTimeAgo(`${daysDiff} day${daysDiff !== 1 ? 's' : ''}`);
        }
      }
    };

    updateTimeAgo();
    const timer = setInterval(updateTimeAgo, 1000);

    return () => clearInterval(timer);
  }, [date]);

  return <span>{timeAgo}</span>;
};

export default CustomTimeAgo;