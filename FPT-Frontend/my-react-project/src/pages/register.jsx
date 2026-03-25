import { useState, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, Eye, EyeOff, Mail, Phone, MoveLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import '../css/register.css';
import { useAuth } from './AuthContext';
import authService from '../services/authService';
// Create Yup Validation Schema for Registration
const schema = yup.object({
    fullName: yup.string().required('Full Name is required'),
    username: yup.string().required('Username is required').min(3, 'Username must be at least 3 characters'),
    email: yup.string().email('Must be a valid email').required('Email is required'),
    phone: yup.string().matches(/^[0-9]+$/, "Must be only digits").min(9, 'Must be at least 9 digits').notRequired(),
    password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters long'),
    confirmPassword: yup.string()
        .required('Confirm Password is required')
        .oneOf([yup.ref('password')], 'Passwords do not match'),
}).required();

const Register = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            fullName: '',
            username: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: ''
        }
    });

    const handleSocialLogin = (provider) => {
        const baseUrl = import.meta.env.VITE_API_BASE_URL || '';
        window.location.href = `${baseUrl}/oauth2/authorization/${provider}`;
    };

    const onSubmit = async (data) => {
        setIsLoading(true);
        const loadingToast = toast.loading('Creating your account...');

        try {
            // we exclude confirmPassword when sending to backend
            // eslint-disable-next-line no-unused-vars
            const { confirmPassword, ...submitData } = data;
            await authService.register(submitData);
            toast.success("Registration successful! You can now log in.", { id: loadingToast });
            navigate('/login');
        } catch (err) {
            toast.error(err.response?.data?.message || "Registration failed.", { id: loadingToast });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/', { replace: true });
        }
    }, [isAuthenticated, navigate]);

    if (isAuthenticated) return null;

    return (
        <div className="register-page">

            <div className="register-left">

                <div className="register-left-content">

                    <div className="logo-co-che-green">
                        <span className="logo-icon-green">♨️</span> CO-CHE
                    </div>

                    <h1 className="register-quote">
                        Discover culinary excellence tailored to your taste.
                    </h1>

                    <p className="register-subtext">
                        Join thousands of food lovers and professional chefs connecting through the art of cooking.
                    </p>

                </div>

            </div>

            <div className="register-right">

                <Link to="/" className="back-to-home">
                    <MoveLeft size={16} />
                    Back to Home
                </Link>

            <div className="register-form-container">

                    <div className="register-header">
                        <h2>Create Your Account</h2>
                        <p>Join CO-CHE and start your culinary journey.</p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>

                        {/* Full Name */}
                        <div className="input-group">
                            <label>Full Name</label>

                            <div className={`input-wrapper ${errors.fullName ? 'has-error' : ''}`}>
                                <span className="input-icon-left"><User size={18} /></span>

                                <input
                                    type="text"
                                    {...register('fullName')}
                                    placeholder="Enter your full name"
                                />
                            </div>
                            {errors.fullName && <span className="error-text" style={{color: '#ef4444', fontSize: '0.85rem', marginTop: '4px', display: 'block'}}>{errors.fullName.message}</span>}
                        </div>

                        {/* Username */}
                        <div className="input-group">
                            <label>Username</label>

                            <div className={`input-wrapper ${errors.username ? 'has-error' : ''}`}>
                                <span className="input-icon-left"><User size={18} /></span>

                                <input
                                    type="text"
                                    {...register('username')}
                                    placeholder="marcopierre"
                                />
                            </div>
                            {errors.username && <span className="error-text" style={{color: '#ef4444', fontSize: '0.85rem', marginTop: '4px', display: 'block'}}>{errors.username.message}</span>}
                        </div>

                        {/* Email */}
                        <div className="input-group">
                            <label>Email</label>

                            <div className={`input-wrapper ${errors.email ? 'has-error' : ''}`}>
                                <span className="input-icon-left"><Mail size={18} /></span>

                                <input
                                    type="email"
                                    {...register('email')}
                                    placeholder="Enter email"
                                />
                            </div>
                            {errors.email && <span className="error-text" style={{color: '#ef4444', fontSize: '0.85rem', marginTop: '4px', display: 'block'}}>{errors.email.message}</span>}
                        </div>

                        {/* Phone */}
                        <div className="input-group">
                            <label>Phone</label>

                            <div className={`input-wrapper ${errors.phone ? 'has-error' : ''}`}>
                                <span className="input-icon-left"><Phone size={18} /></span>

                                <input
                                    type="text"
                                    {...register('phone')}
                                    placeholder="0123 456 789"
                                />
                            </div>
                            {errors.phone && <span className="error-text" style={{color: '#ef4444', fontSize: '0.85rem', marginTop: '4px', display: 'block'}}>{errors.phone.message}</span>}
                        </div>

                        <div className="row-inputs">

                            {/* Password */}
                            <div className="input-group">
                                <label>Password</label>
                                <div className={`input-wrapper ${errors.password ? 'has-error' : ''}`}>
                                    <span className="input-icon-left">
                                        <Lock size={18} />
                                    </span>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        {...register('password')}
                                        placeholder="Enter password"
                                    />
                                    <span
                                        className="input-icon-right"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </span>
                                </div>
                                {errors.password && <span className="error-text" style={{color: '#ef4444', fontSize: '0.85rem', marginTop: '4px', display: 'block'}}>{errors.password.message}</span>}
                            </div>

                            {/* Confirm Password */}
                            <div className="input-group">
                                <label>Confirm Password</label>
                                <div className={`input-wrapper ${errors.confirmPassword ? 'has-error' : ''}`}>
                                    <span className="input-icon-left">
                                        <Lock size={18} />
                                    </span>
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        {...register('confirmPassword')}
                                        placeholder="Confirm password"
                                    />
                                    <span
                                        className="input-icon-right"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    >
                                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </span>
                                </div>
                                {errors.confirmPassword && <span className="error-text" style={{color: '#ef4444', fontSize: '0.85rem', marginTop: '4px', display: 'block'}}>{errors.confirmPassword.message}</span>}
                            </div>

                        </div>

                        <button
                            type="submit"
                            className="register-btn"
                            disabled={isLoading}
                        >
                            {isLoading ? "Creating..." : " →"}
                        </button>

                    </form>

                    <div className="divider">
                        <span>Or continue with</span>
                    </div>

                    <div className="social-login">

                        <button
                            type="button"
                            className="social-btn"
                            onClick={() => handleSocialLogin('google')}
                        >
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google" />
                            Google
                        </button>

                        <button
                            type="button"
                            className="social-btn"
                            onClick={() => handleSocialLogin('facebook')}
                        >
                            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg" alt="Facebook" />
                            Facebook
                        </button>

                    </div>

                    <p className="login-link">
                        Already have an account? <Link to="/login">Login</Link>
                    </p>

                </div>

            </div>

        </div>
    );
};

const ErrorFallback = ({ error }) => {
  console.error("REGISTER CRASH:", error);
  return (
    <div role="alert" style={{color: 'red', padding: '20px', zIndex: 9999, position: 'relative', background: 'white'}}>
      <h2>Something went wrong in Register.jsx:</h2>
      <pre>{error.message}</pre>
    </div>
  )
}

const RegisterWrapper = () => (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Register />
    </ErrorBoundary>
);

export default RegisterWrapper;