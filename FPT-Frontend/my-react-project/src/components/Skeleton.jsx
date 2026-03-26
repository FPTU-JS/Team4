import React from 'react';
import './Skeleton.css';

const Skeleton = ({ width, height, variant = 'text', className = '' }) => {
    const style = {
        width: width || '100%',
        height: height || (variant === 'circle' ? width : '1rem'),
    };

    return (
        <div 
            className={`skeleton-base skeleton-${variant} ${className}`} 
            style={style}
        />
    );
};

export default Skeleton;
