import React, {FC, ReactNode, useState} from 'react';
import {NavLink} from "react-router-dom";
import {useAppSelector, useThemeColors} from "hooks";
import {selectThemeMode} from "store/selectors";

type Props = {
  to: string;
  children: ReactNode;
  color?: string;
}

export const BaseNavLink: FC<Props> = ({to, children, color}) => {
  const theme = useAppSelector(selectThemeMode);
  const colors = useThemeColors();

  const [isHover, setIsHover] = useState(false);

  const baseStyles = {
    color: color
      ? color
      : theme === 'dark' ? colors.grey.main : colors.primary.second,
    borderBottom: '1px solid transparent',
    transition: 'all .2s ease',
  }

  const hoverStyles = {
    ...baseStyles,
    color: color
      ? color
      : theme === 'dark' ? colors.grey.second : colors.primary.main,
    borderBottom: '1px solid',
  }

  return (
    <NavLink
      style={isHover ? hoverStyles : baseStyles}
      to={to}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {children}
    </NavLink>
  );
};
