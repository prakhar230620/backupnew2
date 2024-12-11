import React from 'react';
import { Container, Grid, Typography, Card, CardMedia, CardContent, Box, Chip, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import { LocationOn, Hotel, Bathtub, AspectRatio, Favorite } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const properties = [
  {
    id: 1,
    title: "Luxury Villa in Bandra",
    location: "Bandra West, Mumbai",
    price: "₹4.5 Cr",
    image: "/images/properties/villa1.jpg",
    bedrooms: 4,
    bathrooms: 3,
    area: "3500 sqft",
    type: "Villa",
    featured: true
  },
  {
    id: 2,
    title: "Modern Apartment in Andheri",
    location: "Andheri East, Mumbai",
    price: "₹1.8 Cr",
    image: "/images/properties/apartment1.jpg",
    bedrooms: 3,
    bathrooms: 2,
    area: "1800 sqft",
    type: "Apartment",
    featured: true
  },
  {
    id: 3,
    title: "Sea View Penthouse",
    location: "Worli, Mumbai",
    price: "₹8.5 Cr",
    image: "/images/properties/penthouse1.jpg",
    bedrooms: 5,
    bathrooms: 4,
    area: "4200 sqft",
    type: "Penthouse",
    featured: true
  }
];

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();

  return (
    <Card
      component={motion.div}
      whileHover={{ y: -10 }}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        cursor: 'pointer',
        '&:hover': {
          boxShadow: 6
        }
      }}
      onClick={() => navigate(`/property/${property.id}`)}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="240"
          image={property.image}
          alt={property.title}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            right: 12,
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Chip
            label={property.type}
            color="primary"
            size="small"
            sx={{ bgcolor: 'rgba(30, 61, 89, 0.8)' }}
          />
          <IconButton
            sx={{
              bgcolor: 'white',
              '&:hover': { bgcolor: 'white', color: 'red' }
            }}
          >
            <Favorite />
          </IconButton>
        </Box>
        <Chip
          label={property.price}
          sx={{
            position: 'absolute',
            bottom: 12,
            right: 12,
            bgcolor: 'secondary.main',
            color: 'white',
            fontWeight: 'bold'
          }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom>
          {property.title}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, color: 'text.secondary' }}>
          <LocationOn sx={{ fontSize: 20, mr: 0.5 }} />
          <Typography variant="body2">{property.location}</Typography>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Hotel sx={{ fontSize: 20, mr: 0.5, color: 'text.secondary' }} />
              <Typography variant="body2">{property.bedrooms} Beds</Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Bathtub sx={{ fontSize: 20, mr: 0.5, color: 'text.secondary' }} />
              <Typography variant="body2">{property.bathrooms} Baths</Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <AspectRatio sx={{ fontSize: 20, mr: 0.5, color: 'text.secondary' }} />
              <Typography variant="body2">{property.area}</Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const FeaturedProperties = () => {
  return (
    <Box sx={{ py: 8, bgcolor: 'background.default' }}>
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
            Featured Properties
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            sx={{ mb: 6 }}
          >
            Discover our handpicked selection of premium properties
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {properties.map((property, index) => (
            <Grid item xs={12} md={4} key={property.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <PropertyCard property={property} />
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturedProperties; 