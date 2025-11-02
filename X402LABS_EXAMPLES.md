# x402labs RPC Integration Examples

## Direct RPC Calls

### Using curl

```bash
# Get Ethereum block number
curl -X POST https://x402labs.cloud/rpc \
  -H "Content-Type: application/json" \
  -H "X-Chain: ethereum" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "eth_blockNumber",
    "params": []
  }'

# Get ETH balance
curl -X POST https://x402labs.cloud/rpc \
  -H "Content-Type: application/json" \
  -H "X-Chain: ethereum" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "eth_getBalance",
    "params": ["0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb", "latest"]
  }'

# Get Solana balance
curl -X POST https://x402labs.cloud/rpc \
  -H "Content-Type: application/json" \
  -H "X-Chain: solana" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "getBalance",
    "params": ["YourSolanaAddressHere"]
  }'
```

### Using the RPC Service

```typescript
import { createX402LabsRPCService } from '@darkresearch/mallory-shared';

// Create service instance
const rpc = createX402LabsRPCService(process.env.X402LABS_API_KEY);

// Get Ethereum balance
const balanceWei = await rpc.getBalance('ethereum', '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb');
const balanceEth = rpc.weiToEther(balanceWei);
console.log(`Balance: ${balanceEth} ETH`);

// Get Solana balance
const result = await rpc.getSolanaBalance('YourSolanaAddressHere');
const balanceSol = rpc.lamportsToSol(result.value);
console.log(`Balance: ${balanceSol} SOL`);

// Get transaction
const tx = await rpc.getTransaction('ethereum', '0xabc123...');
console.log(`From: ${tx.from}, To: ${tx.to}, Value: ${tx.value}`);

// Get gas price
const gasPrice = await rpc.getGasPrice('ethereum');
const gasPriceGwei = parseInt(gasPrice, 16) / 1e9;
console.log(`Gas: ${gasPriceGwei} Gwei`);
```

## AI Tool Usage

### In Chat Conversations

The AI automatically selects the right tools based on user queries:

```typescript
// User asks: "What's the balance of 0x742d35Cc..."
// AI calls: getWalletBalance({ address: "0x742d35Cc...", chain: "ethereum" })

// User asks: "Check this address on all chains"
// AI calls: analyzeWalletMultiChain({ address: "0x742d35Cc..." })

// User asks: "What's the gas price?"
// AI calls: getGasPrice({ chain: "ethereum" })
```

### Tool Definitions

```typescript
import { tool } from 'ai';
import { z } from 'zod';
import { createX402LabsRPCService } from '@darkresearch/mallory-shared';

const rpc = createX402LabsRPCService();

export const getWalletBalance = tool({
  description: 'Get native token balance for any address on any supported chain',
  parameters: z.object({
    address: z.string().describe('Wallet address'),
    chain: z.string().describe('Chain name: ethereum, polygon, bsc, arbitrum, optimism, base, solana')
  }),
  execute: async ({ address, chain }) => {
    if (chain === 'solana') {
      const result = await rpc.getSolanaBalance(address);
      return {
        balance: rpc.lamportsToSol(result.value),
        formatted: `${rpc.lamportsToSol(result.value)} SOL`
      };
    } else {
      const balanceWei = await rpc.getBalance(chain, address);
      return {
        balance: rpc.weiToEther(balanceWei),
        formatted: `${rpc.weiToEther(balanceWei)} ETH`
      };
    }
  }
});
```

## Server Integration

### Route Handler

```typescript
// apps/server/src/routes/chat/index.ts

import * as cryptoAnalysis from './tools/cryptoAnalysis.js';

const tools = {
  // Crypto analysis tools (free via x402labs)
  getWalletBalance: cryptoAnalysis.getWalletBalance,
  getTransaction: cryptoAnalysis.getTransaction,
  getTokenHoldings: cryptoAnalysis.getTokenHoldings,
  analyzeWalletMultiChain: cryptoAnalysis.analyzeWalletMultiChain,
  getGasPrice: cryptoAnalysis.getGasPrice,
  getBlockInfo: cryptoAnalysis.getBlockInfo,
  // ... more tools
};

const result = streamText({
  model,
  messages: processedMessages,
  tools,
  system: systemPrompt
});
```

## Client UI Integration

### Display Components

```typescript
import { MultiChainBalanceDisplay } from '@/components/crypto';

// In your chat message renderer
if (message.toolResults?.analyzeWalletMultiChain) {
  const data = message.toolResults.analyzeWalletMultiChain;
  return (
    <MultiChainBalanceDisplay
      address={data.address}
      balances={data.results}
    />
  );
}
```

## Testing

### Unit Test Example

```typescript
import { createX402LabsRPCService } from '@darkresearch/mallory-shared';

describe('x402labs RPC Service', () => {
  const rpc = createX402LabsRPCService();

  it('should get Ethereum balance', async () => {
    const balance = await rpc.getBalance(
      'ethereum',
      '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb'
    );
    expect(balance).toBeDefined();
    expect(balance.startsWith('0x')).toBe(true);
  });

  it('should convert wei to ether', () => {
    const wei = '1000000000000000000'; // 1 ETH
    const eth = rpc.weiToEther(wei);
    expect(eth).toBe('1.000000');
  });

  it('should get Solana balance', async () => {
    const result = await rpc.getSolanaBalance('SomeAddress');
    expect(result.value).toBeDefined();
    expect(typeof result.value).toBe('number');
  });
});
```

### Integration Test Example

```typescript
describe('Crypto Analysis Tools', () => {
  it('should analyze wallet across multiple chains', async () => {
    const result = await analyzeWalletMultiChain.execute({
      address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
      chains: ['ethereum', 'polygon']
    });

    expect(result.success).toBe(true);
    expect(result.results).toHaveLength(2);
    expect(result.results[0].chain).toBe('ethereum');
    expect(result.results[1].chain).toBe('polygon');
  });

  it('should get gas price', async () => {
    const result = await getGasPrice.execute({ chain: 'ethereum' });
    
    expect(result.success).toBe(true);
    expect(result.gasPriceGwei).toBeDefined();
    expect(parseFloat(result.gasPriceGwei)).toBeGreaterThan(0);
  });
});
```

## Rate Limiting

### Without API Key
- Standard rate limits apply
- Sufficient for most applications

### With API Key
```typescript
const rpc = createX402LabsRPCService(process.env.X402LABS_API_KEY);
// Higher rate limits automatically applied
```

### Best Practices
1. Cache results when possible
2. Batch multi-chain queries with `analyzeWalletMultiChain`
3. Use API key for production
4. Implement exponential backoff for retries

## Error Handling

```typescript
try {
  const balance = await rpc.getBalance('ethereum', address);
  console.log(`Balance: ${rpc.weiToEther(balance)} ETH`);
} catch (error) {
  if (error.message.includes('RPC request failed')) {
    console.error('RPC endpoint error:', error);
    // Retry logic here
  } else if (error.message.includes('Unsupported chain')) {
    console.error('Invalid chain:', error);
    // Handle invalid chain
  } else {
    console.error('Unexpected error:', error);
  }
}
```

## Advanced Usage

### Custom RPC Methods

```typescript
const customData = await rpc.makeRPCCall(
  'ethereum',
  'eth_call',
  [
    {
      to: '0xContractAddress',
      data: '0xEncodedFunctionCall'
    },
    'latest'
  ]
);
```

### Event Logs

```typescript
const logs = await rpc.getLogs('ethereum', {
  fromBlock: '0x1000000',
  toBlock: 'latest',
  address: '0xTokenAddress',
  topics: ['0xTransferEventSignature']
});
```

### Solana Token Accounts

```typescript
const tokens = await rpc.getSolanaTokenAccountsByOwner(
  'WalletAddress',
  'TokenProgramId'
);

tokens.value.forEach(account => {
  const info = account.account.data.parsed.info;
  console.log(`Token: ${info.mint}`);
  console.log(`Balance: ${info.tokenAmount.uiAmountString}`);
});
```

## Performance Tips

1. **Use Multi-Chain Queries**: `analyzeWalletMultiChain` is more efficient than multiple single-chain calls

2. **Cache Results**: Store balance/transaction data locally when appropriate

3. **Parallel Requests**: Make independent queries in parallel:
```typescript
const [ethBalance, gasPrice, blockNumber] = await Promise.all([
  rpc.getBalance('ethereum', address),
  rpc.getGasPrice('ethereum'),
  rpc.getBlockNumber('ethereum')
]);
```

4. **Use Specific Methods**: Direct methods are faster than generic `makeRPCCall`

## Production Checklist

- [ ] Add `X402LABS_API_KEY` to environment variables
- [ ] Implement error handling and retries
- [ ] Add result caching where appropriate
- [ ] Monitor rate limit usage
- [ ] Test all supported chains
- [ ] Verify address format validation
- [ ] Add logging for debugging
- [ ] Set up alerts for RPC failures

## Resources

- **API Docs**: https://x402labs.cloud/api-docs/
- **RPC Endpoint**: https://x402labs.cloud/rpc
- **Source Code**: `/packages/shared/src/x402labs/`
- **Tools**: `/apps/server/src/routes/chat/tools/cryptoAnalysis.ts`
