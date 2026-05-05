import React, { useState, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


import ClientNav from '../../components/clients/ClientNav';
import ClientTable from '../../components/clients/ClientTable';
import AddClient from '../../components/clients/AddClient';

const ClientsPage = () => {
  // 1. Core Data State
  const [allClients, setAllClients] = useState([
    { id: 1, name: "Thulir Infra", email: "contact@thulir.in", type: "GST", currency: "INR", niche: "Construction" },
    { id: 2, name: "Global Tech Inc", email: "billing@global.com", type: "Foreign", currency: "USD", niche: "Software" },
    { id: 3, name: "Aishwarya Arts", email: "info@arts.com", type: "Non-GST", currency: "INR", niche: "Traditional Arts" },
  ]);

  // 2. Logic & View State
  const [view, setView] = useState('list'); 
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // 3. Search Filter Logic
  const filteredClients = allClients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.niche.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- Handlers ---

  const handleSearch = (value) => setSearchTerm(value);

  const handleSave = (formData) => {
    if (view === 'edit') {
      setAllClients(prev => prev.map(c => c.id === selectedClient.id ? { ...formData, id: c.id } : c));
      toast.success("Client profile updated");
    } else {
      setAllClients(prev => [...prev, { ...formData, id: Date.now() }]);
      toast.success("New client added successfully");
    }
    setView('list');
    setSelectedClient(null);
  };

  const handleEdit = (client) => {
    setSelectedClient(client);
    setView('edit');
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this client?")) {
      setAllClients(prev => prev.filter(c => c.id !== id));
      toast.error("Client removed from directory");
    }
  };

  // --- EXPORT LOGIC ---

  const handleExportExcel = useCallback(() => {
    if (filteredClients.length === 0) return toast.error("Nothing to export");
    
    // Pure logic: define strings/dates inside the handler
    const dateString = new Date().toLocaleDateString().replace(/\//g, '-');
    const fileName = `Webxode_Clients_${dateString}.xlsx`;

    const worksheet = XLSX.utils.json_to_sheet(filteredClients);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Clients");
    
    XLSX.writeFile(workbook, fileName);
    toast.success("Excel exported successfully");
  }, [filteredClients]);

  const handleExportPDF = useCallback(() => {
    if (filteredClients.length === 0) return toast.error("Nothing to export");

    // Fix: Calculate timestamp once and reuse it
    const timestamp = Date.now(); 
    const fileName = `Webxode_Clients_${timestamp}.pdf`;
    const dateDisplay = new Date(timestamp).toLocaleString();
    
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Client Directory Report", 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.text(`Generated on: ${dateDisplay}`, 14, 30);

    const tableColumn = ["ID", "Name", "Email", "Tax Type", "Currency", "Niche"];
    const tableRows = filteredClients.map(c => [c.id, c.name, c.email, c.type, c.currency, c.niche]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 40,
      theme: 'grid',
      headStyles: { fillColor: [37, 99, 235], fontWeight: 'bold' },
      styles: { fontSize: 9 }
    });

    doc.save(fileName); // Use the pre-calculated variable
    toast.success("PDF generated successfully");
  }, [filteredClients]);

  

  return (
    <div className="min-h-screen bg-[#F8FAFC] transition-all duration-300">
  <div className="w-full">
    
    {/* VIEW: LIST (Table & Nav) */}
    {view === 'list' && (
      <div className="animate-in fade-in slide-in-from-top-4 duration-700 px-4 sm:px-8 lg:px-12 py-10">
        <ClientNav 
          onSearch={handleSearch} 
          onAddClick={() => setView('add')}
          onExportExcel={handleExportExcel}
          onExportPDF={handleExportPDF}
        />
        
        <div className="mt-10 animate-in slide-in-from-bottom-6 duration-1000">
          <ClientTable 
            clients={filteredClients} 
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={(client) => {
              setSelectedClient(client);
              // Detail view logic here
            }}
          />
        </div>
      </div>
    )}

    {/* VIEW: ADD / EDIT (Professional Form Wrapper) */}
    {(view === 'add' || view === 'edit') && (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
        {/* Full Screen Form Container */}
        <div className="w-full ">
          <AddClient
            key={selectedClient ? selectedClient.id : 'new-client'}
            initialData={view === 'edit' ? selectedClient : null}
            mode={view}
            onSave={handleSave}
            onCancel={() => { setView('list'); setSelectedClient(null); }}
          />
        </div>
      </div>
    )}
  </div>
</div>
  );
};

export default ClientsPage;