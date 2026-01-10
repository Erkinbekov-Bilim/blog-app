import React from 'react';
import type IBlog from '../../types/blog/blog';
import { Box, Button, Typography, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import DrawRoundedIcon from '@mui/icons-material/DrawRounded';

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

  const closeButton: React.ReactNode = (
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
  );

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
            justifyContent: 'space-between',
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
          <IconButton
            component={NavLink}
            to={`/posts/${post.id}/edit`}
            sx={{
              width: '50px',
              height: '50px',
              backgroundColor: 'var(--color-bg-card-white)',
              borderRadius: 0,
            }}
          >
            <DrawRoundedIcon />
          </IconButton>
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

        {location.pathname === `/posts/${post.id}` ||
        location.pathname === `/posts/${post.id}/edit` ? (
          <>{closeButton}</>
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

        <Outlet />
      </Box>
    </>
  );
};

export default Card;
