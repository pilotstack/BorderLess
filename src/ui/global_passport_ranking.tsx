import { DataTableDemo as RankTable } from '../ui/rank_table';

const all_passport = () => {
  return (
    <>
      {/* <span className="font-mono text-4xl self-center ">
          全球护照
          <span className="underline decoration-sky-500 decoration-wavy font-medium text-sky-400">
            排名
          </span>
        </span> */}

      <div className="flex  justify-center gap-16   ">
        <div className="flex flex-col  items-center">
          <span className="text-blue-500 font-mono text-4xl   ">
            自由度排行
          </span>
          <RankTable sortType="freedom" />
        </div>
        <div className="flex flex-col  items-center">
          <span className="text-amber-400 font-mono text-4xl  ">
            免签数量排行
          </span>
          <RankTable sortType="visa_free" />
        </div>
        <div className="flex flex-col  items-center">
          <span className="text-green-500 font-mono text-4xl  ">GDP排行</span>
          <RankTable sortType="gdp" />
        </div>
      </div>
    </>
  );
};
export default all_passport;
