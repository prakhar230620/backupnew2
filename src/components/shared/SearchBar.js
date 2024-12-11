import React, { useState } from 'react';
import {
  Paper,
  InputBase,
  IconButton,
  Divider,
  Box,
  Select,
  MenuItem,
  FormControl
} from '@mui/material';
import { Search, LocationOn } from '@mui/icons-material';

const SearchBar = () => {
  const [propertyType, setPropertyType] = useState('all');
  const [location, setLocation] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    // Implement search functionality
    console.log({
      propertyType,
      location,
      searchTerm
    });
  };

  return (
    <Paper
      component="form"
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        bgcolor: 'rgba(255,255,255,0.95)'
      }}
      elevation={3}
    >
      <FormControl sx={{ minWidth: 120, m: 1 }}>
        <Select
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          displayEmpty
          variant="standard"
          sx={{ '.MuiSelect-select': { py: 0 } }}
        >
          <MenuItem value="all">All Types</MenuItem>
          <MenuItem value="house">House</MenuItem>
          <MenuItem value="apartment">Apartment</MenuItem>
          <MenuItem value="villa">Villa</MenuItem>
        </Select>
      </FormControl>

      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

      <Box sx={{ display: 'flex', alignItems: 'center', mx: 1, flex: 1 }}>
        <LocationOn sx={{ color: 'action.active', mr: 1 }} />
        <InputBase
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          sx={{ flex: 1 }}
        />
      </Box>

      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

      <InputBase
        sx={{ ml: 1, flex: 2 }}
        placeholder="Search properties..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <IconButton 
        type="button" 
        sx={{ p: '10px', bgcolor: 'primary.main', color: 'white', '&:hover': { bgcolor: 'primary.dark' } }} 
        aria-label="search"
        onClick={handleSearch}
      >
        <Search />
      </IconButton>
    </Paper>
  );
};

export default SearchBar; 