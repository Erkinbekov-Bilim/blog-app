import React from 'react';
import type INavigate from '../../../types/navigate';
import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';
import { motion } from 'framer-motion';

interface INavigateItemProps {
  navigate: INavigate;
}

const NavigateItem: React.FC<INavigateItemProps> = ({ navigate }) => {
  const MotionNavLink = motion(NavLink);

  const animation = {
    initial: {
      scale: 1,
    },
    whileHover: {
      scale: 0.85,
    },
  };

  return (
    <Button
      component={MotionNavLink}
      to={navigate.to}
      sx={{
        color: 'var(--color-nav-link)',
        letterSpacing: 'var(--letter-spacing-sm)',
      }}
      startIcon={navigate.icon}
      {...animation}
    >
      {navigate.name}
    </Button>
  );
};

export default NavigateItem;
