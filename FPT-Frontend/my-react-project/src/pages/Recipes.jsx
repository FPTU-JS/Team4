import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Clock, Flame, Heart, Star, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import productService from '../services/productService';
import categoryService from '../services/categoryService';
import '../css/recipes.css';

const Recipes = () => {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState('All Recipes');
    const [recipes, setRecipes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchRecipesData = async () => {
            try {
                setIsLoading(true);
                const [productsData, categoriesData] = await Promise.all([
                    productService.searchProducts(''),
                    categoryService.getAllCategories()
                ]);
                setRecipes(Array.isArray(productsData) ? productsData : []);

                // Thêm 'All Recipes' vào đầu mảng danh mục
                const categoryList = [{ categoryId: 0, name: 'All Recipes' }, ...categoriesData];
                setCategories(Array.isArray(categoryList) ? categoryList : []);
            } catch (error) {
                console.error("Failed to load recipes and categories", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecipesData();
    }, []);

    return (
        <div className="recipes-hub-page">
            <div className="recipes-hub fade-in">
                {/* Header Area */}
                <div className="hub-header">
                    <h1 className="hub-title">Recipe Discovery Hub</h1>
                    <p className="subtitle">Explore over 10,000 curated recipes by chefs and AI.</p>

                    <div className="category-pills">
                        {categories.map(cat => (
                            <button
                                key={cat.categoryId}
                                className={`pill-btn ${activeCategory === cat.name ? 'active' : ''}`}
                                onClick={() => setActiveCategory(cat.name)}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="hub-layout">
                    {/* Left Sidebar Filters */}
                    <aside className="hub-sidebar">
                        <div className="search-box">
                            <Search size={20} className="search-icon" />
                            <input type="text" placeholder="Search recipes..." />
                        </div>

                        <div className="filter-group">
                            <h3 className="filter-title">Cooking Time</h3>
                            <label className="radio-label">
                                <input type="radio" name="time" />
                                <span className="radio-text">Under 15 mins</span>
                            </label>
                            <label className="radio-label">
                                <input type="radio" name="time" />
                                <span className="radio-text">15 - 30 mins</span>
                            </label>
                            <label className="radio-label">
                                <input type="radio" name="time" />
                                <span className="radio-text">30 - 60 mins</span>
                            </label>
                        </div>

                        <div className="filter-group">
                            <h3 className="filter-title">Calories</h3>
                            <div className="range-slider-wrapper">
                                <input type="range" min="0" max="1500" className="styled-slider" />
                                <div className="range-labels">
                                    <span>0 kcal</span>
                                    <span>1500+ kcal</span>
                                </div>
                            </div>
                        </div>

                        <div className="filter-group">
                            <h3 className="filter-title">Difficulty</h3>
                            <div className="difficulty-buttons">
                                <button className="diff-btn">Beginner</button>
                                <button className="diff-btn">Intermediate</button>
                                <button className="diff-btn">Advanced</button>
                            </div>
                        </div>

                        <div className="filter-group">
                            <h3 className="filter-title">Dietary Preferences</h3>
                            <label className="checkbox-label">
                                <input type="checkbox" defaultChecked />
                                <span className="checkbox-text">Gluten-Free</span>
                            </label>
                            <label className="checkbox-label">
                                <input type="checkbox" />
                                <span className="checkbox-text">Dairy-Free</span>
                            </label>
                            <label className="checkbox-label">
                                <input type="checkbox" />
                                <span className="checkbox-text">Nut-Free</span>
                            </label>
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <main className="hub-main">
                        <div className="hub-results-header">
                            <span className="results-count">Showing 24 of 1,248 results</span>
                            <div className="sort-box">
                                <span style={{ color: '#6b7280', fontSize: '0.9rem', marginRight: '0.5rem' }}>Sort by:</span>
                                <select className="sort-select">
                                    <option>Most Popular</option>
                                    <option>Highest Rated</option>
                                    <option>Newest</option>
                                </select>
                            </div>
                        </div>

                        <div className="hub-grid">
                            {isLoading ? (
                                <div className="loading-state">Loading recipes...</div>
                            ) : recipes.length === 0 ? (
                                <div className="empty-state">No recipes found.</div>
                            ) : (
                                recipes.map(recipe => (
                                    <div key={recipe.productId} className="recipe-card-hub" onClick={() => navigate(`/recipe/${recipe.productId}`, { state: { recipe } })}>
                                        <div className="card-image-wrapper">
                                            <img src={recipe.imageUrl} alt={recipe.name} />
                                            <div className="card-badges">
                                                <span className="badge ai"><Sparkles size={12} /> AI Match</span>
                                                <button className="favorite-btn" onClick={(e) => { e.stopPropagation(); }}>
                                                    <Heart size={20} fill="#fff" stroke="#d1d5db" />
                                                </button>
                                            </div>
                                            <div className="time-badge">
                                                <Clock size={14} /> {recipe.cookingTime || '20m'}
                                            </div>
                                        </div>
                                        <div className="card-content">
                                            <div className="card-header">
                                                <h3 className="card-title">{recipe.name}</h3>
                                                <div className="rating">
                                                    <Star size={14} fill="#f59e0b" color="#f59e0b" />
                                                    <span>4.9</span>
                                                </div>
                                            </div>
                                            <div className="card-meta">
                                                <span className="meta-item"><Flame size={14} /> {recipe.calories || '300'} kcal</span>
                                                <span className="meta-item bar">|</span>
                                                <span className="meta-item">Medium</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Pagination */}
                        <div className="pagination">
                            <button className="page-btn nav-btn"><ChevronLeft size={18} /></button>
                            <button className="page-btn active">1</button>
                            <button className="page-btn">2</button>
                            <button className="page-btn">3</button>
                            <span className="page-dots">...</span>
                            <button className="page-btn">12</button>
                            <button className="page-btn nav-btn"><ChevronRight size={18} /></button>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Recipes;
