import React from "react";
import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";

const NotFound = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <div
        className="
            flex 
            flex-col 
            justify-center 
            items-center 
            w-full 
            h-full 
            gap-3
        "
      >
        <h1 className="text-2xl sm:text-3xl">페이지가 존재하지 않습니다.</h1>
        <button
          className="text-sky-500 hover:underline"
          onClick={() => navigate(-1)}
        >
          돌아가기
        </button>
      </div>
    );
  }
};

export default NotFound;
