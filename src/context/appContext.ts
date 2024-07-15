// import { Note } from '@prisma/client';
import { encodeFilesToBase64, optomizeImage } from '@/helpers/fileB64';
import { translateText } from '@/helpers/translateText';
import { storage, storageRef, ref, getDownloadURL, deleteObject } from '@/libs/firebase';
import { About, Skill, Experience, Project, Contact } from '@prisma/client';
import axios from 'axios';
import { uploadBytes } from 'firebase/storage';
import toast from 'react-hot-toast';
import create from 'zustand';
import { persist } from 'zustand/middleware';

type AboutCustom = Omit<About, 'createAt' | 'updatedAt'> & Partial<Pick<About, 'createAt' | 'updatedAt'>>;
type SkillCustom = Omit<Skill, 'id' | 'createAt' | 'updatedAt'> & Partial<Pick<Skill, 'id' | 'createAt' | 'updatedAt'>>;
type ExperienceCustom = Omit<Experience, 'id' | 'createAt' | 'updatedAt'> & Partial<Pick<Experience, 'id' | 'createAt' | 'updatedAt'>>;
type ProjectCustom = Omit<Project, 'id' | 'createAt' | 'updatedAt'> & Partial<Pick<Project, 'id' | 'createAt' | 'updatedAt'>> & { skills: { id: string }[] };
type ContactCustom = Omit<Contact, 'id' | 'createAt' | 'updatedAt'> & Partial<Pick<Contact, 'id' | 'createAt' | 'updatedAt'>>;


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
  about:AboutCustom
  skills:{
    data: SkillCustom[],
    skill: SkillCustom
  }
  experiences:{
    data: ExperienceCustom[]
    experience: ExperienceCustom
  }
  projects:{
    data: ProjectCustom[]
    project: ProjectCustom
  }
  contacts:{
    data: ContactCustom[]
    contact: ContactCustom
  }

  setLoading: (loading: boolean) => void
  setError: (error: string) => void
  setTheme: (theme: string) => void
  setLang: (lang: string) => void

  verifyToken: (token: string) => Promise<void|boolean>
  logout: () => Promise<void>
  
  setAbout: (data: AboutCustom, token: string) => Promise<void>
  getAbout: () => Promise<void|About>

  setSkill: (data: SkillCustom, token: string) => Promise<void|boolean>
  getSkills: () => Promise<void|Skill[]>
  getSkill: (id: string) => Promise<void|Skill>
  updateSkill: (data: SkillCustom, id: string, token: string) => Promise<void|boolean>
  deleteSkill: (id: string, typeFile: string, token: string) => Promise<void|boolean>

  setExperience: (data: ExperienceCustom, token: string) => Promise<void|boolean>
  getExperiences: () => Promise<void|Experience[]>
  getExperience: (id: string) => Promise<void|Experience>
  updateExperience: (data: ExperienceCustom, id: string, token: string) => Promise<void|boolean>
  deleteExperience: (id: string, typeFile: string, token: string) => Promise<void|boolean>

  setProject: (data: ProjectCustom, token: string) => Promise<void|boolean>
  getProjects: () => Promise<void|Project[]>
  getProject: (id: string) => Promise<void|ProjectCustom>
  updateProject: (data: ProjectCustom, id: string, token: string) => Promise<void|boolean>
  deleteProject: (id: string, typeMainImage: string, images: string, token: string) => Promise<void|boolean>

  setContact: (data: ContactCustom, token: string) => Promise<void|boolean>
  getContacts: () => Promise<void|Contact[]>
  getContact: (id: string) => Promise<void|Contact>
  updateContact: (data: ContactCustom, id: string, token: string) => Promise<void|boolean>
  deleteContact: (id: string, token: string) => Promise<void|boolean>
}

export async function alertSuccess(text: string){
  const msg = await translateText(text)
  toast.success(msg)
}

export async function alertError(text: string){
  const msg = await translateText(text)
  toast.error(msg)
}

export async function uploadFile(file: File, location: string){
  try {
    let fileUpload:any = file
    if(file.type.split('/')[0] == 'image'){
      fileUpload = optomizeImage(file, 50)
    }
    const storageRefMainImage = ref(storage, `v3/${location}`)
    await uploadBytes(storageRefMainImage, file)
    const url = await getDownloadURL(storageRefMainImage)
    return url
  } catch (error) {
    console.log(error)
    return ''
  }
}

export async function deleteFile(location: string){
  try {
    const storageRefOldImage = ref(storage, `v3/${location}`)
    await deleteObject(storageRefOldImage)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

export const initialState: State = {
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
  },
  skills: {
    data: [],
    skill: {
      name: '',
      image: '',
    }
  },
  experiences:{
    data: [],
    experience: {
      name: '',
      description: '',
      image: '',
      url: '',
    }
  },
  projects:{
    data: [],
    project: {
      name: '',
      description: '',
      mainImage: '',
      images: '',
      url: '',
      github: '',
      company: '',
      initialDate: new Date(),
      endDate: new Date(),
      isFavourite: false,
      skills: [],
    }
  },
  contacts:{
    data: [],
    contact: {
      name: '',
      icon: '',
      url: '',
    }
  },

  //Ignore!!!!!
  setLoading: (loading: boolean) => {},
  setError: (error: string) => {},
  setTheme: (theme: string) => {},
  setLang: (lang: string) => {},
  verifyToken: async () => {},
  logout: async () => {},
  setAbout: async () => {},
  getAbout: async () => {},
  setSkill: async () => {},
  getSkills: async () => {},
  getSkill: async () => {},
  updateSkill: async () => {},
  deleteSkill: async () => {},
  setExperience: async () => {},
  getExperiences: async () => {},
  getExperience: async () => {},
  updateExperience: async () => {},
  deleteExperience: async () => {},
  setProject: async () => {},
  getProjects: async () => {},
  getProject: async () => {},
  updateProject: async () => {},
  deleteProject: async () => {},
  setContact: async () => {},
  getContacts: async () => {},
  getContact: async () => {},
  updateContact: async () => {},
  deleteContact: async () => {},
}

export const useAppStore = create(persist<State>((set,get) => ({
    ui: initialState.ui,

    auth: initialState.auth,

    about: initialState.about,

    skills: initialState.skills,

    experiences: initialState.experiences,

    projects: initialState.projects,

    contacts: initialState.contacts,

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

    setAbout: async(data: AboutCustom, token: string) => {
      get().setLoading(true)
      try {
        if(typeof data.cv !== 'string') {
          const fileCV = data.cv as unknown as File
          data.cv = await uploadFile(fileCV, `about/about.${fileCV.type.split('/')[1]}`)
        }
        
        if(typeof data.image !== 'string') {
          const fileImage = data.image as unknown as File
          data.image = await uploadFile(fileImage, `about/image.${fileImage.type.split('/')[1]}`)
        }
        // data.cv = await encodeFilesToBase64(data.cv as unknown as Blob)
        // data.image = await encodeFilesToBase64(await optomizeImage(data.image as unknown as Blob, 50))
        const resp = await axios.post('/api/about', data, {
          headers: {
            Authorization: `Token ${token}`
          }
        })
        set((state) => ({ ...state, about: resp.data.about }))
        alertSuccess('Data has been loaded')
      } catch (error) {
        console.log(error)
        alertError('Data could not be loaded')
      } finally {
        get().setLoading(false)
      }
    },
    getAbout: async() => {
      try {
        const resp = await axios.get('/api/about')
        if (resp.data.about == null) {
          set((state) => ({ ...state, about: initialState.about }))
        }else{
          set((state) => ({ ...state, about: resp.data.about }))
        }
        return resp.data.about
      } catch (error) {
        console.log(error)
        alertError('The data could not be obtained, please reload the page')
      }
    },

    setSkill: async(data: SkillCustom, token: string) => {
      get().setLoading(true)
      try {

        const fileImage = data.image as unknown as File
        data.image = await uploadFile(fileImage, `skills/${data.id}.${fileImage.type.split('/')[1]}`)

        const resp = await axios.post('/api/skills', data, {
          headers: {
            Authorization: `Token ${token}`
          }
        })
        set((state) => ({ ...state, skills: {...state.skills, data: [...state.skills.data, resp.data.skill]} }))
        alertSuccess('Data has been loaded')
        return true
      } catch (error) {
        console.log(error)
        alertError('Skill could not be loaded')
        return false
      } finally {
        get().setLoading(false)
      }
    },
    getSkills: async() => {
      try {
        const resp = await axios.get('/api/skills') 
        set((state) => ({ ...state, skills: {...state.skills, data: resp.data.skills} }))
        return resp.data
      } catch (error) {
        console.log(error)
        alertError('Could not obtain skills, please reload the page')
      } finally {
        set((state) => ({ ...state, skills:  {...state.skills, skill: initialState.skills.skill} }))
      }
    },
    getSkill: async(id: string ) => {
      try {
        const resp = await axios.get(`/api/skills/${id}`) 
        set((state) => ({ ...state, skills: {...state.skills, skill: resp.data.skill} }))
        return resp.data.skill
      } catch (error) {
        set((state) => ({ ...state, skills: {...state.skills, skill: initialState.skills.skill} }))
        console.log(error)
        alertError('Could not obtain skill, please try later')
        return false
      }
    },
    updateSkill: async(data: SkillCustom, id: string, token: string) => {
      get().setLoading(true)
      try {
        if(typeof data.image !== 'string') {
          const fileImage = data.image as unknown as File
          await deleteFile(`skills/${id}.${fileImage.type.split('/')[1]}`)
          data.image = await uploadFile(fileImage, `skills/${id}.${fileImage.type.split('/')[1]}`)
        }
        const resp = await axios.put(`/api/skills/${id}`, data, {
          headers: {
            Authorization: `Token ${token}`
          }
        })
        // set((state) => ({ ...state, skills: {...state.skills, data: [...state.skills.data.map(skill => skill.id === resp.data.skill.id ? resp.data.skill : skill)]} }))
        set((state) => ({ ...state, skills:  {...state.skills, skill: initialState.skills.skill} }))
        alertSuccess('Data has been updated')
        return true
      } catch (error) {
        console.log(error)
        alertError('Skill could not be loaded')
        return false
      } finally {
        get().setLoading(false)
      }
    },
    deleteSkill: async(id: string, typeFile: string, token: string) => {
      get().setLoading(true)
      try {
        await deleteFile(`skills/${id}.${typeFile}`)
        const resp = await axios.delete(`/api/skills/${id}`, {
          headers: {
            Authorization: `Token ${token}`
          }
        })
        set((state) => ({ ...state, skills: {...state.skills, data: [...state.skills.data.filter(skill => skill.id !== resp.data.skill.id)]} }))
        alertSuccess('Data has been deleted')
        return true
      } catch (error) {
        console.log(error)
        alertError('Skill could not be deleted')
        return false
      } finally {
        get().setLoading(false)
      }
    },

    setExperience: async(data: ExperienceCustom, token: string) => {
      get().setLoading(true)
      try {
        if(typeof data.image !== 'string') {
          const fileImage = data.image as unknown as File
          data.image = await uploadFile(fileImage, `experiences/${data.id}.${fileImage.type.split('/')[1]}`)
        }
        const resp = await axios.post('/api/experiences', data, {
          headers: {
            Authorization: `Token ${token}`
          }
        })
        set((state) => ({ ...state, experiences: {...state.experiences, data: [...state.experiences.data, resp.data.experience]} }))
        alertSuccess('Data has been loaded')
        return true
      } catch (error) {
        console.log(error)
        alertError('Experience could not be loaded')
        return false
      } finally {
        get().setLoading(false)
      }
    },
    getExperiences: async() => {
      try {
        const resp = await axios.get('/api/experiences') 
        set((state) => ({ ...state, experiences: {...state.experiences, data: resp.data.experience} }))
        return resp.data
      } catch (error) {
        set((state) => ({ ...state, experiences: {...state.experiences, data: initialState.experiences.data} }))
        console.log(error)
        alertError('Could not obtain experiences, please try later')
        return false
      } finally {
        set((state) => ({ ...state, experiences: {...state.experiences, experience: initialState.experiences.experience} }))
      }
    },
    getExperience: async(id: string) => {
      try {
        const resp = await axios.get(`/api/experiences/${id}`) 
        set((state) => ({ ...state, experiences: {...state.experiences, experience: resp.data.experience} }))
        return resp.data.experience
      } catch (error) {
        set((state) => ({ ...state, experiences: {...state.experiences, experience: initialState.experiences.experience} }))
        console.log(error)
        alertError('Could not obtain experience, please try later')
        return false
      }
    },
    updateExperience: async(data: ExperienceCustom, id: string, token: string) => {
      get().setLoading(true)
      try {
        if(data.image == '') {
          if(get().experiences.experience.image !== '') {
            const type = get().experiences.experience.image!.split('?')[0].split('.').pop()
            await deleteFile(`experiences/${id}.${type}`)
          }
        }
        if(typeof data.image !== 'string') {
          const fileImage = data.image as unknown as File
          await deleteFile(`experiences/${id}.${fileImage.type.split('/')[1]}`)
          data.image = await uploadFile(fileImage, `experiences/${id}.${fileImage.type.split('/')[1]}`)
        }
        const resp = await axios.put(`/api/experiences/${id}`, data, {
          headers: {
            Authorization: `Token ${token}`
          }
        })
        // set((state) => ({ ...state, experiences: {...state.experiences, data: [...state.experiences.data.filter(experience => experience.id !== resp.data.experience.id), resp.data.experience]} }))
        set((state) => ({ ...state, experiences: {...state.experiences, experience: initialState.experiences.experience} }))
        alertSuccess('Data has been updated')
        return true
      } catch (error) {
        console.log(error)
        alertError('Experience could not be updated')
        return false
      } finally {
        get().setLoading(false)
      }
    },
    deleteExperience: async(id: string, type: string, token: string) => {
      console.log(id, type)
      get().setLoading(true)
      try {
        if(type){
          await deleteFile(`experiences/${id}.${type}`)
        }
        const resp = await axios.delete(`/api/experiences/${id}`, {
          headers: {
            Authorization: `Token ${token}`
          }
        })
        set((state) => ({ ...state, experiences: {...state.experiences, data: [...state.experiences.data.filter(experience => experience.id !== resp.data.experience.id)]} }))
        alertSuccess('Data has been deleted')
        return true
      } catch (error) {
        console.log(error)
        alertError('Experience could not be deleted')
        return false
      } finally {
        get().setLoading(false)
      }
    },

    setProject: async(data: ProjectCustom, token: string) => {
      get().setLoading(true)
      try {
        const fileMainImage = data.mainImage as unknown as File
        data.mainImage = await uploadFile(fileMainImage, `projects/${data.id}.${fileMainImage.type.split('/')[1]}`)

        const fileImages = data.images as unknown as File[]
        const types: string[] = []
        const urls: string[] = []
        const exe = async() => {
          await Promise.all(fileImages.map(async (fileImage, index) => {
            urls.push(await uploadFile(fileImage, `projects/${data.id}/${index}.${fileImage.type.split('/')[1]}`));
            types.push(fileImage.type.split('/')[1]);
          }));
        }
        await exe()
        data.images = JSON.stringify({id:data.id,num:fileImages.length,types:types,urls:urls})

        data.initialDate = new Date(data.initialDate)
        data.endDate = data.endDate ? new Date(data.endDate) : null

        data.skills = data.skills.map(s=>{return {id:s}}) as any
        const resp = await axios.post('/api/projects', data, {
          headers: {
            Authorization: `Token ${token}`
          }
        })
        set((state) => ({ ...state, projects: {...state.projects, data: [...state.projects.data, resp.data.project]} }))
        alertSuccess('Data has been loaded')
        return true
      } catch (error) {
        console.log(error)
        alertError('Data could not be loaded')
        return false
      } finally {
        get().setLoading(false)
      }
    },
    getProjects: async() => {
      try {
        const resp = await axios.get('/api/projects')
        set((state) => ({ ...state, projects: {...state.projects, data: resp.data.projects} }))
        return resp.data
      } catch (error) {
        set((state) => ({ ...state, projects: {...state.projects, data: initialState.projects.data} }))
        console.log(error)
        alertError('Could not obtain projects, please try later')
        return false
      } finally {
        set((state) => ({ ...state, projects: {...state.projects, project: initialState.projects.project} }))
      }
    },
    getProject: async(id: string) => {
      try {
        const resp = await axios.get(`/api/projects/${id}`)
        set((state) => ({ ...state, projects: {...state.projects, project: resp.data.project} }))
        return resp.data.project
      } catch (error) {
        set((state) => ({ ...state, projects: {...state.projects, project: initialState.projects.project} }))
        console.log(error)
        alertError('Could not obtain project, please try later')
        return false
      }
    },
    updateProject: async(data: ProjectCustom, id: string, token: string) => {
      get().setLoading(true)
      try {
        if(typeof data.mainImage !== 'string') {
          const fileImage = data.mainImage as unknown as File
          await deleteFile(`projects/${id}.${fileImage.type.split('/')[1]}`)
          data.mainImage = await uploadFile(fileImage, `projects/${id}.${fileImage.type.split('/')[1]}`)
        }
        if(typeof data.images !== 'string') {
          const fileImages = data.images as unknown as File[]
          const types: string[] = []
          const urls: string[] = []
          const typeFilesToDelete = JSON.parse(get().projects.project.images).types
          const exe = async() => {
            await Promise.all(typeFilesToDelete.map(async(type:string,i:number) => {
              await deleteFile(`projects/${id}/${i}.${type}`)
            }))
            await Promise.all(fileImages.map(async (fileImage, index) => {
              urls.push(await uploadFile(fileImage, `projects/${id}/${index}.${fileImage.type.split('/')[1]}`));
              types.push(fileImage.type.split('/')[1]);
            }));
          }
          await exe()
          data.images = JSON.stringify({id:data.id,num:fileImages.length,types:types,urls:urls})
        }
        data.initialDate = new Date(data.initialDate)
        data.endDate = data.endDate ? new Date(data.endDate) : null
        data.skills = data.skills.map(s=>{return {id:s}}) as any
        const resp = await axios.put(`/api/projects/${id}`, data, {
          headers: {
            Authorization: `Token ${token}`
          }
        })
        // set((state) => ({ ...state, projects: {...state.projects, data: [...state.projects.data.map(project => project.id === resp.data.project.id ? resp.data.project : project)]} }))
        set((state) => ({ ...state, projects: {...state.projects, project: initialState.projects.project} }))
        alertSuccess('Data has been updated')
        return true 
      } catch (error) {
        console.log(error)
        alertError('Project could not be loaded')
        return false
      } finally {
        get().setLoading(false)
      }
    },
    deleteProject: async(id: string,typeMainImage:string,images:string, token: string) => {
      get().setLoading(true)
      try {
        await deleteFile(`projects/${id}.${typeMainImage}`)
        const typeFilesToDelete = JSON.parse(images).types
        await Promise.all(typeFilesToDelete.map(async(type:string,i:number) => {
          await deleteFile(`projects/${id}/${i}.${type}`)
        }))
        const resp = await axios.delete(`/api/projects/${id}`, {
          headers: {
            Authorization: `Token ${token}`
          }
        })
        set((state) => ({ ...state, projects: {...state.projects, data: [...state.projects.data.filter(project => project.id !== resp.data.project.id)]} }))
        alertSuccess('Data has been deleted')
        return true
      } catch (error) {
        console.log(error)
        alertError('Project could not be deleted')
        return false
      } finally {
        get().setLoading(false)
      }
    },

    setContact: async(data: ContactCustom, token: string) => {
      get().setLoading(true)
      try {
        const resp = await axios.post('/api/contacts', data, {
          headers: {
            Authorization: `Token ${token}`
          }
        })
        // set((state) => ({ ...state, skills: {...state.skills, data: [...state.skills.data, resp.data.skill]} }))
        alertSuccess('Data has been loaded')
        return true
      } catch (error) {
        console.log(error)
        alertError('Contact could not be loaded')
        return false
      } finally {
        get().setLoading(false)
      }
    },
    getContacts: async() => {
      try {
        const resp = await axios.get('/api/contacts',) 
        set((state) => ({ ...state, contacts: {...state.contacts, data: resp.data.contacts} }))
        return resp.data
      } catch (error) {
        console.log(error)
        alertError('Could not obtain contacts, please reload the page')
      } finally {
        set((state) => ({ ...state, contacts:  {...state.contacts, contact: initialState.contacts.contact} }))
      }
    },
    getContact: async(id: string) => {
      try {
        const resp = await axios.get(`/api/contacts/${id}`) 
        set((state) => ({ ...state, contacts: {...state.contacts, contact: resp.data.contact} }))
        return resp.data.contact
      } catch (error) {
        set((state) => ({ ...state, contacts: {...state.contacts, contact: initialState.contacts.contact} }))
        console.log(error)
        alertError('Could not obtain contact, please try later')
        return false
      }
    },
    updateContact: async(data: ContactCustom, id: string, token: string) => {
      get().setLoading(true)
      try {
        const resp = await axios.put(`/api/contacts/${id}`, data, {
          headers: {
            Authorization: `Token ${token}`
          }
        })
        // set((state) => ({ ...state, contacts: {...state.contacts, data: [...state.contacts.data.map(contact => contact.id === resp.data.contact.id ? resp.data.contact : contact)]} }))
        set((state) => ({ ...state, contacts:  {...state.contacts, contact: initialState.contacts.contact} }))
        alertSuccess('Data has been updated')
        return true
      } catch (error) {
        console.log(error)
        alertError('Contact could not be loaded')
        return false
      } finally {
        get().setLoading(false)
      }
    },
    deleteContact: async(id: string, token: string) => {
      get().setLoading(true)
      try {
        const resp = await axios.delete(`/api/contacts/${id}`, {
          headers: {
            Authorization: `Token ${token}`
          }
        })
        set((state) => ({ ...state, contacts: {...state.contacts, data: [...state.contacts.data.filter(contact => contact.id !== resp.data.contact.id)]} }))
        alertSuccess('Data has been deleted')
        return true
      } catch (error) {
        console.log(error)
        alertError('Contact could not be deleted')
        return false
      } finally {
        get().setLoading(false)
      }
    },
}), {
  name: 'AppStore',
}));