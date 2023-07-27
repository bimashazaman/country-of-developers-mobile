/* eslint-disable react/react-in-jsx-scope */
import {Switch} from 'react-native';

const ThemeSwitcher = ({isDarkMode, setIsDarkMode}) => {
  const toggleSwitch = () => setIsDarkMode(previousState => !previousState);

  return <Switch value={isDarkMode} onValueChange={toggleSwitch} />;
};

export default ThemeSwitcher;
