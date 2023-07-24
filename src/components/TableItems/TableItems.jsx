import * as React from 'react';

import { Link } from "react-router-dom";
import { captureId, verificaValor } from "../../helpers";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TablePagination from '@mui/material/TablePagination';
import Typography from '@mui/material/Typography';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import { useContext } from 'react';
import { DataContext } from '../Context/DataContext';
import { useState } from 'react';

export const TableItems = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(4);
  

  const dataItems = useContext(DataContext);
  const currenteData = dataItems.response;

   const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  
  

  return (  
    <Paper sx={{ width: '100%', overflow: 'hidden' }}> 
      <TableContainer >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell><Typography variant='h6'>TITULO</Typography></TableCell>
              <TableCell><Typography variant='h6'>DATA</Typography></TableCell>
              <TableCell><Typography variant='h6'>CATEGORIA</Typography></TableCell>
              <TableCell><Typography variant='h6'>VALOR</Typography></TableCell>
              <TableCell><Typography variant='h6'>AÇÔES</Typography></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {currenteData
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.data}</TableCell>
                <TableCell>{item.categoria}</TableCell>
                <TableCell>{verificaValor(item.valor)} R$</TableCell>
                <TableCell>           

                  <Stack spacing={2} direction="row" marginBottom={1}>                    
                    <Button variant="outlined"><Link to={`/createItem/${item.id}`}><ModeEditOutlineIcon /></Link></Button>
                  </Stack>

                  <Stack spacing={2} direction="row">                    
                    <Button variant="outlined" color='error'  onClick={() => captureId(item.id)}><DeleteForeverIcon /></Button>
                  </Stack>
                </TableCell>             
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[2, 8]}
        component="div"
        count={currenteData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage} />
      </Paper>
    
  );
};
