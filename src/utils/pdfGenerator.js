import jsPDF from "jspdf";
import MarkdownIt from "markdown-it";

// Initialize markdown parser
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

// PDF styling configuration
const PDF_CONFIG = {
  margin: 20,
  lineHeight: 6,
  fontSize: {
    h1: 18,
    h2: 14,
    h3: 12,
    h4: 11,
    body: 10,
    small: 8,
  },
  colors: {
    primary: "#0066cc",
    text: "#333333",
    link: "#0066cc",
    muted: "#666666",
    accent: "#f0f8ff",
  },
  pageWidth: 210, // A4 width in mm
  pageHeight: 297, // A4 height in mm
};

class PDFGenerator {
  constructor() {
    this.pdf = null;
    this.currentY = 0;
    this.pageHeight = 0;
    this.pageWidth = 0;
    this.margin = 0;
    this.maxWidth = 0;
  }

  // Initialize PDF document
  initPDF() {
    this.pdf = new jsPDF("p", "mm", "a4");
    this.pageHeight = PDF_CONFIG.pageHeight;
    this.pageWidth = PDF_CONFIG.pageWidth;
    this.margin = PDF_CONFIG.margin;
    this.maxWidth = this.pageWidth - 2 * this.margin;
    this.currentY = this.margin;

    // Set default font
    this.pdf.setFont("helvetica");
  }

  // Check if we need a new page
  checkPageBreak(requiredHeight = 10) {
    if (this.currentY + requiredHeight > this.pageHeight - this.margin - 15) {
      this.pdf.addPage();
      this.currentY = this.margin;
      return true;
    }
    return false;
  }

  // Add title to PDF with styling
  addTitle(text) {
    this.checkPageBreak(25);

    // Add background rectangle
    this.pdf.setFillColor(240, 248, 255); // Light blue
    this.pdf.rect(
      this.margin - 5,
      this.currentY - 5,
      this.maxWidth + 10,
      20,
      "F"
    );

    this.pdf.setFontSize(PDF_CONFIG.fontSize.h1);
    this.pdf.setTextColor(PDF_CONFIG.colors.primary);
    this.pdf.setFont("helvetica", "bold");

    const lines = this.pdf.splitTextToSize(text, this.maxWidth);
    lines.forEach((line) => {
      this.pdf.text(line, this.margin, this.currentY);
      this.currentY += PDF_CONFIG.lineHeight + 2;
    });

    this.currentY += 10; // Extra spacing after title
  }

  // Add section separator
  addSeparator() {
    this.checkPageBreak(5);
    this.pdf.setDrawColor(PDF_CONFIG.colors.muted);
    this.pdf.setLineWidth(0.5);
    this.pdf.line(
      this.margin,
      this.currentY,
      this.pageWidth - this.margin,
      this.currentY
    );
    this.currentY += 8;
  }

  // Add heading to PDF
  addHeading(text, level = 2) {
    this.checkPageBreak(15);

    const fontSize =
      level === 1
        ? PDF_CONFIG.fontSize.h1
        : level === 2
        ? PDF_CONFIG.fontSize.h2
        : level === 3
        ? PDF_CONFIG.fontSize.h3
        : PDF_CONFIG.fontSize.h4;

    this.pdf.setFontSize(fontSize);
    this.pdf.setTextColor(PDF_CONFIG.colors.text);
    this.pdf.setFont("helvetica", "bold");

    // Clean up emojis and special characters for better display
    const cleanText = this.cleanText(text);
    const lines = this.pdf.splitTextToSize(cleanText, this.maxWidth);

    lines.forEach((line) => {
      this.pdf.text(line, this.margin, this.currentY);
      this.currentY += PDF_CONFIG.lineHeight + 1;
    });

    this.currentY += 4; // Extra spacing after heading
  }

  // Clean text of problematic characters
  cleanText(text) {
    return text
      .replace(/[🌅☀️🌆🏨✈️🌍]/g, "") // Remove emojis
      .replace(/\*\*(.*?)\*\*/g, "$1") // Remove markdown bold
      .replace(/\*(.*?)\*/g, "$1") // Remove markdown italic
      .trim();
  }

  // Add paragraph to PDF
  addParagraph(text, indent = 0) {
    if (!text.trim()) return;

    this.pdf.setFontSize(PDF_CONFIG.fontSize.body);
    this.pdf.setTextColor(PDF_CONFIG.colors.text);
    this.pdf.setFont("helvetica", "normal");

    const cleanText = this.cleanText(text);
    const effectiveWidth = this.maxWidth - indent;
    const lines = this.pdf.splitTextToSize(cleanText, effectiveWidth);

    lines.forEach((line) => {
      this.checkPageBreak(PDF_CONFIG.lineHeight + 1);
      this.pdf.text(line, this.margin + indent, this.currentY);
      this.currentY += PDF_CONFIG.lineHeight;
    });

    this.currentY += 2; // Spacing between paragraphs
  }

  // Add list item to PDF
  addListItem(text, indent = 0, bullet = "•") {
    this.checkPageBreak(PDF_CONFIG.lineHeight + 2);

    this.pdf.setFontSize(PDF_CONFIG.fontSize.body);
    this.pdf.setTextColor(PDF_CONFIG.colors.text);
    this.pdf.setFont("helvetica", "normal");

    const cleanText = this.cleanText(text);
    const bulletWidth = 5;
    const effectiveWidth = this.maxWidth - indent - bulletWidth;

    // Add bullet
    this.pdf.text(bullet, this.margin + indent, this.currentY);

    // Add text with proper wrapping
    const lines = this.pdf.splitTextToSize(cleanText, effectiveWidth);
    lines.forEach((line, index) => {
      if (index > 0) this.checkPageBreak(PDF_CONFIG.lineHeight);
      this.pdf.text(line, this.margin + indent + bulletWidth, this.currentY);
      this.currentY += PDF_CONFIG.lineHeight;
    });

    this.currentY += 1; // Small spacing after list item
  }

  // Add clickable link to PDF
  addLink(text, url, indent = 0) {
    this.checkPageBreak(PDF_CONFIG.lineHeight + 2);

    this.pdf.setFontSize(PDF_CONFIG.fontSize.body);
    this.pdf.setTextColor(PDF_CONFIG.colors.link);
    this.pdf.setFont("helvetica", "normal");

    const cleanText = this.cleanText(text);
    const lines = this.pdf.splitTextToSize(cleanText, this.maxWidth - indent);

    lines.forEach((line) => {
      this.checkPageBreak(PDF_CONFIG.lineHeight);
      this.pdf.textWithLink(line, this.margin + indent, this.currentY, {
        url: url,
      });
      this.currentY += PDF_CONFIG.lineHeight;
    });

    this.currentY += 2;
  }

  // Parse markdown content and convert to structured content
  parseMarkdownContent(markdown) {
    const lines = markdown.split("\n");
    const content = [];
    let currentSection = null;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      if (!line) continue;

      // Handle headers
      if (line.startsWith("**") && line.endsWith("**") && !line.includes("[")) {
        const headerText = line.replace(/\*\*/g, "");
        content.push({ type: "heading", text: headerText, level: 2 });
        currentSection = headerText;
      }
      // Handle separators
      else if (line === "---") {
        content.push({ type: "separator" });
      }
      // Handle links
      else if (line.includes("[") && line.includes("](")) {
        const linkMatch = line.match(/\[([^\]]+)\]\(([^)]+)\)/);
        if (linkMatch) {
          const [, linkText, url] = linkMatch;
          const prefix = line.substring(0, line.indexOf("["));
          if (prefix.trim()) {
            content.push({ type: "text", text: prefix });
          }
          content.push({
            type: "link",
            text: linkText,
            url: url,
            indent: prefix.includes("-") ? 10 : 5,
          });
        }
      }
      // Handle list items
      else if (line.startsWith("- ") || line.startsWith("  - ")) {
        const indent = line.startsWith("  -") ? 10 : 0;
        const text = line.replace(/^(\s*- )/, "");
        content.push({ type: "list", text: text, indent: indent });
      }
      // Handle regular text/paragraphs
      else {
        content.push({ type: "text", text: line });
      }
    }

    return content;
  }

  // Render parsed content to PDF
  renderContent(content) {
    content.forEach((item) => {
      switch (item.type) {
        case "heading":
          this.addHeading(item.text, item.level || 2);
          break;
        case "separator":
          this.addSeparator();
          break;
        case "text":
          if (item.text.trim()) {
            this.addParagraph(item.text, item.indent || 0);
          }
          break;
        case "list":
          this.addListItem(item.text, item.indent || 0);
          break;
        case "link":
          this.addLink(item.text, item.url, item.indent || 0);
          break;
      }
    });
  }

  // Add footer with page numbers and branding
  addFooter() {
    const pageCount = this.pdf.internal.getNumberOfPages();

    for (let i = 1; i <= pageCount; i++) {
      this.pdf.setPage(i);
      this.pdf.setFontSize(PDF_CONFIG.fontSize.small);
      this.pdf.setTextColor(PDF_CONFIG.colors.muted);
      this.pdf.setFont("helvetica", "normal");

      // Add separator line
      this.pdf.setDrawColor(PDF_CONFIG.colors.muted);
      this.pdf.setLineWidth(0.3);
      this.pdf.line(
        this.margin,
        this.pageHeight - 20,
        this.pageWidth - this.margin,
        this.pageHeight - 20
      );

      // Add page number
      const pageText = `Page ${i} of ${pageCount}`;
      const pageTextWidth = this.pdf.getTextWidth(pageText);
      this.pdf.text(
        pageText,
        this.pageWidth - this.margin - pageTextWidth,
        this.pageHeight - 12
      );

      // Add company branding
      this.pdf.setTextColor(PDF_CONFIG.colors.primary);
      this.pdf.setFont("helvetica", "bold");
      this.pdf.text(
        "ZoomZoot Travel Planner",
        this.margin,
        this.pageHeight - 12
      );

      // Add generation date
      this.pdf.setFont("helvetica", "normal");
      this.pdf.setTextColor(PDF_CONFIG.colors.muted);
      const currentDate = new Date().toLocaleDateString();
      this.pdf.text(
        `Generated: ${currentDate}`,
        this.margin,
        this.pageHeight - 6
      );
    }
  }

  // Main method to generate PDF from markdown
  generatePDF(markdownContent, filename = "ZoomZoot-TripPlan.pdf") {
    try {
      this.initPDF();

      // Add main title
      this.addTitle("ZoomZoot Travel Plan");
      this.currentY += 5;

      // Parse markdown content to structured format
      const parsedContent = this.parseMarkdownContent(markdownContent);

      // Render the content
      this.renderContent(parsedContent);

      // Add footer
      this.addFooter();

      // Save the PDF
      this.pdf.save(filename);

      console.log(`PDF "${filename}" generated successfully`);
      return true;
    } catch (error) {
      console.error("Error generating PDF:", error);
      return false;
    }
  }
}

// Export function to generate PDF from markdown
export const generatePDFFromMarkdown = (markdownContent, filename) => {
  const generator = new PDFGenerator();
  return generator.generatePDF(markdownContent, filename);
};

export default PDFGenerator;
