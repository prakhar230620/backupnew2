const sql = require('../server');

const Property = function(property) {
  this.user_id = property.user_id;
  this.title = property.title;
  this.description = property.description;
  this.property_type = property.property_type;
  this.price = property.price;
  this.location = property.location;
  this.area_sqft = property.area_sqft;
  this.bedrooms = property.bedrooms;
  this.bathrooms = property.bathrooms;
  this.status = property.status || 'active';
};

// Create new property
Property.create = async (newProperty, media, result) => {
  try {
    sql.beginTransaction();

    // Insert property
    const propertyQuery = "INSERT INTO properties SET ?";
    const propertyResult = await sql.query(propertyQuery, newProperty);
    const propertyId = propertyResult.insertId;

    // Insert media files
    if (media && media.length > 0) {
      const mediaQuery = "INSERT INTO property_media (property_id, media_type, media_url, is_primary) VALUES ?";
      const mediaValues = media.map(file => [
        propertyId,
        file.type,
        file.url,
        file.isPrimary || false
      ]);
      await sql.query(mediaQuery, [mediaValues]);
    }

    await sql.commit();
    result(null, { id: propertyId, ...newProperty });
  } catch (err) {
    await sql.rollback();
    console.log("Error: ", err);
    result(err, null);
  }
};

// Get all properties with filters
Property.getAll = (filters, result) => {
  let query = `
    SELECT p.*, 
           pm.media_url as primary_image,
           u.name as owner_name
    FROM properties p
    LEFT JOIN (
      SELECT property_id, media_url 
      FROM property_media 
      WHERE is_primary = true
    ) pm ON p.property_id = pm.property_id
    LEFT JOIN users u ON p.user_id = u.user_id
    WHERE 1=1
  `;

  const queryParams = [];

  if (filters.type) {
    query += " AND p.property_type = ?";
    queryParams.push(filters.type);
  }

  if (filters.minPrice) {
    query += " AND p.price >= ?";
    queryParams.push(filters.minPrice);
  }

  if (filters.maxPrice) {
    query += " AND p.price <= ?";
    queryParams.push(filters.maxPrice);
  }

  if (filters.location) {
    query += " AND p.location LIKE ?";
    queryParams.push(`%${filters.location}%`);
  }

  if (filters.status) {
    query += " AND p.status = ?";
    queryParams.push(filters.status);
  }

  query += " ORDER BY p.created_at DESC";

  sql.query(query, queryParams, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

// Get property by ID with all details
Property.findById = (propertyId, result) => {
  sql.query(
    `SELECT p.*, 
            u.name as owner_name,
            u.email as owner_email,
            u.mobile as owner_mobile
     FROM properties p
     LEFT JOIN users u ON p.user_id = u.user_id
     WHERE p.property_id = ?`, 
    propertyId,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        // Get property media
        sql.query(
          "SELECT * FROM property_media WHERE property_id = ?",
          propertyId,
          (err, media) => {
            if (err) {
              console.log("Error: ", err);
              result(err, null);
              return;
            }
            res[0].media = media;
            result(null, res[0]);
          }
        );
      } else {
        result({ kind: "not_found" }, null);
      }
    }
  );
};

// Update property
Property.updateById = async (propertyId, property, media, result) => {
  try {
    sql.beginTransaction();

    // Update property details
    const updateQuery = `
      UPDATE properties 
      SET title = ?, description = ?, price = ?, location = ?,
          area_sqft = ?, bedrooms = ?, bathrooms = ?, status = ?
      WHERE property_id = ? AND user_id = ?
    `;

    await sql.query(updateQuery, [
      property.title,
      property.description,
      property.price,
      property.location,
      property.area_sqft,
      property.bedrooms,
      property.bathrooms,
      property.status,
      propertyId,
      property.user_id
    ]);

    // Update media if provided
    if (media && media.length > 0) {
      // Delete existing media
      await sql.query("DELETE FROM property_media WHERE property_id = ?", propertyId);

      // Insert new media
      const mediaQuery = "INSERT INTO property_media (property_id, media_type, media_url, is_primary) VALUES ?";
      const mediaValues = media.map(file => [
        propertyId,
        file.type,
        file.url,
        file.isPrimary || false
      ]);
      await sql.query(mediaQuery, [mediaValues]);
    }

    await sql.commit();
    result(null, { id: propertyId, ...property });
  } catch (err) {
    await sql.rollback();
    console.log("Error: ", err);
    result(err, null);
  }
};

// Delete property
Property.remove = async (propertyId, userId, result) => {
  try {
    sql.beginTransaction();

    // Delete media files first
    await sql.query("DELETE FROM property_media WHERE property_id = ?", propertyId);

    // Delete property
    const deleteQuery = "DELETE FROM properties WHERE property_id = ? AND user_id = ?";
    const res = await sql.query(deleteQuery, [propertyId, userId]);

    if (res.affectedRows == 0) {
      await sql.rollback();
      result({ kind: "not_found" }, null);
      return;
    }

    await sql.commit();
    result(null, { message: "Property deleted successfully" });
  } catch (err) {
    await sql.rollback();
    console.log("Error: ", err);
    result(err, null);
  }
};

module.exports = Property; 