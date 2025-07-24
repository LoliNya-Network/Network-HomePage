export interface NetworkNode {
  id: string
  name: string
  lat: number
  lng: number
  type: 'primary' | 'secondary'
  provider: string
  connections: string[]
}

export interface PeeringLocation {
  id: string
  name: string
  provider: string
  type: 'primary' | 'secondary'
}

class NodeService {
  private static instance: NodeService
  private nodes: NetworkNode[] = []
  private peeringLocations: PeeringLocation[] = []
  private loading = false

  public static getInstance(): NodeService {
    if (!NodeService.instance) {
      NodeService.instance = new NodeService()
    }
    return NodeService.instance
  }

  public async fetchNodes(url?: string): Promise<NetworkNode[]> {
    if (this.loading) {
      return this.nodes
    }

    this.loading = true
    
    try {
      const apiUrl = url || '/assets/nodelist.json' // 默认使用本地文件
      const response = await fetch(apiUrl)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      this.nodes = data
      
      // 从节点数据中提取peering位置信息
      this.peeringLocations = this.nodes.map(node => ({
        id: node.id,
        name: node.name,
        provider: node.provider,
        type: node.type
      }))
      
      return this.nodes
    } catch (error) {
      console.error('Failed to fetch network nodes:', error)
      // 如果获取失败，返回备用数据
      this.nodes = this.getFallbackNodes()
      this.peeringLocations = this.nodes.map(node => ({
        id: node.id,
        name: node.name,
        provider: node.provider,
        type: node.type
      }))
      return this.nodes
    } finally {
      this.loading = false
    }
  }

  public getNodes(): NetworkNode[] {
    return this.nodes
  }

  public getPeeringLocations(): PeeringLocation[] {
    return this.peeringLocations
  }

  public isLoading(): boolean {
    return this.loading
  }

  private getFallbackNodes(): NetworkNode[] {
    return [
      {
        id: 'locix-frankfurt',
        name: 'Frankfurt, Germany',
        lat: 50.1109,
        lng: 8.6821,
        type: 'primary',
        provider: 'DataCenter One',
        connections: ['amsterdam', 'london', 'hongkong']
      },
      {
        id: 'amsterdam',
        name: 'Amsterdam, Netherlands',
        lat: 52.3676,
        lng: 4.9041,
        type: 'secondary',
        provider: 'AMS-IX',
        connections: ['locix-frankfurt']
      },
      {
        id: 'london',
        name: 'London, United Kingdom',
        lat: 51.5074,
        lng: -0.1278,
        type: 'secondary',
        provider: 'LINX',
        connections: ['locix-frankfurt']
      },
      {
        id: 'tokyo',
        name: 'Tokyo, Japan',
        lat: 35.6762,
        lng: 139.6503,
        type: 'secondary',
        provider: 'JPIX',
        connections: ['locix-frankfurt']
      },
      {
        id: 'singapore',
        name: 'Singapore',
        lat: 1.3521,
        lng: 103.8198,
        type: 'secondary',
        provider: 'SGIX',
        connections: ['hongkong']
      },
      {
        id: 'hongkong',
        name: 'Hong Kong',
        lat: 22.3193,
        lng: 114.1694,
        type: 'primary',
        provider: 'HKIX',
        connections: ['locix-frankfurt', 'tokyo', 'singapore']
      }
    ]
  }
}

export default NodeService
