import { create } from 'zustand';
import { fetchLeads, createLead, deleteLead } from '@/lib/api';

interface Lead {
  id: string;
  name: string;
  whatsappNumber: string;
  electricityBill: number;
  city: string;
  companyName?: string;
  type: 'residential' | 'housing_society' | 'commercial';
  createdAt: string;
}

interface LeadsState {
  leads: Lead[];
  isLoading: boolean;
  error: string | null;
  fetchLeads: () => Promise<void>;
  addLead: (lead: Omit<Lead, 'id' | 'createdAt'>) => Promise<void>;
  removeLead: (id: string) => Promise<void>;
}

export const useLeadsStore = create<LeadsState>((set) => ({
  leads: [],
  isLoading: false,
  error: null,

  fetchLeads: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetchLeads();
      set({ leads: response.leads, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch leads', isLoading: false });
    }
  },

  addLead: async (lead) => {
    set({ isLoading: true, error: null });
    try {
      await createLead(lead);
      const response = await fetchLeads();
      set({ leads: response.leads, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to create lead', isLoading: false });
    }
  },

  removeLead: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await deleteLead(id);
      const response = await fetchLeads();
      set({ leads: response.leads, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to delete lead', isLoading: false });
    }
  },
}));