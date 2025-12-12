import * as Flags from 'country-flag-icons/react/3x2';
type FlagCode = keyof typeof Flags;

export function CountryFlag({ code }: { code: string }) {
  const Flag = Flags[code as FlagCode];
  return Flag ? <Flag className="w-16 h-auto" /> : null;
}
// 需要传参确定w大小
export function CountryFlagMini({ code }: { code: string }) {
  const Flag = Flags[code as FlagCode];
  return Flag ? <Flag className="w-6 h-auto" /> : null;
}
export function CountryFlagMedium({ code }: { code: string }) {
  const Flag = Flags[code as FlagCode];
  return Flag ? <Flag className="w-8 h-auto" /> : null;
}
