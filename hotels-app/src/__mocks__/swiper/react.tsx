import React from 'react';

export const Swiper = jest.fn(({ children, ...props }) => (
  <div data-testid="mock-swiper" {...props}>
    {children}
  </div>
));

export const SwiperSlide = jest.fn(({ children, ...props }) => (
  <div data-testid="mock-swiper-slide" {...props}>
    {children}
  </div>
));