import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './loginpage.css'
import backgroundImg from './pictures/background.jpg'

export default function LoginPage() {
  const [isModalOpen, setIsModalOpen] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({ email, password, rememberMe })
    // For now we just navigate to the dashboard without real auth.
    navigate('/dashboard')
  }

  return (
    <div className="login-page">
      <div
        className="login-bg"
        style={{ backgroundImage: `url(${backgroundImg})` }}
      />

      <header className="login-header">
        <span className="login-logo"></span>
        <nav className="login-nav">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
          <button
            type="button"
            className="login-header-btn"
            onClick={() => setIsModalOpen(true)}
          >
            Login
          </button>
        </nav>
      </header>

      {isModalOpen && (
        <div
          className="login-overlay"
          onClick={() => setIsModalOpen(false)}
          onKeyDown={(e) => e.key === 'Escape' && setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="login-title"
        >
          <div
            className="login-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="login-modal-logo">
              <div className="login-logo-icon" aria-hidden="true">
                <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M32 4L8 16v24l24 20 24-20V16L32 4z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" fill="none"/>
                  <path d="M32 20v24M20 28l12-8 12 8M26 40l6-8 6 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  <circle cx="32" cy="28" r="4" stroke="currentColor" strokeWidth="2" fill="none"/>
                </svg>
              </div>
              <span className="login-logo-brand">MEOW</span>
              <p className="login-logo-tagline">Sign in to your account</p>
            </div>

            <div className="login-modal-form-wrap">
              <div className="login-modal-header">
                <h2 id="login-title">Login</h2>
                <button
                  type="button"
                  className="login-close"
                  onClick={() => setIsModalOpen(false)}
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              <form className="login-form" onSubmit={handleSubmit}>
              <div className="login-field">
                <label htmlFor="login-email">Email</label>
                <div className="login-input-wrap">
                  <input
                    id="login-email"
                    type="email"
                    placeholder=""
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                  <span className="login-input-icon" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </span>
                </div>
              </div>

              <div className="login-field">
                <label htmlFor="login-password">Password</label>
                <div className="login-input-wrap">
                  <input
                    id="login-password"
                    type="password"
                    placeholder=""
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                  />
                  <span className="login-input-icon" aria-hidden="true">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </span>
                </div>
              </div>

              <div className="login-options">
                <label className="login-remember">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Remember me</span>
                </label>
                <a href="#forgot" className="login-forgot">Forgot Password?</a>
              </div>

              <button type="submit" className="login-submit">
                Login
              </button>

              <p className="login-register">
                Don&apos;t have an account? <a href="#register">Register</a>
              </p>
            </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
