"use client";

import React from "react";
import TimeAgo from "react-timeago";

interface CustomTimeAgoProps {
  date: string | number | Date;
}

const CustomTimeAgo: React.FC<CustomTimeAgoProps> = ({ date }) => {
  const customFormatter = (
    unit: string,
    nextFormatter: () => unknown
  ) => {
    if (unit === "second" || unit === "minute" || unit === "hour") {
      // For recent times, use the default formatter
      return nextFormatter();
    }

    const dateObj = new Date(date);
    const now = new Date();

    const monthsDiff =
      (now.getFullYear() - dateObj.getFullYear()) * 12 +
      now.getMonth() -
      dateObj.getMonth();
    const daysDiff =
      Math.floor((now.getTime() - dateObj.getTime()) / (1000 * 60 * 60 * 24)) %
      30;

    if (monthsDiff > 0) {
      return `${monthsDiff} month${monthsDiff > 1 ? "s" : ""}, ${daysDiff} day${
        daysDiff !== 1 ? "s" : ""
      }`;
    } else {
      return `${daysDiff} day${daysDiff !== 1 ? "s" : ""}`;
    }
  };

  return <TimeAgo date={date} formatter={customFormatter} />;
};

export default CustomTimeAgo;
