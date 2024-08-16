// app/components/TalkRouletteLogic.js
'use client'

import React, { useState, useEffect, useCallback } from 'react';

const TalkRouletteLogic = ({ renderUI }) => {
  const [state, setState] = useState('idle'); // 'idle', 'spinning', 'stopped', 'talking', 'finished'
  const [currentTopic, setCurrentTopic] = useState('');
  const [displayedTopic, setDisplayedTopic] = useState('');
  const [timeLeft, setTimeLeft] = useState(90);
  const [duration, setDuration] = useState(90);
  const [topics, setTopics] = useState([]);

  const fetchTopics = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/topics`);
      const data = await response.json();
      setTopics(data.topics);
    } catch (error) {
      console.error('Failed to fetch topics:', error);
    }
  }, []);

  useEffect(() => {
    fetchTopics();
  }, [fetchTopics]);

  useEffect(() => {
    let interval;
    if (state === 'spinning') {
      interval = setInterval(() => {
        const randomTopic = topics[Math.floor(Math.random() * topics.length)];
        setDisplayedTopic(randomTopic || '');
      }, 50);
    } else if (state === 'talking' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            setState('finished');
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [state, timeLeft, topics]);

  const handleStart = () => {
    setState('spinning');
    setTimeLeft(duration);
  };

  const handleStop = () => {
    setState('stopped');
    setCurrentTopic(displayedTopic);
  };

  const handleStartTalk = () => {
    setState('talking');
  };

  const handleChangeTopic = () => {
    setState('spinning');
    setTimeLeft(duration);
  };

  const handleReset = () => {
    setState('idle');
    setCurrentTopic('');
    setDisplayedTopic('');
    setTimeLeft(duration);
  };

  const handleDurationChange = (newDuration) => {
    setDuration(newDuration);
    if (state === 'idle' || state === 'finished') {
      setTimeLeft(newDuration);
    }
  };

  return renderUI({
    state,
    currentTopic,
    displayedTopic,
    timeLeft,
    duration,
    handleStart,
    handleStop,
    handleStartTalk,
    handleChangeTopic,
    handleReset,
    handleDurationChange,
  });
};

export default TalkRouletteLogic;