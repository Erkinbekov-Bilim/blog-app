import {
  Box,
  TextField,
  type CSSObject,
  Button,
  Typography,
} from '@mui/material';
import { motion, type MotionNodeOptions } from 'framer-motion';
import React, { useState } from 'react';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import type IBlogMutation from '../../types/blog/blogMutation';
import axiosApi from '../../api/axiosApi';
import { useNavigate } from 'react-router-dom';

interface IBlogFormProps {
  id?: string;
  initialValueForm?: IBlogMutation;
}

const BlogForm: React.FC<IBlogFormProps> = ({
  id,
  initialValueForm = {
    title: '',
    description: '',
  },
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState<IBlogMutation>(initialValueForm);
  const [error, setError] = useState<IBlogMutation>({
    title: '',
    description: '',
  });

  const inputs: string[] = Object.keys(form);

  const MotionButton = motion.create(Button);
  const navigate = useNavigate();

  const inputStyle: CSSObject = {
    backgroundColor: 'var(--color-bg-input)',
    border: 'none',
    borderRadius: 'none',
  };

  let styleBox: CSSObject = {
    width: '100%',
    backgroundColor: 'inherit',
    border: '1px solid var(--color-card-border)',
    padding: '1.5rem',
    textTransform: 'uppercase',
  };

  const animationButton: MotionNodeOptions = {
    initial: {
      scale: 1,
      border: '1px solid var(--color-border-button)',
      color: 'var(--color-text-button)',
      backgroundColor: 'var(--color-bg-button)',
    },
    whileHover: {
      scale: 0.95,
    },
  };

  if (!id) {
    styleBox = {
      ...styleBox,
      width: '700px',
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    };
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;

    setForm((prevState) => ({
      ...prevState,
      [name]: value,
      date: Date(),
    }));
  };

  const validateForm = (key: string): void => {
    if (key) {
      setError((prevState) => ({
        ...prevState,
        [key]: 'This field is required',
      }));
    }
  };

  const onSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();

    try {
      setLoading(true);
      if (id) {
        await axiosApi.put(`/blog/${id}.json`, form);
      } else {
        if (form.title.trim().length === 0) {
          return validateForm('title');
        }

        if (form.description.trim().length === 0) {
          return validateForm('description');
        }
        await axiosApi.post('/blog.json', form);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }

    setForm({
      title: '',
      description: '',
    });

    navigate('/');
  };

  return (
    <>
      {!id && (
        <>
          <Typography
            textAlign={'center'}
            sx={{
              fontSize: '1rem',
              letterSpacing: 'var(--letter-spacing-sm)',
              border: '1px solid var(--color-border-text)',
              color: 'var(--color-text-600)',
              paddingY: '10px',
              textTransform: 'uppercase',
            }}
          >
            {!id && 'add blog!'}
          </Typography>
        </>
      )}
      <Box sx={{ ...styleBox }}>
        <Typography
          sx={{
            fontSize: '1rem',
            letterSpacing: 'var(--letter-spacing-sm)',
            border: '1px solid var(--color-border-text)',
            color: 'var(--color-text-600)',
            paddingY: '10px',
          }}
          textAlign={'center'}
          mb={'20px'}
        >
          {id ? 'update blog' : 'eeeeee new blog!'}
        </Typography>
        <form onSubmit={onSubmit}>
          <Box
            width={'100%'}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            {inputs.map((input: string) => (
              <TextField
                key={String(input)}
                onChange={onChange}
                id="outlined-basic"
                label={String(input)}
                name={String(input)}
                value={form[input as keyof IBlogMutation]}
                variant="outlined"
                color="success"
                sx={{ ...inputStyle }}
                disabled={loading}
                error={Boolean(error[input as keyof IBlogMutation])}
                helperText={error[input as keyof IBlogMutation]}
              />
            ))}

            <MotionButton
              fullWidth
              loading={loading}
              loadingPosition="start"
              sx={{
                padding: '10px',
                borderRadius: 0,
              }}
              type="submit"
              {...animationButton}
              endIcon={!loading && <EmojiEmotionsIcon />}
              disabled={loading}
            >
              {!loading ? (id ? 'Update' : 'New blog!') : ''}
            </MotionButton>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default BlogForm;
