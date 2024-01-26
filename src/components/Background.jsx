'use client'
import { useTheme } from '@/app/context/ThemeContext';
import React from 'react'

function Background() {
    const { theme } = useTheme();

  return (
    <div className={`${theme == "light" ? "bg-slate-100" : "bg-gray-900"} absolute w-full h-full`}>
        
    </div>
  )
}

export default Background