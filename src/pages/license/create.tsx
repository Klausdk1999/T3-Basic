/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
// lista de licensas
import * as React from "react";
import { type NextPage } from "next";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Link from "next/link";
import { Header } from "../../components/Header";
import Button from "@mui/material/Button";
import { api } from "../../utils/api";
// TELA INICIAL // login

const CreateLicense: NextPage = () => {
  const { mutate: createLicensePrisma } = api.licenses.create.useMutation({
      onSuccess: () => alert("License created"),
  });

  const { mutate: createLicenseBpm, isError } = api.bpm.createLicense.useMutation({
    onSuccess: (data) => {
      alert("License created on bpm");
      // createLicensePrisma({objeto licença});
    },
  });
  
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Box
          sx={{
            my: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Create license page
          </Typography>
          <Button
            onClick={() =>
              createLicenseBpm({
                company: { name: "Empresa 1", cnpj: "12345678901234" },
                user: { name: "Usuario 1", email: "email@email.com" },
                area: { name: "Area 1", description: "Descrição da area 1" },
                license: {
                  isActive: true,
                  planName: "Licença 1",
                  userLimit: 10,
                  areaLimit: 10,
                  pricePerUser: 10,
                },
              })
            }
          >
            Criar licença
          </Button>
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

export default CreateLicense;
