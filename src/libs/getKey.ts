import { PostCommentState, PostState } from "../redux/reducers/post";

// const getKey = <T extends PostState[] | PostCommentState[]>(
//   pageIndex: number,
//   previousPageData: T,
//   pathname: string | null
// ) => {
//   if (previousPageData && !previousPageData.length) return null;

//   return `${pathname}?page=${pageIndex}&limit=3`;
// };

const getKey = (
  { idx, pageIndex }: { idx: number; pageIndex: number },
  pathname: string
) => {
  // console.log(idx, pageIndex);

  return `${pathname}?page=${idx + pageIndex}&limit=3`;
};

export default getKey;
