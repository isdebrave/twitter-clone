import React from "react";
import { format } from "date-fns";

interface PostFooterProps {
  createdAt: string;
  views: number;
}

const PostFooter: React.FC<PostFooterProps> = ({ createdAt, views }) => {
  return (
    <p className="text-gray-500">
      {createdAt && format(new Date(createdAt), "h:mm a · MMM d, yyyy")} ·{" "}
      <span className="font-bold text-black">{views}</span> View
    </p>
  );
};

export default PostFooter;
