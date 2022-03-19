import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { commentsKey, IComment } from "../../api";
import { CardStyled } from "../Shared/Card.style";

const defaultValues: IComment = {
  id: 0,
  email: "",
  body: "",
  name: "",
  postId: 1,
};

const GridStyled = styled(Grid)`
  & .full-width {
    width: 100%;
  }
`;

interface Props {}

export const AddCommentForm = (props: Props) => {
  const [formValues, setFormValues] = useState(defaultValues);
  const queryClient = useQueryClient();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const requestValues = {
      ...formValues,
      id: crypto.getRandomValues(new Uint32Array(1))[0],
    };
    console.log(requestValues);

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(requestValues),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((newComment) => {
        const data: any = queryClient.getQueryData(commentsKey);
        const { pageParams, pages } = data;
        const [firstPage] = pages;
        const newFirstPage = [newComment, ...firstPage];
        const newPages = [...pages];
        newPages[0] = newFirstPage;

        queryClient.setQueryData(commentsKey, { pages: newPages, pageParams });
      });
  };
  return (
    <GridStyled container alignItems="center" direction="column" rowSpacing={2}>
      <Grid item className="full-width">
        <CardStyled>
          <CardHeader title="Add Your Comment"></CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Grid
                container
                alignItems="center"
                direction="column"
                rowSpacing={2}
              >
                <Grid item className="full-width">
                  <TextField
                    className="full-width"
                    name="email"
                    label="Email"
                    type="email"
                    value={formValues.email}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item className="full-width">
                  <TextField
                    className="full-width"
                    name="name"
                    label="Comment Subject"
                    type="text"
                    minRows={1}
                    multiline
                    value={formValues.name}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item className="full-width">
                  <TextField
                    className="full-width"
                    name="body"
                    label="Comment"
                    type="text"
                    minRows={4}
                    multiline
                    value={formValues.body}
                    onChange={handleInputChange}
                  />
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary" type="submit">
                    Add Comment
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </CardStyled>
      </Grid>
    </GridStyled>
  );
};
