const sql = require('../server');

const Listing = function(listing) {
  this.user_id = listing.user_id;
  this.title = listing.title;
  this.description = listing.description;
  this.category = listing.category;
  this.price = listing.price;
  this.location = listing.location;
  this.status = listing.status || 'pending';
  this.video_url = listing.video_url;
  this.contact_info = listing.contact_info;
  this.specifications = listing.specifications;
};

// Create new listing
Listing.create = async (newListing, media, result) => {
  try {
    sql.beginTransaction();

    // Verify if user has a complete profile
    const userProfile = await sql.query(
      "SELECT * FROM users WHERE user_id = ? AND is_profile_complete = 1",
      [newListing.user_id]
    );

    if (!userProfile.length) {
      throw new Error("Please complete your profile before creating a listing");
    }

    // Insert listing
    const query = "INSERT INTO user_listings SET ?";
    const res = await sql.query(query, newListing);
    const listingId = res.insertId;

    // Insert media files
    if (media && media.length > 0) {
      const mediaQuery = "INSERT INTO listing_media (listing_id, media_type, media_url) VALUES ?";
      const mediaValues = media.map(file => [
        listingId,
        file.type,
        file.url
      ]);
      await sql.query(mediaQuery, [mediaValues]);
    }

    await sql.commit();
    result(null, { id: listingId, ...newListing });
  } catch (err) {
    await sql.rollback();
    console.log("Error: ", err);
    result(err, null);
  }
};

// Get user's listings
Listing.getByUserId = (userId, result) => {
  sql.query(
    `SELECT l.*, 
     GROUP_CONCAT(DISTINCT lm.media_url) as media_urls
     FROM user_listings l
     LEFT JOIN listing_media lm ON l.listing_id = lm.listing_id
     WHERE l.user_id = ?
     GROUP BY l.listing_id
     ORDER BY l.created_at DESC`,
    userId,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }
      
      // Format the results
      const listings = res.map(listing => ({
        ...listing,
        media_urls: listing.media_urls ? listing.media_urls.split(',') : []
      }));
      
      result(null, listings);
    }
  );
};

// Get all active listings
Listing.getAllActive = (filters, result) => {
  let query = `
    SELECT l.*, u.name as user_name, u.email as user_email,
    GROUP_CONCAT(DISTINCT lm.media_url) as media_urls
    FROM user_listings l
    JOIN users u ON l.user_id = u.user_id
    LEFT JOIN listing_media lm ON l.listing_id = lm.listing_id
    WHERE l.status = 'approved'
  `;

  const queryParams = [];

  if (filters.category) {
    query += " AND l.category = ?";
    queryParams.push(filters.category);
  }

  if (filters.location) {
    query += " AND l.location LIKE ?";
    queryParams.push(`%${filters.location}%`);
  }

  if (filters.minPrice) {
    query += " AND l.price >= ?";
    queryParams.push(filters.minPrice);
  }

  if (filters.maxPrice) {
    query += " AND l.price <= ?";
    queryParams.push(filters.maxPrice);
  }

  query += " GROUP BY l.listing_id ORDER BY l.created_at DESC";

  sql.query(query, queryParams, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }

    const listings = res.map(listing => ({
      ...listing,
      media_urls: listing.media_urls ? listing.media_urls.split(',') : []
    }));

    result(null, listings);
  });
};

// Update listing
Listing.update = async (listingId, userId, listing, media, result) => {
  try {
    sql.beginTransaction();

    // Verify ownership
    const ownerCheck = await sql.query(
      "SELECT * FROM user_listings WHERE listing_id = ? AND user_id = ?",
      [listingId, userId]
    );

    if (!ownerCheck.length) {
      throw new Error("Not authorized to update this listing");
    }

    // Update listing details
    const updateQuery = `
      UPDATE user_listings 
      SET title = ?, description = ?, category = ?, 
          price = ?, location = ?, specifications = ?
      WHERE listing_id = ? AND user_id = ?
    `;

    await sql.query(updateQuery, [
      listing.title,
      listing.description,
      listing.category,
      listing.price,
      listing.location,
      listing.specifications,
      listingId,
      userId
    ]);

    // Update media if provided
    if (media && media.length > 0) {
      await sql.query("DELETE FROM listing_media WHERE listing_id = ?", listingId);

      const mediaQuery = "INSERT INTO listing_media (listing_id, media_type, media_url) VALUES ?";
      const mediaValues = media.map(file => [
        listingId,
        file.type,
        file.url
      ]);
      await sql.query(mediaQuery, [mediaValues]);
    }

    await sql.commit();
    result(null, { id: listingId, ...listing });
  } catch (err) {
    await sql.rollback();
    console.log("Error: ", err);
    result(err, null);
  }
};

// Delete listing
Listing.remove = async (listingId, userId, result) => {
  try {
    sql.beginTransaction();

    // Verify ownership
    const ownerCheck = await sql.query(
      "SELECT * FROM user_listings WHERE listing_id = ? AND user_id = ?",
      [listingId, userId]
    );

    if (!ownerCheck.length) {
      throw new Error("Not authorized to delete this listing");
    }

    // Delete media files
    await sql.query("DELETE FROM listing_media WHERE listing_id = ?", listingId);

    // Delete listing
    await sql.query(
      "DELETE FROM user_listings WHERE listing_id = ? AND user_id = ?",
      [listingId, userId]
    );

    await sql.commit();
    result(null, { message: "Listing deleted successfully" });
  } catch (err) {
    await sql.rollback();
    console.log("Error: ", err);
    result(err, null);
  }
};

module.exports = Listing; 