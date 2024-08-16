// app/components/TalkRoulettePage.js
'use client'

import React from 'react'
import TalkRouletteLogic from './TalkRouletteLogic'
import TalkRouletteUI from './TalkRouletteUI'

export default function TalkRoulettePage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
        <TalkRouletteLogic
          renderUI={(props) => <TalkRouletteUI {...props} />}
        />
      </div>
    </div>
  )
}