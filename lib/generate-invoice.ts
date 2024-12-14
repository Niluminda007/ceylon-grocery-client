import html2pdf from "html2pdf.js";
import { RefObject } from "react";

export const generateInvoice = async (ref: RefObject<HTMLDivElement>) => {
  try {
    if (!ref.current) return null;

    ref.current.classList.add("force-content-pdf");

    const rect = ref.current.getBoundingClientRect();
    const contentWidth = rect.width;
    const contentHeight = rect.height;

    const opt = {
      margin: [10, 10, 10, 10],
      filename: "ceylon_grocery_invoice.pdf",
      image: { type: "jpeg", quality: 1.0 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: false,
      },
      jsPDF: {
        unit: "pt",
        format: [contentWidth, contentHeight],
        orientation: "portrait",
      },
    };

    const pdfBlob = await html2pdf()
      .from(ref.current)
      .set(opt)
      .outputPdf("blob");

    return pdfBlob;
  } catch (error) {
    console.error("Error generating PDF:", error);
    return null;
  } finally {
    // Remove the class to reset styles
    if (ref.current) ref.current.classList.remove("force-content-pdf");
  }
};
