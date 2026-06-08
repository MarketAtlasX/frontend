export interface Country {
  code: string
  name: string
  region: string
  stockExchange: string | null
  currency: string
  currencySymbol: string
  marketCap?: string
  tradingHours?: string
  tickers: string[]
}

export function flagFromCode(code: string): string {
  return String.fromCodePoint(...[...code.toUpperCase()].map(c => 0x1F1E6 + c.charCodeAt(0) - 65))
}

export const countries: Country[] = [
  // Americas
  { code: 'US', name: 'United States', region: 'Americas', stockExchange: 'NYSE / NASDAQ', currency: 'USD', currencySymbol: '$', marketCap: '$50.8T', tradingHours: '09:30-16:00 ET', tickers: ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'TSLA', 'JPM', 'V', 'NVDA', 'META'] },
  { code: 'CA', name: 'Canada', region: 'Americas', stockExchange: 'TSX', currency: 'CAD', currencySymbol: 'C$', marketCap: '$3.2T', tradingHours: '09:30-16:00 ET', tickers: ['SHOP', 'RY', 'TD', 'ENB', 'CNQ', 'BMO', 'BNS', 'SU', 'TRP', 'CM'] },
  { code: 'BR', name: 'Brazil', region: 'Americas', stockExchange: 'B3', currency: 'BRL', currencySymbol: 'R$', marketCap: '$1.1T', tradingHours: '10:00-17:00 BRT', tickers: ['PETR4', 'VALE3', 'ITUB4', 'ABEV3', 'WEGE3', 'SUZB3', 'BBAS3'] },
  { code: 'MX', name: 'Mexico', region: 'Americas', stockExchange: 'BMV', currency: 'MXN', currencySymbol: 'Mex$', marketCap: '$450B', tradingHours: '08:30-15:00 CST', tickers: ['AMXL', 'FEMSA', 'WALMEX', 'GFNORTE', 'GMEXICO', 'CEMEX'] },
  { code: 'AR', name: 'Argentina', region: 'Americas', stockExchange: 'BCBA', currency: 'ARS', currencySymbol: 'AR$', marketCap: '$85B', tradingHours: '11:00-17:00 ART', tickers: ['GGAL', 'YPF', 'PAMP', 'CEPU', 'TECO2'] },
  { code: 'CL', name: 'Chile', region: 'Americas', stockExchange: 'BCS', currency: 'CLP', currencySymbol: 'CLP$', marketCap: '$210B', tickers: ['COPEC', 'BSANTANDER', 'CMPC', 'ENELAM', 'FALABELLA'] },
  { code: 'CO', name: 'Colombia', region: 'Americas', stockExchange: 'BVC', currency: 'COP', currencySymbol: 'COL$', marketCap: '$140B', tickers: ['ECOPETROL', 'GRUPOSURA', 'BCOLOMBIA', 'NUTRESA', 'ISA'] },

  // Europe
  { code: 'GB', name: 'United Kingdom', region: 'Europe', stockExchange: 'LSE', currency: 'GBP', currencySymbol: '£', marketCap: '$3.4T', tradingHours: '08:00-16:30 GMT', tickers: ['HSBA', 'ULVR', 'SHEL', 'BP', 'GSK', 'DGE', 'RIO', 'GLEN', 'LLOY'] },
  { code: 'DE', name: 'Germany', region: 'Europe', stockExchange: 'FWB (Frankfurt)', currency: 'EUR', currencySymbol: '€', marketCap: '$2.2T', tradingHours: '08:00-20:00 CET', tickers: ['SAP', 'ALV', 'DBK', 'VOW3', 'BAYN', 'BMW', 'ADS', 'MRK', 'LIN'] },
  { code: 'FR', name: 'France', region: 'Europe', stockExchange: 'Euronext Paris', currency: 'EUR', currencySymbol: '€', marketCap: '$2.8T', tradingHours: '09:00-17:30 CET', tickers: ['MC', 'OR', 'TTE', 'SAN', 'AIR', 'BNP', 'SU', 'KER'] },
  { code: 'CH', name: 'Switzerland', region: 'Europe', stockExchange: 'SIX Swiss', currency: 'CHF', currencySymbol: 'CHF', marketCap: '$1.7T', tradingHours: '09:00-17:30 CET', tickers: ['NOVN', 'ROG', 'NESN', 'UBSG', 'ABBN', 'CFR', 'ZURN'] },
  { code: 'NL', name: 'Netherlands', region: 'Europe', stockExchange: 'Euronext Amsterdam', currency: 'EUR', currencySymbol: '€', marketCap: '$900B', tickers: ['ASML', 'UNA', 'INGA', 'AD', 'KPN', 'AKZA', 'HEIA'] },
  { code: 'SE', name: 'Sweden', region: 'Europe', stockExchange: 'OMX Nordic Stockholm', currency: 'SEK', currencySymbol: 'kr', marketCap: '$820B', tickers: ['ERIC', 'SEB', 'VOLV', 'ABB', 'ATCO', 'SAND', 'SHB'] },
  { code: 'DK', name: 'Denmark', region: 'Europe', stockExchange: 'OMX Nordic Copenhagen', currency: 'DKK', currencySymbol: 'kr', tickers: ['NOVO', 'DSV', 'NZYM', 'MAERSK', 'CARL', 'VWS', 'GN'] },
  { code: 'NO', name: 'Norway', region: 'Europe', stockExchange: 'Oslo Børs', currency: 'NOK', currencySymbol: 'kr', tickers: ['EQUINOR', 'DNB', 'ORK', 'NHY', 'YAR', 'MOWI', 'SUBC'] },
  { code: 'IT', name: 'Italy', region: 'Europe', stockExchange: 'Borsa Italiana', currency: 'EUR', currencySymbol: '€', marketCap: '$700B', tickers: ['ENI', 'ISP', 'ENEL', 'UCG', 'LDO', 'PRY', 'RACE'] },
  { code: 'ES', name: 'Spain', region: 'Europe', stockExchange: 'BME (Madrid)', currency: 'EUR', currencySymbol: '€', marketCap: '$650B', tickers: ['SAN', 'BBVA', 'TEF', 'IBE', 'REP', 'FER', 'AENA'] },
  { code: 'IE', name: 'Ireland', region: 'Europe', stockExchange: 'Euronext Dublin', currency: 'EUR', currencySymbol: '€', tickers: ['CRH', 'KER', 'RYAI', 'DCC'] },
  { code: 'BE', name: 'Belgium', region: 'Europe', stockExchange: 'Euronext Brussels', currency: 'EUR', currencySymbol: '€', tickers: ['ABI', 'UCB', 'KBC', 'SOLB'] },
  { code: 'PT', name: 'Portugal', region: 'Europe', stockExchange: 'Euronext Lisbon', currency: 'EUR', currencySymbol: '€', tickers: ['EDP', 'BCP', 'GALP', 'RENE'] },
  { code: 'AT', name: 'Austria', region: 'Europe', stockExchange: 'Wiener Börse', currency: 'EUR', currencySymbol: '€', tickers: ['EBS', 'OMV', 'RBI', 'VOE'] },
  { code: 'FI', name: 'Finland', region: 'Europe', stockExchange: 'OMX Nordic Helsinki', currency: 'EUR', currencySymbol: '€', tickers: ['NOKIA', 'NESTE', 'KNEBV', 'SAMPO'] },
  { code: 'GR', name: 'Greece', region: 'Europe', stockExchange: 'ATHEX', currency: 'EUR', currencySymbol: '€', marketCap: '$65B', tickers: ['ALPHA', 'EUROB', 'PPC', 'OPAP'] },
  { code: 'PL', name: 'Poland', region: 'Europe', stockExchange: 'GPW (Warsaw)', currency: 'PLN', currencySymbol: 'zł', marketCap: '$160B', tickers: ['PKN', 'PKOBP', 'PZU', 'CDR'] },
  { code: 'RU', name: 'Russia', region: 'Europe', stockExchange: 'MOEX', currency: 'RUB', currencySymbol: '₽', tickers: ['SBER', 'GAZP', 'LKOH', 'ROSN'] },
  { code: 'TR', name: 'Turkey', region: 'Europe', stockExchange: 'BIST', currency: 'TRY', currencySymbol: '₺', marketCap: '$180B', tickers: ['THYAO', 'GARAN', 'KOCHOL', 'EREGL'] },

  // Asia Pacific
  { code: 'JP', name: 'Japan', region: 'Asia Pacific', stockExchange: 'TSE (Tokyo)', currency: 'JPY', currencySymbol: '¥', marketCap: '$6.7T', tradingHours: '09:00-15:00 JST', tickers: ['TM', 'SONY', 'MUFG', 'SMFG', 'NTT', 'KDDI'] },
  { code: 'CN', name: 'China', region: 'Asia Pacific', stockExchange: 'SSE / HKEX', currency: 'CNY', currencySymbol: '¥', marketCap: '$8.2T', tradingHours: '09:30-15:00 CST', tickers: ['BABA', 'TCEHY', 'JD', 'BIDU', 'NIO', 'PDD'] },
  { code: 'HK', name: 'Hong Kong', region: 'Asia Pacific', stockExchange: 'HKEX', currency: 'HKD', currencySymbol: 'HK$', marketCap: '$4.1T', tickers: ['TCEHY', 'BABA', 'HSB', '1299'] },
  { code: 'KR', name: 'South Korea', region: 'Asia Pacific', stockExchange: 'KRX', currency: 'KRW', currencySymbol: '₩', marketCap: '$1.8T', tradingHours: '09:00-15:30 KST', tickers: ['SAMSUNG', 'HYMC', 'SKHY', 'POSCO', 'KB', 'KAKAO', 'NAVER'] },
  { code: 'IN', name: 'India', region: 'Asia Pacific', stockExchange: 'BSE / NSE', currency: 'INR', currencySymbol: '₹', marketCap: '$3.5T', tradingHours: '09:15-15:30 IST', tickers: ['RELIANCE', 'TCS', 'INFY', 'HDFCBANK', 'ICICIBANK', 'SBIN', 'BHARTIARTL'] },
  { code: 'AU', name: 'Australia', region: 'Asia Pacific', stockExchange: 'ASX', currency: 'AUD', currencySymbol: 'A$', marketCap: '$1.8T', tradingHours: '10:00-16:00 AEDT', tickers: ['BHP', 'CBA', 'CSL', 'NAB', 'WBC', 'ANZ', 'WOW', 'TLS', 'RIO'] },
  { code: 'SG', name: 'Singapore', region: 'Asia Pacific', stockExchange: 'SGX', currency: 'SGD', currencySymbol: 'S$', marketCap: '$600B', tradingHours: '09:00-17:00 SGT', tickers: ['DBS', 'OCBC', 'UOB', 'SBUX', 'WIL', 'KEP'] },
  { code: 'TW', name: 'Taiwan', region: 'Asia Pacific', stockExchange: 'TWSE', currency: 'TWD', currencySymbol: 'NT$', marketCap: '$1.2T', tickers: ['TSMC', 'FOXCONN', 'MTK', 'HTC'] },
  { code: 'MY', name: 'Malaysia', region: 'Asia Pacific', stockExchange: 'Bursa Malaysia', currency: 'MYR', currencySymbol: 'RM', marketCap: '$350B', tickers: ['MAYBANK', 'CIMB', 'PUBLIC', 'TENAGA'] },
  { code: 'ID', name: 'Indonesia', region: 'Asia Pacific', stockExchange: 'IDX', currency: 'IDR', currencySymbol: 'Rp', marketCap: '$500B', tickers: ['BBCA', 'BBRI', 'TLKM', 'ASII'] },
  { code: 'TH', name: 'Thailand', region: 'Asia Pacific', stockExchange: 'SET', currency: 'THB', currencySymbol: '฿', marketCap: '$450B', tickers: ['CPALL', 'PTT', 'AOT', 'ADVANC'] },
  { code: 'PH', name: 'Philippines', region: 'Asia Pacific', stockExchange: 'PSE', currency: 'PHP', currencySymbol: '₱', tickers: ['SM', 'BDO', 'ALI', 'TEL'] },
  { code: 'VN', name: 'Vietnam', region: 'Asia Pacific', stockExchange: 'HOSE', currency: 'VND', currencySymbol: '₫', tickers: ['VIC', 'VHM', 'TCB', 'HPG'] },
  { code: 'NZ', name: 'New Zealand', region: 'Asia Pacific', stockExchange: 'NZX', currency: 'NZD', currencySymbol: 'NZ$', tickers: ['FPH', 'A2M', 'ATM', 'SPK'] },

  // Middle East & Africa
  { code: 'AE', name: 'UAE', region: 'Middle East & Africa', stockExchange: 'ADX / DFM', currency: 'AED', currencySymbol: 'د.إ', marketCap: '$720B', tickers: ['ADNOC', 'EMAAR', 'DEWA', 'FAB'] },
  { code: 'SA', name: 'Saudi Arabia', region: 'Middle East & Africa', stockExchange: 'Tadawul', currency: 'SAR', currencySymbol: '﷼', marketCap: '$2.7T', tickers: ['ARAMCO', 'SNB', 'ALRAJHI', 'STC', 'SABIC'] },
  { code: 'QA', name: 'Qatar', region: 'Middle East & Africa', stockExchange: 'QSE', currency: 'QAR', currencySymbol: '﷼', tickers: ['QNB', 'QATAR', 'MASRAF'] },
  { code: 'KW', name: 'Kuwait', region: 'Middle East & Africa', stockExchange: 'Boursa Kuwait', currency: 'KWD', currencySymbol: 'د.ك', tickers: ['NBK', 'ZAIN', 'KFH'] },
  { code: 'IL', name: 'Israel', region: 'Middle East & Africa', stockExchange: 'TASE', currency: 'ILS', currencySymbol: '₪', marketCap: '$260B', tickers: ['TEVA', 'NICE', 'WIX', 'CHKP'] },
  { code: 'ZA', name: 'South Africa', region: 'Middle East & Africa', stockExchange: 'JSE', currency: 'ZAR', currencySymbol: 'R', marketCap: '$900B', tradingHours: '09:00-17:00 SAST', tickers: ['NASPERS', 'ANHEUSER', 'FIRSTRAND', 'STANDARD', 'MTN'] },
  { code: 'NG', name: 'Nigeria', region: 'Middle East & Africa', stockExchange: 'NGX', currency: 'NGN', currencySymbol: '₦', tickers: ['DANGOTE', 'MTNN', 'ZENITH', 'ACCESS'] },
  { code: 'KE', name: 'Kenya', region: 'Middle East & Africa', stockExchange: 'NSE', currency: 'KES', currencySymbol: 'KSh', tickers: ['SCOM', 'EABL', 'KCB'] },
  { code: 'EG', name: 'Egypt', region: 'Middle East & Africa', stockExchange: 'EGX', currency: 'EGP', currencySymbol: 'E£', tickers: ['COMI', 'EFG', 'HRHO', 'TMGH'] },
  { code: 'MA', name: 'Morocco', region: 'Middle East & Africa', stockExchange: 'Casablanca SE', currency: 'MAD', currencySymbol: 'MAD', tickers: ['ATW', 'IAM', 'BCP', 'LQ'] },
  { code: 'MU', name: 'Mauritius', region: 'Middle East & Africa', stockExchange: 'SEM', currency: 'MUR', currencySymbol: 'Rs', tickers: ['MCB', 'SBM', 'NMH'] },
]
