import { Box, Typography } from '@mui/material';
import React from 'react';
import Slider from 'react-slick';
import Image from 'mui-image';

const HomePage: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 8000,
  };

  return (
    <>
      <Slider {...settings}>
        <Box>
          <Image
            src="/images/hero1.jpg"
            alt="hero"
            style={{ display: 'block', width: '100%', maxHeight: 600 }}
          />
        </Box>
        <Box>
          <Image
            src="/images/hero2.jpg"
            alt="hero"
            style={{ display: 'block', width: '100%', maxHeight: 600 }}
          />
        </Box>
        <Box>
          <Image
            src="/images/hero3.jpg"
            alt="hero"
            style={{ display: 'block', width: '100%', maxHeight: 600 }}
          />
        </Box>
      </Slider>
      <Box display="flex" justifyContent="center" p={4}>
        <Typography variant="h1">Welcome to the shop!</Typography>
      </Box>
    </>
  );
};

export default HomePage;
