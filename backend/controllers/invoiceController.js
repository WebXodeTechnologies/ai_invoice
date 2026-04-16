const Invoice = require("../models/Invoice")

// @desc create new Invoice
// @route POST /api/invoices
// @access Private

exports.createInvoice = async (req, res) => {
    try {
        
    } catch (error) {
         return res.status(500).json({message:"Error creating Invoice", error:error.message})
    }
}

// @desc Get all Invoices of logged-in user
// @route GET /api/invoices
// @access Private

exports.getInvoices = async (req,res) => {
    try {
        
    } catch (error) {
         return res.status(500).json({message:"Error fetching Invoice", error:error.message})
    }
}

// @desc Get Single Invoice by ID
// @route PUT /api/invoices/:id
// @access Private

exports.getInvoiceById = async (req,res)=> {
    try {
        
    } catch (error) {
         return res.status(500).json({message:"Error fetching Invoice", error:error.message})
    }
}


// @desc Update Invoice
// @route PUT /api/invoices/:id
// @access Private

exports.updateInvoice = async(req,res) =>{
    try {
        
    } catch (error) {
         return res.status(500).json({message:"Error updating Invoice", error:error.message})
    }
}

// @desc Delete Invoice
// @route DELETE /api/invoices/:id
// @access Private

exports.deleteInvoice = async (req,res) => {
    try {
        
    } catch (error) {
         return res.status(500).json({message:"Error deleting Invoice", error:error.message})
    }
}