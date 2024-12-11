import React from 'react';
import { Container, Grid, Typography, Box, Card, CardContent, Avatar, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { LinkedIn, Facebook, Twitter } from '@mui/icons-material';

// Team members data
const teamMembers = [
  {
    name: "Niraj Kumar",
    position: "Founder & CEO",
    image: "/images/team/niraj.jpg",
    bio: "15+ years of experience in real estate development and investments.",
    social: {
      linkedin: "#",
      facebook: "#",
      twitter: "#"
    }
  },
  {
    name: "Priya Sharma",
    position: "Head of Design",
    image: "/images/team/priya.jpg",
    bio: "Award-winning interior designer with expertise in luxury properties.",
    social: {
      linkedin: "#",
      facebook: "#",
      twitter: "#"
    }
  },
  {
    name: "Rahul Verma",
    position: "Construction Head",
    image: "/images/team/rahul.jpg",
    bio: "Civil engineer with 12+ years of experience in construction management.",
    social: {
      linkedin: "#",
      facebook: "#",
      twitter: "#"
    }
  }
];

// Company stats
const stats = [
  { number: "10+", label: "Years Experience" },
  { number: "500+", label: "Projects Completed" },
  { number: "1000+", label: "Happy Clients" },
  { number: "50+", label: "Expert Team" }
];

const About = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 12,
          mb: 8
        }}
      >
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Typography variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
                  About NIR Real Estate
                </Typography>
                <Typography variant="h5" sx={{ opacity: 0.9 }}>
                  Building Dreams, Delivering Excellence
                </Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Box
                  component="img"
                  src="/images/about/hero.jpg"
                  alt="About Us"
                  sx={{
                    width: '100%',
                    borderRadius: 4,
                    boxShadow: 3
                  }}
                />
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Our Story Section */}
      <Container sx={{ mb: 8 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <Typography variant="h3" gutterBottom sx={{ fontWeight: 600 }}>
                Our Story
              </Typography>
              <Typography variant="body1" paragraph>
                Founded in 2013, NIR Real Estate has grown from a small local agency to one of the most trusted names in the real estate industry. Our journey began with a simple mission: to transform the real estate experience through innovation, integrity, and excellence.
              </Typography>
              <Typography variant="body1" paragraph>
                Over the years, we've expanded our services to include property development, interior design, construction, and financial services. Our holistic approach ensures that we can meet all our clients' real estate needs under one roof.
              </Typography>
              <Typography variant="body1">
                Today, we're proud to have helped thousands of families find their dream homes and assisted numerous businesses in establishing their perfect commercial spaces.
              </Typography>
            </motion.div>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ position: 'relative' }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Box
                  component="img"
                  src="/images/about/story.jpg"
                  alt="Our Story"
                  sx={{
                    width: '100%',
                    borderRadius: 4,
                    boxShadow: 3
                  }}
                />
              </motion.div>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Stats Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8, mb: 8 }}>
        <Container>
          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" color="primary" sx={{ fontWeight: 700 }}>
                      {stat.number}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      {stat.label}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Team Section */}
      <Container sx={{ mb: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 600 }}>
            Our Leadership Team
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
            Meet the experts behind our success
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card sx={{ height: '100%' }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Avatar
                      src={member.image}
                      alt={member.name}
                      sx={{
                        width: 150,
                        height: 150,
                        mx: 'auto',
                        mb: 2,
                        border: 3,
                        borderColor: 'primary.main'
                      }}
                    />
                    <Typography variant="h5" gutterBottom>
                      {member.name}
                    </Typography>
                    <Typography variant="subtitle1" color="primary" gutterBottom>
                      {member.position}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {member.bio}
                    </Typography>
                    <Box>
                      <IconButton href={member.social.linkedin} color="primary">
                        <LinkedIn />
                      </IconButton>
                      <IconButton href={member.social.facebook} color="primary">
                        <Facebook />
                      </IconButton>
                      <IconButton href={member.social.twitter} color="primary">
                        <Twitter />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default About; 