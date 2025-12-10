import { US } from 'country-flag-icons/react/3x2';
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
import { VisaTable } from '../ui/visa_table';
const passport_detail = () => {
  return (
    <>
      <div className="flex flex-col  gap-2">
        <div className="flex justify-center gap-2 items-center mb-6">
          <US title="United States" className="w-12 h-auto" />
          <div className="flex flex-col">
            <span className="font-bold text-xl">美国</span>
          </div>
        </div>
        <div className="flex justify-between items-center gap-24 self-center">
          <div className="flex flex-col  items-center justify-center  min-w-40 rounded-xs border-2 border-double ">
            <span className="font-bold text-lg">12</span>
            <span className="flex items-center gap-1">
              <BadgeCheck size={16} />
              免签
            </span>
          </div>
          <div className="flex flex-col  items-center justify-center  min-w-40 rounded-xs border-2 border-double ">
            <span className="font-bold text-lg">12</span>
            <span className="flex items-center gap-1">
              <Clock size={16} />
              落地签
            </span>
          </div>
          <div className="flex flex-col  items-center justify-center  min-w-40 rounded-xs border-2 border-double ">
            <span className="font-bold text-lg">12</span>
            <span className="flex items-center gap-1">
              <PcCase size={16} />
              电子签
            </span>
          </div>
          <div className="flex flex-col  items-center justify-center  min-w-40 rounded-xs border-red-400 border-2 border-double bg-red-300/20 ">
            <span className="font-bold text-lg text-red-400">12</span>
            <span className="flex items-center gap-1 text-red-400 ">
              <Ban size={16} />
              禁止入境
            </span>
          </div>
        </div>
        <div className="flex mt-8 justify-around">
          <div className="rounded-xs border-2 border-solid w-4xl">
            <VisaTable></VisaTable>
          </div>
          <div className="flex   items-center justify-center gap-16">
            <div className="flex flex-col items-center justify-center gap-1">
              <span className="text-blue-500 font-mono text-8xl  underline-animation">
                #12
              </span>
              <span className="font-mono text-xs">免签数量排行</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-1">
              <span className="text-amber-400 font-mono text-8xl  underline-animation">
                #12
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
              <span className="text-green-500 font-mono text-8xl  underline-animation">
                #12
              </span>
              <span className="text-xs">GDP排行</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default passport_detail;
