import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CountryFlagMini } from '../ui/country_flag';
import { Button } from '@/components/ui/button';

export interface VisaData {
  id: number;
  destination_code: string;
  destination_name?: string;
  visa_type: string;
  stay_duration: string | null;
  destination_region: string;
}

interface VisaTableProps {
  data?: VisaData[];
  visaType?: string;
}

const ITEMS_PER_PAGE = 10;

export function VisaTable({
  data = [],
  visaType = 'visa_free',
}: VisaTableProps) {
  const [currentPage, setCurrentPage] = React.useState(1);

  // 计算分页数据
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedData = data.slice(startIndex, endIndex);

  // 当签证类型改变时重置页码
  React.useEffect(() => {
    setCurrentPage(1);
  }, [visaType]);
  return (
    <div className="w-full">
      <Table>
        <TableCaption>
          {visaType === 'visa_free' && '免签国家列表'}
          {visaType === 'visa_on_arrival' && '落地签国家列表'}
          {visaType === 'evisa' && '电子签国家列表'}
          {visaType === 'banned' && '禁止入境国家列表'}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">国家/地区</TableHead>
            <TableHead>签证类型</TableHead>
            {visaType !== 'banned' && <TableHead>停留时长</TableHead>}
            <TableHead>区域</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData && paginatedData.length > 0 ? (
            paginatedData.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium flex gap-1">
                  <CountryFlagMini code={item.destination_code} />
                  {item.destination_name || item.destination_code}
                </TableCell>
                <TableCell>
                  {visaType === 'visa_free' && '免签'}
                  {visaType === 'visa_on_arrival' && '落地签'}
                  {visaType === 'evisa' && '电子签'}
                  {visaType === 'banned' && '禁止入境'}
                </TableCell>
                {visaType !== 'banned' && (
                  <TableCell>{item.stay_duration || '-'}</TableCell>
                )}
                <TableCell>{item.destination_region}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={visaType === 'banned' ? 3 : 4}
                className="text-center"
              >
                暂无数据
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* 分页控件 */}
      <div className="flex items-center justify-between space-x-2 py-4">
        <div className="text-muted-foreground text-sm">
          共 {data.length} 条数据 | 第 {data.length > 0 ? currentPage : 0} /{' '}
          {totalPages || 1} 页
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            上一页
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            下一页
          </Button>
        </div>
      </div>
    </div>
  );
}
