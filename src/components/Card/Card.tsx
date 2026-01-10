import React from 'react';
import type IBlog from '../../types/blog/blog';
import { Box, Button, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import dayjs from 'dayjs';

interface ICardProps {
  post: IBlog;
}

const Card: React.FC<ICardProps> = ({ post }) => {
  const location = useLocation();

  const MotionNavLink = motion.create(NavLink);

  const animation = {
    initial: {
      scale: 1,
      backgroundColor: 'var(--color-bg-button)',
      color: 'var(--color-text-button)',
    },

    whileHover: {
      scale: 0.95,
    },
  };

  const formattedDate: string = dayjs(post.date).format('DD.MM.YYYY HH:mm:ss');

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'var(--color-bg-card)',
          paddingX: 4,
          paddingY: 3,
          gap: 3,
          border: '1px solid var(--color-card-border)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Typography
            component={'p'}
            variant="body2"
            sx={{
              letterSpacing: 'var(--letter-spacing-sm)',
              backgroundColor: 'var(--color-bg-text-white)',
              padding: 2,
            }}
          >
            Created At - {formattedDate}
          </Typography>
        </Box>
        <Typography
          component={'p'}
          sx={{
            letterSpacing: 'var(--letter-spacing-sm)',
            backgroundColor: 'var(--color-bg-text-white)',
            fontWeight: 'bold',
            padding: 2,
          }}
        >
          {post.title}
        </Typography>

        {location.pathname === `/posts/${post.id}` ? (
          <>
            <Typography
              component={'p'}
              sx={{
                letterSpacing: 'var(--letter-spacing-sm)',
                backgroundColor: 'var(--color-bg-text-white)',
                padding: 2,
              }}
            >
              {post.description}
            </Typography>
            <Button
              component={MotionNavLink}
              sx={{
                borderRadius: 0,
                fontSize: '0.9rem',
                letterSpacing: 'var(--letter-spacing-sm)',
              }}
              {...animation}
              to={`/posts`}
            >
              close
            </Button>
          </>
        ) : (
          <>
            <Button
              component={MotionNavLink}
              sx={{
                borderRadius: 0,
                fontSize: '0.9rem',
                letterSpacing: 'var(--letter-spacing-sm)',
              }}
              {...animation}
              to={`/posts/${post.id}`}
            >
              read more
            </Button>
          </>
        )}
      </Box>
    </>
  );
};

export default Card;
