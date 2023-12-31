import { PostCommentState, PostState } from "../redux/reducers/post";

const getKey = <T extends PostState[] | PostCommentState[]>(
  pageIndex: number,
  previousPageData: T,
  pathname: string | null
) => {
  if (previousPageData && !previousPageData.length) return null;

  return `${pathname}?page=${pageIndex}&limit=7`;
};

export default getKey;
