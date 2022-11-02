import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const drawerWidth = 240;

function DisplayStaff({ staff }) {
  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
    >
      <Toolbar />
      <Typography gutterBottom variant="h6" component="div">
        First Name :
        {' '}
        {staff.stafffirstName}
      </Typography>
      <Typography gutterBottom variant="h6" component="div">
        Last Name :
        {' '}
        {staff.stafflastName}
      </Typography>
    </Box>
  );
}

export default DisplayStaff;
