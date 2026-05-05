import React, { useState } from 'react';
import {
  UserPlus, ChevronLeft, Upload, Building2, MapPin,
  ChevronDown, CheckCircle2, CreditCard, Globe, Info
} from 'lucide-react';

const AddClient = ({ onSave, onCancel, initialData }) => {
  const [formData, setFormData] = useState(initialData || {

    firstName: '', lastName: '', email: '', contact: '',
    companyName: '', niche: '',
    clientType: 'Local',
    taxId: '',
    currency: 'INR',
    paymentTerms: 'Net 15',
    addressLine1: '', addressLine2: '', state: '', city: '', pincode: '',
    country: 'India'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="w-full min-h-screen bg-[#F8FAFC] p-4 sm:p-8 lg:p-12 font-sans text-slate-900">

      {/* Header */}
      <div className="w-full flex items-center justify-between mb-8 ">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
            <UserPlus size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-800">Registration</h1>
            <p className="text-xs text-slate-500 font-medium">Configure billing profile for local & global entities</p>
          </div>
        </div>
        <button onClick={onCancel} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-semibold text-sm">
          <ChevronLeft size={20} />
          Back
        </button>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="space-y-6">

        {/* Section 1: Client Type & Billing Core */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm ring-1 ring-slate-100">
          <div className="flex items-center gap-2 mb-6 text-indigo-600">
            <Globe size={18} />
            <h2 className="font-bold text-slate-800">Billing Jurisdiction</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Client Type</label>
              <div className="relative">
                <select name="clientType" value={formData.clientType} onChange={handleChange} className="clean-input appearance-none font-bold text-indigo-600">
                  <option value="Local">Domestic (Local)</option>
                  <option value="International">International</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                {formData.clientType === 'Local' ? 'GSTIN (India)' : 'VAT / Tax ID'}
              </label>
              <input required name="taxId" value={formData.taxId} onChange={handleChange} className="clean-input" placeholder={formData.clientType === 'Local' ? "22AAAAA0000A1Z5" : "Tax Registration No."} />
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Default Currency</label>
              <div className="relative">
                <select name="currency" value={formData.currency} onChange={handleChange} className="clean-input appearance-none">
                  <option value="INR">INR - Indian Rupee</option>
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Contact Person */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">First Name *</label>
              <input required name="firstName" value={formData.firstName} onChange={handleChange} className="clean-input" placeholder="Enter first name" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Last Name *</label>
              <input required name="lastName" value={formData.lastName} onChange={handleChange} className="clean-input" placeholder="Enter last name" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Billing Email *</label>
              <input required type="email" name="email" value={formData.email} onChange={handleChange} className="clean-input" placeholder="invoices@client.com" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Contact Number *</label>
              <input required name="contact" value={formData.contact} onChange={handleChange} className="clean-input" placeholder="+91 00000 00000" />
            </div>
          </div>
        </div>

        {/* Section 3: Company & Terms */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-6 text-indigo-600">
            <Building2 size={18} />
            <h2 className="font-bold text-slate-800">Business Configuration</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Company Legal Name</label>
              <input name="companyName" value={formData.companyName} onChange={handleChange} className="clean-input" placeholder="Webxode Technologies" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Payment Terms</label>
              <div className="relative">
                <select name="paymentTerms" value={formData.paymentTerms} onChange={handleChange} className="clean-input appearance-none">
                  <option value="Due on Receipt">Due on Receipt</option>
                  <option value="Net 15">Net 15 Days</option>
                  <option value="Net 30">Net 30 Days</option>
                  <option value="Net 60">Net 60 Days</option>
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Address Details */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-6 text-indigo-600">
            <MapPin size={18} />
            <h2 className="font-bold text-slate-800">Address Details</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Street Address (Line 1)</label>
              <input name="addressLine1" onChange={handleChange} className="clean-input" placeholder="Building, Suite, Street" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Area (Line 2)</label>
              <input name="addressLine2" onChange={handleChange} className="clean-input" placeholder="Landmark, Area" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">State / Province</label>
              <input name="state" onChange={handleChange} className="clean-input" placeholder="e.g. Tamil Nadu" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">City</label>
              <input name="city" onChange={handleChange} className="clean-input" placeholder="e.g. Salem" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Postal / ZIP Code</label>
              <input name="pincode" onChange={handleChange} className="clean-input" placeholder="636001" />
            </div>
          </div>
        </div>

        {/* Final Action Buttons */}
        <div className="flex justify-end gap-4 mt-12 pb-12">
          <button type="button" onClick={onCancel} className="px-8 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-bold text-sm transition-all">
            Discard
          </button>
          <button type="submit" className="px-10 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-100 transition-all flex items-center gap-2">
            <CheckCircle2 size={18} />
            Initialize Client Record
          </button>
        </div>
      </form>

      <style jsx>{`
        .clean-input {
          width: 100%;
          padding: 0.85rem 1rem;
          background-color: #FDFDFD;
          border: 1px solid #E2E8F0;
          border-radius: 0.75rem;
          font-size: 14px;
          color: #1e293b;
          outline: none;
          transition: all 0.2s ease;
        }
        .clean-input:focus {
          border-color: #6366f1;
          background-color: #fff;
          box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.05);
        }
        .clean-input::placeholder {
          color: #CBD5E1;
        }
      `}</style>
    </div>
  );
};

export default AddClient;