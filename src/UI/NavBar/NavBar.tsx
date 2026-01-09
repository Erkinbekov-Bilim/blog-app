import { Toolbar, Box } from '@mui/material';
import type INavigate from '../../types/navigate';
import NavigateItem from './NavigateItem/NavigateItem';

interface INavBarProps {
  navigates: INavigate[];
}

const NavBar: React.FC<INavBarProps> = ({ navigates }) => {
  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <Toolbar>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            gap: 15,
          }}
        >
          {navigates.map((navigate) => (
            <NavigateItem navigate={navigate} />
          ))}
        </Box>
      </Toolbar>
    </Box>
  );
};

export default NavBar;
