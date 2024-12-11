const sql = require('../server');

const Design = function(design) {
  this.title = design.title;
  this.description = design.description;
  this.category = design.category; // interior, exterior, landscape, etc.
  this.style = design.style;
  this.area_sqft = design.area_sqft;
  this.estimated_cost = design.estimated_cost;
  this.features = design.features;
  this.status = design.status || 'active';
  this.created_by = design.created_by; // admin_id
};

// Create new design (admin only)
Design.create = async (newDesign, media, result) => {
  try {
    sql.beginTransaction();

    // Insert design details
    const query = "INSERT INTO design_projects SET ?";
    const res = await sql.query(query, newDesign);
    const designId = res.insertId;

    // Insert media files
    if (media && media.length > 0) {
      const mediaQuery = "INSERT INTO design_media (design_id, media_type, media_url, is_primary) VALUES ?";
      const mediaValues = media.map(file => [
        designId,
        file.type,
        file.url,
        file.isPrimary || false
      ]);
      await sql.query(mediaQuery, [mediaValues]);
    }

    await sql.commit();
    result(null, { id: designId, ...newDesign });
  } catch (err) {
    await sql.rollback();
    console.log("Error: ", err);
    result(err, null);
  }
};

// Get all designs by category
Design.getByCategory = (category, result) => {
  sql.query(
    `SELECT d.*, 
     GROUP_CONCAT(DISTINCT CASE WHEN dm.is_primary = 1 THEN dm.media_url END) as primary_image,
     GROUP_CONCAT(DISTINCT CASE WHEN dm.is_primary = 0 THEN dm.media_url END) as gallery_images
     FROM design_projects d
     LEFT JOIN design_media dm ON d.design_id = dm.design_id
     WHERE d.category = ? AND d.status = 'active'
     GROUP BY d.design_id
     ORDER BY d.created_at DESC`,
    category,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }
      
      // Format the results
      const designs = res.map(design => ({
        ...design,
        primary_image: design.primary_image || '',
        gallery_images: design.gallery_images ? design.gallery_images.split(',') : []
      }));
      
      result(null, designs);
    }
  );
};

// Get design details by ID
Design.findById = (designId, result) => {
  sql.query(
    `SELECT d.*, 
     GROUP_CONCAT(DISTINCT CASE WHEN dm.is_primary = 1 THEN dm.media_url END) as primary_image,
     GROUP_CONCAT(DISTINCT CASE WHEN dm.is_primary = 0 THEN dm.media_url END) as gallery_images,
     u.name as created_by_name
     FROM design_projects d
     LEFT JOIN design_media dm ON d.design_id = dm.design_id
     LEFT JOIN users u ON d.created_by = u.user_id
     WHERE d.design_id = ?
     GROUP BY d.design_id`,
    designId,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        const design = {
          ...res[0],
          primary_image: res[0].primary_image || '',
          gallery_images: res[0].gallery_images ? res[0].gallery_images.split(',') : []
        };
        result(null, design);
      } else {
        result({ kind: "not_found" }, null);
      }
    }
  );
};

// Update design (admin only)
Design.update = async (designId, design, media, result) => {
  try {
    sql.beginTransaction();

    // Update design details
    const updateQuery = `
      UPDATE design_projects 
      SET title = ?, description = ?, category = ?, 
          style = ?, area_sqft = ?, estimated_cost = ?,
          features = ?, status = ?
      WHERE design_id = ? AND created_by = ?
    `;

    await sql.query(updateQuery, [
      design.title,
      design.description,
      design.category,
      design.style,
      design.area_sqft,
      design.estimated_cost,
      design.features,
      design.status,
      designId,
      design.created_by
    ]);

    // Update media if provided
    if (media && media.length > 0) {
      // Delete existing media
      await sql.query("DELETE FROM design_media WHERE design_id = ?", designId);

      // Insert new media
      const mediaQuery = "INSERT INTO design_media (design_id, media_type, media_url, is_primary) VALUES ?";
      const mediaValues = media.map(file => [
        designId,
        file.type,
        file.url,
        file.isPrimary || false
      ]);
      await sql.query(mediaQuery, [mediaValues]);
    }

    await sql.commit();
    result(null, { id: designId, ...design });
  } catch (err) {
    await sql.rollback();
    console.log("Error: ", err);
    result(err, null);
  }
};

// Delete design (admin only)
Design.remove = async (designId, adminId, result) => {
  try {
    sql.beginTransaction();

    // Delete media files first
    await sql.query("DELETE FROM design_media WHERE design_id = ?", designId);

    // Delete design
    const res = await sql.query(
      "DELETE FROM design_projects WHERE design_id = ? AND created_by = ?",
      [designId, adminId]
    );

    if (res.affectedRows == 0) {
      await sql.rollback();
      result({ kind: "not_found" }, null);
      return;
    }

    await sql.commit();
    result(null, { message: "Design deleted successfully" });
  } catch (err) {
    await sql.rollback();
    console.log("Error: ", err);
    result(err, null);
  }
};

module.exports = Design; 