import React from 'react';
import '../css/recipes.css'; // We'll add skeleton styles here

const RecipeSkeleton = () => {
    return (
        <div className="recipe-card-hub skeleton-card">
            <div className="skeleton-image-wrapper"></div>
            <div className="hub-card-content">
                <div className="skeleton-line title"></div>
                <div className="skeleton-line text"></div>
                <div className="skeleton-tags">
                    <div className="skeleton-tag"></div>
                    <div className="skeleton-tag"></div>
                </div>
                <div className="skeleton-meta">
                    <div className="skeleton-line short"></div>
                </div>
            </div>
        </div>
    );
};

export default RecipeSkeleton;
