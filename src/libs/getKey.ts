import { PostCommentState, PostState } from "../redux/reducers/post";

const getKey = <T extends PostState[] | PostCommentState[]>(
  pageIndex: number,
  previousPageData: T
) => {
  if (previousPageData && !previousPageData.length) return null;

  return `/post/all?page=${pageIndex}&limit=4`;
};

export default getKey;
