// import { Note } from '@prisma/client';
import axios from 'axios';
import create from 'zustand';
import { persist } from 'zustand/middleware';

export interface State {
  ui:{
    theme:string
  }
  setTheme: (theme: string) => void
}

export const useAppStore = create(persist<State>((set,get) => ({
    ui: {
      theme: '',
    },
    setTheme: (theme: string) => {
      get().ui.theme && document.body.classList.remove(get().ui.theme)
      theme && document.body.classList.add(theme)
      return set((state) => ({ ...state, ui: { ...state.ui, theme } }))
    },
}), {
  name: 'AppStore',
}));