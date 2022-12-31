import { useAppSelector } from 'hooks/useAppSelector';
import { selectThemeMode } from 'store/selectors';
import { colorTokens, CustomTheme } from 'theme';

export const useThemeColors = (): CustomTheme => {
  const themeMode = useAppSelector(selectThemeMode);

  return colorTokens(themeMode);
};
