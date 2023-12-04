import { format } from "date-fns";
import React, { useMemo } from "react";

interface PostFooterProps {
  createdAt: string;
  views: number;
}

const PostFooter: React.FC<PostFooterProps> = ({ createdAt, views }) => {
  const customizedCreatedAt = useMemo(() => {
    if (createdAt) {
      return format(new Date(createdAt), "h:mm a · MMM d, yyyy");
    }
  }, [createdAt]);

  return (
    <p className="text-gray-500">
      {customizedCreatedAt} ·{" "}
      <span className="font-bold text-black">{views}</span> View
    </p>
  );
};

export default PostFooter;
