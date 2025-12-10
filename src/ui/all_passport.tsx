import { CountryFlag } from '../ui/country_flag';
import {
  Asia,
  Europe,
  Africa,
  NorthAmerica,
  SouthAmerica,
  Oceania,
} from '../data/countries';
const Continents = [
  { name: '亚洲', data: Asia },
  { name: '欧洲', data: Europe },
  { name: '非洲', data: Africa },
  { name: '北美洲', data: NorthAmerica },
  { name: '南美洲', data: SouthAmerica },
  { name: '大洋洲', data: Oceania },
];

const all_passport = () => {
  return (
    <>
      <div className="flex flex-col items-center ">
        <span className="font-mono text-4xl self-center ">
          从未停止
          <span className="underline decoration-sky-500 decoration-wavy font-medium text-sky-400">
            探索
          </span>
        </span>
        {Continents.map((group) => (
          <div
            key={group.name}
            className="flex flex-col items-center gap-4 mt-20"
          >
            <span className="font-mono text-4xl ">{group.name}</span>

            <div className="grid grid-cols-4 gap-8">
              {group.data.map((item) => (
                <span
                  key={item.flag}
                  className="w-70 border-2 dark:border-purple-200 px-4 py-2 rounded-full flex items-center text-2xl gap-2"
                >
                  <CountryFlag code={item.flag} />
                  {item.country}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default all_passport;
