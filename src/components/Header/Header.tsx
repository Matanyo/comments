import * as React from "react";
import AppBar from "@mui/material/AppBar";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { ReactComponent as Logo } from "../../assets/brand/logo.svg";
import { styled } from "@mui/system";
import { Grid } from "@mui/material";

const LogoStyled = styled(Logo)`
  font-size: 3rem;
`;

export default function Header() {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item xs={4}>
            <LogoStyled />
          </Grid>
          <Grid item xs={4} textAlign={"center"}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              Comments
            </Typography>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
