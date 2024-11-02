import React from 'react';
import './ScreenHeading.css';

// Receive props as an argument
export default function ScreenHeading({ title, subHeading }) {
  return (
    <div className='heading-container'>
        <div className='screen-heading'>
            {/* Use title from props */}
            <span>{title}</span>
        </div>

        {/* Check if subHeading exists and render it */}
        {subHeading ? (
            <div className='screen-sub-heading'>
                <span>{subHeading}</span>
            </div>
        ) : <div></div>}

        <div className='heading-seperator'>
            <div className='seperator-line'></div>
                <div className='seperator-blob'>
                    <div></div>
                </div>
          
        </div>
    </div>
  );
}
