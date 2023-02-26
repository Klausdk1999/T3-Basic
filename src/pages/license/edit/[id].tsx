// lista de licensas
import * as React from 'react';
import { type NextPage } from "next";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import Link from "next/link";
import { Header } from '../../../components/Header';

// TELA INICIAL // login

const EditLicense: NextPage = () => {

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
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Edit license page
          </Typography>
          <Box maxWidth="sm">
            <Link href="/" color="primary">
              Go to the home page
            </Link>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default EditLicense;