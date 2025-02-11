const currencyList = [
  { "code": "AUD", "name": "Australian Dollar" },
  { "code": "BGN", "name": "Bulgarian Lev" },
  { "code": "BRL", "name": "Brazilian Real" },
  { "code": "CAD", "name": "Canadian Dollar" },
  { "code": "CHF", "name": "Swiss Franc" },
  { "code": "CNY", "name": "Chinese Renminbi Yuan" },
  { "code": "CZK", "name": "Czech Koruna" },
  { "code": "DKK", "name": "Danish Krone" },
  { "code": "EUR", "name": "Euro" },
  { "code": "GBP", "name": "British Pound" },
  { "code": "HKD", "name": "Hong Kong Dollar" },
  { "code": "HUF", "name": "Hungarian Forint" },
  { "code": "IDR", "name": "Indonesian Rupiah" },
  { "code": "ILS", "name": "Israeli New Sheqel" },
  { "code": "INR", "name": "Indian Rupee" },
  { "code": "ISK", "name": "Icelandic Króna" },
  { "code": "JPY", "name": "Japanese Yen" },
  { "code": "KRW", "name": "South Korean Won" },
  { "code": "MXN", "name": "Mexican Peso" },
  { "code": "MYR", "name": "Malaysian Ringgit" },
  { "code": "NOK", "name": "Norwegian Krone" },
  { "code": "NZD", "name": "New Zealand Dollar" },
  { "code": "PHP", "name": "Philippine Peso" },
  { "code": "PLN", "name": "Polish Złoty" },
  { "code": "RON", "name": "Romanian Leu" },
  { "code": "SEK", "name": "Swedish Krona" },
  { "code": "SGD", "name": "Singapore Dollar" },
  { "code": "THB", "name": "Thai Baht" },
  { "code": "TRY", "name": "Turkish Lira" },
  { "code": "USD", "name": "United States Dollar" },
  { "code": "ZAR", "name": "South African Rand" }
  ];
  
  currencyList.sort((a, b) => a.code.localeCompare(b.code));

  export default currencyList;
  