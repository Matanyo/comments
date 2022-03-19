const baseURL = "https://jsonplaceholder.typicode.com";

export const commentsKey = "comments";
const limit = 20;

const buildFullURL = (page: number = 1) => {
  return `${baseURL}/${commentsKey}?_limit=${limit}&_page=${page}`;
};

interface IComment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export const fetchCommentsByPage = async ({
  pageParam = 1,
}: {
  pageParam?: number;
}) => {
  const response = await fetch(buildFullURL(pageParam));
  const data: IComment[] = await response.json();
  return data;
};
