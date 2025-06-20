import React from 'react';
import Slider from 'react-slick';

const Carousel = ({ images, autoplay = true }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: autoplay,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    adaptiveHeight: true,
    fade: true,
    cssEase: 'ease-in-out',
  };

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-96 bg-slate-700 rounded-xl flex items-center justify-center">
        <p className="text-gray-400">No images available</p>
      </div>
    );
  }

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-96 object-cover rounded-xl"
              onError={(e) => {
                e.target.src = 'https://images.pexels.com/photos/3747468/pexels-photo-3747468.jpeg?auto=compress&cs=tinysrgb&w=800';
              }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;