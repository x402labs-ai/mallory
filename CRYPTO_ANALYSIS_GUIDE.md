# Mallory Crypto Analysis Guide

## Overview

Mallory is now a full-featured cryptocurrency analysis dapp powered by AI and multi-chain RPC data through x402labs. This guide explains the crypto analysis capabilities and how to use them.

## Architecture

### Two-Tier Analysis System

1. **Free Tier (x402labs RPC)**
   - Direct blockchain queries
   - Zero cost, unlimited usage
   - Real-time data across 7+ chains
   - Perfect for basic analysis

2. **Premium Tier (Nansen x402)**
   - Institutional-grade analytics
   - 0.001 USDC per call
   - Historical data and advanced metrics
   - Use for deep analysis

## Supported Blockchains

All blockchain queries go through **x402labs.cloud/rpc**:

- **Ethereum** (Chain ID: 1)
- **Polygon** (Chain ID: 137)
- **BSC** (Binance Smart Chain, Chain ID: 56)
- **Arbitrum** (Chain ID: 42161)
- **Optimism** (Chain ID: 10)
- **Base** (Chain ID: 8453)
- **Solana** (Mainnet)

## Free Analysis Tools (x402labs RPC)

### Wallet Analysis

```typescript
// Check balance on any chain
getWalletBalance({
  address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  chain: "ethereum"
})
// Returns: balance, formatted balance, raw balance

// Multi-chain analysis
analyzeWalletMultiChain({
  address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  chains: ["ethereum", "polygon", "arbitrum", "optimism"]
})
// Returns: balances across all specified chains

// Token holdings (Solana)
getTokenHoldings({
  address: "ABC123...XYZ789"
})
// Returns: all SPL tokens with balances
```

### Transaction Analysis

```typescript
// Get transaction details
getTransaction({
  txHash: "0xabc123...",
  chain: "ethereum"
})
// Returns: from, to, value, gas, status

// Recent transactions (Solana)
getRecentTransactions({
  address: "ABC123...XYZ789",
  limit: 10
})
// Returns: last 10 transaction signatures with timestamps
```

### Blockchain Metrics

```typescript
// Current block info
getBlockInfo({
  chain: "ethereum"
})
// Returns: block number, hash, timestamp, gas info

// Gas prices
getGasPrice({
  chain: "ethereum"
})
// Returns: current gas price in Gwei

// Transaction count (activity level)
getTransactionCount({
  address: "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  chain: "ethereum"
})
// Returns: number of transactions sent (nonce)
```

## Premium Analysis Tools (Nansen x402)

### Historical Analysis

- **nansenHistoricalBalances**: Track portfolio changes over time
- **nansenTransactions**: Detailed transaction history with metadata

### Smart Money Intelligence

- **nansenSmartMoneyNetflows**: See what smart money is buying/selling
- **nansenSmartMoneyHoldings**: Current holdings of smart money wallets

### Token Intelligence

- **nansenTokenScreener**: Filter tokens by metrics
- **nansenHolders**: Holder distribution and whale tracking
- **nansenWhoBoughtSold**: Recent buyers and sellers
- **nansenTokenDexTrades**: DEX trading activity
- **nansenTokenTransfers**: Transfer patterns and flows

### Wallet Intelligence

- **nansenCounterparties**: Most frequent interaction partners
- **nansenRelatedWallets**: Find connected wallet addresses
- **nansenPnl**: Profit/loss analysis
- **nansenPnlLeaderboard**: Top performing wallets

### Portfolio Analysis

- **nansenPortfolio**: Complete multi-chain portfolio overview
- **nansenCurrentBalance**: Current token holdings with values

## Configuration

### Environment Variables

Add to `apps/server/.env`:

```bash
# x402labs RPC (optional API key for higher rate limits)
X402LABS_API_KEY=your-api-key-here

# Required for Nansen premium tools
GRID_API_KEY=your-grid-api-key
ANTHROPIC_API_KEY=your-anthropic-key
SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Optional
EXA_API_KEY=your-exa-key            # Web search
BIRDEYE_API_KEY=your-birdeye-key    # Price data
SUPERMEMORY_API_KEY=your-supermemory-key  # User memory
```

### Wallet Funding

For Nansen premium tools (x402 payments):
- Fund wallet with ~0.01 SOL (transaction fees)
- Add a few dollars of USDC (for x402 payments)
- Each Nansen call costs 0.001 USDC

## Example Analysis Workflows

### Basic Wallet Check (Free)

1. Check balance across all chains:
   ```
   "Analyze 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb across all chains"
   ```
   Uses: `analyzeWalletMultiChain` (free)

2. Check activity level:
   ```
   "How active is this wallet on Ethereum?"
   ```
   Uses: `getTransactionCount` (free)

3. View Solana tokens:
   ```
   "Show me all tokens in ABC123...XYZ789"
   ```
   Uses: `getTokenHoldings` (free)

### Deep Analysis (Premium)

1. Historical portfolio:
   ```
   "Show me this wallet's portfolio over the last 30 days"
   ```
   Uses: `nansenHistoricalBalances` (0.001 USDC)

2. Smart money tracking:
   ```
   "What are smart money wallets buying right now?"
   ```
   Uses: `nansenSmartMoneyNetflows` (0.001 USDC)

3. Token holder analysis:
   ```
   "Who are the top holders of this token?"
   ```
   Uses: `nansenHolders` (0.001 USDC)

### Gas Optimization (Free)

1. Check current gas:
   ```
   "What's the gas price on Ethereum?"
   ```
   Uses: `getGasPrice` (free)

2. Compare across chains:
   ```
   "Compare gas prices across Ethereum, Polygon, and Arbitrum"
   ```
   Uses: Multiple `getGasPrice` calls (free)

## AI Guidance

The AI assistant (Claude) helps you:
- Choose the right tools for your analysis
- Interpret blockchain data
- Explain on-chain activity
- Suggest follow-up queries
- Format complex data clearly

**Pro Tip**: The AI always starts with free tools and only uses premium tools when you need advanced analytics.

## Cost Optimization

### Free Analysis First
- Always check balances, transactions, and gas prices using free RPC tools
- Use `analyzeWalletMultiChain` for comprehensive free overview

### When to Use Premium Tools
- Historical tracking (> 24 hours)
- Smart money intelligence
- Holder/whale analysis
- PnL calculations
- Related wallet discovery

### Cost Breakdown
- Free tools: Unlimited usage, $0
- Nansen tools: 0.001 USDC per call
- Example: 1,000 Nansen calls = $1 USDC

## Technical Details

### RPC Endpoint
All blockchain queries go through: `https://x402labs.cloud/rpc`

### Request Format
```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "eth_getBalance",
  "params": ["0x...", "latest"]
}
```

### Headers
```
Content-Type: application/json
X-Chain: ethereum
Authorization: Bearer YOUR_API_KEY (optional)
```

### Supported RPC Methods

**Ethereum/EVM:**
- `eth_blockNumber`
- `eth_getBalance`
- `eth_getTransactionByHash`
- `eth_getTransactionReceipt`
- `eth_getBlockByNumber`
- `eth_call`
- `eth_getTransactionCount`
- `eth_gasPrice`
- `eth_getLogs`
- `eth_estimateGas`

**Solana:**
- `getBalance`
- `getAccountInfo`
- `getTokenAccountsByOwner`
- `getTransaction`
- `getRecentBlockhash`
- `getSignaturesForAddress`

## Troubleshooting

### "Chain not supported"
- Check chain name (lowercase): ethereum, polygon, bsc, arbitrum, optimism, base, solana

### "RPC request failed"
- Check if chain is online
- Verify API key if using rate-limited endpoint
- Check address format (0x prefix for EVM, base58 for Solana)

### "Insufficient funds for x402 payment"
- Fund wallet with SOL (~0.01) and USDC ($2-5)
- Check wallet balance in app

### Rate Limiting
- Free tier: Standard rate limits
- With API key: Higher limits
- Contact x402labs for enterprise limits

## Resources

- **x402labs API Docs**: https://x402labs.cloud/api-docs/
- **RPC Endpoint**: https://x402labs.cloud/rpc
- **Grid Wallet Docs**: https://developers.squads.so
- **Nansen API Docs**: Via x402 protocol

## Support

For issues or questions:
- GitHub Issues: https://github.com/darkresearch/mallory/issues
- Email: hello@darkresearch.ai
- x402labs support: Via their API docs
