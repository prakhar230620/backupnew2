import React from 'react';
import { Container, Typography, Box, Avatar, Rating, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    position: "Business Owner",
    avatar: "/images/testimonials/avatar1.jpg",
    rating: 5,
    review: "NIR Real Estate helped me find the perfect commercial space for my business. Their team was professional and understood my requirements perfectly.",
  },
  {
    id: 2,
    name: "Priya Shah",
    position: "Homeowner",
    avatar: "/images/testimonials/avatar2.jpg",
    rating: 5,
    review: "Excellent service! They made the entire process of buying my first home smooth and hassle-free. Highly recommended for their expertise and dedication.",
  },
  {
    id: 3,
    name: "Amit Patel",
    position: "Property Investor",
    avatar: "/images/testimonials/avatar3.jpg",
    rating: 5,
    review: "I've been working with NIR Real Estate for my investment properties. Their market knowledge and professional approach have helped me make smart investments.",
  },
  {
    id: 4,
    name: "Sneha Verma",
    position: "Interior Designer",
    avatar: "/images/testimonials/avatar4.jpg",
    rating: 5,
    review: "Great experience working with NIR Real Estate. Their design team is creative and their construction quality is top-notch. Looking forward to more collaborations.",
  }
];

const TestimonialCard = ({ testimonial }) => (
  <Paper
    elevation={0}
    sx={{
      p: 4,
      mx: 2,
      height: '100%',
      bgcolor: 'background.paper',
      borderRadius: 4,
      textAlign: 'center'
    }}
  >
    <Avatar
      src={testimonial.avatar}
      alt={testimonial.name}
      sx={{
        width: 100,
        height: 100,
        mx: 'auto',
        mb: 2,
        border: 3,
        borderColor: 'primary.main'
      }}
    />
    <Rating value={testimonial.rating} readOnly sx={{ mb: 2 }} />
    <Typography
      variant="body1"
      color="text.secondary"
      sx={{
        mb: 3,
        fontStyle: 'italic',
        minHeight: 80,
        lineHeight: 1.8
      }}
    >
      "{testimonial.review}"
    </Typography>
    <Typography variant="h6" gutterBottom>
      {testimonial.name}
    </Typography>
    <Typography variant="subtitle2" color="text.secondary">
      {testimonial.position}
    </Typography>
  </Paper>
);

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <Box
      sx={{
        py: 8,
        bgcolor: 'grey.50',
        overflow: 'hidden'
      }}
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h2"
            align="center"
            gutterBottom
            sx={{ fontWeight: 600, mb: 1 }}
          >
            Client Testimonials
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            sx={{ mb: 6 }}
          >
            What our clients say about us
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Slider {...settings}>
            {testimonials.map((testimonial) => (
              <div key={testimonial.id}>
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </Slider>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Testimonials; 