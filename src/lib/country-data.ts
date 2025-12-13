import { supabase } from './supabase';

export interface CountryData {
  id: number;
  code: string;
  name_cn: string;
  region: string;
  gdp: number | null;
  visa_free_count: number;
  visa_on_arrival_count: number;
  evisa_count: number;
  banned_count: number;
}

// 计算护照自由度（综合所有签证类型的加权分数）
const calculateFreedomIndex = (data: CountryData): number => {
  // 免签权重最高（3倍），落地签次之（2倍），电子签最低（1倍）
  return (
    data.visa_free_count * 3 +
    data.visa_on_arrival_count * 2 +
    data.evisa_count * 1
  );
};

// 根据不同的排序规则获取国家数据
export async function getCountriesRanking(
  sortType: 'freedom' | 'visa_free' | 'gdp'
) {
  const { data, error } = await supabase
    .from('countries')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error(`获取${sortType}排序数据失败:`, error);
    return [];
  }

  const countries = (data || []) as CountryData[];

  // 根据排序类型排序
  if (sortType === 'freedom') {
    // 按自由度排序（综合指标）
    return countries.sort(
      (a, b) => calculateFreedomIndex(b) - calculateFreedomIndex(a)
    );
  } else if (sortType === 'visa_free') {
    // 按免签数量排序
    return countries.sort((a, b) => b.visa_free_count - a.visa_free_count);
  } else if (sortType === 'gdp') {
    // 按GDP排序
    return countries.sort((a, b) => (b.gdp || 0) - (a.gdp || 0));
  }

  return countries;
}

// 签证关系的接口
export interface PassportRelationship {
  id: number;
  passport_code: string;
  destination_code: string;
  destination_name: string;
  visa_type: 'visa_free' | 'visa_on_arrival' | 'evisa' | 'banned';
  stay_duration: string | null;
  destination_region: string;
}

// 从 Supabase 返回的签证关系响应
export interface PassportRelationshipResponse {
  id: number;
  passport_code: string;
  destination_code: string;
  visa_type: 'visa_free' | 'visa_on_arrival' | 'evisa' | 'banned';
  stay_duration: string | null;
  destination_region: string;
  countries?: {
    name_cn: string;
  }[];
}

// 获取指定护照的签证关系数据
export async function getPassportRelationships(
  passportCode: string,
  visaType: 'visa_free' | 'visa_on_arrival' | 'evisa' | 'banned'
) {
  const { data, error } = await supabase
    .from('passport_relationships')
    .select(
      `
      id,
      passport_code,
      destination_code,
      visa_type,
      stay_duration,
      destination_region,
      countries(name_cn)
    `
    )
    .eq('passport_code', passportCode)
    .eq('visa_type', visaType);

  if (error) {
    console.error(`获取${passportCode}护照${visaType}数据失败:`, error);
    return [];
  }

  return (data || []) as PassportRelationshipResponse[];
}

// 获取单个国家的详细信息
export async function getCountryDetails(code: string) {
  const { data, error } = await supabase
    .from('countries')
    .select('*')
    .eq('code', code)
    .single();

  if (error) {
    console.error(`获取${code}国家详情失败:`, error);
    return null;
  }

  return data as CountryData | null;
}

// 获取特定国家在不同排序规则下的排名
export async function getCountryRankings(code: string) {
  try {
    const { data, error } = await supabase
      .from('countries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) {
      console.error('获取排名数据失败:', error);
      return { visa_free_rank: 0, freedom_rank: 0, gdp_rank: 0 };
    }

    const countries = data as CountryData[];
    const targetCountry = countries.find((c) => c.code === code);

    if (!targetCountry) {
      return { visa_free_rank: 0, freedom_rank: 0, gdp_rank: 0 };
    }

    // 按免签排序找排名
    const visa_free_sorted = [...countries].sort(
      (a, b) => b.visa_free_count - a.visa_free_count
    );
    const visa_free_rank =
      visa_free_sorted.findIndex((c) => c.code === code) + 1;

    // 按自由度排序找排名
    const freedom_sorted = [...countries].sort(
      (a, b) => calculateFreedomIndex(b) - calculateFreedomIndex(a)
    );
    const freedom_rank = freedom_sorted.findIndex((c) => c.code === code) + 1;

    // 按GDP排序找排名
    const gdp_sorted = [...countries].sort(
      (a, b) => (b.gdp || 0) - (a.gdp || 0)
    );
    const gdp_rank = gdp_sorted.findIndex((c) => c.code === code) + 1;

    return {
      visa_free_rank,
      freedom_rank,
      gdp_rank,
    };
  } catch (error) {
    console.error('获取排名数据异常:', error);
    return { visa_free_rank: 0, freedom_rank: 0, gdp_rank: 0 };
  }
}

// 搜索国家（支持中文名称和代码）
export async function searchCountries(searchTerm: string) {
  try {
    const { data, error } = await supabase
      .from('countries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) {
      return [];
    }

    const searchTermLower = searchTerm.toLowerCase().trim();

    // 按名称或代码搜索
    const filtered = (data as CountryData[]).filter((country) => {
      return (
        country.name_cn.toLowerCase().includes(searchTermLower) ||
        country.code.toLowerCase().includes(searchTermLower)
      );
    });

    // 按匹配度排序：精确匹配优先
    return filtered.sort((a, b) => {
      const aNameMatch = a.name_cn.toLowerCase() === searchTermLower;
      const bNameMatch = b.name_cn.toLowerCase() === searchTermLower;
      const aCodeMatch = a.code.toLowerCase() === searchTermLower;
      const bCodeMatch = b.code.toLowerCase() === searchTermLower;

      // 精确匹配优先
      if ((aNameMatch || aCodeMatch) && !(bNameMatch || bCodeMatch)) return -1;
      if (!(aNameMatch || aCodeMatch) && (bNameMatch || bCodeMatch)) return 1;
      return 0;
    });
  } catch (error) {
    console.error('搜索国家失败:', error);
    return [];
  }
}
