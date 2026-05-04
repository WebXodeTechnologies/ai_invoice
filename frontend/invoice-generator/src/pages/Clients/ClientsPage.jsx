import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
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
  const [view, setView] = useState('list'); // 'list', 'add', 'edit'
  const [selectedClient, setSelectedClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // --- Handlers ---

  // Handle Search Input
  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  // Handle Save (Add or Update)
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

  // Handle Edit Initialization
  const handleEdit = (client) => {
    setSelectedClient(client);
    setView('edit');
  };

  // Handle Delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to remove this client?")) {
      setAllClients(prev => prev.filter(c => c.id !== id));
      toast.error("Client removed from directory");
    }
  };

  // 3. Search Filter Logic
  const filteredClients = allClients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.niche.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-10 transition-all duration-300">
      <div className="max-w-6xl mx-auto">
        
        {/* VIEW: LIST (Table) */}
        {view === 'list' && (
          <div className="animate-in fade-in slide-in-from-top-4 duration-500">
            <ClientNav 
              onSearch={handleSearch} 
              onAddClick={() => setView('add')} 
            />
            
            <div className="mt-8 animate-in slide-in-from-bottom-6 duration-700">
              <ClientTable 
                clients={filteredClients} 
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={(client) => {
                  setSelectedClient(client);
                  // Trigger View Modal or Detail View here
                }}
              />
            </div>
          </div>
        )}

        {/* VIEW: ADD / EDIT (Form) */}
        {(view === 'add' || view === 'edit') && (
          <div className="animate-in slide-in-from-bottom-8 duration-500 max-w-3xl mx-auto">
            {/* Simple Form Header */}
            <div className="mb-8 flex items-center justify-between px-2">
               <div>
                  <h2 className="text-[18px] font-black text-zinc-900 tracking-tight">
                    {view === 'edit' ? `Update ${selectedClient.name}` : 'New Registration'}
                  </h2>
                  <p className="text-[12px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Client Management</p>
               </div>
               <button 
                  onClick={() => { setView('list'); setSelectedClient(null); }}
                  className="text-[12px] font-black text-blue-600 bg-blue-50 px-4 py-2 rounded-xl border border-blue-100 hover:bg-blue-600 hover:text-white transition-all uppercase tracking-widest"
               >
                 Cancel
               </button>
            </div>

            <AddClient 
              initialData={view === 'edit' ? selectedClient : null}
              onSave={handleSave} 
              onCancel={() => { setView('list'); setSelectedClient(null); }} 
            />
          </div>
        )}

      </div>
    </div>
  );
};

export default ClientsPage;