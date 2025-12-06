import { Card } from '@/components/ui/card';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { Badge } from '@/components/ui/badge';
import { Globe, Search } from 'lucide-react';
import { US, JP, CN, CA } from 'country-flag-icons/react/3x2';
const body = () => {
  return (
    <>
      <Card>
        <div className="flex flex-col items-center mt-24 mb-64">
          <span className="flex items-center  gap-2 px-3 text-lg py-1 bg-white/10 border border-white/10 rounded-full ">
            <Globe size={24}></Globe>
            全球护照指数
          </span>
          <h1 className="text-4xl  font-bold  mt-6">
            探索您的全球
            <span className="text-blue-400 ">流动性</span>
          </h1>
          <p className="text-lg mt-4 ">
            了解全球每本护照的签证要求、流动性评分和旅行自由度.
          </p>
          <InputGroup className="max-w-96 rounded-full mt-4">
            <InputGroupInput placeholder="Search..." />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
          </InputGroup>

          <div className="flex flex-col mt-4 items-center">
            <p className="text-xs mb-4">热门护照</p>
            <div className="flex w-full flex-wrap gap-2">
              <Badge variant="outline">
                <US title="United States" className="w-8 h-auto" />
                美国
              </Badge>
              <Badge variant="outline">
                <JP title="Japan" className="w-8 h-auto" />
                日本
              </Badge>
              <Badge variant="outline">
                <CN title="China" className="w-8 h-auto" />
                中国
              </Badge>
              <Badge variant="outline">
                <CA title="Canada" className="w-8 h-auto" />
                加拿大
              </Badge>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};
export default body;
