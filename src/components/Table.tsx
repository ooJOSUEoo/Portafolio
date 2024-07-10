import { translateText, useTranslateText } from '@/helpers/translateText'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import React from 'react'

export default function Table({
    rows,
    columns,
}:{
    rows: any,
    columns: any,
}) {
  return (
    <DataGrid
    // disableColumnFilter
    disableColumnSelector
    disableDensitySelector
    className='bg-[var(--background-min-color)] border-[var(--secondary-color)]'
    rows={rows}
    columns={columns}
    initialState={{
        pagination: {
            paginationModel: { page: 0, pageSize: 5 },
        },
    }}
    pageSizeOptions={[1,5, 10, 25, 50]}
    slots={{ toolbar: GridToolbar }}
    slotProps={{
        toolbar: {
            showQuickFilter: true,
        },
    }}
    localeText={{
        noRowsLabel: useTranslateText('No data available'), // Texto cuando no hay datos
        toolbarFiltersTooltipHide: useTranslateText('Hide filters'),
        toolbarFiltersTooltipShow: useTranslateText('Show filters'),
        toolbarFiltersTooltipActive: async (count) => await translateText(`${count} active filter`),
        toolbarColumns: useTranslateText('Columns'),
        toolbarColumnsLabel: useTranslateText('Show columns'),
        toolbarDensity: useTranslateText('Density'),
        toolbarDensityLabel: useTranslateText('Density label'),
        toolbarDensityCompact: useTranslateText('Compact'),
        toolbarDensityStandard: useTranslateText('Standard'),
        toolbarDensityComfortable: useTranslateText('Comfortable'),
        toolbarExport: useTranslateText('Export'),
        toolbarExportLabel: useTranslateText('Export'),
        toolbarExportCSV: useTranslateText('Export CSV'),
        toolbarExportPrint: useTranslateText('Export Print'),
        toolbarFilters: useTranslateText('Filters'),
        toolbarQuickFilterPlaceholder: useTranslateText('Search...'),
    }}
/>
  )
}
