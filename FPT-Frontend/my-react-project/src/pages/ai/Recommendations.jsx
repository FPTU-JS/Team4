import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Settings2, Sparkles, Clock, Flame, Heart } from 'lucide-react';
import productService from '../../services/productService';
import '../../css/recommendations.css';

const Recommendations = () => {
    const { state } = useLocation();
    const navigate = useNavigate();

    const [recommendations, setRecommendations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                setIsLoading(true);
                const data = await productService.getAiRecommendedProducts();
                setRecommendations(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Failed to load AI recommendations", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecommendations();
    }, []);

    return (
        <div className="discovery-layout animate-fade-in">
            {/* Left Sidebar - Filters */}
            <aside className="filter-sidebar">
                <div className="filter-header">
                    <Settings2 size={20} />
                    <h2>Refine Search</h2>
                </div>

                <div className="ai-suggestion-box">
                    <div className="box-header">
                        <h4>AI Suggestions</h4>
                        <Sparkles size={16} />
                    </div>
                    <p>Based on your inventory (Eggs, Tomatoes, Basil) and current weather (Sunny, 24°C).</p>
                </div>

                <div className="filter-group">
                    <h3 className="filter-title">Cuisine <span className="chevron">⌄</span></h3>
                    <div className="checkbox-list">
                        <label className="filter-label">
                            <input type="checkbox" /> <span>Italian</span>
                        </label>
                        <label className="filter-label">
                            <input type="checkbox" defaultChecked /> <span>Mediterranean</span>
                        </label>
                        <label className="filter-label">
                            <input type="checkbox" /> <span>Middle Eastern</span>
                        </label>
                    </div>
                </div>

                <div className="filter-group">
                    <h3 className="filter-title">Occasion <span className="chevron">⌄</span></h3>
                    <div className="checkbox-list">
                        <label className="filter-label">
                            <input type="checkbox" defaultChecked /> <span>Breakfast / Brunch</span>
                        </label>
                        <label className="filter-label">
                            <input type="checkbox" /> <span>Quick Lunch</span>
                        </label>
                    </div>
                </div>

                <div className="filter-group">
                    <h3 className="filter-title">Dietary <span className="chevron">⌄</span></h3>
                    <div className="checkbox-list">
                        <label className="filter-label">
                            <input type="checkbox" /> <span>Vegetarian</span>
                        </label>
                        <label className="filter-label">
                            <input type="checkbox" /> <span>Gluten Free</span>
                        </label>
                        <label className="filter-label">
                            <input type="checkbox" /> <span>Low Carb</span>
                        </label>
                    </div>
                </div>

                <div className="filter-group border-bottom-0">
                    <h3 className="filter-title">Weather <span className="chevron">⌄</span></h3>
                    <div className="checkbox-list">
                        <label className="filter-label">
                            <input type="checkbox" defaultChecked /> <span>Light & Fresh</span>
                        </label>
                    </div>
                </div>
            </aside>

            {/* Right Main Content */}
            <main className="discovery-main">
                <div className="breadcrumbs">
                    <Link to="/">Home</Link> <span className="separator">›</span> <span className="current">AI Discovery</span>
                </div>

                <h1 className="page-title">Recipe Discovery</h1>

                <div className="top-bar">
                    <div className="reason-badge">
                        <span className="ai-icon">⎔</span>
                        Because you have <span className="highlight">Eggs, Tomatoes</span> and <span className="highlight">Basil</span>...
                    </div>

                    <div className="sort-box">
                        <span className="sort-label">Sort by:</span>
                        <select className="sort-select">
                            <option>Relevance</option>
                            <option>Time</option>
                            <option>Calories</option>
                        </select>
                    </div>
                </div>

                <div className="recipe-grid-discovery">
                    {isLoading ? (
                        <p>Loading AI recommendations...</p>
                    ) : recommendations.length === 0 ? (
                        <p>No recommendations found for your ingredients.</p>
                    ) : (
                        recommendations.map((recipe) => (
                            <div key={recipe.productId} className="discovery-card" onClick={() => navigate(`/recipe/${recipe.productId}`, { state: { recipe } })}>
                                <div className="card-image-wrapper">
                                    <img src={recipe.imageUrl} alt={recipe.name} />
                                    <div className="match-badge">
                                        <Sparkles size={12} /> 95% Match
                                    </div>
                                    <button className="favorite-btn" onClick={(e) => { e.stopPropagation(); }}>
                                        <Heart size={20} fill="#fff" stroke="#d1d5db" />
                                    </button>
                                </div>

                                <div className="card-content">
                                    <h3 className="card-title">{recipe.name}</h3>
                                    <p className="card-desc">{recipe.description}</p>

                                    <div className="card-meta">
                                        <span className="meta-item"><Clock size={14} /> {recipe.cookingTime || '20m'}</span>
                                        <span className="meta-item bar">|</span>
                                        <span className="meta-item">ılı Medium</span>
                                        <span className="meta-item bar">|</span>
                                        <span className="meta-item"><Flame size={14} /> {recipe.calories || '300'} kcal</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="pagination">
                    <button className="page-btn prev">‹</button>
                    <button className="page-btn active">1</button>
                    <button className="page-btn">2</button>
                    <button className="page-btn">3</button>
                    <span className="page-ellipsis">...</span>
                    <button className="page-btn next">›</button>
                </div>
            </main>
        </div>
    );
};

export default Recommendations;
