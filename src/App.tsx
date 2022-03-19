import { styled } from "@mui/system";
import Header from "./components/Header/Header";
import { useEffect, useState } from "react";
import { ScrollTop } from "./components/ScrollToUp/ScrollToUp";
import { Comments } from "./components/Comments/Comments";
import { AddCommentForm } from "./components/AddCommentForm/AddCommentForm";

const MainStyled = styled("main")`
  margin: 0 auto;
  max-width: 960px;
  padding: 0px 1.5rem;
  margin-top: 64px;
  padding-block: 1.4rem;
  display: grid;
  gap: 20px;
`;

function App() {
  return (
    <div className="App">
      <span id="back-to-top-anchor"></span>
      <Header />
      <MainStyled>
        <AddCommentForm />
        <Comments />
      </MainStyled>
      <ScrollTop></ScrollTop>
    </div>
  );
}

export default App;
