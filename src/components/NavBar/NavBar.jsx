import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


export const NavBar = () => {


  return (
    <Box>
      <AppBar position="static" sx={{ 
        padding: 0.5,
        borderRadius: 1,
        marginTop: 2,
      }}>
        <div>
          <Typography variant="h5" component="div" sx={{
             fontFamily:"system-ui",
             textAlign: 'center',
             height: 50,
          }}> FINANCE APP</Typography>
        </div>
      </AppBar>
    </Box>
  );
}
export default NavBar;
