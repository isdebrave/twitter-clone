import axios from "axios";
import toast from "react-hot-toast";

export const src = (image: string) => {
  // coverImage는 ""면 src를 호출하지 않는다.
  if (image.length === 0) {
    return "/images/anonymous.jpg";
  }

  // if (image.includes("http") || image.includes("data")) {
  //   return image;
  // }

  // return `${axios.defaults.baseURL}/${image}`;

  console.log(image);

  return image;
};

export const addImageHandler = (
  e: React.ChangeEvent<HTMLInputElement>,
  imageCallback: (file: File) => void,
  imagePreviewCallback: (data: string) => void,
  imageFiles?: File[]
) => {
  const files = e.target.files;

  if (!files) return;

  // writePost에서 image를 선택할 경우
  if (imageFiles && files.length + imageFiles.length > 4) {
    return toast.error("최대 4개까지 선택 가능합니다.");
  }

  for (let i = 0; i < files.length; i++) {
    imageCallback(files[i]);

    const reader = new FileReader();
    reader.readAsDataURL(files[i]);
    reader.onload = (e) => {
      if (e.target) {
        imagePreviewCallback(e.target.result as string);
      }
    };
  }
};

export const removeImageHandler = (
  e: React.MouseEvent,
  ref: React.RefObject<HTMLInputElement>,
  imageCallback: (fileArray?: File[]) => void,
  imagePreviewCallback: (dataArray?: string[]) => void,
  imageFiles?: File[],
  imagesPreview?: string[]
) => {
  if (ref.current) {
    ref.current.value = "";
  }

  // writePost에서 여러 장의 image를 제거할 경우
  if (imagesPreview && imageFiles) {
    const removeIdx = parseInt(
      (e.target as HTMLImageElement).getAttribute("data-idx") || "",
      10
    );

    const updatedImagesFiles = imageFiles.filter((_, idx) => idx !== removeIdx);
    imageCallback(updatedImagesFiles);

    const updatedImagesPreview = imagesPreview.filter(
      (_, idx) => idx !== removeIdx
    );
    imagePreviewCallback(updatedImagesPreview);

    return;
  }

  imageCallback();
  imagePreviewCallback();
};
