import { format } from "date-fns";
import React, { useMemo } from "react";

interface PostFooterProps {
  createdAt: string;
}

const PostFooter: React.FC<PostFooterProps> = ({ createdAt }) => {
  const customizedCreatedAt = useMemo(() => {
    if (createdAt) {
      return format(new Date(createdAt), "h:mm a · MMM d, yyyy");
    }
  }, [createdAt]);

  return (
    <p className="text-gray-500">
      {customizedCreatedAt} · <span className="font-bold text-black">1</span>{" "}
      View
    </p>
  );
};

export default PostFooter;
