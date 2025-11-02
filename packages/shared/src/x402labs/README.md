# x402labs RPC Service

Multi-chain blockchain RPC service for Mallory crypto analysis.

## Overview

This package provides a unified interface for querying blockchain data across multiple chains through the x402labs RPC infrastructure. All requests route through `https://x402labs.cloud/rpc`.

## Supported Chains

- Ethereum (mainnet)
- Polygon
- BSC (Binance Smart Chain)
- Arbitrum
- Optimism
- Base
- Solana

## Features

- ✅ Multi-chain support with unified API
- ✅ Type-safe TypeScript interfaces
- ✅ Automatic chain routing
- ✅ Built-in unit converters (wei/eth, lamports/sol)
- ✅ Error handling and logging
- ✅ Optional API key support

## Installation

```bash
# Already included in @darkresearch/mallory-shared
import { createX402LabsRPCService, SUPPORTED_CHAINS } from '@darkresearch/mallory-shared';
```

## Quick Start

```typescript
import { createX402LabsRPCService } from '@darkresearch/mallory-shared';

// Create service instance
const rpc = createX402LabsRPCService(process.env.X402LABS_API_KEY);

// Get Ethereum balance
const balanceWei = await rpc.getBalance('ethereum', '0x742d35Cc...');
const balanceEth = rpc.weiToEther(balanceWei);
console.log(`Balance: ${balanceEth} ETH`);

// Get Solana balance
const result = await rpc.getSolanaBalance('YourAddress...');
const balanceSol = rpc.lamportsToSol(result.value);
console.log(`Balance: ${balanceSol} SOL`);
```

## API Reference

### Constructor

```typescript
createX402LabsRPCService(apiKey?: string): X402LabsRPCService
```

Creates a new RPC service instance. API key is optional but recommended for higher rate limits.

### EVM Methods

#### getBalance
```typescript
getBalance(chain: string, address: string): Promise<string>
```
Get native token balance in wei. Returns hex string.

#### getTransaction
```typescript
getTransaction(chain: string, txHash: string): Promise<any>
```
Get transaction details by hash.

#### getTransactionReceipt
```typescript
getTransactionReceipt(chain: string, txHash: string): Promise<any>
```
Get transaction receipt with status and logs.

#### getBlockNumber
```typescript
getBlockNumber(chain: string): Promise<string>
```
Get current block number. Returns hex string.

#### getBlockByNumber
```typescript
getBlockByNumber(
  chain: string,
  blockNumber: string,
  includeTransactions: boolean = false
): Promise<any>
```
Get block details. Set `includeTransactions` to true for full transaction objects.

#### getGasPrice
```typescript
getGasPrice(chain: string): Promise<string>
```
Get current gas price in wei. Returns hex string.

#### getTransactionCount
```typescript
getTransactionCount(chain: string, address: string): Promise<string>
```
Get transaction count (nonce) for address. Returns hex string.

#### call
```typescript
call(
  chain: string,
  to: string,
  data: string,
  blockNumber: string = 'latest'
): Promise<string>
```
Make a read-only contract call.

#### getLogs
```typescript
getLogs(
  chain: string,
  filter: {
    fromBlock?: string;
    toBlock?: string;
    address?: string | string[];
    topics?: (string | string[] | null)[];
  }
): Promise<any[]>
```
Get event logs matching filter criteria.

#### estimateGas
```typescript
estimateGas(
  chain: string,
  transaction: {
    from?: string;
    to?: string;
    data?: string;
    value?: string;
  }
): Promise<string>
```
Estimate gas required for transaction. Returns hex string.

### Solana Methods

#### getSolanaBalance
```typescript
getSolanaBalance(address: string): Promise<{ value: number }>
```
Get SOL balance in lamports.

#### getSolanaAccountInfo
```typescript
getSolanaAccountInfo(address: string): Promise<any>
```
Get account info with JSON parsed data.

#### getSolanaTokenAccountsByOwner
```typescript
getSolanaTokenAccountsByOwner(
  ownerAddress: string,
  programId: string = 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA'
): Promise<any>
```
Get all token accounts owned by an address.

#### getSolanaTransaction
```typescript
getSolanaTransaction(signature: string): Promise<any>
```
Get transaction details by signature.

#### getSolanaSignaturesForAddress
```typescript
getSolanaSignaturesForAddress(
  address: string,
  limit: number = 10
): Promise<any[]>
```
Get recent transaction signatures for address.

#### getSolanaRecentBlockhash
```typescript
getSolanaRecentBlockhash(): Promise<any>
```
Get recent blockhash for transaction submission.

### Utility Methods

#### weiToEther
```typescript
weiToEther(wei: string): string
```
Convert wei (hex string) to ETH (decimal string with 6 decimals).

#### lamportsToSol
```typescript
lamportsToSol(lamports: number): number
```
Convert lamports to SOL.

#### getSupportedChains
```typescript
getSupportedChains(): ChainInfo[]
```
Get list of all supported chains with metadata.

#### isChainSupported
```typescript
isChainSupported(chain: string): boolean
```
Check if a chain is supported.

### Advanced

#### makeRPCCall
```typescript
makeRPCCall<T>(
  chain: string,
  method: string,
  params: any[] = []
): Promise<T>
```
Make a raw RPC call with custom method and parameters.

## Examples

### Check Balance Across Multiple Chains

```typescript
const chains = ['ethereum', 'polygon', 'arbitrum'];
const address = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb';

for (const chain of chains) {
  const balanceWei = await rpc.getBalance(chain, address);
  const balanceEth = rpc.weiToEther(balanceWei);
  console.log(`${chain}: ${balanceEth} ETH`);
}
```

### Get Transaction Details

```typescript
const tx = await rpc.getTransaction('ethereum', '0xabc123...');
const receipt = await rpc.getTransactionReceipt('ethereum', '0xabc123...');

console.log(`From: ${tx.from}`);
console.log(`To: ${tx.to}`);
console.log(`Value: ${rpc.weiToEther(tx.value)} ETH`);
console.log(`Status: ${receipt.status === '0x1' ? 'Success' : 'Failed'}`);
```

### Monitor Gas Prices

```typescript
const gasPriceWei = await rpc.getGasPrice('ethereum');
const gasPriceGwei = parseInt(gasPriceWei, 16) / 1e9;
console.log(`Gas Price: ${gasPriceGwei.toFixed(2)} Gwei`);
```

### Get Solana Token Holdings

```typescript
const tokens = await rpc.getSolanaTokenAccountsByOwner('YourAddress...');

tokens.value.forEach(account => {
  const info = account.account.data.parsed.info;
  console.log(`Token: ${info.mint}`);
  console.log(`Balance: ${info.tokenAmount.uiAmountString}`);
});
```

### Parallel Queries

```typescript
const [balance, gasPrice, blockNumber] = await Promise.all([
  rpc.getBalance('ethereum', address),
  rpc.getGasPrice('ethereum'),
  rpc.getBlockNumber('ethereum')
]);
```

## Error Handling

```typescript
try {
  const balance = await rpc.getBalance('ethereum', address);
} catch (error) {
  if (error.message.includes('RPC request failed')) {
    // Network or endpoint error
    console.error('RPC error:', error);
  } else if (error.message.includes('Unsupported chain')) {
    // Invalid chain name
    console.error('Invalid chain:', error);
  } else {
    // Other error
    console.error('Unexpected error:', error);
  }
}
```

## Configuration

### With API Key (Recommended)

```typescript
const rpc = createX402LabsRPCService(process.env.X402LABS_API_KEY);
```

Higher rate limits apply automatically.

### Without API Key

```typescript
const rpc = createX402LabsRPCService();
```

Standard rate limits apply. Suitable for development.

## Rate Limiting

- **Without API key**: Standard limits (sufficient for most apps)
- **With API key**: Higher limits for production use
- **Best practice**: Use API key in production, cache results when possible

## Production Checklist

- [ ] Add API key to environment variables
- [ ] Implement error handling and retries
- [ ] Cache results where appropriate
- [ ] Monitor rate limit usage
- [ ] Test with all supported chains
- [ ] Validate address formats
- [ ] Add logging for debugging

## Constants

### SUPPORTED_CHAINS

```typescript
{
  ethereum: { chainId: '1', name: 'Ethereum Mainnet', rpcMethod: 'eth' },
  polygon: { chainId: '137', name: 'Polygon', rpcMethod: 'polygon' },
  bsc: { chainId: '56', name: 'BSC', rpcMethod: 'bsc' },
  arbitrum: { chainId: '42161', name: 'Arbitrum', rpcMethod: 'arbitrum' },
  optimism: { chainId: '10', name: 'Optimism', rpcMethod: 'optimism' },
  base: { chainId: '8453', name: 'Base', rpcMethod: 'base' },
  solana: { chainId: 'solana', name: 'Solana', rpcMethod: 'solana' }
}
```

## Types

All TypeScript types are exported:

```typescript
import {
  X402LabsRPCConfig,
  RPCRequest,
  RPCResponse,
  ChainInfo,
  WalletAnalysis,
  TokenHolding,
  TransactionInfo,
  // ... more types
} from '@darkresearch/mallory-shared';
```

## Resources

- **API Docs**: https://x402labs.cloud/api-docs/
- **RPC Endpoint**: https://x402labs.cloud/rpc
- **Examples**: See `/workspace/X402LABS_EXAMPLES.md`
- **Guide**: See `/workspace/CRYPTO_ANALYSIS_GUIDE.md`

## License

Apache License 2.0 - See LICENSE file

## Support

- GitHub Issues: https://github.com/darkresearch/mallory/issues
- Email: hello@darkresearch.ai
