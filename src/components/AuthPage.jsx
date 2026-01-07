import React, { useState } from 'react';

export default function AuthPage() {
  // State management - used to change and update the UI
  const [isLogin, setIsLogin] = useState(true); 
  // Starting value set to true for login page and false is sign up page
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  }); // A container that holds all the user input
  const [errors, setErrors] = useState({}); // To hold error messages

  // Function to handle change in inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validation function - checks if inputs are correct
  const validateForm = () => {
    const newErrors = {};

    if (!isLogin && !formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload
    
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length === 0) {
      // No errors - form is valid!
      if (isLogin) {
        alert(`Welcome back! Logging in with: ${formData.email}`);
      } else {
        alert(`Account created for: ${formData.name}!`);
      }
      // In a real app, you'd send this data to your server here
    } else {
      setErrors(newErrors);
    }
  };

  // Switch between login and signup
  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    setErrors({});
  };

  return (
    <div style={styles.container}>
      {/* Background decoration */}
      <div style={styles.backgroundShapes}>
        <div style={{...styles.shape, ...styles.shape1}}></div>
        <div style={{...styles.shape, ...styles.shape2}}></div>
        <div style={{...styles.shape, ...styles.shape3}}></div>
      </div>

      {/* Main card */}
      <div style={styles.card}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
          <p style={styles.subtitle}>{isLogin ? 'Enter your credentials to continue' : 'Sign up to get started'}</p>
        </div>

        {/* Form */}
        <div style={styles.form}>
          {/* Name field - only shows for signup */}
          {!isLogin && (
            <div style={styles.formGroup}>
              <label htmlFor="name" style={styles.label}>Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                style={{...styles.input, ...(errors.name ? styles.inputError : {})}}
              />
              {errors.name && <span style={styles.errorMessage}>{errors.name}</span>}
            </div>
          )}

          {/* Email field */}
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              style={{...styles.input, ...(errors.email ? styles.inputError : {})}}
            />
            {errors.email && <span style={styles.errorMessage}>{errors.email}</span>}
          </div>

          {/* Password field */}
          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              style={{...styles.input, ...(errors.password ? styles.inputError : {})}}
            />
            {errors.password && <span style={styles.errorMessage}>{errors.password}</span>}
          </div>

          {/* Confirm Password - only shows for signup */}
          {!isLogin && (
            <div style={styles.formGroup}>
              <label htmlFor="confirmPassword" style={styles.label}>Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                style={{...styles.input, ...(errors.confirmPassword ? styles.inputError : {})}}
              />
              {errors.confirmPassword && <span style={styles.errorMessage}>{errors.confirmPassword}</span>}
            </div>
          )}

          {/* Forgot password link - only shows for login */}
          {isLogin && (
            <div style={styles.formOptions}>
              <button style={styles.forgotPassword} onClick={(e) => e.preventDefault()}>Forgot password?</button>
            </div>
          )}

          {/* Submit button */}
          <button onClick={handleSubmit} style={styles.submitBtn}>
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </div>

        {/* Toggle between login/signup */}
        <div style={styles.footer}>
          <p style={styles.footerText}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={toggleMode} style={styles.toggleBtn}>
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>

        {/* Social login options */}
        <div style={styles.divider}>
          <span style={styles.dividerText}>or continue with</span>
        </div>

        <div style={styles.socialButtons}>
          <button style={styles.socialBtn}>
            <svg viewBox="0 0 24 24" width="20" height="20" style={styles.socialIcon}>
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </button>
          <button style={styles.socialBtn}>
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style={styles.socialIcon}>
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    padding: '20px',
    position: 'relative',
    overflow: 'hidden'
  },
  backgroundShapes: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    zIndex: 0
  },
  shape: {
    position: 'absolute',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)'
  },
  shape1: {
    width: '300px',
    height: '300px',
    top: '-100px',
    left: '-100px'
  },
  shape2: {
    width: '200px',
    height: '200px',
    bottom: '50px',
    right: '100px'
  },
  shape3: {
    width: '150px',
    height: '150px',
    top: '50%',
    right: '-50px'
  },
  card: {
    background: 'white',
    borderRadius: '20px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    padding: '40px',
    width: '100%',
    maxWidth: '450px',
    position: 'relative',
    zIndex: 1
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px'
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#1a202c',
    marginBottom: '8px'
  },
  subtitle: {
    fontSize: '14px',
    color: '#718096',
    margin: 0
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#2d3748',
    marginBottom: '4px'
  },
  input: {
    padding: '12px 16px',
    fontSize: '15px',
    border: '2px solid #e2e8f0',
    borderRadius: '10px',
    outline: 'none',
    transition: 'all 0.2s',
    fontFamily: 'inherit'
  },
  inputError: {
    borderColor: '#fc8181'
  },
  errorMessage: {
    fontSize: '13px',
    color: '#e53e3e',
    marginTop: '4px'
  },
  formOptions: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '-10px'
  },
  forgotPassword: {
    fontSize: '13px',
    color: '#667eea',
    textDecoration: 'none',
    fontWeight: '500',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0
  },
  submitBtn: {
    padding: '14px',
    fontSize: '16px',
    fontWeight: '600',
    color: 'white',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'transform 0.2s, box-shadow 0.2s',
    marginTop: '10px'
  },
  footer: {
    textAlign: 'center',
    marginTop: '24px'
  },
  footerText: {
    fontSize: '14px',
    color: '#4a5568',
    margin: 0
  },
  toggleBtn: {
    background: 'none',
    border: 'none',
    color: '#667eea',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '14px',
    padding: 0
  },
  divider: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    margin: '24px 0',
    position: 'relative'
  },
  dividerText: {
    fontSize: '13px',
    color: '#a0aec0',
    background: 'white',
    padding: '0 12px',
    position: 'relative',
    zIndex: 1,
    margin: '0 auto'
  },
  socialButtons: {
    display: 'flex',
    gap: '12px'
  },
  socialBtn: {
    flex: 1,
    padding: '12px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#2d3748',
    background: 'white',
    border: '2px solid #e2e8f0',
    borderRadius: '10px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'all 0.2s'
  },
  socialIcon: {
    flexShrink: 0
  }
};