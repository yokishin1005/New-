// app/components/TalkRouletteLogic.js
'use client'

import React, { useState, useEffect, useCallback } from 'react';
<<<<<<< HEAD
import { topics as defaultTopics } from '../utils/topics';
=======
import { topics, getRandomTopic } from '../utils/topics';
>>>>>>> f7fe292a779e320bcaf56a46f25c0fedc658ef46

const TalkRouletteLogic = ({ renderUI }) => {
  const [state, setState] = useState('idle');
  const [currentTopic, setCurrentTopic] = useState('');
  const [displayedTopic, setDisplayedTopic] = useState('');
  const [timeLeft, setTimeLeft] = useState(90);
  const [duration, setDuration] = useState(90);
<<<<<<< HEAD
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
=======
>>>>>>> f7fe292a779e320bcaf56a46f25c0fedc658ef46

  useEffect(() => {
    let interval;
    if (state === 'spinning') {
      interval = setInterval(() => {
<<<<<<< HEAD
        const randomTopic = topics[Math.floor(Math.random() * topics.length)];
        setDisplayedTopic(randomTopic || '');
=======
        setDisplayedTopic(getRandomTopic());
>>>>>>> f7fe292a779e320bcaf56a46f25c0fedc658ef46
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
<<<<<<< HEAD
  }, [state, timeLeft, topics]);
=======
  }, [state, timeLeft]);
>>>>>>> f7fe292a779e320bcaf56a46f25c0fedc658ef46

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

<<<<<<< HEAD
  const handleSaveTopics = (newTopics) => {
    setTopics(newTopics);
  };

=======
>>>>>>> f7fe292a779e320bcaf56a46f25c0fedc658ef46
  return renderUI({
    state,
    currentTopic,
    displayedTopic,
    timeLeft,
    duration,
<<<<<<< HEAD
    topics,
=======
>>>>>>> f7fe292a779e320bcaf56a46f25c0fedc658ef46
    handleStart,
    handleStop,
    handleStartTalk,
    handleChangeTopic,
    handleReset,
    handleDurationChange,
<<<<<<< HEAD
    handleSaveTopics,
=======
>>>>>>> f7fe292a779e320bcaf56a46f25c0fedc658ef46
  });
};

export default TalkRouletteLogic;