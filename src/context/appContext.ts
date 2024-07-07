// import { Note } from '@prisma/client';
import axios from 'axios';
import create from 'zustand';
import { persist } from 'zustand/middleware';

export const useAppStore = create(persist<{
    ui:any
}>((set:any,get:any) => ({
    ui: {},
}), {
  name: 'AppStore',
}));