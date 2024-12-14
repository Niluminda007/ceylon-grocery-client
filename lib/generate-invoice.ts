// import html2pdf from "html2pdf.js";
// import { RefObject } from "react";

// export const generateInvoice = async (ref: RefObject<HTMLDivElement>) => {
//   try {
//     const opt = {
//       margin: [10, 10, 10, 10],
//       filename: "ceylon_grocery_invoice.pdf",
//       image: { type: "jpeg", quality: 1.0 },
//       html2canvas: {
//         scale: 2,
//         useCORS: true,
//         logging: false,
//         width: 794,
//       },
//       jsPDF: {
//         unit: "pt",
//         format: "a4",
//         orientation: "portrait",
//       },
//     };

//     const html2pdfInstance = html2pdf();
//     const pdfBlob = await html2pdfInstance
//       .from(ref.current)
//       .set(opt)
//       .outputPdf("blob");

//     return pdfBlob;
//   } catch (error) {
//     console.log(error);
//   } finally {
//   }

//   return null;
// };

import html2pdf from "html2pdf.js";
import { RefObject } from "react";

export const generateInvoice = async (ref: RefObject<HTMLDivElement>) => {
  try {
    if (!ref.current) return null;

    ref.current.classList.add("force-desktop-pdf");
    const element = ref.current;
    const fullHeight = element.scrollHeight;

    const opt = {
      margin: [10, 10, 10, 10],
      filename: "ceylon_grocery_invoice.pdf",
      image: { type: "jpeg", quality: 1.0 },
      html2canvas: {
        scale: 2, // High scale for quality
        useCORS: true,
        logging: false,
        width: 794, // Force desktop width
        windowWidth: 794, // Ensures proper scaling
      },
      jsPDF: {
        unit: "pt",
        format: [element.offsetWidth, fullHeight],
        orientation: "portrait",
      },
    };

    const html2pdfInstance = html2pdf();
    const pdfBlob = await html2pdfInstance
      .from(ref.current)
      .set(opt)
      .outputPdf("blob");

    return pdfBlob;
  } catch (error) {
    console.log(error);
  } finally {
    if (ref.current) ref.current.classList.remove("force-desktop-pdf");
  }

  return null;
};
