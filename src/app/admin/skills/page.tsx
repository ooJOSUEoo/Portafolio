'use client'
import React from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useTranslateText } from '@/helpers/translateText';
import TC from '@/components/TranslateContent';
import Link from 'next/link';


export default function SkillsAdminPage() {

    const classNameCol = `bg-[var(--background-max-color)] text-[var(--secondary-color)]`
    const classNameCel = `text-[var(--secondary-color)]`

    const columns: GridColDef<(typeof rows)[number]>[] = [
        { field: 'name', cellClassName:classNameCel,  headerClassName:classNameCol, 
            headerName: useTranslateText('Nombre'),flex: 1 },
        { field: 'image', cellClassName:classNameCel, headerClassName:classNameCol, 
            headerName: useTranslateText('Imagen'),flex: 1 },

        { field: 'actions', headerClassName:classNameCol, 
            headerName: useTranslateText('Acciones'),flex: 1, maxWidth: 200, renderCell: (params) => 
            <div className='flex gap-4 text-lg items-center h-full'>
                <Link href={'/admin/skills/' + params.row.id}><i className="fa-solid fa-pen-to-square text-[var(--warning-color)]"></i></Link>
                <button onClick={() => console.log(params.row.id)}><i className="fa-solid fa-trash text-[var(--error-color)]"></i></button>
            </div>},
    ];

    const rows = [
        { id: 1, name: 'Snow', image: 'Jon'},
    ];

  return (
    <div className='flex flex-col'>
        <div className="flex justify-center mb-2">
            <Link href={'/admin/skills/add'} 
            className='w-9/12 p-2 rounded-md text-center border 
            border-[var(--secondary-color)] hover:bg-[var(--background-max-color)]'><TC>Agregar</TC></Link>
        </div>
        <div className="flex justify-center">
            <div className="w-10/12">
            <DataGrid
                className='bg-[var(--background-min-color)] border-[var(--secondary-color)]'
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10, 25, 50]}
            />
            </div>
        </div>
    </div>
  )
}
