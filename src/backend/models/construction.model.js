const sql = require('../server');

const Construction = function(project) {
  this.title = project.title;
  this.description = project.description;
  this.category = project.category;
  this.status = project.status || 'ongoing';
  this.location = project.location;
  this.area_sqft = project.area_sqft;
  this.completion_date = project.completion_date;
  this.features = project.features;
  this.specifications = project.specifications;
};

// Create new construction project
Construction.create = async (newProject, media, result) => {
  try {
    sql.beginTransaction();

    // Insert project details
    const query = "INSERT INTO construction_projects SET ?";
    const res = await sql.query(query, newProject);
    const projectId = res.insertId;

    // Insert media files (2D, 3D designs and images)
    if (media && media.length > 0) {
      const mediaQuery = "INSERT INTO project_media (project_id, media_type, media_url) VALUES ?";
      const mediaValues = media.map(file => [
        projectId,
        file.type,
        file.url
      ]);
      await sql.query(mediaQuery, [mediaValues]);
    }

    await sql.commit();
    result(null, { id: projectId, ...newProject });
  } catch (err) {
    await sql.rollback();
    console.log("Error: ", err);
    result(err, null);
  }
};

// Get all projects by category
Construction.getByCategory = (category, result) => {
  sql.query(
    `SELECT cp.*, 
     GROUP_CONCAT(DISTINCT CASE WHEN pm.media_type = 'image' THEN pm.media_url END) as images,
     GROUP_CONCAT(DISTINCT CASE WHEN pm.media_type = '2d_design' THEN pm.media_url END) as designs_2d,
     GROUP_CONCAT(DISTINCT CASE WHEN pm.media_type = '3d_design' THEN pm.media_url END) as designs_3d
     FROM construction_projects cp
     LEFT JOIN project_media pm ON cp.project_id = pm.project_id
     WHERE cp.category = ?
     GROUP BY cp.project_id
     ORDER BY cp.created_at DESC`,
    category,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }
      
      // Format the results
      const projects = res.map(project => ({
        ...project,
        images: project.images ? project.images.split(',') : [],
        designs_2d: project.designs_2d ? project.designs_2d.split(',') : [],
        designs_3d: project.designs_3d ? project.designs_3d.split(',') : []
      }));
      
      result(null, projects);
    }
  );
};

// Get project details by ID
Construction.findById = (projectId, result) => {
  sql.query(
    `SELECT cp.*, 
     GROUP_CONCAT(DISTINCT CASE WHEN pm.media_type = 'image' THEN pm.media_url END) as images,
     GROUP_CONCAT(DISTINCT CASE WHEN pm.media_type = '2d_design' THEN pm.media_url END) as designs_2d,
     GROUP_CONCAT(DISTINCT CASE WHEN pm.media_type = '3d_design' THEN pm.media_url END) as designs_3d
     FROM construction_projects cp
     LEFT JOIN project_media pm ON cp.project_id = pm.project_id
     WHERE cp.project_id = ?
     GROUP BY cp.project_id`,
    projectId,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        const project = {
          ...res[0],
          images: res[0].images ? res[0].images.split(',') : [],
          designs_2d: res[0].designs_2d ? res[0].designs_2d.split(',') : [],
          designs_3d: res[0].designs_3d ? res[0].designs_3d.split(',') : []
        };
        result(null, project);
      } else {
        result({ kind: "not_found" }, null);
      }
    }
  );
};

// Update project
Construction.update = async (projectId, project, media, result) => {
  try {
    sql.beginTransaction();

    // Update project details
    const updateQuery = `
      UPDATE construction_projects 
      SET title = ?, description = ?, status = ?, 
          location = ?, area_sqft = ?, completion_date = ?,
          features = ?, specifications = ?
      WHERE project_id = ?
    `;

    await sql.query(updateQuery, [
      project.title,
      project.description,
      project.status,
      project.location,
      project.area_sqft,
      project.completion_date,
      project.features,
      project.specifications,
      projectId
    ]);

    // Update media if provided
    if (media && media.length > 0) {
      // Delete existing media
      await sql.query("DELETE FROM project_media WHERE project_id = ?", projectId);

      // Insert new media
      const mediaQuery = "INSERT INTO project_media (project_id, media_type, media_url) VALUES ?";
      const mediaValues = media.map(file => [
        projectId,
        file.type,
        file.url
      ]);
      await sql.query(mediaQuery, [mediaValues]);
    }

    await sql.commit();
    result(null, { id: projectId, ...project });
  } catch (err) {
    await sql.rollback();
    console.log("Error: ", err);
    result(err, null);
  }
};

// Delete project
Construction.remove = async (projectId, result) => {
  try {
    sql.beginTransaction();

    // Delete media files first
    await sql.query("DELETE FROM project_media WHERE project_id = ?", projectId);

    // Delete project
    const res = await sql.query(
      "DELETE FROM construction_projects WHERE project_id = ?",
      projectId
    );

    if (res.affectedRows == 0) {
      await sql.rollback();
      result({ kind: "not_found" }, null);
      return;
    }

    await sql.commit();
    result(null, { message: "Project deleted successfully" });
  } catch (err) {
    await sql.rollback();
    console.log("Error: ", err);
    result(err, null);
  }
};

module.exports = Construction; 