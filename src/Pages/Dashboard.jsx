import React from 'react'
import { useState } from "react";

export default function Dashboard() {
      const [cardStates] = useState([
        { index: 1, name: "Users", icon: "ri-user-line", color: "#48b4d5", count: "1,200" },
        { index: 2, name: "Post", icon: "ri-article-line", color: "#FFB200", count: "1,200" },   
        { index: 3, name: "Comment", icon: "ri-chat-3-line", color: "#2D336B", count: "1,200" },
        { index: 4, name: "Views", icon: "ri-eye-line", color: "#FF0000", count: "1,200" },
      ])
  return (
    <div className="grid grid-cols-4 gap-4">
            {cardStates.map((cardState) => (
              <div key={cardState.index} className="p-4 bg-white rounded-lg shadow">
              <div className="flex flex-wrap items-center justify-between gap-4">
                {/* Users Count */}
                <div>
                  <div className="mb-1 text-sm text-gray-500">{cardState.name}</div>
                  <div className="text-lg font-semibold">{cardState.count}</div>
                </div>

                {/* Icon Container */}
                <div className="flex items-center justify-center w-12 h-12 text-2xl text-white bg-blue-500 rounded-full" style={{ backgroundColor: cardState.color }}>
                  <i className={cardState.icon} ></i>
                </div>

                {/* Growth Percentage */}
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <i className="text-green-500 ri-arrow-up-line"></i>
                  <span className="font-semibold text-green-500">5%</span>
                  <span className="text-gray-500">Since Last Month</span>
                </div>
              </div>
            </div> 
            ))}           
          </div>
  )
}
