import { Toolbar, Box } from '@mui/material';
import type INavigate from '../../types/navigate/navigate';
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
          {navigates.map((navigate, index) => (
            <NavigateItem navigate={navigate} key={navigate.name + index} />
          ))}
        </Box>
      </Toolbar>
    </Box>
  );
};

export default NavBar;
