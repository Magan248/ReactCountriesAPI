import { useTheme } from '../hooks/useTheme'

export default function header() {
  const [isDark, setIsDark] = useTheme()

  return (
    <header className={`header-container ${isDark ? 'dark' : ''}`}>
      <div className="header-content">
        <h2 className="title">
          <a href="/">Where is the world?</a>
        </h2>
        <p
          className="theme-changer"
          id="themeToggle"
          onClick={() => {
            setIsDark(!isDark)
            localStorage.setItem('isDarkMood', !isDark)
          }}
        >
          <i
            className={`fa-solid fa-${isDark ? 'sun' : 'moon'}`}
            id="themeIcon"
          />
          &nbsp;&nbsp;
          <span id="themeLabel">{isDark ? 'Light' : 'Dark'} Mode</span>
        </p>
      </div>
    </header>
  )
}
