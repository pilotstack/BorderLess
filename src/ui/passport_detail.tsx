import { useParams, useNavigate } from 'react-router';
import { CountryFlag } from '../ui/country_flag';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  BadgeCheck,
  Clock,
  PcCase,
  Ban,
  BadgeQuestionMark,
} from 'lucide-react';
import { VisaTable, type VisaData } from '../ui/visa_table';
import { Button } from '@/components/ui/button';
import React from 'react';
import {
  getCountryDetails,
  getPassportRelationships,
  getCountryRankings,
  type CountryData,
  type PassportRelationshipResponse,
} from '@/lib/country-data';
import { Spinner } from '@/components/ui/spinner';

interface RankingData {
  visa_free_rank: number;
  freedom_rank: number;
  gdp_rank: number;
}

const Passport_detail = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const [countryData, setCountryData] = React.useState<CountryData | null>(
    null
  );
  const [rankingData, setRankingData] = React.useState<RankingData>({
    visa_free_rank: 0,
    freedom_rank: 0,
    gdp_rank: 0,
  });
  const [visaType, setVisaType] = React.useState<
    'visa_free' | 'visa_on_arrival' | 'evisa' | 'banned'
  >('visa_free');
  const [visaData, setVisaData] = React.useState<VisaData[]>([]);
  const [loading, setLoading] = React.useState(true);

  // 加载国家数据
  React.useEffect(() => {
    const loadData = async () => {
      if (!code) {
        navigate('/all_passport');
        return;
      }

      setLoading(true);
      try {
        const country = await getCountryDetails(code);
        if (country) {
          setCountryData(country);
          await loadVisaData(code, 'visa_free');
          // 加载排名数据
          const rankings = await getCountryRankings(code);
          setRankingData(rankings);
        } else {
          navigate('/all_passport');
        }
      } catch (error) {
        console.error('加载数据失败:', error);
        navigate('/all_passport');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [code, navigate]);

  // 加载签证数据
  const loadVisaData = async (
    passportCode: string,
    type: 'visa_free' | 'visa_on_arrival' | 'evisa' | 'banned'
  ) => {
    try {
      const relationships = await getPassportRelationships(passportCode, type);
      const processedData = relationships.map(
        (item: PassportRelationshipResponse) => ({
          id: item.id,
          destination_code: item.destination_code,
          destination_name:
            item.countries?.[0]?.name_cn || item.destination_code,
          visa_type: item.visa_type,
          stay_duration: item.stay_duration,
          destination_region: item.destination_region,
        })
      );
      setVisaData(processedData);
    } catch (error) {
      console.error('加载签证数据失败:', error);
      setVisaData([]);
    }
  };

  const handleVisaTypeChange = async (
    type: 'visa_free' | 'visa_on_arrival' | 'evisa' | 'banned'
  ) => {
    setVisaType(type);
    if (code) {
      await loadVisaData(code, type);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (!countryData) {
    return (
      <div className="flex items-center justify-center h-screen">
        国家信息未找到
      </div>
    );
  }
  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="flex justify-center gap-2 items-center mb-6">
          <CountryFlag code={code || ''} />
          <div className="flex flex-col">
            <span className="font-bold text-xl">{countryData.name_cn}</span>
          </div>
        </div>
        <div className="flex justify-between items-center gap-24 self-center">
          <div className="flex flex-col items-center justify-center min-w-40 rounded-xs border-2 border-double">
            <span className="font-bold text-lg">
              {countryData.visa_free_count}
            </span>
            <span className="flex items-center gap-1">
              <BadgeCheck size={16} />
              免签
            </span>
          </div>
          <div className="flex flex-col items-center justify-center min-w-40 rounded-xs border-2 border-double">
            <span className="font-bold text-lg">
              {countryData.visa_on_arrival_count}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={16} />
              落地签
            </span>
          </div>
          <div className="flex flex-col items-center justify-center min-w-40 rounded-xs border-2 border-double">
            <span className="font-bold text-lg">{countryData.evisa_count}</span>
            <span className="flex items-center gap-1">
              <PcCase size={16} />
              电子签
            </span>
          </div>
          <div className="flex flex-col items-center justify-center min-w-40 rounded-xs border-red-400 border-2 border-double bg-red-300/20">
            <span className="font-bold text-lg text-red-400">
              {countryData.banned_count}
            </span>
            <span className="flex items-center gap-1 text-red-400">
              <Ban size={16} />
              禁止入境
            </span>
          </div>
        </div>

        {/* 签证类型切换按钮 */}
        <div className="flex justify-center gap-4 mt-8 mb-6">
          <Button
            variant={visaType === 'visa_free' ? 'default' : 'outline'}
            onClick={() => handleVisaTypeChange('visa_free')}
            className="flex items-center gap-2"
          >
            <BadgeCheck size={18} />
            免签
          </Button>
          <Button
            variant={visaType === 'visa_on_arrival' ? 'default' : 'outline'}
            onClick={() => handleVisaTypeChange('visa_on_arrival')}
            className="flex items-center gap-2"
          >
            <Clock size={18} />
            落地签
          </Button>
          <Button
            variant={visaType === 'evisa' ? 'default' : 'outline'}
            onClick={() => handleVisaTypeChange('evisa')}
            className="flex items-center gap-2"
          >
            <PcCase size={18} />
            电子签
          </Button>
          <Button
            variant={visaType === 'banned' ? 'default' : 'outline'}
            onClick={() => handleVisaTypeChange('banned')}
            className="flex items-center gap-2 text-red-500 border-red-500 hover:bg-red-50"
          >
            <Ban size={18} />
            禁止入境
          </Button>
        </div>

        <div className="flex mt-8 justify-around">
          <div className="rounded-xs border-2 border-solid w-4xl">
            <VisaTable data={visaData} visaType={visaType} />
          </div>
          <div className="flex items-center justify-center gap-16">
            <div className="flex flex-col items-center justify-center gap-1">
              <span className="text-blue-500 font-mono text-8xl underline-animation">
                #{rankingData.visa_free_rank}
              </span>
              <span className="font-mono text-xs">免签数量排行</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <span className="text-amber-400 font-mono text-8xl underline-animation">
                #{rankingData.freedom_rank}
              </span>
              <span className="flex font-mono text-xs items-center gap-0.5">
                自由度排行
                <Tooltip>
                  <TooltipTrigger asChild>
                    <BadgeQuestionMark size={16} />
                  </TooltipTrigger>

                  <TooltipContent>
                    <p>自由度按照免签 + 落地签 + 电子签总数排名</p>
                  </TooltipContent>
                </Tooltip>
              </span>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <span className="text-green-500 font-mono text-8xl underline-animation">
                #{rankingData.gdp_rank}
              </span>
              <span className="text-xs">GDP排行</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Passport_detail;
