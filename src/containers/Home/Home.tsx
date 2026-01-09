import { useCallback, useEffect, useState } from 'react';
import axiosApi from '../../api/axiosApi';
import type IBlogApi from '../../types/blog/blogApi';
import type IBlog from '../../types/blog/blog';
import { Box, Typography } from '@mui/material';
import Card from '../../components/Card/Card';
import Loading from '../../UI/Loading/Loading';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [blog, setBlog] = useState<IBlog[]>([]);

  const getBlog = useCallback(async () => {
    try {
      setLoading(true);

      const response = await axiosApi.get<IBlogApi | null>('/blog.json');
      const blogData = response.data;

      if (blogData) {
        const blogDataIDS: string[] = Object.keys(blogData);
        const rebuiltBlogData: IBlog[] = blogDataIDS.map((id: string) => {
          return {
            ...blogData[id],
            id,
          };
        });

        setBlog(rebuiltBlogData);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void getBlog();
  }, [getBlog]);

  let page: React.ReactNode =
    blog.length === 0 ? (
      <Box
        sx={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="h5"
          component={'div'}
          sx={{
            letterSpacing: 'var(--letter-spacing-sm)',
            textTransform: 'uppercase',
          }}
          mb={4}
          mt={4}
        >
          Blog is empty
        </Typography>
        <SentimentVeryDissatisfiedIcon fontSize="large" />
      </Box>
    ) : (
      <>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 5,
          }}
        >
          {blog.length > 0 &&
            blog.map((post) => <Card post={post} key={post.id} />)}
        </Box>
      </>
    );

  if (loading) {
    page = <Loading />;
  }

  return (
    <>
      <Typography
        variant="h5"
        component={'h1'}
        sx={{
          letterSpacing: 'var(--letter-spacing-sm)',
          textTransform: 'uppercase',
          textAlign: 'center',
        }}
        mb={4}
        mt={4}
      >
        My Blog
      </Typography>
      <Box
        sx={{
          position: 'relative',
        }}
      >
        {page}
      </Box>
    </>
  );
};

export default Home;
