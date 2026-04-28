const Invoice = require("../models/Invoice");

// @desc create new Invoice
// @route POST /api/invoices
// @access Private

exports.createInvoice = async (req, res) => {
  try {
    const user = req.user;

    const {
      invoiceDate,
      dueDate,
      billFrom,
      billTo,
      items,
      notes,
      paymentTerms,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Items are required" });
    }

    let subTotal = 0;
    let taxTotal = 0;

    const formattedItems = items.map((item) => {
      const itemTotal = item.unitPrice * item.quantity;
      const itemTax = (itemTotal * (item.taxPercent || 0)) / 100;

      subTotal += itemTotal;
      taxTotal += itemTax;

      return {
        name: item.name,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        taxPercent: item.taxPercent || 0,
        total: itemTotal + itemTax,
      };
    });

    const total = subTotal + taxTotal;

    // ✅ Generate invoice number (backend-controlled)
    const count = await Invoice.countDocuments({ user: user._id });
    const invoiceNumber = `INV-${new Date().getFullYear()}-${count + 1}`;

    const invoice = new Invoice({
      user,
      invoiceNumber,
      invoiceDate,
      dueDate,
      billFrom,
      billTo,
      items: formattedItems,
      notes,
      paymentTerms,
      subTotal,
      taxTotal,
      total,
    });

    await invoice.save();

    return res.status(201).json({
      message: "Invoice created successfully",
      invoice,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error creating Invoice",
      error: error.message,
    });
  }
};

// @desc Get all Invoices of logged-in user
// @route GET /api/invoices
// @access Private

exports.getInvoices = async (req, res) => {
  try {
    const userId = req.user._id;

    // 🔹 Pagination (optional but recommended)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const invoices = await Invoice.find({ user: userId })
      .sort({ createdAt: -1 }) // latest first
      .skip(skip)
      .limit(limit);

    const total = await Invoice.countDocuments({ user: userId });

    return res.status(200).json({
      count: invoices.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      invoices,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching Invoice",
      error: error.message,
    });
  }
};

// @desc Get Single Invoice by ID
// @route GET /api/invoices/:id
// @access Private

exports.getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!invoice) {
      return res.status(404).json({
        message: "Invoice not found",
      });
    }
    return res.status(200).json(invoice);
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching Invoice",
      error: error.message,
    });
  }
};

// @desc Update Invoice
// @route PUT /api/invoices/:id
// @access Private

exports.updateInvoice = async (req, res) => {
  try {
    const {
      invoiceDate,
      dueDate,
      billFrom,
      billTo,
      items,
      notes,
      paymentTerms,
      status,
    } = req.body;

    const invoice = await Invoice.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    // 🔴 Validate items if provided
    let subTotal = invoice.subTotal;
    let taxTotal = invoice.taxTotal;
    let total = invoice.total;
    let formattedItems = invoice.items;

    if (items && items.length > 0) {
      subTotal = 0;
      taxTotal = 0;

      formattedItems = items.map((item) => {
        const itemTotal = item.unitPrice * item.quantity;
        const itemTax = (itemTotal * (item.taxPercent || 0)) / 100;

        subTotal += itemTotal;
        taxTotal += itemTax;

        return {
          name: item.name,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          taxPercent: item.taxPercent || 0,
          total: itemTotal + itemTax,
        };
      });
      total = subTotal + taxTotal;
    }

    // ✅ Update fields
    invoice.invoiceDate = invoiceDate || invoice.invoiceDate;
    invoice.dueDate = dueDate || invoice.dueDate;
    invoice.billFrom = billFrom || invoice.billFrom;
    invoice.billTo = billTo || invoice.billTo;
    invoice.items = formattedItems;
    invoice.notes = notes || invoice.notes;
    invoice.paymentTerms = paymentTerms || invoice.paymentTerms;
    invoice.status = status || invoice.status;

    invoice.subTotal = subTotal;
    invoice.taxTotal = taxTotal;
    invoice.total = total;

    await invoice.save();

    return res.json({
      message: "Invoice updated successfully",
      invoice,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error updating Invoice",
      error: error.message,
    });
  }
};

// @desc Delete Invoice
// @route DELETE /api/invoices/:id
// @access Private

exports.deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!invoice) {
      return res.status(404).json({
        message: "Invoice not found",
      });
    }
    return res.json({
      message: "Invoice deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting Invoice",
      error: error.message,
    });
  }
};
