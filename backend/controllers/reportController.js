import Report from '../models/Report.js';

// Save a report
export const saveReport = async (req, res) => {
  const { firstName, middleName, lastName, dob, email, mobileNumber, calculations } = req.body;

  if (!firstName || !dob || !email || !calculations) {
    return res.status(400).json({ error: "Missing required fields for saving report." });
  }

  try {
    const report = new Report({
      userId: req.user.id,
      firstName,
      middleName,
      lastName,
      dob,
      email,
      mobileNumber,
      calculations,
      timestamp: Date.now()
    });

    await report.save();
    res.status(201).json({ success: true, report });
  } catch (err) {
    res.status(500).json({ error: "Failed to save report.", details: err.message });
  }
};

// List user's reports
export const listReports = async (req, res) => {
  try {
    const reports = await Report.find({ userId: req.user.id }).sort({ timestamp: -1 });
    res.json({ success: true, reports });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reports history.", details: err.message });
  }
};

// Delete a report
export const deleteReport = async (req, res) => {
  try {
    const report = await Report.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!report) {
      return res.status(404).json({ error: "Report not found or unauthorized to delete." });
    }
    res.json({ success: true, message: "Report history item deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete report.", details: err.message });
  }
};
