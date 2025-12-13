import csv
import random

# 完整国家数据列表（199个国家）
countries_data = [
    {'code': 'AF', 'name_cn': '阿富汗', 'region': '亚洲'},
    {'code': 'AM', 'name_cn': '亚美尼亚', 'region': '亚洲'},
    {'code': 'AZ', 'name_cn': '阿塞拜疆', 'region': '亚洲'},
    {'code': 'BH', 'name_cn': '巴林', 'region': '亚洲'},
    {'code': 'BD', 'name_cn': '孟加拉国', 'region': '亚洲'},
    {'code': 'BT', 'name_cn': '不丹', 'region': '亚洲'},
    {'code': 'BN', 'name_cn': '文莱', 'region': '亚洲'},
    {'code': 'KH', 'name_cn': '柬埔寨', 'region': '亚洲'},
    {'code': 'CN', 'name_cn': '中国', 'region': '亚洲'},
    {'code': 'CY', 'name_cn': '塞浦路斯', 'region': '亚洲'},
    {'code': 'TL', 'name_cn': '东帝汶', 'region': '亚洲'},
    {'code': 'GE', 'name_cn': '格鲁吉亚', 'region': '亚洲'},
    {'code': 'HK', 'name_cn': '中国香港', 'region': '亚洲'},
    {'code': 'IN', 'name_cn': '印度', 'region': '亚洲'},
    {'code': 'ID', 'name_cn': '印度尼西亚', 'region': '亚洲'},
    {'code': 'IR', 'name_cn': '伊朗', 'region': '亚洲'},
    {'code': 'IQ', 'name_cn': '伊拉克', 'region': '亚洲'},
    {'code': 'IL', 'name_cn': '以色列', 'region': '亚洲'},
    {'code': 'JP', 'name_cn': '日本', 'region': '亚洲'},
    {'code': 'JO', 'name_cn': '约旦', 'region': '亚洲'},
    {'code': 'KZ', 'name_cn': '哈萨克斯坦', 'region': '亚洲'},
    {'code': 'KW', 'name_cn': '科威特', 'region': '亚洲'},
    {'code': 'KG', 'name_cn': '吉尔吉斯斯坦', 'region': '亚洲'},
    {'code': 'LA', 'name_cn': '老挝', 'region': '亚洲'},
    {'code': 'LB', 'name_cn': '黎巴嫩', 'region': '亚洲'},
    {'code': 'MO', 'name_cn': '中国澳门', 'region': '亚洲'},
    {'code': 'MY', 'name_cn': '马来西亚', 'region': '亚洲'},
    {'code': 'MV', 'name_cn': '马尔代夫', 'region': '亚洲'},
    {'code': 'MN', 'name_cn': '蒙古', 'region': '亚洲'},
    {'code': 'MM', 'name_cn': '缅甸', 'region': '亚洲'},
    {'code': 'NP', 'name_cn': '尼泊尔', 'region': '亚洲'},
    {'code': 'KP', 'name_cn': '朝鲜', 'region': '亚洲'},
    {'code': 'OM', 'name_cn': '阿曼', 'region': '亚洲'},
    {'code': 'PK', 'name_cn': '巴基斯坦', 'region': '亚洲'},
    {'code': 'PS', 'name_cn': '巴勒斯坦', 'region': '亚洲'},
    {'code': 'PH', 'name_cn': '菲律宾', 'region': '亚洲'},
    {'code': 'QA', 'name_cn': '卡塔尔', 'region': '亚洲'},
    {'code': 'SA', 'name_cn': '沙特阿拉伯', 'region': '亚洲'},
    {'code': 'SG', 'name_cn': '新加坡', 'region': '亚洲'},
    {'code': 'KR', 'name_cn': '韩国', 'region': '亚洲'},
    {'code': 'LK', 'name_cn': '斯里兰卡', 'region': '亚洲'},
    {'code': 'SY', 'name_cn': '叙利亚', 'region': '亚洲'},
    {'code': 'TW', 'name_cn': '中国台湾', 'region': '亚洲'},
    {'code': 'TJ', 'name_cn': '塔吉克斯坦', 'region': '亚洲'},
    {'code': 'TH', 'name_cn': '泰国', 'region': '亚洲'},
    {'code': 'TR', 'name_cn': '土耳其', 'region': '亚洲'},
    {'code': 'TM', 'name_cn': '土库曼斯坦', 'region': '亚洲'},
    {'code': 'AE', 'name_cn': '阿拉伯联合酋长国', 'region': '亚洲'},
    {'code': 'UZ', 'name_cn': '乌兹别克斯坦', 'region': '亚洲'},
    {'code': 'VN', 'name_cn': '越南', 'region': '亚洲'},
    {'code': 'YE', 'name_cn': '也门', 'region': '亚洲'},
    {'code': 'AL', 'name_cn': '阿尔巴尼亚', 'region': '欧洲'},
    {'code': 'AD', 'name_cn': '安道尔', 'region': '欧洲'},
    {'code': 'AT', 'name_cn': '奥地利', 'region': '欧洲'},
    {'code': 'BY', 'name_cn': '白俄罗斯', 'region': '欧洲'},
    {'code': 'BE', 'name_cn': '比利时', 'region': '欧洲'},
    {'code': 'BA', 'name_cn': '波斯尼亚和黑塞哥维那', 'region': '欧洲'},
    {'code': 'BG', 'name_cn': '保加利亚', 'region': '欧洲'},
    {'code': 'HR', 'name_cn': '克罗地亚', 'region': '欧洲'},
    {'code': 'CZ', 'name_cn': '捷克', 'region': '欧洲'},
    {'code': 'DK', 'name_cn': '丹麦', 'region': '欧洲'},
    {'code': 'EE', 'name_cn': '爱沙尼亚', 'region': '欧洲'},
    {'code': 'FI', 'name_cn': '芬兰', 'region': '欧洲'},
    {'code': 'FR', 'name_cn': '法国', 'region': '欧洲'},
    {'code': 'DE', 'name_cn': '德国', 'region': '欧洲'},
    {'code': 'GR', 'name_cn': '希腊', 'region': '欧洲'},
    {'code': 'VA', 'name_cn': '梵蒂冈', 'region': '欧洲'},
    {'code': 'HU', 'name_cn': '匈牙利', 'region': '欧洲'},
    {'code': 'IS', 'name_cn': '冰岛', 'region': '欧洲'},
    {'code': 'IE', 'name_cn': '爱尔兰', 'region': '欧洲'},
    {'code': 'IT', 'name_cn': '意大利', 'region': '欧洲'},
    {'code': 'LV', 'name_cn': '拉脱维亚', 'region': '欧洲'},
    {'code': 'LI', 'name_cn': '列支敦士登', 'region': '欧洲'},
    {'code': 'LT', 'name_cn': '立陶宛', 'region': '欧洲'},
    {'code': 'LU', 'name_cn': '卢森堡', 'region': '欧洲'},
    {'code': 'MT', 'name_cn': '马耳他', 'region': '欧洲'},
    {'code': 'MD', 'name_cn': '摩尔多瓦', 'region': '欧洲'},
    {'code': 'MC', 'name_cn': '摩纳哥', 'region': '欧洲'},
    {'code': 'ME', 'name_cn': '黑山', 'region': '欧洲'},
    {'code': 'NL', 'name_cn': '荷兰', 'region': '欧洲'},
    {'code': 'MK', 'name_cn': '北马其顿', 'region': '欧洲'},
    {'code': 'NO', 'name_cn': '挪威', 'region': '欧洲'},
    {'code': 'PL', 'name_cn': '波兰', 'region': '欧洲'},
    {'code': 'PT', 'name_cn': '葡萄牙', 'region': '欧洲'},
    {'code': 'RO', 'name_cn': '罗马尼亚', 'region': '欧洲'},
    {'code': 'RU', 'name_cn': '俄罗斯', 'region': '欧洲'},
    {'code': 'SM', 'name_cn': '圣马力诺', 'region': '欧洲'},
    {'code': 'RS', 'name_cn': '塞尔维亚', 'region': '欧洲'},
    {'code': 'SK', 'name_cn': '斯洛伐克', 'region': '欧洲'},
    {'code': 'SI', 'name_cn': '斯洛文尼亚', 'region': '欧洲'},
    {'code': 'ES', 'name_cn': '西班牙', 'region': '欧洲'},
    {'code': 'SE', 'name_cn': '瑞典', 'region': '欧洲'},
    {'code': 'CH', 'name_cn': '瑞士', 'region': '欧洲'},
    {'code': 'UA', 'name_cn': '乌克兰', 'region': '欧洲'},
    {'code': 'GB', 'name_cn': '英国', 'region': '欧洲'},
    {'code': 'DZ', 'name_cn': '阿尔及利亚', 'region': '非洲'},
    {'code': 'AO', 'name_cn': '安哥拉', 'region': '非洲'},
    {'code': 'BJ', 'name_cn': '贝宁', 'region': '非洲'},
    {'code': 'BW', 'name_cn': '博茨瓦纳', 'region': '非洲'},
    {'code': 'BF', 'name_cn': '布基纳法索', 'region': '非洲'},
    {'code': 'BI', 'name_cn': '布隆迪', 'region': '非洲'},
    {'code': 'CV', 'name_cn': '佛得角', 'region': '非洲'},
    {'code': 'CM', 'name_cn': '喀麦隆', 'region': '非洲'},
    {'code': 'CF', 'name_cn': '中非共和国', 'region': '非洲'},
    {'code': 'TD', 'name_cn': '乍得', 'region': '非洲'},
    {'code': 'KM', 'name_cn': '科摩罗', 'region': '非洲'},
    {'code': 'CG', 'name_cn': '刚果（布）', 'region': '非洲'},
    {'code': 'CD', 'name_cn': '刚果（金）', 'region': '非洲'},
    {'code': 'DJ', 'name_cn': '吉布提', 'region': '非洲'},
    {'code': 'EG', 'name_cn': '埃及', 'region': '非洲'},
    {'code': 'GQ', 'name_cn': '赤道几内亚', 'region': '非洲'},
    {'code': 'ER', 'name_cn': '厄立特里亚', 'region': '非洲'},
    {'code': 'SZ', 'name_cn': '斯威士兰', 'region': '非洲'},
    {'code': 'ET', 'name_cn': '埃塞俄比亚', 'region': '非洲'},
    {'code': 'GA', 'name_cn': '加蓬', 'region': '非洲'},
    {'code': 'GM', 'name_cn': '冈比亚', 'region': '非洲'},
    {'code': 'GH', 'name_cn': '加纳', 'region': '非洲'},
    {'code': 'GN', 'name_cn': '几内亚', 'region': '非洲'},
    {'code': 'GW', 'name_cn': '几内亚比绍', 'region': '非洲'},
    {'code': 'CI', 'name_cn': '科特迪瓦', 'region': '非洲'},
    {'code': 'KE', 'name_cn': '肯尼亚', 'region': '非洲'},
    {'code': 'LS', 'name_cn': '莱索托', 'region': '非洲'},
    {'code': 'LR', 'name_cn': '利比里亚', 'region': '非洲'},
    {'code': 'LY', 'name_cn': '利比亚', 'region': '非洲'},
    {'code': 'MG', 'name_cn': '马达加斯加', 'region': '非洲'},
    {'code': 'MW', 'name_cn': '马拉维', 'region': '非洲'},
    {'code': 'ML', 'name_cn': '马里', 'region': '非洲'},
    {'code': 'MR', 'name_cn': '毛里塔尼亚', 'region': '非洲'},
    {'code': 'MU', 'name_cn': '毛里求斯', 'region': '非洲'},
    {'code': 'MA', 'name_cn': '摩洛哥', 'region': '非洲'},
    {'code': 'MZ', 'name_cn': '莫桑比克', 'region': '非洲'},
    {'code': 'NA', 'name_cn': '纳米比亚', 'region': '非洲'},
    {'code': 'NE', 'name_cn': '尼日尔', 'region': '非洲'},
    {'code': 'NG', 'name_cn': '尼日利亚', 'region': '非洲'},
    {'code': 'RE', 'name_cn': '留尼汪', 'region': '非洲'},
    {'code': 'RW', 'name_cn': '卢旺达', 'region': '非洲'},
    {'code': 'ST', 'name_cn': '圣多美和普林西比', 'region': '非洲'},
    {'code': 'SN', 'name_cn': '塞内加尔', 'region': '非洲'},
    {'code': 'SC', 'name_cn': '塞舌尔', 'region': '非洲'},
    {'code': 'SL', 'name_cn': '塞拉利昂', 'region': '非洲'},
    {'code': 'SO', 'name_cn': '索马里', 'region': '非洲'},
    {'code': 'ZA', 'name_cn': '南非', 'region': '非洲'},
    {'code': 'SS', 'name_cn': '南苏丹', 'region': '非洲'},
    {'code': 'SD', 'name_cn': '苏丹', 'region': '非洲'},
    {'code': 'TZ', 'name_cn': '坦桑尼亚', 'region': '非洲'},
    {'code': 'TG', 'name_cn': '多哥', 'region': '非洲'},
    {'code': 'TN', 'name_cn': '突尼斯', 'region': '非洲'},
    {'code': 'UG', 'name_cn': '乌干达', 'region': '非洲'},
    {'code': 'ZM', 'name_cn': '赞比亚', 'region': '非洲'},
    {'code': 'ZW', 'name_cn': '津巴布韦', 'region': '非洲'},
    {'code': 'AG', 'name_cn': '安提瓜和巴布达', 'region': '北美洲'},
    {'code': 'BS', 'name_cn': '巴哈马', 'region': '北美洲'},
    {'code': 'BB', 'name_cn': '巴巴多斯', 'region': '北美洲'},
    {'code': 'BZ', 'name_cn': '伯利兹', 'region': '北美洲'},
    {'code': 'CA', 'name_cn': '加拿大', 'region': '北美洲'},
    {'code': 'CR', 'name_cn': '哥斯达黎加', 'region': '北美洲'},
    {'code': 'CU', 'name_cn': '古巴', 'region': '北美洲'},
    {'code': 'DM', 'name_cn': '多米尼克', 'region': '北美洲'},
    {'code': 'DO', 'name_cn': '多米尼加', 'region': '北美洲'},
    {'code': 'SV', 'name_cn': '萨尔瓦多', 'region': '北美洲'},
    {'code': 'GD', 'name_cn': '格林纳达', 'region': '北美洲'},
    {'code': 'GT', 'name_cn': '危地马拉', 'region': '北美洲'},
    {'code': 'HT', 'name_cn': '海地', 'region': '北美洲'},
    {'code': 'HN', 'name_cn': '洪都拉斯', 'region': '北美洲'},
    {'code': 'JM', 'name_cn': '牙买加', 'region': '北美洲'},
    {'code': 'MX', 'name_cn': '墨西哥', 'region': '北美洲'},
    {'code': 'MS', 'name_cn': '蒙特塞拉特', 'region': '北美洲'},
    {'code': 'NI', 'name_cn': '尼加拉瓜', 'region': '北美洲'},
    {'code': 'PA', 'name_cn': '巴拿马', 'region': '北美洲'},
    {'code': 'KN', 'name_cn': '圣基茨和尼维斯', 'region': '北美洲'},
    {'code': 'LC', 'name_cn': '圣卢西亚', 'region': '北美洲'},
    {'code': 'VC', 'name_cn': '圣文森特和格林纳丁斯', 'region': '北美洲'},
    {'code': 'TT', 'name_cn': '特立尼达和多巴哥', 'region': '北美洲'},
    {'code': 'US', 'name_cn': '美国', 'region': '北美洲'},
    {'code': 'AR', 'name_cn': '阿根廷', 'region': '南美洲'},
    {'code': 'BO', 'name_cn': '玻利维亚', 'region': '南美洲'},
    {'code': 'BR', 'name_cn': '巴西', 'region': '南美洲'},
    {'code': 'CL', 'name_cn': '智利', 'region': '南美洲'},
    {'code': 'CO', 'name_cn': '哥伦比亚', 'region': '南美洲'},
    {'code': 'EC', 'name_cn': '厄瓜多尔', 'region': '南美洲'},
    {'code': 'GY', 'name_cn': '圭亚那', 'region': '南美洲'},
    {'code': 'PY', 'name_cn': '巴拉圭', 'region': '南美洲'},
    {'code': 'PE', 'name_cn': '秘鲁', 'region': '南美洲'},
    {'code': 'SR', 'name_cn': '苏里南', 'region': '南美洲'},
    {'code': 'UY', 'name_cn': '乌拉圭', 'region': '南美洲'},
    {'code': 'VE', 'name_cn': '委内瑞拉', 'region': '南美洲'},
    {'code': 'AU', 'name_cn': '澳大利亚', 'region': '大洋洲'},
    {'code': 'FJ', 'name_cn': '斐济', 'region': '大洋洲'},
    {'code': 'KI', 'name_cn': '基里巴斯', 'region': '大洋洲'},
    {'code': 'FM', 'name_cn': '密克罗尼西亚联邦', 'region': '大洋洲'},
    {'code': 'NR', 'name_cn': '瑙鲁', 'region': '大洋洲'},
    {'code': 'NZ', 'name_cn': '新西兰', 'region': '大洋洲'},
    {'code': 'PW', 'name_cn': '帕劳', 'region': '大洋洲'},
    {'code': 'PG', 'name_cn': '巴布亚新几内亚', 'region': '大洋洲'},
    {'code': 'WS', 'name_cn': '萨摩亚', 'region': '大洋洲'},
    {'code': 'SB', 'name_cn': '所罗门群岛', 'region': '大洋洲'},
    {'code': 'TO', 'name_cn': '汤加', 'region': '大洋洲'},
    {'code': 'TV', 'name_cn': '图瓦卢', 'region': '大洋洲'},
    {'code': 'VU', 'name_cn': '瓦努阿图', 'region': '大洋洲'},
]

# 创建映射
name_map = {item['code']: item['name_cn'] for item in countries_data}
region_map = {item['code']: item['region'] for item in countries_data}
country_codes = list(name_map.keys())

random.seed(42)  # 可复现
other_count = len(country_codes) - 1  # 198
stay_options = ['14 天', '30 天', '45 天', '60 天', '90 天', '180 天', '无限期', '3 个月', '6 个月']

with open('countries.csv', 'w', newline='', encoding='utf-8') as f_countries, \
     open('passport_relationships.csv', 'w', newline='', encoding='utf-8') as f_rel:

    writer_countries = csv.writer(f_countries)
    writer_countries.writerow(['code', 'name_cn', 'region', 'gdp', 'visa_free_count', 'visa_on_arrival_count', 'evisa_count', 'banned_count'])
    
    writer_rel = csv.writer(f_rel)
    writer_rel.writerow(['passport_code', 'destination_code', 'visa_type', 'stay_duration', 'destination_region'])
    
    for passport in country_codes:
        name_cn = name_map[passport]
        region = region_map[passport]
        gdp = random.randint(1000000000000, 20000000000000)  # 1万亿至20万亿美元
        
        remaining = other_count
        visa_free = random.randint(0, min(150, remaining))  # 安全上界
        remaining -= visa_free
        visa_on_arrival = random.randint(0, min(100, remaining))
        remaining -= visa_on_arrival
        evisa = random.randint(0, min(80, remaining))
        remaining -= evisa
        banned = remaining
        
        writer_countries.writerow([passport, name_cn, region, gdp, visa_free, visa_on_arrival, evisa, banned])
        
        destinations = [c for c in country_codes if c != passport]
        random.shuffle(destinations)
        
        idx = 0
        for _ in range(visa_free):
            dest = destinations[idx]
            stay = random.choice(stay_options)
            writer_rel.writerow([passport, dest, 'visa_free', stay, region_map[dest]])
            idx += 1
        for _ in range(visa_on_arrival):
            dest = destinations[idx]
            stay = random.choice(stay_options)
            writer_rel.writerow([passport, dest, 'visa_on_arrival', stay, region_map[dest]])
            idx += 1
        for _ in range(evisa):
            dest = destinations[idx]
            stay = random.choice(stay_options)
            writer_rel.writerow([passport, dest, 'evisa', stay, region_map[dest]])
            idx += 1
        for _ in range(banned):
            dest = destinations[idx]
            writer_rel.writerow([passport, dest, 'banned', '', region_map[dest]])
            idx += 1

print("生成完成：countries.csv 和 passport_relationships.csv 已保存。")