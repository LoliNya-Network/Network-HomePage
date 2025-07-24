interface PrefixData {
  Prefix: string
  Count: number
  Total: number
}

interface HENetBGPResponse {
  prefixes: PrefixData[]
}

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

interface HENetWhoisResponse {
  response: WhoisPrefixData[]
}

interface WhoisRequestBody {
  prefixes: string[]
}

interface APIResponse {
  success: boolean
  data?: any
  error?: string
  message?: string
}

// get HE.NET BGP prefixes
async function getHENetBGPPrefixes(asn: string | number): Promise<HENetBGPResponse> {
  try {
    const url = `https://bgp.he.net/super-lg/report/api/v1/prefixes/originated/${asn}`
    
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

    const data: HENetBGPResponse = await response.json()
    return data
  } catch (error) {
    console.error('Failed to fetch HE.NET BGP data:', error)
    throw new Error('Failed to fetch HE.NET BGP data')
  }
}

// get HE.NET WHOIS prefixes
async function getHENetWhoisPrefixes(prefixes: string[]): Promise<WhoisPrefixData[]> {
  try {
    const url = 'https://bgp.he.net/super-lg/report/api/v1/whois/prefixes'
    
    const requestBody: WhoisRequestBody = {
      prefixes: prefixes
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'Network-HomePage/1.0'
      },
      body: JSON.stringify(requestBody)
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: HENetWhoisResponse = await response.json()
    return data.response
  } catch (error) {
    console.error('Failed to fetch HE.NET WHOIS data:', error)
    throw new Error('Failed to fetch HE.NET WHOIS data')
  }
}

// get AS prefixes with WHOIS information
async function getASPrefixesWithWhois(asn: string | number): Promise<WhoisPrefixData[]> {
  const bgpData = await getHENetBGPPrefixes(asn)
  const prefixStrings = bgpData.prefixes.map((p: PrefixData) => p.Prefix)
  const whoisData = await getHENetWhoisPrefixes(prefixStrings)
  return whoisData
}

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

// Handle CORS preflight requests
function handleCORS(request: Request): Response | null {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    })
  }
  return null
}

// Create JSON response with CORS headers
function jsonResponse(data: any, status: number = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  })
}

// Error response helper
function errorResponse(message: string, status: number = 400): Response {
  const response: APIResponse = {
    success: false,
    error: message,
  }
  return jsonResponse(response, status)
}

// Success response helper
function successResponse(data: any, message?: string): Response {
  const response: APIResponse = {
    success: true,
    data,
    message,
  }
  return jsonResponse(response)
}

// Main request handler
export default {
  async fetch(request: Request): Promise<Response> {
    // Handle CORS preflight
    const corsResponse = handleCORS(request)
    if (corsResponse) return corsResponse

    const url = new URL(request.url)
    const path = url.pathname

    try {
      // GET /api/bgp/:asn - Get BGP prefixes for an ASN
      if (request.method === 'GET' && path.startsWith('/api/bgp/')) {
        const asn = path.split('/')[3]
        
        if (!asn) {
          return errorResponse('ASN parameter is required')
        }

        // Validate ASN format
        if (!/^\d+$/.test(asn)) {
          return errorResponse('Invalid ASN format. ASN must be numeric.')
        }

        const bgpData = await getHENetBGPPrefixes(asn)
        return successResponse(bgpData, `BGP prefixes for AS${asn}`)
      }

      // POST /api/whois - Get WHOIS information for prefixes
      if (request.method === 'POST' && path === '/api/whois') {
        const contentType = request.headers.get('content-type')
        if (!contentType || !contentType.includes('application/json')) {
          return errorResponse('Content-Type must be application/json')
        }

        const body = await request.json()
        
        if (!body.prefixes || !Array.isArray(body.prefixes)) {
          return errorResponse('Request body must contain a "prefixes" array')
        }

        if (body.prefixes.length === 0) {
          return errorResponse('Prefixes array cannot be empty')
        }

        if (body.prefixes.length > 100) {
          return errorResponse('Maximum 100 prefixes allowed per request')
        }

        const whoisData = await getHENetWhoisPrefixes(body.prefixes)
        return successResponse(whoisData, `WHOIS data for ${body.prefixes.length} prefixes`)
      }

      // GET /api/as/:asn/whois - Get AS prefixes with WHOIS information
      if (request.method === 'GET' && path.startsWith('/api/as/') && path.endsWith('/whois')) {
        const asn = path.split('/')[3]
        
        if (!asn) {
          return errorResponse('ASN parameter is required')
        }

        // Validate ASN format
        if (!/^\d+$/.test(asn)) {
          return errorResponse('Invalid ASN format. ASN must be numeric.')
        }

        const whoisData = await getASPrefixesWithWhois(asn)
        return successResponse(whoisData, `AS${asn} prefixes with WHOIS information`)
      }

      // GET /api/health - Health check endpoint
      if (request.method === 'GET' && path === '/api/health') {
        return successResponse({ status: 'healthy', timestamp: new Date().toISOString() })
      }

      // GET / or /api - API documentation
      if (request.method === 'GET' && (path === '/' || path === '/api')) {
        const documentation = {
          name: 'HE.NET BGP WHOIS API',
          description: 'API service for fetching BGP and WHOIS information from HE.NET',
          endpoints: {
            'GET /api/health': 'Health check endpoint',
            'GET /api/bgp/:asn': 'Get BGP prefixes for an ASN',
            'POST /api/whois': 'Get WHOIS information for prefixes (body: {prefixes: string[]})',
            'GET /api/as/:asn/whois': 'Get AS prefixes with WHOIS information'
          },
          examples: {
            'BGP prefixes': 'GET /api/bgp/6393',
            'WHOIS data': 'POST /api/whois with body: {"prefixes": ["1.1.1.0/24"]}',
            'AS with WHOIS': 'GET /api/as/6393/whois'
          }
        }
        return successResponse(documentation)
      }

      // 404 for unmatched routes
      return errorResponse('API endpoint not found', 404)

    } catch (error) {
      console.error('API Error:', error)
      return errorResponse(
        error instanceof Error ? error.message : 'Internal server error',
        500
      )
    }
  },
}