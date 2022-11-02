import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as React from 'react';
// import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { deepOrange, deepPurple } from '@mui/material/colors';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { SmsFailedSharp } from '@mui/icons-material';
import { getCurrentUser } from '../helpers/AuthManager';
import myAxios, { myPrivateAxios } from '../config/axios';
import DisplayStaff from './DisplayStaff';

const drawerWidth = 240;

function StaffDetails(props) {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const [staff, setStaff] = useState([]);
  const param = useParams();
  //   console.log(param);
  console.log(currentUser.typeUserCode);

  const getStaffByVenueId = async () => {
    try {
      console.log('try');
      await myPrivateAxios({ method: 'GET', url: `/staff/attribute/venueId/${param.venueId}` }).then((res) => {
        console.log(res.data);
        setStaff(res.data);
      });
      console.log('success');
    } catch (err) {
      console.log('error');
      console.log(err.response.data.message);
    }
  };

  useEffect(() => {
    // if (currentUser.typeUserCode !== 4) {
    //   navigate('/unauth');
    // }
    getStaffByVenueId();
  }, []);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <AppBar
        sx={{
          width: `${drawerWidth}px`,
          mr: `calc(100% - ${drawerWidth}px)`,
        }}
      >
        <Typography variant="h6" noWrap component="div">
          Staff Names
        </Typography>
      </AppBar>
      <Toolbar />
      <Divider />
      <List>
        {staff.map((sf) => (
          <ListItem key={sf.staffId} disablePadding>
            <ListItemButton onClick={() => { <DisplayStaff staff={staff} />; }}>
              <ListItemIcon>
                {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                <Avatar sx={{ bgcolor: deepPurple[500] }}>S</Avatar>
              </ListItemIcon>
              <ListItemText primary={sf.firstName}> </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div>
      StaffDetails

      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Staff :
              {}
            </Typography>
          </Toolbar>
        </AppBar>

        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        {/* {} */}
        {/* <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
        >
          <Toolbar />
          <Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua.
          </Typography>
          <Typography paragraph>
            Consequat mauris nunc congue nisi vitae suscipit.
          </Typography>
        </Box> */}
      </Box>
    </div>
  );
}

export default StaffDetails;

// function ResponsiveDrawer(props) {

// return (
//   );
// }

// StaffDetails.propTypes = {
//   /**
//    * Injected by the documentation to work in an iframe.
//    * You won't need it on your project.
//    */
//   window: PropTypes.func,
// };

// export default ResponsiveDrawer;
