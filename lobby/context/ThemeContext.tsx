import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'neon-green' | 'cyberpunk-pink' | 'classic-gold' | 'modern-blue';

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>('neon-green');

    useEffect(() => {
        // HTML 태그에 data-theme 속성 설정
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    // 키보드 단축키로 테마 순환 (개발자/테스트용)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.shiftKey && e.key === 'T') {
                setTheme(prev => {
                    if (prev === 'neon-green') return 'cyberpunk-pink';
                    if (prev === 'cyberpunk-pink') return 'classic-gold';
                    if (prev === 'classic-gold') return 'modern-blue';
                    return 'neon-green';
                });
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
