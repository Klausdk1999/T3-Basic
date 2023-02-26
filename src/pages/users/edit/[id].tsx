/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
// lista de licensas
import React, { useEffect } from 'react';
import { type NextPage } from "next";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { Paper, TextField, FormControlLabel, Checkbox, Button } from '@mui/material';
import { ContentHeader } from '../../../components/ContentHeader';

import { Header } from '../../../components/Header';

import { useRouter } from 'next/router';
import { api } from "../../../utils/api";

// TELA INICIAL // login

const EditUser: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  
  useEffect(() => {
    if (!router.isReady){
      return;
    }

    console.log('faz algo');
  }, [id, router]);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Box
          sx={{
            my: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <ContentHeader title="Editar usuário" />
          <form noValidate onSubmit={() => console.log('submit')}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="start"
              component={Paper}
              width="100%"
              padding={4}
              mt={2}
            >
              <TextField
                id="name"
                label="Nome"
                name="name"
                autoComplete="name"
                margin="normal"
                autoFocus
                fullWidth
              />
              <TextField
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                margin="normal"
                fullWidth
              />
              <TextField
                id="current_password"
                label="Senha atual"
                name="current_password"
                type="password"
                autoComplete="current-password"
                margin="normal"
                fullWidth
              />
              <TextField
                id="password"
                label={"Nova senha"}
                name="password"
                margin="normal"
                type="password"
                autoComplete="new-password"
                fullWidth
              />
              <TextField
                id="confirm_password"
                label={"Confirmar nova senha"}
                name="confirm_password"
                margin="normal"
                type="password"
                autoComplete="new-password"
                fullWidth
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="is_supervisor"
                    checked={false}
                    // checked={formik.values.is_supervisor}
                    // onChange={formik.handleChange}
                  />
                }
                label="Admin"
              />

              <Box
                sx={{
                  mt: 2,
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 2,
                  alignItems: 'center',
                  justifyContent: 'right',
                }}
              >
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={() => router.back()}
                  sx={{
                    padding: '0.35rem 1rem',
                  }}
                >
                  Voltar
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  // onClick={handleAdd}
                  sx={{
                    padding: '0.35rem 1rem',
                  }}
                >
                  Salvar
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default EditUser;