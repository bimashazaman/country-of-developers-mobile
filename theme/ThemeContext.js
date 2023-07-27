import React, {useState} from 'react';

export const ThemeContext = React.createContext({
  theme: 'light',
  setTheme: () => {},
});

const ThemeContextProvider = ({children}) => {
  const [theme, setTheme] = useState('light');

  const handleSetTheme = newTheme => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{theme, setTheme: handleSetTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
