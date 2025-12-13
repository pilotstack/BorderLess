import { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@/components/ui/input-group';
import { CountryFlagMedium } from '../ui/country_flag';
import { CountryFlagMini } from '../ui/country_flag';
import { Globe, Search, X } from 'lucide-react';
import { searchCountries, type CountryData } from '@/lib/country-data';
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';

const Body = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<CountryData[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // 执行搜索
  const handleSearch = useCallback(async (term: string) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    try {
      const results = await searchCountries(term);
      setSearchResults(results);
      setShowResults(true);
    } catch (error) {
      console.error('搜索失败:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  // 处理选项点击
  const handleSelectCountry = (code: string) => {
    navigate(`/passport/${code}`);
    setSearchTerm('');
    setShowResults(false);
    setSearchResults([]);
  };

  // 点击外部关闭搜索框
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

        {/* 搜索框 */}
        <div className="relative w-lg mt-4" ref={searchRef}>
          <InputGroup className="h-12 rounded-full">
            <InputGroupInput
              placeholder="输入中文或ISO代码（如: 中国, CN）"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => {
                if (searchTerm && searchResults.length > 0) {
                  setShowResults(true);
                }
              }}
              className="pr-10"
            />
            <InputGroupAddon>
              {isSearching ? (
                <div className="animate-spin">
                  <Search size={20} />
                </div>
              ) : searchTerm ? (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSearchResults([]);
                    setShowResults(false);
                  }}
                >
                  <X size={20} />
                </button>
              ) : (
                <Search size={20} />
              )}
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
              {searchResults.length} 结果
            </InputGroupAddon>
          </InputGroup>

          {/* 搜索建议 */}
          {showResults && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg shadow-lg z-50">
              <Command>
                <CommandList>
                  <CommandGroup heading="国家/地区">
                    {searchResults.map((country) => (
                      <CommandItem
                        key={country.code}
                        value={country.code}
                        onSelect={() => handleSelectCountry(country.code)}
                        className="cursor-pointer"
                      >
                        <div className="flex items-center gap-3 w-full py-2">
                          <CountryFlagMini code={country.code} />
                          <div className="flex-1">
                            <div className="font-medium">{country.name_cn}</div>
                            <div className="text-xs text-slate-500">
                              {country.code} · {country.region}
                            </div>
                          </div>
                          <div className="text-xs text-slate-400">
                            {country.visa_free_count} 免签
                          </div>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
          )}

          {showResults && searchTerm && searchResults.length === 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg shadow-lg z-50 p-4 text-center text-slate-500">
              未找到匹配的国家
            </div>
          )}
        </div>

        <div className="flex flex-col mt-4 items-center">
          <p className="text-lg mb-4 ">热门护照</p>
          <div className="flex w-full flex-wrap gap-2">
            <button
              onClick={() => navigate('/passport/JP')}
              className="border-2 dark:border-purple-100 px-4 py-2 rounded-full flex items-center text-xl gap-2 hover:bg-purple-100/10 transition-colors"
            >
              <CountryFlagMedium code="JP" />
              日本
            </button>
            <button
              onClick={() => navigate('/passport/CN')}
              className="border-2 dark:border-purple-100 px-4 py-2 rounded-full flex items-center text-xl gap-2 hover:bg-purple-100/10 transition-colors"
            >
              <CountryFlagMedium code="CN" />
              中国
            </button>
            <button
              onClick={() => navigate('/passport/US')}
              className="border-2 dark:border-purple-100 px-4 py-2 rounded-full flex items-center text-xl gap-2 hover:bg-purple-100/10 transition-colors"
            >
              <CountryFlagMedium code="US" />
              美国
            </button>
            <button
              onClick={() => navigate('/passport/TW')}
              className="border-2 dark:border-purple-100 px-4 py-2 rounded-full flex items-center text-xl gap-2 hover:bg-purple-100/10 transition-colors"
            >
              <CountryFlagMedium code="TW" />
              中国台湾
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Body;
