import React from 'react';

const Tabs = ({ tabs, activeTab, onTabClick }) => {

  return (
    <div className="tabs-container">
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`tab ${activeTab === index ? 'active' : ''}`}
          onClick={() => onTabClick(index)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
