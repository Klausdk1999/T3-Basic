/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// lista de licensas
import React, { useState } from 'react';
import { type NextPage } from "next";
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import { Header } from '../../components/Header';
import { ContentHeader } from '../../components/ContentHeader';
import { Edit, Delete } from '@mui/icons-material';
import { 
  TableContainer, 
  Paper, 
  Table, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableBody, 
  IconButton, 
  TableFooter, 
  TablePagination 
} from '@mui/material';

import { useRouter } from 'next/router';

const License: NextPage = () => {
  const router = useRouter();

  const users = [{
    id: '1',
    name: 'Teste',
    email: 'email@teste.com.br'
  }]

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [findName, setFindName] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [usersFiltered, setUsersFiltered] = useState<any[]>(users);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage);

  const handleAddLicense = () => {
    void router.push('/license/create');
  };

  const handleEditLicense = (id: string) => {
    void router.push(`/license/edit/${id}`);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Box
          sx={{
            my: 4,
            display: 'flex',
            flexDirection: 'column',
            // justifyContent: 'center',
            // alignItems: 'center',
            height: '100%'
          }}
        >
          <Box>
            <ContentHeader title="Licenças" handleAdd={handleAddLicense} />
            <TextField
              label="Pesquisar"
              name="find"
              margin="dense"
              size="small"
              variant="outlined"
              fullWidth
              value={findName}
              sx={{ 
                marginTop: 4, 
                maxWidth: '400px'
              }}
              onChange={value => {
                setFindName(value.target.value);
              }}
            />
          </Box>
          <TableContainer 
            component={Paper}
            sx={{
              mt: 2,
              bgcolor: '#fafafa'
            }}
          >
            <Table size="small" aria-label="lista de usuários">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Editar</TableCell>
                  <TableCell align="left">Nome</TableCell>
                  <TableCell align="left">E-mail</TableCell>
                  <TableCell align="center">Excluir</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? usersFiltered.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage,
                    )
                  : usersFiltered
                ).map(user => (
                  <TableRow key={user.id}>
                    <TableCell component="th" scope="row">
                      <IconButton
                        aria-label="Editar"
                        size="small"
                        // onClick={() => handleEdit(user.id)}
                        onClick={() => handleEditLicense(user.id as string)}
                      >
                        <Edit />
                      </IconButton>
                    </TableCell>
                    <TableCell 
                      component="th"
                      scope="row"
                      sx={{
                        width: "50%",
                      }}
                    >
                      {user.name}
                    </TableCell>
                    <TableCell 
                      component="th" 
                      scope="row"
                      sx={{
                        width: "50%",
                      }}
                    >
                      {user.email}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <IconButton
                        aria-label="Editar"
                        size="small"
                        // onClick={() => handleDelete(user.id)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 43 * emptyRows }}>
                    <TableCell colSpan={4} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[10, 15, { label: 'Todos', value: -1 }]}
                    colSpan={4}
                    count={usersFiltered.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    labelRowsPerPage="Linhas por página"
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Box>
      </Container>
    </>
  );
};

export default License;