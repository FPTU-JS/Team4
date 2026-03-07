import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Clock, Activity, Users, Flame, ChefHat, Sparkles } from 'lucide-react';
import '../../css/recipe-detail.css';

const MOCK_RECIPE = {
    id: 1,
    title: 'Creamy Truffle Basil Pasta',
    rating: '4.9 (12.4k reviews)',
    time: '20 mins',
    difficulty: 'Medium',
    servings: 2,
    calories: '450 kcal',
    image: 'https://images.unsplash.com/photo-1621510456681-2330135e5871?w=1600&q=80',
    ingredients: [
        { name: 'Linguine Pasta', amount: '250g' },
        { name: 'Fresh Basil Leaves', amount: '1 cup, packed' },
        { name: 'Black Truffle Oil', amount: '2 tbsp' },
        { name: 'Heavy Cream', amount: '200ml' },
        { name: 'Parmesan Cheese', amount: '50g, grated' },
        { name: 'Garlic Cloves', amount: '2 pieces, minced' }
    ],
    steps: [
        {
            title: 'Prepare the Pasta',
            desc: 'Bring a large pot of salted water to a boil. Add the linguine and cook according to package instructions until al dente. Drain, reserving 1/2 cup of pasta water.',
            img: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&q=80'
        },
        {
            title: 'Sauté Aromatics',
            desc: 'In a large skillet over medium heat, add a drizzle of olive oil. Sauté the minced garlic until fragrant (about 1 minute), making sure it doesn\'t brown.',
            img: null
        },
        {
            title: 'Create the Creamy Base',
            desc: 'Pour in the heavy cream and bring to a gentle simmer. Whisk in the grated Parmesan cheese until melted and the sauce begins to thicken.',
            img: null
        },
        {
            title: 'Combine & Finish',
            desc: 'Toss the cooked pasta into the sauce. Add the truffle oil and fresh basil. If the sauce is too thick, add a splash of the reserved pasta water. Season with salt and pepper to taste.',
            img: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=800&q=80'
        }
    ],
    nutrition: {
        calories: 450,
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
            text: 'Absolutely divine! The truffle oil adds such a sophisticated depth. Followed the AI tip and the sauce was perfectly creamy. Definitely making this again for my dinner party!'
        },
        {
            id: 2,
            name: 'Mark Thompson',
            avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&q=80',
            time: '5 days ago',
            text: 'Great base recipe. I added some pan-seared mushrooms to give it more texture. The truffle flavor is strong, so don\'t overdo the oil!'
        }
    ]
};

const RecipeDetail = () => {
    const { id } = useParams();
    const [servings, setServings] = useState(MOCK_RECIPE.servings);

    // For ingredients checkboxes
    const [checkedItems, setCheckedItems] = useState({});

    const toggleIngredient = (idx) => {
        setCheckedItems(prev => ({
            ...prev,
            [idx]: !prev[idx]
        }));
    };

    const handleIncrement = () => setServings(s => s + 1);
    const handleDecrement = () => setServings(s => Math.max(1, s - 1));

    return (
        <div className="recipe-detail-page animate-fade-in">
            {/* Hero Section */}
            <div className="hero-wrapper">
                <img src={MOCK_RECIPE.image} alt={MOCK_RECIPE.title} />
                <div className="hero-overlay">
                    <div className="hero-badges">
                        <span className="badge-premium">Premium Recipe</span>
                        <span className="badge-rating"><span className="star">★</span> {MOCK_RECIPE.rating}</span>
                    </div>
                    <h1 className="hero-title">{MOCK_RECIPE.title}</h1>
                    <div className="hero-stats">
                        <div className="stat-box">
                            <span className="stat-label"><Clock size={16} /> Cook Time</span>
                            <span className="stat-value">{MOCK_RECIPE.time}</span>
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
                            <span className="stat-value">{MOCK_RECIPE.calories}</span>
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
                        {MOCK_RECIPE.ingredients.map((item, idx) => (
                            <label key={idx} className="ingredient-item">
                                <input
                                    type="checkbox"
                                    className="ingredient-checkbox"
                                    checked={!!checkedItems[idx]}
                                    onChange={() => toggleIngredient(idx)}
                                />
                                <div className="ingredient-info">
                                    <div className="ingredient-name">{item.name}</div>
                                    <div className="ingredient-amount">{item.amount}</div>
                                </div>
                            </label>
                        ))}
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
                    <h2 className="section-title">Instructions</h2>

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
                        <span className="nutrient-val">{MOCK_RECIPE.nutrition.calories}</span>
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
