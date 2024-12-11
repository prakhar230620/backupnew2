const sql = require('../server');

const Finance = function(application) {
  this.user_id = application.user_id;
  this.loan_type = application.loan_type;
  this.amount = application.amount;
  this.tenure = application.tenure;
  this.full_name = application.full_name;
  this.dob = application.dob;
  this.pan_number = application.pan_number;
  this.aadhar_number = application.aadhar_number;
  this.permanent_address = application.permanent_address;
  this.residential_address = application.residential_address;
  this.status = application.status || 'pending';
};

// Create new loan application
Finance.create = async (newApplication, documents, result) => {
  try {
    sql.beginTransaction();

    // Insert loan application
    const query = "INSERT INTO loan_applications SET ?";
    const res = await sql.query(query, newApplication);
    const applicationId = res.insertId;

    // Insert documents
    if (documents && documents.length > 0) {
      const docQuery = "INSERT INTO application_documents (application_id, doc_type, doc_url) VALUES ?";
      const docValues = documents.map(doc => [
        applicationId,
        doc.type,
        doc.url
      ]);
      await sql.query(docQuery, [docValues]);
    }

    await sql.commit();
    result(null, { id: applicationId, ...newApplication });
  } catch (err) {
    await sql.rollback();
    console.log("Error: ", err);
    result(err, null);
  }
};

// Get user's loan applications
Finance.getByUserId = (userId, result) => {
  sql.query(
    `SELECT * FROM loan_applications WHERE user_id = ? ORDER BY created_at DESC`,
    userId,
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

// Get loan application details
Finance.findById = (applicationId, result) => {
  sql.query(
    `SELECT la.*, ad.doc_type, ad.doc_url 
     FROM loan_applications la
     LEFT JOIN application_documents ad ON la.application_id = ad.application_id
     WHERE la.application_id = ?`,
    applicationId,
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        // Group documents with application
        const application = res[0];
        application.documents = res.map(row => ({
          type: row.doc_type,
          url: row.doc_url
        }));
        result(null, application);
      } else {
        result({ kind: "not_found" }, null);
      }
    }
  );
};

// Update application status
Finance.updateStatus = (applicationId, status, comment, result) => {
  sql.query(
    "UPDATE loan_applications SET status = ?, admin_comment = ? WHERE application_id = ?",
    [status, comment, applicationId],
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
      result(null, { applicationId: applicationId, status: status });
    }
  );
};

// Get loan types and rates
Finance.getLoanTypes = (result) => {
  sql.query("SELECT * FROM loan_types", (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

// Calculate EMI
Finance.calculateEMI = (principal, rate, tenure) => {
  rate = rate / (12 * 100); // Monthly interest rate
  tenure = tenure * 12; // Convert years to months
  
  const emi = principal * rate * Math.pow(1 + rate, tenure) / (Math.pow(1 + rate, tenure) - 1);
  const totalAmount = emi * tenure;
  const totalInterest = totalAmount - principal;

  return {
    emi: Math.round(emi),
    totalAmount: Math.round(totalAmount),
    totalInterest: Math.round(totalInterest),
    principal: principal,
    interestRate: rate * 12 * 100,
    tenure: tenure / 12
  };
};

module.exports = Finance; 