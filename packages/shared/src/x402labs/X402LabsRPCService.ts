/**
 * X402Labs RPC Service
 * 
 * Wrapper for all blockchain RPC calls through x402labs.cloud/rpc
 * Supports multiple chains and provides a unified interface for crypto analysis
 */

export interface X402LabsRPCConfig {
  rpcEndpoint: string;
  apiKey?: string;
}

export interface RPCRequest {
  jsonrpc: '2.0';
  id: number | string;
  method: string;
  params?: any[];
}

export interface RPCResponse<T = any> {
  jsonrpc: '2.0';
  id: number | string;
  result?: T;
  error?: {
    code: number;
    message: string;
    data?: any;
  };
}

export interface ChainInfo {
  chainId: string;
  name: string;
  rpcMethod: string;
}

// Supported chains via x402labs
export const SUPPORTED_CHAINS: Record<string, ChainInfo> = {
  ethereum: {
    chainId: '1',
    name: 'Ethereum Mainnet',
    rpcMethod: 'eth'
  },
  polygon: {
    chainId: '137',
    name: 'Polygon',
    rpcMethod: 'polygon'
  },
  bsc: {
    chainId: '56',
    name: 'BSC',
    rpcMethod: 'bsc'
  },
  arbitrum: {
    chainId: '42161',
    name: 'Arbitrum',
    rpcMethod: 'arbitrum'
  },
  optimism: {
    chainId: '10',
    name: 'Optimism',
    rpcMethod: 'optimism'
  },
  base: {
    chainId: '8453',
    name: 'Base',
    rpcMethod: 'base'
  },
  solana: {
    chainId: 'solana',
    name: 'Solana',
    rpcMethod: 'solana'
  }
};

export class X402LabsRPCService {
  private config: X402LabsRPCConfig;
  private requestIdCounter: number = 1;

  constructor(config: X402LabsRPCConfig) {
    this.config = config;
  }

  /**
   * Make a raw RPC call to x402labs
   */
  async makeRPCCall<T = any>(
    chain: string,
    method: string,
    params: any[] = []
  ): Promise<T> {
    const chainInfo = SUPPORTED_CHAINS[chain.toLowerCase()];
    if (!chainInfo) {
      throw new Error(`Unsupported chain: ${chain}. Supported chains: ${Object.keys(SUPPORTED_CHAINS).join(', ')}`);
    }

    const rpcRequest: RPCRequest = {
      jsonrpc: '2.0',
      id: this.requestIdCounter++,
      method: method,
      params: params
    };

    console.log('🔗 [x402labs] Making RPC call:', {
      chain,
      method,
      params: JSON.stringify(params).substring(0, 100)
    });

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'X-Chain': chain.toLowerCase()
    };

    if (this.config.apiKey) {
      headers['Authorization'] = `Bearer ${this.config.apiKey}`;
    }

    try {
      const response = await fetch(this.config.rpcEndpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(rpcRequest)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`RPC request failed: ${response.status} - ${errorText}`);
      }

      const rpcResponse: RPCResponse<T> = await response.json();

      if (rpcResponse.error) {
        throw new Error(`RPC error: ${rpcResponse.error.message} (code: ${rpcResponse.error.code})`);
      }

      console.log('✅ [x402labs] RPC call successful');
      return rpcResponse.result!;
    } catch (error) {
      console.error('❌ [x402labs] RPC call failed:', error);
      throw error;
    }
  }

  // ====================
  // Ethereum/EVM Methods
  // ====================

  /**
   * Get latest block number
   */
  async getBlockNumber(chain: string = 'ethereum'): Promise<string> {
    return this.makeRPCCall(chain, 'eth_blockNumber', []);
  }

  /**
   * Get balance for an address
   */
  async getBalance(chain: string, address: string): Promise<string> {
    return this.makeRPCCall(chain, 'eth_getBalance', [address, 'latest']);
  }

  /**
   * Get transaction by hash
   */
  async getTransaction(chain: string, txHash: string): Promise<any> {
    return this.makeRPCCall(chain, 'eth_getTransactionByHash', [txHash]);
  }

  /**
   * Get transaction receipt
   */
  async getTransactionReceipt(chain: string, txHash: string): Promise<any> {
    return this.makeRPCCall(chain, 'eth_getTransactionReceipt', [txHash]);
  }

  /**
   * Get block by number
   */
  async getBlockByNumber(
    chain: string,
    blockNumber: string,
    includeTransactions: boolean = false
  ): Promise<any> {
    return this.makeRPCCall(chain, 'eth_getBlockByNumber', [blockNumber, includeTransactions]);
  }

  /**
   * Call a contract method (read-only)
   */
  async call(
    chain: string,
    to: string,
    data: string,
    blockNumber: string = 'latest'
  ): Promise<string> {
    return this.makeRPCCall(chain, 'eth_call', [{ to, data }, blockNumber]);
  }

  /**
   * Get transaction count (nonce) for an address
   */
  async getTransactionCount(chain: string, address: string): Promise<string> {
    return this.makeRPCCall(chain, 'eth_getTransactionCount', [address, 'latest']);
  }

  /**
   * Get gas price
   */
  async getGasPrice(chain: string): Promise<string> {
    return this.makeRPCCall(chain, 'eth_gasPrice', []);
  }

  /**
   * Get logs matching a filter
   */
  async getLogs(
    chain: string,
    filter: {
      fromBlock?: string;
      toBlock?: string;
      address?: string | string[];
      topics?: (string | string[] | null)[];
    }
  ): Promise<any[]> {
    return this.makeRPCCall(chain, 'eth_getLogs', [filter]);
  }

  /**
   * Estimate gas for a transaction
   */
  async estimateGas(
    chain: string,
    transaction: {
      from?: string;
      to?: string;
      data?: string;
      value?: string;
    }
  ): Promise<string> {
    return this.makeRPCCall(chain, 'eth_estimateGas', [transaction]);
  }

  // ====================
  // Solana Methods
  // ====================

  /**
   * Get Solana balance
   */
  async getSolanaBalance(address: string): Promise<{ value: number }> {
    return this.makeRPCCall('solana', 'getBalance', [address]);
  }

  /**
   * Get Solana account info
   */
  async getSolanaAccountInfo(address: string): Promise<any> {
    return this.makeRPCCall('solana', 'getAccountInfo', [
      address,
      { encoding: 'jsonParsed' }
    ]);
  }

  /**
   * Get Solana token accounts by owner
   */
  async getSolanaTokenAccountsByOwner(
    ownerAddress: string,
    programId: string = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
  ): Promise<any> {
    return this.makeRPCCall('solana', 'getTokenAccountsByOwner', [
      ownerAddress,
      { programId },
      { encoding: 'jsonParsed' }
    ]);
  }

  /**
   * Get Solana transaction
   */
  async getSolanaTransaction(signature: string): Promise<any> {
    return this.makeRPCCall('solana', 'getTransaction', [
      signature,
      { encoding: 'jsonParsed', maxSupportedTransactionVersion: 0 }
    ]);
  }

  /**
   * Get recent Solana block production
   */
  async getSolanaRecentBlockhash(): Promise<any> {
    return this.makeRPCCall('solana', 'getRecentBlockhash', []);
  }

  /**
   * Get Solana signatures for address
   */
  async getSolanaSignaturesForAddress(
    address: string,
    limit: number = 10
  ): Promise<any[]> {
    return this.makeRPCCall('solana', 'getSignaturesForAddress', [
      address,
      { limit }
    ]);
  }

  // ====================
  // Utility Methods
  // ====================

  /**
   * Convert wei to ether
   */
  weiToEther(wei: string): string {
    const weiNum = BigInt(wei);
    const etherNum = Number(weiNum) / 1e18;
    return etherNum.toFixed(6);
  }

  /**
   * Convert lamports to SOL
   */
  lamportsToSol(lamports: number): number {
    return lamports / 1e9;
  }

  /**
   * Get supported chains list
   */
  getSupportedChains(): ChainInfo[] {
    return Object.values(SUPPORTED_CHAINS);
  }

  /**
   * Check if a chain is supported
   */
  isChainSupported(chain: string): boolean {
    return chain.toLowerCase() in SUPPORTED_CHAINS;
  }
}

/**
 * Create a default instance with x402labs endpoint
 */
export function createX402LabsRPCService(apiKey?: string): X402LabsRPCService {
  return new X402LabsRPCService({
    rpcEndpoint: 'https://x402labs.cloud/rpc',
    apiKey
  });
}
