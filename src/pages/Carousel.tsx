import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoClose, IoArrowBack, IoArrowForward } from "react-icons/io5";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { RootState } from "../redux/store";
import axios from "axios";

const Carousel = () => {
  const { postId } = useParams();
  const posts = useSelector((state: RootState) => state.posts);
  const [images, setImages] = useState<string[]>([]);
  const navigate = useNavigate();
  const sliderRef = useRef<Slider>(null);

  useEffect(() => {
    const post = posts.find((post) => post.id === postId);

    if (post) {
      setImages(post.images);
    }
  }, [postId, posts]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 1,
    swipe: false,
  };

  return (
    <div className="fixed inset-0 z-20 bg-black">
      <button
        className="absolute top-0 left-0 m-2 z-20"
        onClick={() => navigate(-1)}
      >
        <IoClose className="text-white" size={30} />
      </button>

      {images.length > 1 && (
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 m-2"
          onClick={() => sliderRef.current?.slickPrev()}
        >
          <IoArrowBack className="text-white" size={20} />
        </button>
      )}

      <Slider ref={sliderRef} {...settings}>
        {images.map((src, idx) => (
          <li key={src + idx}>
            <img src={`${axios.defaults.baseURL}/${src}`} alt="postImage" />
          </li>
        ))}
      </Slider>

      {images.length > 1 && (
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 m-2"
          onClick={() => sliderRef.current?.slickNext()}
        >
          <IoArrowForward className="text-white" size={20} />
        </button>
      )}
    </div>
  );
};

export default Carousel;
