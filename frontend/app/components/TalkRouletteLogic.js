// app/components/TalkRouletteLogic.js
'use client'

import React, { useState, useEffect, useCallback } from 'react';
import { topics as defaultTopics } from '../utils/topics';

const TalkRouletteLogic = ({ renderUI }) => {
  const [state, setState] = useState('idle');
  const [currentTopic, setCurrentTopic] = useState('');
  const [displayedTopic, setDisplayedTopic] = useState('');
  const [timeLeft, setTimeLeft] = useState(90);
  const [duration, setDuration] = useState(90);
  const [topics, setTopics] = useState(defaultTopics);

  // localStorage からトピックを読み込む
  useEffect(() => {
    const savedTopics = localStorage.getItem('rouletteTopics');
    if (savedTopics) {
      setTopics(JSON.parse(savedTopics));
    }
  }, []);

  // トピックが変更されたら localStorage に保存
  useEffect(() => {
    localStorage.setItem('rouletteTopics', JSON.stringify(topics));
  }, [topics]);

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

  const handleSaveTopics = (newTopics) => {
    setTopics(newTopics);
  };

  return renderUI({
    state,
    currentTopic,
    displayedTopic,
    timeLeft,
    duration,
    topics,
    handleStart,
    handleStop,
    handleStartTalk,
    handleChangeTopic,
    handleReset,
    handleDurationChange,
    handleSaveTopics,
  });
};

export default TalkRouletteLogic;