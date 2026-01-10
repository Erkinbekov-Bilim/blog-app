import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosApi from '../../api/axiosApi';
import BlogForm from '../../components/BlogForm/BlogForm';
import Loading from '../../UI/Loading/Loading';
import type IBlogMutation from '../../types/blog/blogMutation';

const EditBlog = () => {
  const params = useParams<{ idBlog: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [post, setPost] = useState<IBlogMutation | null>(null);

  const getPost = useCallback(async (id: string) => {
    try {
      setLoading(true);

      const response = await axiosApi.get<IBlogMutation>(`/blog/${id}.json`);
      const postData = response.data;
      if (postData) setPost(postData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (params.idBlog) {
      void getPost(params.idBlog);
    }
  }, [params.idBlog, getPost]);

  let page: React.ReactNode = post && (
    <BlogForm id={params.idBlog} initialValueForm={post} />
  );

  if (loading) {
    page = <Loading />;
  }

  return <>{page}</>;
};

export default EditBlog;
