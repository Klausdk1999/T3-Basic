import React, { useState, useEffect } from 'react';
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

import { api } from "../../utils/api";
import { useRouter } from 'next/router';

interface IUser {
  id: string;
  name: string;
  password: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

const User: NextPage = () => {
  const router = useRouter();
  const getUsers: any = api.users.getAll.useQuery();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [findName, setFindName] = useState('');
  const [users, setUsers] = useState<IUser[]>([] as IUser[]);
  const [usersFiltered, setUsersFiltered] = useState<IUser[]>([] as IUser[]);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, users.length - page * rowsPerPage);

  useEffect(() => {
    if (getUsers.data && getUsers.data.length > 0) {
      console.log('usersData', getUsers.data);
      const tempUsers: IUser[] = getUsers.data;
      setUsers(tempUsers);
    }
  }, [getUsers]);

  useEffect(() => {
    setUsersFiltered(users);
  }, [users]);

  useEffect(() => {
    const usersF = users.filter(
      user =>
        user.name.toUpperCase().trim().indexOf(findName.toUpperCase().trim()) >=
        0,
    );

    setPage(0);
    setUsersFiltered(usersF);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [findName]);

  const handleAddUser = () => {
    void router.push('/users/create');
  };

  /* const handleDeleteUser = (id: string) => {
   const response = api.users.deleteById.useQuery({ id });
  }; */

  const handleEditUser = (id: string) => {
    void router.push(`/users/edit/${id}`);
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
            <ContentHeader title="Usuários" handleAdd={handleAddUser} />
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
                  <TableCell align="left">Usuário</TableCell>
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
                        onClick={() => handleEditUser(user.id)}
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
                        aria-label="Deletar"
                        size="small"
                        // onClick={() => handleDeleteUser(user.id)}
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

export default User;