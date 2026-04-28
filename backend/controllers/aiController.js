const { GoogleGenAI } = require("@google/genai");
const Invoice = require("../models/Invoice");

// 1. Initialize as 'client'
const client = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

/**
 * Extracts structured data from raw invoice text
 */
exports.parseInvoiceFromText = async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ success: false, message: "Invoice text is required." });
  }

  try {
    const response = await client.models.generateContent({
      model: "gemini-3.1-flash-lite-preview",
      contents: [{
        role: "user",
        parts: [{ text: buildExtractionPrompt(text) }]
      }],
      config: {
        responseMimeType: "application/json",
        temperature: 0.1,
      }
    });

    // In 2026 SDK, text is a property of the response
    const parsedData = JSON.parse(response.text);

    return res.status(200).json({
      success: true,
      data: parsedData
    });

  } catch (error) {
    return handleError(res, error, "An error occurred while processing the invoice.");
  }
};

/**
 * Generates a professional reminder email using AI
 */
exports.generateRemainderEmail = async (req, res) => {
  const { invoiceId } = req.body;

  if (!invoiceId) {
    return res.status(400).json({ success: false, message: "Invoice ID is required" });
  }

  try {
    const invoice = await Invoice.findById(invoiceId);
    if (!invoice) {
      return res.status(404).json({ success: false, message: "Invoice not found" });
    }

    const prompt = `
      Write a professional and polite invoice reminder email.
      Client: ${invoice.billTo.clientName}
      Invoice: ${invoice.invoiceNumber}
      Total: ₹${invoice.total.toFixed(2)}
      Due Date: ${new Date(invoice.dueDate).toLocaleDateString()}
      Start with "Subject:".
    `;

    // FIX: Changed 'ai' to 'client' to match initialization at the top
    const result = await client.models.generateContent({
      model: "gemini-3.1-flash-lite-preview",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: { 
        temperature: 0.7 
      }
    });

    return res.status(200).json({
      success: true,
      reminderText: result.text // Streamlined extraction
    });

  } catch (error) {
    console.error("DEBUG ERROR:", error);
    return handleError(res, error, "Failed to generate reminder email.");
  }
};

/**
 * Shared Error Handler Utility
 */
function handleError(res, error, defaultMsg) {
  const isQuotaError = error.message?.includes("429") || error.message?.toLowerCase().includes("quota");
  
  return res.status(isQuotaError ? 429 : 500).json({
    success: false,
    message: isQuotaError ? "API limit reached. Wait 60 seconds." : defaultMsg,
    error: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
}

/**
 * Prompt Template Utility
 */
function buildExtractionPrompt(text) {
  return `Extract commercial invoice details into a structured JSON format.
  Target Schema: { "clientName": "string", "email": "string", "address": "string", "items": [{ "name": "string", "quantity": number, "unitPrice": number }] }
  Source Text: ${text}`;
}

exports.getDashboardSummary = async (req, res) => {
  try {
    // 1. Fetch user-specific invoices
    const invoices = await Invoice.find({ user: req.user.id }).sort({ createdAt: -1 });

    if (!invoices || invoices.length === 0) {
      return res.status(200).json({ 
        success: true, 
        summary: { totalInvoices: 0, totalRevenue: 0, totalOutstanding: 0 },
        insights: ["Start creating invoices to see AI-powered business insights!"] 
      });
    }

    // 2. Process data for the prompt
    const totalInvoices = invoices.length;
    const paidInvoices = invoices.filter(inv => inv.status === 'Paid');
    const unpaidInvoices = invoices.filter(inv => inv.status !== 'Paid');
    
    const totalRevenue = paidInvoices.reduce((acc, inv) => acc + inv.total, 0);
    const totalOutstanding = unpaidInvoices.reduce((acc, inv) => acc + inv.total, 0);

    const dataSummary = `
      - Total Invoices: ${totalInvoices}
      - Paid Invoices: ${paidInvoices.length}
      - Unpaid/Pending: ${unpaidInvoices.length}
      - Total Paid Revenue: ₹${totalRevenue.toFixed(2)}
      - Total Outstanding: ₹${totalOutstanding.toFixed(2)}
      - Recent Activity (Last 5): ${invoices.slice(0, 5).map(inv => `Invoice #${inv.invoiceNumber} (₹${inv.total.toFixed(2)} - ${inv.status})`).join(', ')}
    `;

    // 3. Define the AI Prompt
    const dashboardPrompt = `
      You are a friendly and insightful financial analyst for a small business owner.
      Based on the following summary of their invoice data, provide 2-3 concise and actionable insights.
      
      Data Summary: 
      ${dataSummary}

      Return your response as a valid JSON object with a single key "insights" which is an array of strings.
      Example: {"insights": ["Great job! Your revenue is growing.", "You have ₹5000 outstanding. Try sending reminders."]}
    `;

    // 4. AI Logic with JSON Enforcement
    const result = await client.models.generateContent({
      model: "gemini-3.1-flash-lite-preview",
      contents: [{
        role: "user",
        parts: [{ text: dashboardPrompt }]
      }],
      config: { 
        temperature: 0.7,
        responseMimeType: "application/json" // CRITICAL for production
      }
    });

    // 5. Parse the AI response
    // result.text contains the raw JSON string
    const aiOutput = JSON.parse(result.text);

    // 6. Final Response
    return res.status(200).json({
      success: true,
      summary: {
        totalInvoices,
        totalRevenue,
        totalOutstanding,
        paidCount: paidInvoices.length,
        unpaidCount: unpaidInvoices.length
      },
      insights: aiOutput.insights // This is now a clean array of strings
    });

  } catch (error) {
    console.error("🔥 Dashboard AI Error:", error.message);
    
    const isQuotaError = error.message?.includes("429") || error.message?.toLowerCase().includes("quota");

    return res.status(isQuotaError ? 429 : 500).json({
      success: false,
      message: isQuotaError ? "AI limit reached. Try again in 60s." : "Internal Server Error",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};