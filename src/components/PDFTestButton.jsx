import React from "react";
import { generatePDFFromMarkdown } from "../utils/pdfGenerator";

const sampleMarkdown = `Trip Summary:
You will be embarking on a 2-day adventure in Paris. Explore iconic landmarks like the Eiffel Tower, Louvre Museum, and Palace of Versailles, enjoy French cuisine and experience the vibrant nightlife. The trip dates are August 29 to August 31, 2025.

Flight Summary:
- For your flights from CMB to CDG on August 29, 2025, and back on August 31, 2025, please refer to the booking details at https://www.aviasales.com/search/CMB2908CDG3108?marker=659627&currency=USD.
- Action: Book this flight.

Day 1 — August 29, 2025, in Paris:
- Morning: Explore the Eiffel Tower, take a boat ride on the Seine River, and enjoy a French breakfast at a local cafe.
- Afternoon: Visit the Louvre Museum, wander through Montmartre, and see the Sacré-Cœur Basilica.
- Evening: Indulge in French cuisine at a bistro and experience nightlife in Pigalle.
- Booking: https://search.hotellook.com/?marker=659627&currency=USD&destination=Paris&checkIn=2025-08-29&checkOut=2025-08-30&hotelId=298157

Day 2 — August 30, 2025, in Paris:
- Morning: Explore the Palace of Versailles and its gardens.
- Afternoon: Shop at Champs-Élysées, visit the Arc de Triomphe, and relax at Luxembourg Gardens.
- Evening: Enjoy a Seine River cruise to see the City of Light at night.
- Booking: https://search.hotellook.com/?marker=659627&currency=USD&destination=Paris&checkIn=2025-08-30&checkOut=2025-08-31&hotelId=299320`;

const PDFTestButton = () => {
    const handleGeneratePDF = async () => {
        await generatePDFFromMarkdown(sampleMarkdown, "Sample-Trip-Plan.pdf");
    };

    return (
        <button onClick={handleGeneratePDF} style={{ padding: "10px 20px", fontSize: 16, margin: 20 }}>
            Download Sample PDF
        </button>
    );
};

export default PDFTestButton;
