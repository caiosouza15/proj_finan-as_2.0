import * as React from "react";

import { captureId, verificaValor, verifyItems } from "../../helpers";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TablePagination from "@mui/material/TablePagination";
import Typography from "@mui/material/Typography";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { useContext, useEffect } from "react";
import { DataContext } from "../Context/DataContext";
import { useState } from "react";
import { Box, Container, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { FormItem } from "../FormItem/FormItem";
import { styleModal } from "./styles/styles";
import { Loading } from "../Load/Load";
import { Edit } from "../Edit/Edit";

export const TableItems = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(2);
  const [myId, setMyId] = useState();

  const { items, modalIsOpen, setmodalIsOpen } = useContext(DataContext);

  const handleOpen = (item) => {
    setmodalIsOpen(true);
    setMyId(item);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };  

  const title = ["TITULO", "DATA", "CATEGORIA", "VALOR", "AÇÔES"];
  return (
    <Container sx={{display: "flex" }}>
      <Paper sx={{ width: "100%", overflow: "hidden", }}>
        {items.length ? (
          <div>
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {title.map((title) => (
                      <TableCell key={title}>
                        <Typography variant="h7" >{title}</Typography>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {items
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.data}</TableCell>
                        <TableCell>{item.categoria}</TableCell>
                        <TableCell>{verificaValor(item.valor)} R$</TableCell>
                        <TableCell>
                          <Stack spacing={2} direction="row" marginBottom={1}>
                            <Button
                              variant="outlined"
                              onClick={() => handleOpen(item.id)}
                            >
                              <ModeEditOutlineIcon />
                            </Button>
                            <Modal
                              open={modalIsOpen}
                              onClose={() => setmodalIsOpen(false)}
                              aria-labelledby="modal-modal-title"
                              aria-describedby="modal-modal-description"
                            >
                              <Box sx={styleModal}>
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                  }}
                                >
                                  <Button
                                    color="error"
                                    onClick={() => setmodalIsOpen(false)}
                                  >
                                    <CloseIcon />
                                  </Button>
                                </Box>

                                <FormItem id={myId} />
                              </Box>
                            </Modal>
                          </Stack>

                          <Stack spacing={2} direction="row">
                            <Button
                              variant="outlined"
                              color="error"
                              onClick={() => captureId(item.id)}
                            >
                              <DeleteForeverIcon />
                            </Button>
                            <Modal
                              open={modalIsOpen}
                              onClose={() => setmodalIsOpen(false)}
                              aria-labelledby="modal-modal-title"
                              aria-describedby="modal-modal-description"
                            >
                              <Box sx={styleModal}>
                                <Edit id={myId} />
                              </Box>
                            </Modal>
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
              count={items.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        ) : (
          <Loading marginValue={2} />
        )}
      </Paper>
    </Container>
  );
};
