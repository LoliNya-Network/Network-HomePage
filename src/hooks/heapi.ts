interface CountryData {
  Iso3166_Name: string
  CC: string
}

interface RIRData {
  CC: string
  RIR: string
  Prefix: string
}

interface BogonData {
  purpose: string
  isbogon: boolean
  status: string
}

interface WhoisPrefixData {
  countrydata: CountryData
  CC?: string
  Org?: string
  RIRData: RIRData
  bogondata: BogonData
  Prefix: string
}

interface WhoisAPIResponse {
  success: boolean
  data: WhoisPrefixData[]
  message: string
}

// get AS prefixes with WHOIS information from Nyalo API
export async function getASPrefixesWithWhois(asn: string | number): Promise<WhoisPrefixData[]> {
  try {
    const url = `https://whois-api.nyalo.li/api/as/${asn}/whois`
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Network-HomePage/1.0'
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: WhoisAPIResponse = await response.json()
    
    if (!data.success) {
      throw new Error('API request failed')
    }
    
    return data.data
  } catch (error) {
    console.error('Failed to fetch WHOIS data:', error)
    throw new Error('Failed to fetch WHOIS data')
  }
}