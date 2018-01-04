// @flow
import type { Unit } from "./data/types";
// inspired by https://github.com/smirzaei/currency-formatter/blob/master/currencies.json
const units: { [key: string]: Unit } = {
  AED: { name: "Emirati Dirham", code: "AED", symbol: "د.إ.‏", magnitude: 2 },
  AFN: { name: "Afghan Afghani", code: "AFN", symbol: "؋", magnitude: 2 },
  ALL: { name: "Albanian lek", code: "ALL", symbol: "Lek", magnitude: 2 },
  AMD: { name: "Armenian dram", code: "AMD", symbol: "֏", magnitude: 2 },
  ANG: { name: "Dutch Guilder", code: "ANG", symbol: "ƒ", magnitude: 2 },
  AOA: { name: "Angolan Kwanza", code: "AOA", symbol: "Kz", magnitude: 2 },
  ARS: { name: "Argentine peso", code: "ARS", symbol: "$", magnitude: 2 },
  AUD: { name: "Australian Dollar", code: "AUD", symbol: "$", magnitude: 2 },
  AWG: { name: "Arubin florin", code: "AWG", symbol: "ƒ", magnitude: 2 },
  AZN: { name: "Azerbaijani manat", code: "AZN", symbol: "₼", magnitude: 2 },
  BAM: {
    name: "Bosnian Convertible Marka",
    code: "BAM",
    symbol: "КМ",
    magnitude: 2
  },
  BBD: { name: "Barbadian dollar", code: "BBD", symbol: "$", magnitude: 2 },
  BDT: { name: "Bangladeshi Taka", code: "BDT", symbol: "৳", magnitude: 0 },
  BGN: { name: "Bulgarian lev", code: "BGN", symbol: "лв.", magnitude: 2 },
  BHD: { name: "Bahraini Dinar", code: "BHD", symbol: "د.ب.‏", magnitude: 3 },
  BIF: { name: "Burundian Franc", code: "BIF", symbol: "FBu", magnitude: 0 },
  BMD: { name: "Bermudian dollar", code: "BMD", symbol: "$", magnitude: 2 },
  BND: { name: "Bruneian Dollar", code: "BND", symbol: "$", magnitude: 0 },
  BOB: { name: "Bolivian Boliviano", code: "BOB", symbol: "Bs", magnitude: 2 },
  BRL: { name: "Brazilian real", code: "BRL", symbol: "R$", magnitude: 2 },
  BSD: { name: "Bahamian dollar", code: "BSD", symbol: "$", magnitude: 2 },
  BTN: { name: "Bhutanese Ngultrum", code: "BTN", symbol: "Nu.", magnitude: 1 },
  BWP: { name: "Botswana Pula", code: "BWP", symbol: "P", magnitude: 2 },
  BYR: { name: "Belarusian ruble", code: "BYR", symbol: "р.", magnitude: 2 },
  BZD: { name: "Belize dollar", code: "BZD", symbol: "BZ$", magnitude: 2 },
  CAD: { name: "Canadian Dollar", code: "CAD", symbol: "$", magnitude: 2 },
  CDF: { name: "CDF", code: "CDF", symbol: "FC", magnitude: 2 },
  CHF: { name: "Swiss Franc", code: "CHF", symbol: "CHF", magnitude: 2 },
  CLP: { name: "Chilean Peso", code: "CLP", symbol: "$", magnitude: 2 },
  CNY: {
    name: "Yuan or chinese renminbi",
    code: "CNY",
    symbol: "¥",
    magnitude: 2
  },
  COP: { name: "Colombian peso", code: "COP", symbol: "$", magnitude: 2 },
  CRC: { name: "Costa Rican colón", code: "CRC", symbol: "₡", magnitude: 2 },
  CUC: {
    name: "Cuban convertible peso",
    code: "CUC",
    symbol: "CUC",
    magnitude: 2
  },
  CUP: { name: "Cuban peso", code: "CUP", symbol: "$MN", magnitude: 2 },
  CVE: { name: "Cape Verdean Escudo", code: "CVE", symbol: "$", magnitude: 2 },
  CZK: { name: "Czech koruna", code: "CZK", symbol: "Kč", magnitude: 2 },
  DJF: { name: "Djiboutian Franc", code: "DJF", symbol: "Fdj", magnitude: 0 },
  DKK: { name: "Danish krone", code: "DKK", symbol: "kr.", magnitude: 2 },
  DOP: { name: "Dominican peso", code: "DOP", symbol: "RD$", magnitude: 2 },
  DZD: { name: "Algerian Dinar", code: "DZD", symbol: "د.ج.‏", magnitude: 2 },
  EGP: { name: "Egyptian Pound", code: "EGP", symbol: "ج.م.‏", magnitude: 2 },
  ERN: { name: "Eritrean nakfa", code: "ERN", symbol: "Nfk", magnitude: 2 },
  ETB: { name: "Ethiopian Birr", code: "ETB", symbol: "ETB", magnitude: 2 },
  EUR: { name: "Euro", code: "EUR", symbol: "€", magnitude: 2 },
  FJD: { name: "Fijian dollar", code: "FJD", symbol: "$", magnitude: 2 },
  FKP: {
    name: "Falkland Island Pound",
    code: "FKP",
    symbol: "£",
    magnitude: 2
  },
  GBP: { name: "British Pound", code: "GBP", symbol: "£", magnitude: 2 },
  GEL: { name: "Georgian lari", code: "GEL", symbol: "Lari", magnitude: 2 },
  GHS: { name: "Ghanaian Cedi", code: "GHS", symbol: "₵", magnitude: 2 },
  GIP: { name: "Gibraltar pound", code: "GIP", symbol: "£", magnitude: 2 },
  GMD: { name: "Gambian dalasi", code: "GMD", symbol: "D", magnitude: 2 },
  GNF: { name: "Guinean Franc", code: "GNF", symbol: "FG", magnitude: 0 },
  GTQ: { name: "Guatemalan Quetzal", code: "GTQ", symbol: "Q", magnitude: 2 },
  GYD: { name: "Guyanese dollar", code: "GYD", symbol: "$", magnitude: 2 },
  HKD: { name: "Hong Kong dollar", code: "HKD", symbol: "HK$", magnitude: 2 },
  HNL: { name: "Honduran lempira", code: "HNL", symbol: "L.", magnitude: 2 },
  HRK: { name: "Croatian kuna", code: "HRK", symbol: "kn", magnitude: 2 },
  HTG: { name: "Haitian gourde", code: "HTG", symbol: "G", magnitude: 2 },
  HUF: { name: "Hungarian forint", code: "HUF", symbol: "Ft", magnitude: 2 },
  IDR: { name: "Indonesian Rupiah", code: "IDR", symbol: "Rp", magnitude: 0 },
  ILS: { name: "Israeli Shekel", code: "ILS", symbol: "₪", magnitude: 2 },
  INR: { name: "Indian Rupee", code: "INR", symbol: "₹", magnitude: 2 },
  IQD: { name: "Iraqi Dinar", code: "IQD", symbol: "د.ع.‏", magnitude: 2 },
  IRR: { name: "Iranian Rial", code: "IRR", symbol: "﷼", magnitude: 2 },
  ISK: { name: "Icelandic Krona", code: "ISK", symbol: "kr.", magnitude: 0 },
  JMD: { name: "Jamaican dollar", code: "JMD", symbol: "J$", magnitude: 2 },
  JOD: { name: "Jordanian Dinar", code: "JOD", symbol: "د.ا.‏", magnitude: 3 },
  JPY: { name: "Japanese yen", code: "JPY", symbol: "¥", magnitude: 0 },
  KES: { name: "Kenyan Shilling", code: "KES", symbol: "S", magnitude: 2 },
  KGS: { name: "Kyrgyzstani som", code: "KGS", symbol: "сом", magnitude: 2 },
  KHR: { name: "Cambodian Riel", code: "KHR", symbol: "៛", magnitude: 0 },
  KMF: { name: "Comoran Franc", code: "KMF", symbol: "CF", magnitude: 2 },
  KPW: { name: "North Korean won", code: "KPW", symbol: "₩", magnitude: 0 },
  KRW: { name: "South Korean won", code: "KRW", symbol: "₩", magnitude: 0 },
  KWD: { name: "Kuwaiti Dinar", code: "KWD", symbol: "د.ك.‏", magnitude: 3 },
  KYD: { name: "Caymanian Dollar", code: "KYD", symbol: "$", magnitude: 2 },
  KZT: { name: "Kazakhstani tenge", code: "KZT", symbol: "₸", magnitude: 2 },
  LAK: { name: "Lao or Laotian Kip", code: "LAK", symbol: "₭", magnitude: 0 },
  LBP: { name: "Lebanese Pound", code: "LBP", symbol: "ل.ل.‏", magnitude: 2 },
  LKR: { name: "Sri Lankan Rupee", code: "LKR", symbol: "₨", magnitude: 0 },
  LRD: { name: "Liberian Dollar", code: "LRD", symbol: "$", magnitude: 2 },
  LSL: { name: "Lesotho loti", code: "LSL", symbol: "M", magnitude: 2 },
  LYD: { name: "Libyan Dinar", code: "LYD", symbol: "د.ل.‏", magnitude: 3 },
  MAD: { name: "Moroccan Dirham", code: "MAD", symbol: "د.م.‏", magnitude: 2 },
  MDL: { name: "Moldovan Leu", code: "MDL", symbol: "lei", magnitude: 2 },
  MGA: { name: "Malagasy Ariary", code: "MGA", symbol: "Ar", magnitude: 0 },
  MKD: { name: "Macedonian Denar", code: "MKD", symbol: "ден.", magnitude: 2 },
  MMK: { name: "Burmese Kyat", code: "MMK", symbol: "K", magnitude: 2 },
  MNT: { name: "Mongolian Tughrik", code: "MNT", symbol: "₮", magnitude: 2 },
  MOP: { name: "Macau Pataca", code: "MOP", symbol: "MOP$", magnitude: 2 },
  MRO: { name: "Mauritanian Ouguiya", code: "MRO", symbol: "UM", magnitude: 2 },
  MTL: { name: "MTL", code: "MTL", symbol: "₤", magnitude: 2 },
  MUR: { name: "Mauritian rupee", code: "MUR", symbol: "₨", magnitude: 2 },
  MVR: { name: "Maldivian Rufiyaa", code: "MVR", symbol: "MVR", magnitude: 1 },
  MWK: { name: "Malawian Kwacha", code: "MWK", symbol: "MK", magnitude: 2 },
  MXN: { name: "Mexico Peso", code: "MXN", symbol: "$", magnitude: 2 },
  MYR: { name: "Malaysian Ringgit", code: "MYR", symbol: "RM", magnitude: 2 },
  MZN: { name: "Mozambican Metical", code: "MZN", symbol: "MT", magnitude: 0 },
  NAD: { name: "Namibian Dollar", code: "NAD", symbol: "$", magnitude: 2 },
  NGN: { name: "Nigerian Naira", code: "NGN", symbol: "₦", magnitude: 2 },
  NIO: { name: "Nicaraguan córdoba", code: "NIO", symbol: "C$", magnitude: 2 },
  NOK: { name: "Norwegian krone", code: "NOK", symbol: "kr", magnitude: 2 },
  NPR: { name: "Nepalese Rupee", code: "NPR", symbol: "₨", magnitude: 2 },
  NZD: { name: "New Zealand Dollar", code: "NZD", symbol: "$", magnitude: 2 },
  OMR: { name: "Omani Rial", code: "OMR", symbol: "﷼", magnitude: 3 },
  PAB: { name: "Balboa panamérn", code: "PAB", symbol: "B/.", magnitude: 2 },
  PEN: { name: "Peruvian nuevo sol", code: "PEN", symbol: "S/.", magnitude: 2 },
  PGK: {
    name: "Papua New Guinean Kina",
    code: "PGK",
    symbol: "K",
    magnitude: 2
  },
  PHP: { name: "Philippine Peso", code: "PHP", symbol: "₱", magnitude: 2 },
  PKR: { name: "Pakistani Rupee", code: "PKR", symbol: "₨", magnitude: 2 },
  PLN: { name: "Polish złoty", code: "PLN", symbol: "zł", magnitude: 2 },
  PYG: { name: "Paraguayan guarani", code: "PYG", symbol: "₲", magnitude: 2 },
  QAR: { name: "Qatari Riyal", code: "QAR", symbol: "﷼", magnitude: 2 },
  RON: { name: "Romanian leu", code: "RON", symbol: "lei", magnitude: 2 },
  RSD: { name: "Serbian Dinar", code: "RSD", symbol: "Дин.", magnitude: 2 },
  RUB: { name: "Russian Rouble", code: "RUB", symbol: "₽", magnitude: 2 },
  RWF: { name: "Rwandan franc", code: "RWF", symbol: "RWF", magnitude: 2 },
  SAR: { name: "Saudi Arabian Riyal", code: "SAR", symbol: "﷼", magnitude: 2 },
  SBD: {
    name: "Solomon Islander Dollar",
    code: "SBD",
    symbol: "$",
    magnitude: 2
  },
  SCR: { name: "Seychellois Rupee", code: "SCR", symbol: "₨", magnitude: 2 },
  SDD: { name: "SDD", code: "SDD", symbol: "LSd", magnitude: 2 },
  SDG: { name: "Sudanese Pound", code: "SDG", symbol: "£‏", magnitude: 2 },
  SEK: { name: "Swedish krona", code: "SEK", symbol: "kr", magnitude: 2 },
  SGD: { name: "Singapore Dollar", code: "SGD", symbol: "$", magnitude: 2 },
  SHP: { name: "SHP", code: "SHP", symbol: "£", magnitude: 2 },
  SLL: {
    name: "Sierra Leonean Leone",
    code: "SLL",
    symbol: "Le",
    magnitude: 2
  },
  SOS: { name: "Somali Shilling", code: "SOS", symbol: "S", magnitude: 2 },
  SRD: { name: "Surinamese dollar", code: "SRD", symbol: "$", magnitude: 2 },
  STD: { name: "STD", code: "STD", symbol: "Db", magnitude: 2 },
  SVC: { name: "SVC", code: "SVC", symbol: "₡", magnitude: 2 },
  SYP: { name: "Syrian Pound", code: "SYP", symbol: "£", magnitude: 2 },
  SZL: { name: "Swazi Lilangeni", code: "SZL", symbol: "E", magnitude: 2 },
  THB: { name: "Thai Baht", code: "THB", symbol: "฿", magnitude: 2 },
  TJS: { name: "Tajikistani somoni", code: "TJS", symbol: "TJS", magnitude: 2 },
  TMT: { name: "Turkmenistan manat", code: "TMT", symbol: "m", magnitude: 0 },
  TND: { name: "Tunisian Dinar", code: "TND", symbol: "د.ت.‏", magnitude: 3 },
  TOP: { name: "Tongan Pa'anga", code: "TOP", symbol: "T$", magnitude: 2 },
  TRY: { name: "Turkish Lira", code: "TRY", symbol: "TL", magnitude: 2 },
  TTD: { name: "Trinidadian dollar", code: "TTD", symbol: "TT$", magnitude: 2 },
  TVD: { name: "TVD", code: "TVD", symbol: "$", magnitude: 2 },
  TWD: { name: "Taiwan New Dollar", code: "TWD", symbol: "NT$", magnitude: 2 },
  TZS: { name: "Tanzanian Shilling", code: "TZS", symbol: "TSh", magnitude: 2 },
  UAH: { name: "Ukrainian Hryvnia", code: "UAH", symbol: "₴", magnitude: 2 },
  UGX: { name: "Ugandan Shilling", code: "UGX", symbol: "USh", magnitude: 2 },
  USD: { name: "US Dollar", code: "USD", symbol: "$", magnitude: 2 },
  UYU: { name: "Uruguayan peso", code: "UYU", symbol: "$U", magnitude: 2 },
  UZS: { name: "Uzbekistani som", code: "UZS", symbol: "сўм", magnitude: 2 },
  VEB: { name: "VEB", code: "VEB", symbol: "Bs.", magnitude: 2 },
  VEF: {
    name: "Venezuelan bolivar",
    code: "VEF",
    symbol: "Bs. F.",
    magnitude: 2
  },
  VND: { name: "Vietnamese Dong", code: "VND", symbol: "₫", magnitude: 1 },
  VUV: { name: "Ni-Vanuatu Vatu", code: "VUV", symbol: "VT", magnitude: 0 },
  WST: { name: "Samoan Tālā", code: "WST", symbol: "WS$", magnitude: 2 },
  XAF: { name: "XAF", code: "XAF", symbol: "F", magnitude: 2 },
  XCD: {
    name: "East Caribbean dollar",
    code: "XCD",
    symbol: "$",
    magnitude: 2
  },
  XOF: { name: "CFA Franc", code: "XOF", symbol: "F", magnitude: 2 },
  XPF: { name: "CFP Franc", code: "XPF", symbol: "F", magnitude: 2 },
  YER: { name: "Yemeni Rial", code: "YER", symbol: "﷼", magnitude: 2 },
  ZAR: { name: "South African Rand", code: "ZAR", symbol: "R", magnitude: 2 },
  ZMW: { name: "Zambian Kwacha", code: "ZMW", symbol: "ZK", magnitude: 2 },
  WON: { name: "WON", code: "WON", symbol: "₩", magnitude: 2 }
};
for (const u in units) {
  units[u].showAllDigits = true;
}

export default units;
