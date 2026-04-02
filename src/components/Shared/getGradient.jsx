import React from 'react';

const getGradient = (str = '') => {
  const colors = [
    ['#4f46e5', '#9333ea'], // indigo → purple
    ['#0ea5e9', '#6366f1'], // sky → indigo
    ['#f97316', '#ec4899'], // orange → pink
    ['#10b981', '#0ea5e9'], // emerald → sky
    ['#8b5cf6', '#ec4899'], // violet → pink
    ['#f59e0b', '#ef4444'], // amber → red
  ]
  const index = str.charCodeAt(0) % colors.length
  return `linear-gradient(135deg, ${colors[index][0]}, ${colors[index][1]})`
}

export default getGradient;