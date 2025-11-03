# 📚 Mallory Documentation Index

Welcome to Mallory - AI-powered cryptocurrency analysis across multiple blockchains!

## 🚀 Getting Started

Start here if you're new:

1. **[QUICK_START.md](./QUICK_START.md)** - 5-minute setup guide
   - Installation steps
   - Configuration
   - First test queries
   - Common issues

2. **[README.md](./README.md)** - Project overview
   - Features and capabilities
   - Architecture
   - Installation
   - Basic usage

## 📖 Complete Guides

### Core Documentation

**[CRYPTO_ANALYSIS_GUIDE.md](./CRYPTO_ANALYSIS_GUIDE.md)** - Complete feature guide
- Two-tier analysis system (free vs premium)
- Supported blockchains
- All 28 available tools
- Configuration details
- Example workflows
- Cost optimization tips
- Troubleshooting

**[X402LABS_EXAMPLES.md](./X402LABS_EXAMPLES.md)** - Code examples
- Direct RPC calls with curl
- TypeScript/JavaScript usage
- AI tool integration
- Testing examples
- Production checklist

**[TRANSFORMATION_SUMMARY.md](./TRANSFORMATION_SUMMARY.md)** - What changed
- Detailed change log
- File structure
- Architecture overview
- Migration notes
- Next steps

**[COMPLETE.md](./COMPLETE.md)** - Task completion summary
- All completed tasks
- Statistics and metrics
- File structure
- Key insights

## 🔍 Quick Reference

### What Can Mallory Do?

**Free Blockchain Analysis (x402labs RPC):**
- ✅ Check wallet balances on 7 chains
- ✅ Look up transactions
- ✅ View token holdings (Solana)
- ✅ Monitor gas prices
- ✅ Track blockchain state
- ✅ Multi-chain analysis

**Premium Analytics (Nansen via x402):**
- ✅ Historical portfolio tracking (0.001 USDC)
- ✅ Smart money intelligence (0.001 USDC)
- ✅ Token holder analysis (0.001 USDC)
- ✅ PnL calculations (0.001 USDC)
- ✅ Flow tracking (0.001 USDC)

### Supported Blockchains

All queries work on these networks:
- **Ethereum** (mainnet)
- **Polygon**
- **BSC** (Binance Smart Chain)
- **Arbitrum**
- **Optimism**
- **Base**
- **Solana**

### Example Queries

Try these in the chat:

**Basic (Free):**
```
"What's the balance of 0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb?"
"Check this address across all chains"
"What's the gas price on Ethereum?"
"Show me tokens in this Solana wallet"
```

**Advanced (Premium):**
```
"Show me this wallet's portfolio over time"
"What are smart money wallets buying?"
"Who are the top holders of this token?"
```

## 📁 File Structure

### Backend (Server)

**RPC Service:**
- `packages/shared/src/x402labs/X402LabsRPCService.ts` - Main RPC service
- `packages/shared/src/x402labs/types.ts` - TypeScript types
- `packages/shared/src/x402labs/index.ts` - Module exports

**AI Tools:**
- `apps/server/src/routes/chat/tools/cryptoAnalysis.ts` - 9 analysis tools
- `apps/server/src/routes/chat/tools/registry.ts` - Tool registry
- `apps/server/src/routes/chat/index.ts` - Integration

**Configuration:**
- `apps/server/.env.example` - Environment template
- `apps/server/prompts/base.ts` - AI personality

### Frontend (Client)

**UI Components:**
- `apps/client/components/crypto/CryptoDisplayComponents.tsx` - 5 display components
- `apps/client/components/crypto/index.tsx` - Component exports

**Existing:**
- Chat interface works with new tools
- Wallet context for x402 payments

## 🛠️ Development

### Setup
```bash
cd /workspace
bun install

# Configure environment
cd apps/server
cp .env.example .env
# Add your API keys
```

### Run
```bash
# Terminal 1 - Backend
bun run server

# Terminal 2 - Client
bun run client
```

### Test
```bash
# Unit tests
bun test

# Integration tests
bun run test:integration

# E2E tests
bun run test:e2e
```

## 🎯 Use Cases

### For Traders
- Check wallet balances across multiple chains
- Monitor gas prices for optimal transaction timing
- Track token holdings in real-time
- Analyze smart money movements

### For Researchers
- Historical portfolio analysis
- Token holder distribution
- Wallet activity patterns
- PnL tracking and rankings

### For Developers
- Multi-chain RPC access
- Real-time blockchain data
- Transaction verification
- Smart contract interaction

### For Analysts
- Comprehensive wallet reports
- Smart money intelligence
- Flow analysis
- Counterparty tracking

## 💰 Cost Structure

**Free Tier (x402labs RPC):**
- Unlimited queries
- $0 cost
- All basic blockchain data
- Real-time access

**Premium Tier (Nansen x402):**
- 0.001 USDC per call
- $1 USDC = 1,000 calls
- Institutional-grade data
- Historical analytics

## 🔗 Resources

### Documentation
- **This Index**: Overview and navigation
- **Quick Start**: 5-minute setup
- **Complete Guide**: All features
- **Examples**: Code samples
- **Summary**: What changed

### API Documentation
- **x402labs**: https://x402labs.cloud/api-docs/
- **RPC Endpoint**: https://x402labs.cloud/rpc
- **Grid Wallet**: https://developers.squads.so
- **Anthropic**: https://docs.anthropic.com

### Support
- **GitHub**: https://github.com/darkresearch/mallory
- **Issues**: https://github.com/darkresearch/mallory/issues
- **Email**: hello@darkresearch.ai

## 📊 Statistics

- **Blockchains**: 7 supported
- **Free Tools**: 9 analysis tools
- **Premium Tools**: 19 Nansen endpoints
- **UI Components**: 5 display components
- **Code Added**: 2,402 lines
- **Documentation**: 5 comprehensive guides

## 🎉 What's New

### Major Features Added
✅ Multi-chain RPC service (x402labs)
✅ 9 free blockchain analysis tools
✅ 5 specialized UI components
✅ Complete crypto analyst AI persona
✅ Comprehensive documentation

### Existing Features (Still Available)
✅ AI chat with Claude
✅ Embedded Grid wallets
✅ x402 micropayments
✅ 19 Nansen premium tools
✅ Web search (Exa)
✅ User memory (Supermemory)

## 🚦 Quick Navigation

**Want to start using it?** → [QUICK_START.md](./QUICK_START.md)

**Need detailed info?** → [CRYPTO_ANALYSIS_GUIDE.md](./CRYPTO_ANALYSIS_GUIDE.md)

**Want code examples?** → [X402LABS_EXAMPLES.md](./X402LABS_EXAMPLES.md)

**Curious what changed?** → [TRANSFORMATION_SUMMARY.md](./TRANSFORMATION_SUMMARY.md)

**Check completion status?** → [COMPLETE.md](./COMPLETE.md)

---

**Ready to analyze some crypto?** 🚀

Start the servers and open http://localhost:8081 to begin!
