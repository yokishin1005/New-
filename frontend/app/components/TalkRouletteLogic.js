// app/components/TalkRouletteLogic.js
'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { topics, getRandomTopic } from '../utils/topics';

const TalkRouletteLogic = ({ renderUI }) => {
  const [state, setState] = useState('idle');
  const [currentTopic, setCurrentTopic] = useState('');
  const [displayedTopic, setDisplayedTopic] = useState('');
  const [timeLeft, setTimeLeft] = useState(90);
  const [duration, setDuration] = useState(90);

  useEffect(() => {
    let interval;
    if (state === 'spinning') {
      interval = setInterval(() => {
        setDisplayedTopic(getRandomTopic());
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
  }, [state, timeLeft]);

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