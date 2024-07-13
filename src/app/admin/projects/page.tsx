'use client'
import React, { useEffect } from 'react'
import { GridColDef } from '@mui/x-data-grid';
import { useTranslateText } from '@/helpers/translateText';
import {TC} from '@/components/TranslateContent';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useAppStore } from '@/context/appContext';
import Image from 'next/image';
import { Box } from '@mui/material';
import Table from '@/components/Table';


export default function ProjectsAdminPage() {

    const {data: session}:any = useSession()

    const projects = useAppStore((s) => s.projects.data)

    const getProjects = useAppStore((s) => s.getProjects)
    const deleteProject = useAppStore((s) => s.deleteProject)

    const classNameCol = `bg-[var(--background-max-color)] text-[var(--secondary-color)]`
    const classNameCel = `text-[var(--secondary-color)]`

    const columns: GridColDef<(typeof projects)[number]>[] = [
        { field: 'name', cellClassName:classNameCel, flex: 1,  headerClassName:classNameCol, 
            headerName: useTranslateText('Name'),renderCell(params) {
                return <TC>{String(params.row.name)}</TC>;
            }, },
        { field: 'description', cellClassName:classNameCel, flex: 1,  headerClassName:classNameCol, 
            headerName: useTranslateText('Description'),renderCell(params) {
                return <TC>{String(params.row.description)}</TC>;
            }, },
        { field: 'url', cellClassName:classNameCel, flex: 1,  headerClassName:classNameCol, 
            headerName: useTranslateText('URL'),renderCell(params) {
                return <TC>{String(params.row.url)}</TC>;
            }, },
        { field: 'github', cellClassName:classNameCel, flex: 1,  headerClassName:classNameCol, 
            headerName: useTranslateText('Github'),renderCell(params) {
                return <TC>{String(params.row.github)}</TC>;
            }, },
        { field: 'company', cellClassName:classNameCel, flex: 1,  headerClassName:classNameCol, 
            headerName: useTranslateText('Company'),renderCell(params) {
                return <TC>{String(params.row.company)}</TC>;
            }, },
        { field: 'initialDate', cellClassName:classNameCel, flex: 1,  headerClassName:classNameCol, 
            headerName: useTranslateText('Initial Date'),renderCell(params) {
                return <TC>{String(params.row.initialDate)}</TC>;
            }, },
        { field: 'endDate', cellClassName:classNameCel, flex: 1,  headerClassName:classNameCol, 
            headerName: useTranslateText('End Date'),renderCell(params) {
                return <TC>{String(params.row.endDate==null?'Still continuing':params.row.endDate)}</TC>;
            }, },
        { field: 'isFavourite', cellClassName:classNameCel, flex: 1,  headerClassName:classNameCol, 
            headerName: useTranslateText('Is Favourite'),renderCell(params) {
                return <div className="flex justify-center items-center h-full w-full text-lg">
                    {
                        params.row.isFavourite
                        ?<i className="fa-solid fa-star text-[var(--warning-color)]"></i>
                        :<i className="fa-regular fa-star text-[var(--warning-color)]"></i>
                    }
                </div>
            }, },
        { field: 'mainImage', cellClassName:classNameCel, flex: 1, headerClassName:classNameCol, 
            headerName: useTranslateText('Main image'), renderCell: (params) =>{
                if(params.row.mainImage){
                return <Image src={params.row.mainImage} alt={params.row.name} width={50} height={50} 
                className='w-12 h-12 object-cover'/>
                }
            }},
        { field: 'images', cellClassName:classNameCel, flex: 1, headerClassName:classNameCol, 
            headerName: '', maxWidth:.1, renderCell: () =><></>},
        { field: 'actions', headerClassName:classNameCol, flex: 1,
            headerName: useTranslateText('Actions'), maxWidth: 200, renderCell: (params) => 
            <div className='flex gap-4 text-lg items-center h-full'>
                <Link href={{pathname: '/admin/projects/form', query: {id: params.row.id}}}><i className="fa-solid fa-pen-to-square text-[var(--warning-color)]"></i></Link>
                <button onClick={async() => {
                    await deleteProject(params.row.id as string, params.row.mainImage.split('?')[0].split('.').pop() as string, params.row.images as string, session.user.accessToken)
                }}><i className="fa-solid fa-trash text-[var(--error-color)]"></i></button>
            </div>},
    ];

    useEffect(() => {
    const gA = async () => {
        await getProjects(session.user.accessToken)
    }
    gA()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getProjects, session.user.accessToken])

  return (
    <div className='flex flex-col'>
        <div className="flex justify-center mb-2">
            <Link href={'/admin/projects/form'} 
            className='w-9/12 p-2 rounded-md text-center border 
            border-[var(--secondary-color)] hover:bg-[var(--background-max-color)]'><TC>Add</TC></Link>
        </div>
        <div className="flex justify-center">
            <div className="w-10/12 overflow-x-auto">
            <Box sx={{ height: 400, width: 1, minWidth: 1000 }}>
                {projects && <Table rows={projects} columns={columns} />}
            </Box>
            </div>
        </div>
    </div>
  )
}
