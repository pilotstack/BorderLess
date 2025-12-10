import * as Flags from 'country-flag-icons/react/3x2';
type FlagCode = keyof typeof Flags;

export function CountryFlag({ code }: { code: string }) {
  const Flag = Flags[code as FlagCode];
  return Flag ? <Flag className="w-16 h-auto" /> : null;
}
