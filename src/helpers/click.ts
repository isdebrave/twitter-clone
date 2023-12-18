import { NavigateFunction } from "react-router-dom";
import { AsyncThunk } from "@reduxjs/toolkit";

import { AppDispatch } from "../redux/store";

export const clickNavigateHandler = (
  e: React.MouseEvent,
  navigate: NavigateFunction,
  href: string
) => {
  e.stopPropagation();

  navigate(href);
};

export const clickDispatchHandler = <T>(
  e: React.MouseEvent,
  dispatch: AppDispatch,
  thunkAction: AsyncThunk<any, T, any>,
  data: T
) => {
  e.stopPropagation();

  dispatch(thunkAction(data));
};

export const clickSetFunctionHandler = <T>(
  e: React.MouseEvent,
  setFunction: React.Dispatch<React.SetStateAction<T>>,
  value: T
) => {
  e.stopPropagation();

  setFunction(value);
};
