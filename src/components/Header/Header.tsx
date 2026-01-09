import { AppBar } from '@mui/material';
import NavBar from '../../UI/NavBar/NavBar';
import type INavigate from '../../types/navigate';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import FeedRoundedIcon from '@mui/icons-material/FeedRounded';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

const Header = () => {
  const navigates: INavigate[] = [
    {
      to: '/',
      name: 'home',
      icon: <HomeRoundedIcon />,
    },
    {
      to: '/new-post',
      name: 'add',
      icon: <FeedRoundedIcon />,
    },
    {
      to: '/about',
      name: 'about',
      icon: <SupervisorAccountIcon />,
    },
    {
      to: '/contacts',
      name: 'contacts',
      icon: <AlternateEmailIcon />,
    },
  ];
  return (
    <AppBar
      position="fixed"
      sx={{
        maxWidth: 'var(--app-width)',
        width: 'var(--app-width)',
        bgcolor: 'var(--color-nav-bg)',
        textTransform: 'uppercase',
        boxShadow: 'none',
      }}
    >
      <NavBar navigates={navigates} />
    </AppBar>
  );
};

export default Header;
