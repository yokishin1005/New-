// app/components/TalkRouletteUI.js
'use client'

import React from 'react';
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Dices, Clock, RotateCcw } from 'lucide-react';
import RouletteCharacter from './RouletteCharacter';

const TalkRouletteUI = ({
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
}) => {
  const renderButtons = () => {
    switch (state) {
      case 'idle':
      case 'finished':
        return (
          <Button onClick={handleStart} className="px-4 sm:px-8 py-2 sm:py-3 text-base sm:text-lg bg-blue-500 hover:bg-blue-600 transition-colors duration-300 transform hover:scale-105">
            <Dices className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            スタート
          </Button>
        );
      case 'spinning':
        return (
          <Button onClick={handleStop} className="px-4 sm:px-8 py-2 sm:py-3 text-base sm:text-lg bg-red-500 hover:bg-red-600 transition-colors duration-300 transform hover:scale-105">
            ストップ
          </Button>
        );
      case 'stopped':
        return (
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <Button onClick={handleStartTalk} className="px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg bg-green-500 hover:bg-green-600 transition-colors duration-300 transform hover:scale-105">
              トーク開始
            </Button>
            <Button onClick={handleChangeTopic} className="px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg bg-yellow-500 hover:bg-yellow-600 transition-colors duration-300 transform hover:scale-105">
              話題を変える
            </Button>
          </div>
        );
      case 'talking':
        return (
          <Button onClick={handleChangeTopic} className="px-4 sm:px-8 py-2 sm:py-3 text-base sm:text-lg bg-yellow-500 hover:bg-yellow-600 transition-colors duration-300 transform hover:scale-105">
            話題を変える
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-xl mx-auto">
      <div className="space-y-6 sm:space-y-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <RouletteCharacter state={state} />
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-blue-600">トークルーレット</h1>
        </div>
        <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-inner border-2 border-blue-200">
          <p className="text-xl sm:text-2xl md:text-3xl font-bold min-h-[4em] flex items-center justify-center text-center text-gray-800 leading-relaxed">
            {state === 'spinning' 
              ? <span className="animate-pulse">{displayedTopic}</span>
              : (currentTopic || 'スタートボタンを押してルーレットを回してください')}
          </p>
        </div>
        <div className="flex justify-center">
          {renderButtons()}
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow border border-blue-100">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
            <div className="flex items-center">
              <Clock className="text-blue-500 mr-2 h-5 w-5 sm:h-6 sm:w-6" />
              <p className="text-xl sm:text-2xl font-bold text-blue-600">{timeLeft}秒</p>
            </div>
            <p className="text-base sm:text-lg font-semibold text-purple-600">
              {state === 'talking' ? '話し合い中' : state === 'finished' ? '終了' : '待機中'}
            </p>
          </div>
        </div>
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow border border-blue-100">
          <p className="font-semibold text-base sm:text-lg mb-4 text-gray-700">時間設定:</p>
          <Slider
            min={30}
            max={300}
            step={30}
            value={[duration]}
            onValueChange={(value) => handleDurationChange(value[0])}
            disabled={state === 'talking' || state === 'spinning'}
            className="mb-2"
          />
          <p className="text-center mt-2 text-base sm:text-lg font-medium text-blue-600">{duration}秒</p>
        </div>
        <div className="flex justify-center">
          <Button onClick={handleReset} variant="outline" className="px-4 sm:px-6 py-2 text-sm sm:text-base text-gray-600 hover:text-gray-800 border-gray-300 hover:border-gray-400 transition-colors duration-300">
            <RotateCcw className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            リセット
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TalkRouletteUI;