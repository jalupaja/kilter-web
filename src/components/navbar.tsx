import { useState, useContext } from 'preact/hooks';
import { ThemeContext } from '../theme.ts';

const NavBar = () => {
    const [activeConnection, setActiveConnection] = useState(false);
    const { theme, toggleTheme } = useContext(ThemeContext);

    const switchTheme = () => {
        toggleTheme();
    };

    const activateConnection = () => {
        console.log("connecting ...");
        setActiveConnection(prev => !prev);
    };

    const shareContent = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'share title',
                    text: 'share text',
                    url: window.location.href,
                });
            } catch (error) {
                console.error('Error sharing:', error);
            }
        } else {
            alert('Share API not supported in your browser.');
            // TODO better alerts
        }
    };

    return (
        <header
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                padding: '15px',
                background: theme.background2,
            }}
        >
            <button
                onClick={switchTheme}
                style={{
                    marginRight: '1rem',
                    background: theme.background,
                }}
            >
                Switch Theme
            </button>
            <input
                type="search"
                placeholder="Search..."
                style={{
                    flex: 1,
                    marginRight: '1rem',
                    background: theme.background,
                }}
            />
            <button
                onClick={shareContent}
                style={{
                    marginRight: '1rem',
                    background: theme.background,
                }}
            >
                Share
            </button>
            <button
                onClick={activateConnection}
                style={{
                    background: activeConnection ? 'red' : theme.background,
                }}
            >
                {activeConnection ? 'Light On' : 'Light Off'}
            </button>
        </header>
    );
};

export default NavBar;
