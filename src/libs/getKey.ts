import { CommentState } from "../redux/reducers/comments";
import { PostState } from "../redux/reducers/post";

const getKey = <T extends PostState[] | CommentState[]>(
  pageIndex: number,
  previousPageData: T
) => {
  if (previousPageData && !previousPageData.length) return null;

  return `/post/all?page=${pageIndex}&limit=4`;
};

export default getKey;
