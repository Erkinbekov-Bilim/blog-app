import { Route, Routes } from 'react-router-dom';
import Home from './containers/Home/Home';
import Add from './containers/Add/Add';
import About from './containers/About/About';
import Contacts from './containers/Contacts/Contacts';
import { Box } from '@mui/material';
import NotFound from './containers/NotFound/NotFound';
import Layout from './Layout/Layout';

const App = () => {
  return (
    <Box
      sx={{
        maxWidth: 'var(--app-width)',
        width: 'var(--app-width)',
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/new-post"
          element={
            <Layout>
              <Add />
            </Layout>
          }
        />
        <Route
          path="/about"
          element={
            <Layout>
              <About />
            </Layout>
          }
        />
        <Route
          path="/contacts"
          element={
            <Layout>
              <Contacts />
            </Layout>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Box>
  );
};

export default App;
