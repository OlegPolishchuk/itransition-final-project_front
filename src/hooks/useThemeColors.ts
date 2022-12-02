import {useAppSelector} from "hooks/useAppSelector";
import {selectThemeMode} from "store/selectors";
import {colorTokens} from "theme";

export const useThemeColors = () => {
  const themeMode = useAppSelector(selectThemeMode);

  return colorTokens(themeMode)
}