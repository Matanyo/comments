import * as React from "react";
import AppBar from "@mui/material/AppBar";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { ReactComponent as Logo } from "../assets/brand/logo.svg";
import { styled } from "@mui/system";
import { Grid } from "@mui/material";
import CountUp from "react-countup";

const LogoStyled = styled(Logo)`
  font-size: 3rem;
`;

interface Props {
  commentsCount: number;
  totalComments: number;
}

export default function Header({ commentsCount, totalComments }: Props) {
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
          <Grid item xs={4}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
              textAlign="right"
            >
              <CountUp
                start={Math.abs(commentsCount - 20)}
                end={commentsCount}
                duration={1.5}
                separator=" "
                onEnd={() => console.log("Ended! 👏")}
                onStart={() => console.log("Started! 💨")}
              >
                {({ countUpRef, start }) => (
                  <div>
                    <span ref={countUpRef} />/<span>{totalComments}</span>
                  </div>
                )}
              </CountUp>
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
