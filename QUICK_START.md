# Quick Start Guide - Mallory Crypto Analysis Dapp

## What Changed?

Mallory is now a **crypto analysis dapp** that helps users analyze blockchain data across 7+ chains using AI guidance. All blockchain queries route through **x402labs.cloud/rpc**.

## Setup (5 Minutes)

### 1. Install Dependencies
```bash
cd /workspace
bun install
```

### 2. Configure Environment

Copy and edit the server environment file:
```bash
cd apps/server
cp .env.example .env
```

**Required variables:**
```bash
SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_ROLE_KEY=your-service-key
ANTHROPIC_API_KEY=your-anthropic-key
GRID_API_KEY=your-grid-key
```

**Optional (recommended):**
```bash
X402LABS_API_KEY=your-x402labs-key  # Higher rate limits
EXA_API_KEY=your-exa-key           # Web search
```

### 3. Start Development

```bash
# Terminal 1 - Backend
bun run server

# Terminal 2 - Client
bun run client
```

Web app available at: http://localhost:8081

## Test It Out

### Free Blockchain Queries (x402labs)

Try these prompts in the chat:

1. **Check a wallet balance:**
   ```
   "What's the balance of 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb on Ethereum?"
   ```

2. **Multi-chain analysis:**
   ```
   "Check this address across all supported chains"
   ```

3. **Gas prices:**
   ```
   "What's the current gas price on Ethereum?"
   ```

4. **Transaction lookup:**
   ```
   "Look up transaction 0xabc123..."
   ```

5. **Solana tokens:**
   ```
   "Show me all tokens in this Solana wallet: [address]"
   ```

6. **Current block:**
   ```
   "What's the current block on Ethereum?"
   ```

### Premium Analytics (Nansen x402)

**Note:** Requires wallet funding (~0.01 SOL + $2 USDC)

1. **Historical tracking:**
   ```
   "Show me this wallet's portfolio over the last 30 days"
   ```

2. **Smart money:**
   ```
   "What are smart money wallets buying?"
   ```

3. **Token analysis:**
   ```
   "Who are the top holders of [token address]?"
   ```

## Supported Chains

All queries work on these chains (just mention the chain name):

- **Ethereum** (mainnet)
- **Polygon**
- **BSC** (Binance Smart Chain)
- **Arbitrum**
- **Optimism**
- **Base**
- **Solana**

## Architecture

```
User asks question
    ↓
Claude AI analyzes & selects appropriate tool
    ↓
┌─────────────────────┬───────────────────┐
│   FREE Tools        │  Premium Tools    │
│   (x402labs RPC)    │  (Nansen x402)    │
│   Unlimited use     │  0.001 USDC/call  │
└─────────────────────┴───────────────────┘
    ↓
Results formatted & displayed
    ↓
User sees analysis
```

## Key Files

### Backend
- `packages/shared/src/x402labs/` - RPC service
- `apps/server/src/routes/chat/tools/cryptoAnalysis.ts` - 9 analysis tools
- `apps/server/prompts/base.ts` - AI personality
- `apps/server/src/routes/chat/index.ts` - Tool integration

### Frontend
- `apps/client/components/crypto/` - Display components
- Existing chat interface works with new tools

### Documentation
- `CRYPTO_ANALYSIS_GUIDE.md` - Complete usage guide
- `TRANSFORMATION_SUMMARY.md` - What changed
- `README.md` - Updated project overview

## Tools Available

### Free (9 tools via x402labs)
1. `getWalletBalance` - Balance on any chain
2. `getTransaction` - Transaction details
3. `getRecentTransactions` - Solana activity
4. `getTokenHoldings` - SPL tokens
5. `getBlockInfo` - Current block
6. `getGasPrice` - Gas prices
7. `getTransactionCount` - Activity level
8. `analyzeWalletMultiChain` - All chains at once
9. `listSupportedChains` - Available chains

### Premium (19 tools via Nansen x402)
- Historical balances
- Smart money tracking
- Token holder analysis
- PnL calculations
- Flow intelligence
- And 14 more...

See `CRYPTO_ANALYSIS_GUIDE.md` for complete list.

## Costs

- **Free tier**: Unlimited usage, $0
  - All direct blockchain queries
  - Real-time balances, transactions, gas prices
  
- **Premium tier**: 0.001 USDC per call
  - Nansen analytics only
  - $1 = 1,000 API calls

## Common Issues

### "Chain not supported"
- Use lowercase chain names: `ethereum`, `polygon`, `solana`
- Use `listSupportedChains` to see all options

### "RPC request failed"
- Check internet connection
- Verify chain is online
- For Solana: use base58 addresses
- For EVM: use 0x-prefixed addresses

### "Insufficient funds"
- Only affects Nansen premium tools
- Free tools work without wallet funding
- To use Nansen: fund wallet with ~0.01 SOL + $2 USDC

## Next Steps

1. **Try the free tools** - No setup needed beyond running the app
2. **Read the guide** - See `CRYPTO_ANALYSIS_GUIDE.md`
3. **Fund wallet** - To use Nansen premium tools
4. **Customize AI** - Edit `apps/server/prompts/base.ts`

## Resources

- **API Docs**: https://x402labs.cloud/api-docs/
- **RPC Endpoint**: https://x402labs.cloud/rpc
- **GitHub**: https://github.com/darkresearch/mallory
- **Support**: hello@darkresearch.ai

## Example Session

```
User: "Hey, can you analyze this Ethereum address for me? 
       0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb"

AI: "I'll analyze that address across multiple chains for you!"
    [Calls analyzeWalletMultiChain]
    
    "Here's what I found:
    
    Ethereum: 1.2345 ETH
    Polygon: 0.5678 MATIC
    Arbitrum: 0.0234 ETH
    Optimism: 0.0 ETH
    Base: 0.0 ETH
    BSC: 0.0 BNB
    
    Most activity on Ethereum and Polygon.
    Would you like me to get more details on any chain?"

User: "What's the gas price on Ethereum right now?"

AI: [Calls getGasPrice]
    "Current gas price on Ethereum: 45.2 Gwei (Medium)
    
    This is a good time for non-urgent transactions."
```

---

**You're ready to go!** 🚀

Start the servers, open the app, and try asking about any blockchain address.
