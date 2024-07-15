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


export default function SkillsAdminPage() {

    const {data: session}:any = useSession()

    const skills = useAppStore((s) => s.skills.data)

    const getSkills = useAppStore((s) => s.getSkills)
    const deleteSkill = useAppStore((s) => s.deleteSkill)

    const classNameCol = `bg-[var(--background-max-color)] text-[var(--secondary-color)]`
    const classNameCel = `text-[var(--secondary-color)]`

    const columns: GridColDef<(typeof skills)[number]>[] = [
        { field: 'name', cellClassName:classNameCel, flex: 1,  headerClassName:classNameCol, 
            headerName: useTranslateText('Name'),renderCell(params) {
                return <TC>{String(params.row.name)}</TC>;
            }, },
        { field: 'image', cellClassName:classNameCel, flex: 1, headerClassName:classNameCol, 
            headerName: useTranslateText('Image'), renderCell: (params) =>
            <Image src={params.row.image} alt={params.row.name} width={50} height={50} 
            className='w-12 h-12 object-cover'/>},
        { field: 'actions', headerClassName:classNameCol, flex: 1,
            headerName: useTranslateText('Actions'), maxWidth: 200, renderCell: (params) => 
            <div className='flex gap-4 text-lg items-center h-full'>
                <Link href={{pathname: '/admin/skills/form', query: {id: params.row.id}}}><i className="fa-solid fa-pen-to-square text-[var(--warning-color)]"></i></Link>
                <button onClick={async() => {
                    await deleteSkill(params.row.id as string, params.row.image.split('?')[0].split('.').pop() as string, session.user.accessToken)
                }}><i className="fa-solid fa-trash text-[var(--error-color)]"></i></button>
            </div>},
    ];

    useEffect(() => {
    const gA = async () => {
        await getSkills(session.user.accessToken)
    }
    gA()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getSkills, session.user.accessToken])

  return (
    <div className='flex flex-col'>
        <div className="flex justify-center mb-2">
            <Link href={'/admin/skills/form'} 
            className='w-9/12 p-2 rounded-md text-center border 
            border-[var(--secondary-color)] hover:bg-[var(--background-max-color)]'><TC>Add</TC></Link>
        </div>
        <div className="flex justify-center">
            <div className="w-10/12 overflow-x-auto">
            <Box sx={{ height: 400, width: 1, minWidth: 800 }}>
                {skills && <Table rows={skills} columns={columns} />}
            </Box>
            </div>
        </div>
    </div>
  )
}