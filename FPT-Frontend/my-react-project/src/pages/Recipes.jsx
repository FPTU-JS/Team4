import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Clock, Flame, Heart, Star, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import productService from '../services/productService';
import categoryService from '../services/categoryService';
import RecipeSkeleton from '../components/RecipeSkeleton';
import '../css/recipes.css';

const Recipes = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        maxCookingTime: null,
        minCalories: 0,
        maxCalories: 2000,
        tags: [],
        difficulty: null
    })

    const [activeCategory, setActiveCategory] = useState('All Recipes');
    const [recipes, setRecipes] = useState([]);
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const itemsPerPage = 6;

    // Hàm quy ước độ khó dựa trên thời gian
    const getDifficulty = (time) => {
        if (!time) return 'Medium';
        const t = parseInt(time);
        if (t <= 10) return 'Easy';
        if (time <= 20 && time > 10) return 'Medium';
        return 'Difficult';
    };

    const fetchRecipesData = async () => {
        try {
            setIsLoading(true);
            const productsData = await productService.searchProducts(searchTerm, currentPage - 1, itemsPerPage, filters);
            setRecipes(productsData.content || []);
            setTotalPages(productsData.totalPages || 0);
            setTotalElements(productsData.totalElements || 0);
        } catch (error) {
            console.error("Failed to load recipes", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoriesData = await categoryService.getAllCategories();
                const categoryList = [{ categoryId: 0, name: 'All Recipes' }, ...categoriesData];
                setCategories(Array.isArray(categoryList) ? categoryList : []);
            } catch (error) {
                console.error("Failed to load categories", error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchRecipesData();
    }, [currentPage, searchTerm, activeCategory, JSON.stringify(filters)]);

    // Logic lọc Client-side cho Difficulty
    const filteredRecipes = useMemo(() => {
        return recipes.filter(recipe => {
            if (!filters.difficulty) return true;
            return getDifficulty(recipe.cookingTime) === filters.difficulty;
        });
    }, [recipes, filters.difficulty]);

    return (
        <div className="recipes-hub-page">
            <div className="recipes-hub fade-in">
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
                    <aside className="hub-sidebar">
                        <div className="sidebar-header">
                            <h3>Filters</h3>
                            <button
                                className="reset-btn"
                                onClick={() => {
                                    setSearchTerm('');
                                    setFilters({ maxCookingTime: null, minCalories: 0, maxCalories: 2000, tags: [], difficulty: null });
                                    setActiveCategory('All Recipes');
                                    setCurrentPage(1);
                                }}
                            >
                                Reset All
                            </button>
                        </div>

                        <div className="search-box">
                            <Search size={20} className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search recipes..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                }}
                            />
                        </div>

                        <div className="filter-group">
                            <h3 className="filter-title">Cooking Time</h3>
                            {[
                                { label: 'Any Time', value: null },
                                { label: 'Under 15 mins', value: 15 },
                                { label: 'Under 30 mins', value: 30 },
                                { label: 'Under 60 mins', value: 60 }
                            ].map((time) => (
                                <label key={time.label} className="radio-label">
                                    <input
                                        type="radio"
                                        name="time"
                                        checked={filters.maxCookingTime === time.value}
                                        onChange={() => setFilters({ ...filters, maxCookingTime: time.value })}
                                    />
                                    <span className="radio-text">{time.label}</span>
                                </label>
                            ))}
                        </div>

                        <div className="filter-group">
                            <h3 className="filter-title">Calories</h3>
                            <div className="range-slider-wrapper">
                                <input
                                    type="range"
                                    min="100"
                                    max="2000"
                                    step="50"
                                    value={filters.maxCalories}
                                    className="styled-slider"
                                    onChange={(e) => setFilters({ ...filters, maxCalories: parseInt(e.target.value) })}
                                />
                                <div className="range-labels">
                                    <span>100 kcal</span>
                                    <span>{filters.maxCalories} kcal</span>
                                </div>
                            </div>
                        </div>

                        <div className="filter-group">
                            <h3 className="filter-title">Difficulty</h3>
                            <div className="difficulty-buttons">
                                {['Easy', 'Medium', 'Difficult'].map((level) => (
                                    <button
                                        key={level}
                                        className={`diff-btn ${filters.difficulty === level ? 'active' : ''}`}
                                        onClick={() => {
                                            setFilters({
                                                ...filters,
                                                difficulty: filters.difficulty === level ? null : level
                                            });
                                            setCurrentPage(1);
                                        }}
                                    >
                                        {level}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="filter-group">
                            <h3 className="filter-title">Dietary Preferences</h3>
                            {['Gluten-Free', 'Dairy-Free', 'Nut-Free', 'Vegan'].map(tag => (
                                <label key={tag} className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        checked={filters.tags.includes(tag)}
                                        onChange={(e) => {
                                            const newTags = e.target.checked
                                                ? [...filters.tags, tag]
                                                : filters.tags.filter(t => t !== tag);
                                            setFilters({ ...filters, tags: newTags });
                                        }}
                                    />
                                    <span className="checkbox-text">{tag}</span>
                                </label>
                            ))}
                        </div>
                    </aside>

                    <main className="hub-main">
                        <div className="hub-results-header">
                            <span className="results-count">
                                Showing {filteredRecipes.length} of {totalElements} results
                            </span>
                            <div className="sort-box">
                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginRight: '0.5rem' }}>Sort by:</span>
                                <select className="sort-select">
                                    <option>Most Popular</option>
                                    <option>Highest Rated</option>
                                    <option>Newest</option>
                                </select>
                            </div>
                        </div>

                        <div className="hub-grid">
                            {isLoading ? (
                                // Render 6 skeletons as placeholder
                                Array.from({ length: 6 }).map((_, idx) => (
                                    <RecipeSkeleton key={idx} />
                                ))
                            ) : filteredRecipes.length === 0 ? (
                                <div className="empty-state">No recipes found matching your criteria.</div>
                            ) : (
                                filteredRecipes.map(recipe => (
                                    <div
                                        key={recipe.productId}
                                        className="recipe-card-hub"
                                        onClick={() => navigate(`/recipe/${recipe.productId}`, { state: { recipe } })}
                                    >
                                        <div className="card-image-wrapper">
                                            <img src={recipe.imageUrl || 'https://via.placeholder.com/300'} alt={recipe.name} />
                                            <div className="card-badges">
                                                <span className="badge ai"><Sparkles size={12} /> AI Match</span>
                                                <button className="heart-btn" onClick={(e) => { e.stopPropagation(); }}>
                                                    <Heart size={20} fill="#fff" stroke="#d1d5db" />
                                                </button>
                                            </div>
                                            <div className="time-badge">
                                                <Clock size={14} /> {recipe.cookingTime ? `${recipe.cookingTime}m` : '20m'}
                                            </div>
                                        </div>
                                        <div className="hub-card-content">
                                            <div className="hub-card-header">
                                                <h3 className="hub-card-title">{recipe.name}</h3>
                                                <div className="rating">
                                                    <Star size={14} fill="#f59e0b" color="#f59e0b" />
                                                    <span>4.9</span>
                                                </div>
                                            </div>
                                            <p className="hub-card-desc">{recipe.description || 'Sườn nướng than hoa thơm lừng, ăn kèm mỡ hành.'}</p>

                                            <div className="hub-card-tags">
                                                {recipe.tags && recipe.tags.length > 0 ? (
                                                    recipe.tags.slice(0, 2).map((tag, idx) => (
                                                        <span key={idx} className="hub-tag">{tag}</span>
                                                    ))
                                                ) : (
                                                    <>
                                                        <span className="hub-tag">Vietnamese</span>
                                                        <span className="hub-tag">Tasty</span>
                                                    </>
                                                )}
                                            </div>

                                            <div className="hub-card-meta" style={{ marginTop: '1rem' }}>
                                                <span className="hub-meta-item"><Flame size={14} /> {recipe.calories || '650'} kcal</span>
                                                <span className="hub-meta-item bar">|</span>
                                                {/* Hiển thị độ khó dựa trên hàm tính toán */}
                                                <span className="hub-meta-item">{getDifficulty(recipe.cookingTime)}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {totalPages > 1 && (
                            <div className="pagination">
                                <button
                                    className="page-btn nav-btn"
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    style={{ opacity: currentPage === 1 ? 0.5 : 1, cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
                                >
                                    <ChevronLeft size={18} />
                                </button>

                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i + 1}
                                        className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
                                        onClick={() => setCurrentPage(i + 1)}
                                    >
                                        {i + 1}
                                    </button>
                                ))}

                                <button
                                    className="page-btn nav-btn"
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    style={{ opacity: currentPage === totalPages ? 0.5 : 1, cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
                                >
                                    <ChevronRight size={18} />
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Recipes;