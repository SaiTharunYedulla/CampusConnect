const PDFDocument = require("pdfkit");
const ExcelJS = require("exceljs");

async function generatePdf(res, rows) {
  const doc = new PDFDocument({ margin: 40, size: "A4" });
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=leaderboard.pdf");
  doc.pipe(res);

  doc.fontSize(20).text("Student Leaderboard", { align: "center" });
  doc.moveDown();

  rows.forEach((row, index) => {
    doc
      .fontSize(12)
      .text(
        `${index + 1}. ${row.name} | ${row.roll_number} | ${row.department} | ${row.year} | ${row.total_score} | ${row.badge_count}`,
      );
  });

  doc.end();
}

async function generateExcel(res, rows) {
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Leaderboard");
  sheet.columns = [
    { header: "Rank", key: "rank", width: 8 },
    { header: "Name", key: "name", width: 24 },
    { header: "Roll Number", key: "roll_number", width: 16 },
    { header: "Department", key: "department", width: 16 },
    { header: "Year", key: "year", width: 8 },
    { header: "Total Score", key: "total_score", width: 14 },
    { header: "Badge Count", key: "badge_count", width: 12 },
  ];

  rows.forEach((row, index) => {
    sheet.addRow({ rank: index + 1, ...row });
  });

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  );
  res.setHeader("Content-Disposition", "attachment; filename=leaderboard.xlsx");
  await workbook.xlsx.write(res);
  res.end();
}

module.exports = { generatePdf, generateExcel };
