import { create } from 'zustand';
import { Role, TransactionType } from '@/types';

interface AppState {
  role: Role;
  setRole: (role: Role) => void;
  
  // Table Filters
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  typeFilter: TransactionType | "ALL";
  setTypeFilter: (type: TransactionType | "ALL") => void;
}

export const useStore = create<AppState>((set) => ({
  role: 'ADMIN', 
  setRole: (role) => set({ role }),
  
  searchTerm: '',
  setSearchTerm: (searchTerm) => set({ searchTerm }),
  typeFilter: 'ALL',
  setTypeFilter: (typeFilter) => set({ typeFilter }),
}));