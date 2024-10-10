"use client";

import React, { useState, useEffect } from 'react';

const LoveMessage: React.FC = () => {
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowMessage(false), 5000); // Hide after 5 seconds
    return () => clearTimeout(timer);
  }, []);

  if (!showMessage) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-pink-100 p-2 rounded-md shadow-md">
      <p className="text-pink-600 mr-2">With love from Juan to Alexis.</p>
      <button
        onClick={() => setShowMessage(false)}
        className="absolute top-0 right-0 text-pink-600 p-1"
      >
        ×
      </button>
    </div>
  );
};

export default LoveMessage;