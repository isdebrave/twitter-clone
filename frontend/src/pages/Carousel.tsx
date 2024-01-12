import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoClose, IoArrowBack, IoArrowForward } from "react-icons/io5";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { src } from "../helpers/image";

import { RootState } from "../redux/store";
import { PostState } from "../redux/reducers/post";

const Carousel = () => {
  const [images, setImages] = useState<string[]>([]);
  const sliderRef = useRef<Slider>(null);

  const post = useSelector((state: RootState) => state.post);
  const posts = useSelector((state: RootState) => state.posts);
  const profile = useSelector((state: RootState) => state.profile);

  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // post
    let data: PostState | undefined = post;

    // posts
    if (data.images.length === 0 || postId !== data.id) {
      data = posts.find((post) => post.id === postId);
    }

    // profile
    if (!data) {
      data = profile.posts.find((post) => post.id === postId);
    }

    console.log(data);

    if (data) {
      setImages(data.images);
    }
  }, [post, postId, posts, profile.posts]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: 1,
    swipe: true,
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
        {images.map((image, idx) => (
          <li key={image + idx}>
            <img src={src(image)} alt="postImage" />
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
