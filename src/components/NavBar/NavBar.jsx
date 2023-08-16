import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


export const NavBar = () => {


  return (
    <Box>
      <AppBar position="static" color={'transparent'} sx={{ 
        padding: 0.5,
        borderRadius: 1
      }}>
        <div>
          <Typography variant="h6" component="div" sx={{
             fontFamily:"system-ui",
             textAlign: 'center'
          }}> FINANCE APP</Typography>
        </div>
      </AppBar>
    </Box>
  );
}
export default NavBar;
