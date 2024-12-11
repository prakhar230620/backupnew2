const sql = require('../server');

const Brand = function(promotion) {
  this.user_id = promotion.user_id;
  this.company_name = promotion.company_name;
  this.description = promotion.description;
  this.website = promotion.website;
  this.status = promotion.status || 'pending';
  this.plan_id = promotion.plan_id;
  this.start_date = promotion.start_date;
  this.end_date = promotion.end_date;
  this.payment_status = promotion.payment_status || 'pending';
};

// Create new brand promotion
Brand.create = async (newPromotion, media, result) => {
  try {
    sql.beginTransaction();

    // Insert promotion details
    const query = "INSERT INTO brand_promotions SET ?";
    const res = await sql.query(query, newPromotion);
    const promotionId = res.insertId;

    // Insert media files
    if (media && media.length > 0) {
      const mediaQuery = "INSERT INTO promotion_media (promotion_id, media_type, media_url) VALUES ?";
      const mediaValues = media.map(file => [
        promotionId,
        file.type,
        file.url
      ]);
      await sql.query(mediaQuery, [mediaValues]);
    }

    await sql.commit();
    result(null, { id: promotionId, ...newPromotion });
  } catch (err) {
    await sql.rollback();
    console.log("Error: ", err);
    result(err, null);
  }
};

// Get all promotions for admin
Brand.getAllForAdmin = (result) => {
  sql.query(
    `SELECT bp.*, u.name as user_name, u.email as user_email,
     COUNT(pm.media_id) as media_count
     FROM brand_promotions bp
     LEFT JOIN users u ON bp.user_id = u.user_id
     LEFT JOIN promotion_media pm ON bp.promotion_id = pm.promotion_id
     GROUP BY bp.promotion_id
     ORDER BY bp.created_at DESC`,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }
      result(null, res);
    }
  );
};

// Get active promotions
Brand.getActivePromotions = (result) => {
  sql.query(
    `SELECT bp.*, pm.media_url, pm.media_type
     FROM brand_promotions bp
     LEFT JOIN promotion_media pm ON bp.promotion_id = pm.promotion_id
     WHERE bp.status = 'active'
     AND bp.payment_status = 'completed'
     AND bp.start_date <= NOW()
     AND bp.end_date >= NOW()`,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }
      
      // Group media files with promotions
      const promotions = {};
      res.forEach(row => {
        if (!promotions[row.promotion_id]) {
          promotions[row.promotion_id] = {
            ...row,
            media: []
          };
        }
        if (row.media_url) {
          promotions[row.promotion_id].media.push({
            type: row.media_type,
            url: row.media_url
          });
        }
      });

      result(null, Object.values(promotions));
    }
  );
};

// Get user's promotions
Brand.getByUserId = (userId, result) => {
  sql.query(
    `SELECT bp.*, pm.media_url, pm.media_type
     FROM brand_promotions bp
     LEFT JOIN promotion_media pm ON bp.promotion_id = pm.promotion_id
     WHERE bp.user_id = ?
     ORDER BY bp.created_at DESC`,
    userId,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }

      // Group media files with promotions
      const promotions = {};
      res.forEach(row => {
        if (!promotions[row.promotion_id]) {
          promotions[row.promotion_id] = {
            ...row,
            media: []
          };
        }
        if (row.media_url) {
          promotions[row.promotion_id].media.push({
            type: row.media_type,
            url: row.media_url
          });
        }
      });

      result(null, Object.values(promotions));
    }
  );
};

// Update promotion status
Brand.updateStatus = (promotionId, status, result) => {
  sql.query(
    "UPDATE brand_promotions SET status = ? WHERE promotion_id = ?",
    [status, promotionId],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, { promotionId: promotionId, status: status });
    }
  );
};

// Update payment status
Brand.updatePaymentStatus = (promotionId, status, paymentId, result) => {
  sql.query(
    "UPDATE brand_promotions SET payment_status = ?, payment_id = ? WHERE promotion_id = ?",
    [status, paymentId, promotionId],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      result(null, { promotionId: promotionId, status: status });
    }
  );
};

module.exports = Brand;