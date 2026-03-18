import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Clock, Activity, Users, Flame, ChefHat, Sparkles, ArrowLeft } from 'lucide-react';
import productService from '../../services/productService';
import '../../css/recipe-detail.css';

// ... (Giữ nguyên MOCK_RECIPE tạm thời cho phần Steps hướng dẫn không có trong DB)
const MOCK_RECIPE = {
    rating: '4.9 (12.4k reviews)',
    difficulty: 'Medium',
    servings: 2,
    steps: [
        {
            title: 'Prepare the Ingredients',
            desc: 'Wash and prepare all the ingredients according to the recipe list. Ensure precise measurements for the best culinary experience.',
            img: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80'
        },
        {
            title: 'Cook with Passion',
            desc: 'Follow traditional cooking methods to bring out the authentic flavors. Heat control is the key to mastering this dish.',
            img: null
        },
        {
            title: 'Plating and Serving',
            desc: 'Serve immediately while hot. Garnish elegantly to elevate the dining experience.',
            img: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&q=80'
        }
    ],
    nutrition: {
        protein: '12g',
        carbs: '58g',
        fats: '22g'
    },
    reviews: [
        {
            id: 1,
            name: 'Sarah Jenkins',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
            time: '2 days ago',
            text: 'Absolutely divine! The flavors were perfectly balanced. Definitely making this again for my dinner party!'
        },
        {
            id: 2,
            name: 'Mark Thompson',
            avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&q=80',
            time: '5 days ago',
            text: 'Great base recipe. I added some personal twist to give it more texture. Great guided experience!'
        }
    ]
};

const RecipeDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [recipe, setRecipe] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const [servings, setServings] = useState(MOCK_RECIPE.servings);
    const [checkedItems, setCheckedItems] = useState({});

    useEffect(() => {
        const fetchRecipeDetail = async () => {
            try {
                setIsLoading(true);
                const data = await productService.getProductById(id);
                setRecipe(data);
                setError(null);
            } catch (err) {
                console.error("Failed to fetch recipe detail", err);
                setError("Could not load recipe details. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchRecipeDetail();
        }
    }, [id]);

    const toggleIngredient = (idx) => {
        setCheckedItems(prev => ({
            ...prev,
            [idx]: !prev[idx]
        }));
    };

    const handleIncrement = () => setServings(s => s + 1);
    const handleDecrement = () => setServings(s => Math.max(1, s - 1));

    if (isLoading) {
        return <div className="loading-state" style={{ padding: '4rem', textAlign: 'center' }}>Loading delicious details...</div>;
    }

    if (error || !recipe) {
        return (
            <div className="empty-state" style={{ padding: '4rem', textAlign: 'center' }}>
                <h3>Oops! Something went wrong.</h3>
                <p>{error || "Recipe not found."}</p>
                <button onClick={() => navigate('/recipes')} className="pill-btn" style={{ marginTop: '1rem' }}>Back to Recipes</button>
            </div>
        );
    }

    return (
        <div className="recipe-detail-page animate-fade-in">
            {/* Header / Back Action */}
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '1rem', paddingBottom: 0 }}>
                <button
                    onClick={() => navigate('/recipes')}
                    style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.95rem' }}
                >
                    <ArrowLeft size={18} /> Back to Recipes
                </button>
            </div>

            {/* Hero Section */}
            <div className="hero-wrapper">
                <img src={recipe.imageUrl || 'https://images.unsplash.com/photo-1621510456681-2330135e5871?w=1600&q=80'} alt={recipe.name} />
                <div className="hero-overlay">
                    <div className="hero-badges">
                        {recipe.isAiRecommended && <span className="badge-premium">AI Recommended</span>}
                        <span className="badge-rating"><span className="star">★</span> {recipe.rating || 'N/A'}</span>
                    </div>
                    <h1 className="hero-title">{recipe.name}</h1>
                    <div className="hero-stats">
                        <div className="stat-box">
                            <span className="stat-label"><Clock size={16} /> Cook Time</span>
                            <span className="stat-value">{recipe.cookingTime ? `${recipe.cookingTime} mins` : '??'}</span>
                        </div>
                        <div className="stat-box">
                            <span className="stat-label"><Activity size={16} /> Difficulty</span>
                            <span className="stat-value">{MOCK_RECIPE.difficulty}</span>
                        </div>
                        <div className="stat-box">
                            <span className="stat-label"><Users size={16} /> Servings</span>
                            <span className="stat-value">{servings} Portions</span>
                        </div>
                        <div className="stat-box">
                            <span className="stat-label"><Flame size={16} /> Calories</span>
                            <span className="stat-value">{recipe.calories ? `${recipe.calories} kcal` : '??'}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="detail-grid">
                {/* Left Sidebar - Ingredients */}
                <div className="ingredients-section">
                    <div className="ingredients-header">
                        <h2 className="section-title" style={{ margin: 0 }}>Ingredients</h2>
                        <div className="servings-control">
                            <button className="servings-btn" onClick={handleDecrement}>-</button>
                            <span className="servings-count">{servings}</span>
                            <button className="servings-btn" onClick={handleIncrement}>+</button>
                        </div>
                    </div>

                    <div className="ingredients-list">
                        {(recipe.recipes || []).length === 0 ? (
                            <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>No ingredients found for this recipe.</p>
                        ) : (
                            recipe.recipes.map((item, idx) => (
                                <label key={idx} className="ingredient-item">
                                    <input
                                        type="checkbox"
                                        className="ingredient-checkbox"
                                        checked={!!checkedItems[idx]}
                                        onChange={() => toggleIngredient(idx)}
                                    />
                                    <div className="ingredient-info">
                                        <div className="ingredient-name">{item.ingredientName}</div>
                                        <div className="ingredient-amount">
                                            {item.quantity ? (item.quantity * (servings / MOCK_RECIPE.servings)).toFixed(2) : ''} {item.unit}
                                        </div>
                                    </div>
                                </label>
                            ))
                        )}
                    </div>

                    <div className="chef-tip-box">
                        <div className="chef-tip-header">
                            <ChefHat size={18} /> AI CHEF'S TIP
                        </div>
                        <p className="chef-tip-text">
                            "Save a half-cup of the starchy pasta water! Adding it to the cream sauce at the end emulsifies the truffle oil and creates a silky, restaurant-quality glaze that clings perfectly to every noodle."
                        </p>
                        <Sparkles size={40} className="sparkle-bg" />
                    </div>
                </div>

                {/* Right Main Content - Instructions */}
                <div className="instructions-section">
                    <h2 className="section-title">Instructions & Description</h2>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem', fontSize: '1.05rem' }}>
                        {recipe.description || 'No description provided.'}
                    </p>

                    <h2 className="section-title">Preparation Steps</h2>
                    <div className="steps-list">
                        {MOCK_RECIPE.steps.map((step, idx) => (
                            <div key={idx} className="instruction-step">
                                <div className={`step-number ${idx === 0 ? 'active' : ''}`}>
                                    {idx + 1}
                                </div>
                                <div className="step-content">
                                    <h3 className="step-title">{step.title}</h3>
                                    <p className="step-desc">{step.desc}</p>
                                    {step.img && (
                                        <img src={step.img} alt={`Step ${idx + 1}`} className="step-image" />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Section - Nutrition & Reviews */}
            <div className="bottom-section">
                <h2 className="section-title">Nutritional Information</h2>
                <div className="nutrition-grid">
                    <div className="nutrient-box">
                        <span className="nutrient-val">{recipe.calories || '??'}</span>
                        <span className="nutrient-label">Calories</span>
                        <div className="nutrient-bar"></div>
                    </div>
                    <div className="nutrient-box">
                        <span className="nutrient-val">{MOCK_RECIPE.nutrition.protein}</span>
                        <span className="nutrient-label">Protein</span>
                        <div className="nutrient-bar"></div>
                    </div>
                    <div className="nutrient-box">
                        <span className="nutrient-val">{MOCK_RECIPE.nutrition.carbs}</span>
                        <span className="nutrient-label">Carbs</span>
                        <div className="nutrient-bar"></div>
                    </div>
                    <div className="nutrient-box">
                        <span className="nutrient-val">{MOCK_RECIPE.nutrition.fats}</span>
                        <span className="nutrient-label">Fats</span>
                        <div className="nutrient-bar"></div>
                    </div>
                </div>

                <div style={{ marginTop: '4rem' }}>
                    <div className="reviews-header">
                        <h2 className="section-title" style={{ margin: 0 }}>User Reviews</h2>
                        <button className="write-review-btn">Write a Review</button>
                    </div>

                    <div className="reviews-list">
                        {MOCK_RECIPE.reviews.map(review => (
                            <div key={review.id} className="review-card">
                                <div className="review-header">
                                    <div className="reviewer-info">
                                        <img src={review.avatar} alt={review.name} className="reviewer-avatar" />
                                        <div>
                                            <h4 className="reviewer-name">{review.name}</h4>
                                            <p className="review-time">{review.time}</p>
                                        </div>
                                    </div>
                                    <div className="review-stars">★★★★★</div>
                                </div>
                                <p className="review-text">{review.text}</p>
                            </div>
                        ))}
                    </div>

                    <button className="load-more-btn">Load More Reviews</button>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetail;
