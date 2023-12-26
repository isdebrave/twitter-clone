import { useRef, useState } from "react";

const useImage = () => {
  const imagesInputRef = useRef<HTMLInputElement>(null);

  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  //   const formData = new FormData();
  //   for (const file of imageFiles) {
  //     formData.append("bodyImages", file);
  //   }
  //   formData.append("body", data.body);

  return {
    imagesInputRef,
    imagesPreview,
    setImagesPreview,
    imageFiles,
    setImageFiles,
  };
};

export default useImage;
