// import { Note } from '@prisma/client';
import { encodeFilesToBase64, optomizeImage } from '@/helpers/fileB64';
import { translateText } from '@/helpers/translateText';
import { storage, storageRef, ref, getDownloadURL } from '@/libs/firebase';
import { About, Skill } from '@prisma/client';
import axios from 'axios';
import { uploadBytes } from 'firebase/storage';
import toast from 'react-hot-toast';
import create from 'zustand';
import { persist } from 'zustand/middleware';

export interface State {
  ui:{
    loading:boolean
    error:string
    theme:string
    lang:string
  }

  auth:{
    user: any
    token: string
    tokenExpires: Date|string
  }

  about:About

  skills:{
    data: Skill[]
  }

  setLoading: (loading: boolean) => void
  setError: (error: string) => void
  setTheme: (theme: string) => void
  setLang: (lang: string) => void

  verifyToken: (token: string) => Promise<void|boolean>
  logout: () => Promise<void>
  
  setAbout: (data: About, token: string) => Promise<void>
  getAbout: (token: string) => Promise<void|About>

  setSkill: (data: Skill, token: string) => Promise<void>
}

export async function alertSuccess(text: string){
  const msg = await translateText(text)
  toast.success(msg)
}

export async function alertError(text: string){
  const msg = await translateText(text)
  toast.error(msg)
}

export const initialState = {
  ui:{
    loading: false,
    error: '',
    theme: '',
    lang: 'es',
  },
  auth:{
    user: null,
    token: '',
    tokenExpires: ''
  },
  about: {
    id: '',
    name: '',
    description: '',
    cv: '', 
    image: '',
    createAt: new Date(),
    updatedAt: new Date(),
  },
  skills: {
    data: []
  },
}

export const useAppStore = create(persist<State>((set,get) => ({
    ui: initialState.ui,

    auth: initialState.auth,

    about: initialState.about,

    skills: initialState.skills,

    setLoading: (loading: boolean) => set((state) => ({ ...state, ui: { ...state.ui, loading } })),
    setError: (error: string) => set((state) => ({ ...state, ui: { ...state.ui, error } })),
    setTheme: (theme: string) => {
      get().ui.theme && document.body.classList.remove(get().ui.theme)
      theme && document.body.classList.add(theme)
      return set((state) => ({ ...state, ui: { ...state.ui, theme } }))
    },
    setLang: (lang: string) => set((state) => ({ ...state, ui: { ...state.ui, lang } })),

    verifyToken: async (token: string) => {
      try {
        const resp = await axios.get('/api/auth/validateToken',{
          headers: {
            Authorization: `Token ${token}`
          }
        })
        // console.log(resp.data)
        set((state) => ({ ...state, auth: { ...state.auth,tokenExpires: new Date(resp.data.decodedToken.exp)} }))
      } catch (error: any) {
        if(error.response.data.error.includes('exp')){
          return false
        }
      }
    },
    logout: async() => {
      set((state) => ({ 
        ...state, 
        auth: initialState.auth, 
        // about: initialState.about,
        // skills: initialState.skills
      }))
    },

    setAbout: async(data: About, token: string) => {
      try {
        
        if(typeof data.cv !== 'string') {
          const fileCV = data.cv as unknown as File
          const storageRefCV = ref(storage, `v3/about/about.${fileCV.type.split('/')[1]}`)
          await uploadBytes(storageRefCV, fileCV)
          const cv = await getDownloadURL(storageRefCV)
          data.cv = cv
        }
        
        if(typeof data.image !== 'string') {
          const fileImage = data.image as unknown as File
          const storageRefImage = ref(storage, `v3/about/image.${fileImage.type.split('/')[1]}`)
          await uploadBytes(storageRefImage, fileImage)
          const image = await getDownloadURL(storageRefImage)
          data.image = image
        }
        // data.cv = await encodeFilesToBase64(data.cv as unknown as Blob)
        // data.image = await encodeFilesToBase64(await optomizeImage(data.image as unknown as Blob, 50))
        const resp = await axios.post('/api/about', data, {
          headers: {
            Authorization: `Token ${token}`
          }
        })
        set((state) => ({ ...state, about: resp.data.about }))
        alertSuccess('Se cargaron los datos')
      } catch (error) {
        console.log(error)
        alertError('No se pudieron cargar los datos')
      }
    },
    getAbout: async(token: string) => {
      try {
        const resp = await axios.get('/api/about', {
          headers: {
            Authorization: `Token ${token}`
          }
        })
        if (resp.data.about == null) {
          set((state) => ({ ...state, about: initialState.about }))
        }else{
          set((state) => ({ ...state, about: resp.data.about }))
        }
        return resp.data.about
      } catch (error) {
        console.log(error)
        alertError('No se pudieron cargar los datos, recargue la pagina')
      }
    },

    setSkill: async(data: Skill, token: string) => {
      try {
        const resp = await axios.post('/api/skills', data)
        set((state) => ({ ...state, skills: { data: get().skills.data.concat(resp.data) } }))
        alertSuccess('Se cargaron las habilidades')
      } catch (error) {
        console.log(error)
        alertError('No se pudieron cargar las habilidades')
      }
    },
}), {
  name: 'AppStore',
}));