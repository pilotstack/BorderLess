import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { CountryFlagMedium } from '../ui/country_flag';
import { Globe, Search } from 'lucide-react';
const body = () => {
  return (
    <>
      <div className="flex flex-col items-center mt-24 mb-64">
        <span className="flex items-center  gap-2 px-3 text-2xl py-1 bg-white/10 border border-white/10 rounded-full ">
          <Globe size={24}></Globe>
          全球护照指数
        </span>
        <h1 className="text-6xl  font-bold  mt-6">
          探索您的全球
          <span className="text-blue-400 ">流动性</span>
        </h1>
        <p className="text-xl mt-4 ">
          了解全球每本护照的签证要求、流动性评分和旅行自由度.
        </p>
        <InputGroup className="w-lg h-12 rounded-full mt-4">
          <InputGroupInput placeholder="Search..." />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
        </InputGroup>

        <div className="flex flex-col mt-4 items-center">
          <p className="text-lg mb-4 ">热门护照</p>
          <div className="flex w-full flex-wrap gap-2">
            <span className="border-2 dark:border-purple-100 px-4 py-2 rounded-full flex items-center text-xl gap-2">
              <CountryFlagMedium code="JP" />
              日本
            </span>
            <span className="border-2 dark:border-purple-100 px-4 py-2 rounded-full flex items-center text-xl gap-2">
              <CountryFlagMedium code="CN" />
              中国
            </span>
            <span className="border-2 dark:border-purple-100 px-4 py-2 rounded-full flex items-center text-xl gap-2">
              <CountryFlagMedium code="US" />
              美国
            </span>
            <span className="border-2 dark:border-purple-100 px-4 py-2 rounded-full flex items-center text-xl gap-2">
              <CountryFlagMedium code="TW" />
              中国台湾
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
export default body;
