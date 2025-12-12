import * as React from 'react';
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CountryFlagMini } from '../ui/country_flag';

// 扩展 ColumnDef 类型以支持 label 属性
type ColumnMeta = {
  label?: string;
};

export type ColumnDefWithMeta<T> = ColumnDef<T, unknown> & {
  meta?: ColumnMeta;
};

const data: Payment[] = [
  {
    id: 'CN',
    country: '中国',
    visa_free: 66,
    visa_on_arrival: 12,
    evisa: 2,
    gdp: 888888,
    region: '亚洲',
  },
  {
    id: 'JP',
    country: '日本',
    visa_free: 86,
    visa_on_arrival: 2,
    gdp: 555555,
    evisa: 2,
    region: '亚洲',
  },
];

export type Payment = {
  id: string;
  country: string;
  visa_free: number;
  visa_on_arrival: number;
  evisa: number;
  gdp: number;
  region: '亚洲' | '北美' | '欧洲' | '非洲' | '大洋洲';
};

const columns: ColumnDefWithMeta<Payment>[] = [
  {
    accessorKey: 'country',
    header: '国家/地区',
    filterFn: (row, _columnId, filterValue) => {
      const country = row.getValue<string>('country') ?? '';
      const code = row.original.id ?? '';

      const v = filterValue.toLowerCase();

      return (
        country.toLowerCase().includes(v) || code.toLowerCase().includes(v)
      );
    },
    cell: ({ row }) => (
      <div className=" flex gap-1">
        <CountryFlagMini code={row.original.id} />
        {row.getValue('country')}
      </div>
    ),
  },
  {
    accessorKey: 'visa_free',
    meta: {
      label: '免签',
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          免签
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className=" ml-3">{row.getValue('visa_free')}</div>,
  },
  {
    accessorKey: 'visa_on_arrival',
    meta: {
      label: '落地签',
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          落地签
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className=" ml-3">{row.getValue('visa_on_arrival')}</div>
    ),
  },
  {
    accessorKey: 'evisa',
    meta: {
      label: '电子签',
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          电子签
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className=" ml-3">{row.getValue('evisa')}</div>,
  },
  {
    accessorKey: 'gdp',
    meta: {
      label: 'GDP',
    },
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          GDP
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className=" ml-3">{row.getValue('gdp')}</div>,
  },
  {
    accessorKey: 'region',
    meta: {
      label: '区域',
    },
    header: '区域',
    cell: ({ row }) => <div>{row.getValue('region')}</div>,
  },
];

export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="支持中文和ISO二位字母代码"
          value={(table.getColumn('country')?.getFilterValue() as string) ?? ''}
          onChange={(event) =>
            table.getColumn('country')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              列 <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                const label = (column.columnDef as ColumnDefWithMeta<Payment>)
                  .meta?.label;
                const headerText =
                  label ||
                  (typeof column.columnDef.header === 'string'
                    ? column.columnDef.header
                    : column.id);
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {headerText}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          共{table.getFilteredRowModel().rows.length}条数据
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            上一页
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            下一页
          </Button>
        </div>
      </div>
    </div>
  );
}
