import Button from '../components/ui/Button';
import { useTheme } from './ThemeProvider';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button onClick={toggleTheme}>
      {theme === 'light' ? 'Mörkt läge' : 'Ljust läge'}
    </Button>
  );
}

export default ThemeToggle;
