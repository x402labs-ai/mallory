# Mallory - Crypto Analysis Dapp

**AI-powered cryptocurrency analysis across multiple blockchains with embedded wallet support.**

Mallory is a React Native dapp that provides comprehensive blockchain analysis through direct RPC queries (via x402labs) and premium analytics (via Nansen x402). Analyze wallets, transactions, tokens, and on-chain activity across Ethereum, Polygon, BSC, Arbitrum, Optimism, Base, and Solana.

## 🏗️ Monorepo Structure

```
mallory/
├── apps/
│   ├── client/          # React Native app (iOS, Android, Web)
│   └── server/          # Backend API (Node.js + Express)
├── packages/
│   └── shared/          # Shared types and utilities
└── package.json         # Workspace configuration
```

## ✨ Features

### Client (Mobile & Web)
- 🔐 **Authentication**: Google OAuth via Supabase
- 💬 **AI Chat**: Streaming conversations with Claude for crypto analysis
- 💰 **Embedded Wallet**: Grid-powered smart contract wallets
- 🔑 **Client-Side Signing**: Secure transaction signing (keys never leave device)
- 📱 **Cross-Platform**: iOS, Android, and Web from single codebase
- 🎨 **Modern UI**: Beautiful, responsive design with Reanimated
- 🔗 **Multi-Chain Support**: Ethereum, Polygon, BSC, Arbitrum, Optimism, Base, Solana

### Server (Backend API)
- 🤖 **AI Streaming**: Claude integration for crypto analysis guidance
- 🔗 **x402labs RPC**: Direct blockchain queries across 7+ chains (FREE)
- 🔧 **Analysis Tools**: Wallet tracking, transaction analysis, gas monitoring
- 💰 **x402 Payments**: Micropayments for Nansen premium analytics
- 📊 **Nansen Integration**: 19 premium endpoints for institutional-grade analysis
- 💎 **Web Search**: Real-time crypto news and price data via Exa
- 🔒 **Secure Auth**: Supabase JWT validation
- 🚀 **Production Ready**: Comprehensive testing infrastructure

## 🎯 Crypto Analysis Capabilities

### Free Blockchain RPC (via x402labs)
- **Multi-Chain Wallet Analysis**: Check balances across all supported chains
- **Transaction Tracking**: Get detailed transaction information by hash
- **Token Holdings**: View SPL token portfolios on Solana
- **Gas Price Monitoring**: Real-time gas prices for transaction optimization
- **Block Information**: Current blockchain state and metrics
- **Activity Analysis**: Transaction counts and wallet activity patterns

### Premium Analytics (Nansen via x402)
- **Historical Data**: Track portfolio changes over time
- **Smart Money Intelligence**: See what smart money is buying/selling
- **Token Analysis**: Holder distribution, DEX trades, transfer patterns
- **Flow Tracking**: Monitor token movements and whale activity
- **PnL Analysis**: Profit/loss tracking and leaderboards
- **Counterparty Analysis**: Who wallets interact with most

**Cost**: Only 0.001 USDC (one-tenth of a cent) per Nansen call!

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or Bun
- Git
- Expo CLI (optional, included in dependencies)

### 1. Clone and Install

```bash
git clone https://github.com/darkresearch/mallory.git
cd mallory
bun install
```

### 2. Environment Setup

#### Client Environment (`.env` in `apps/client/`)
```bash
# Copy from template
cp apps/client/.env.example apps/client/.env

# Required variables:
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
EXPO_PUBLIC_BACKEND_API_URL=http://localhost:3001
EXPO_PUBLIC_GRID_API_KEY=your-grid-api-key
EXPO_PUBLIC_GRID_ENV=sandbox
```

#### Server Environment (`.env` in `apps/server/`)
```bash
# Copy from template
cp apps/server/.env.example apps/server/.env

# Required variables:
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ANTHROPIC_API_KEY=sk-ant-your-key
GRID_API_KEY=your-grid-api-key

# Optional (for advanced features):
X402LABS_API_KEY=your-x402labs-key    # Optional API key for x402labs RPC
BIRDEYE_API_KEY=your-birdeye-key      # Token price data
EXA_API_KEY=your-exa-key              # Web search
SUPERMEMORY_API_KEY=your-supermemory-key  # User memory
```

### 3. Run Development Servers

#### Option A: Run Both (Client + Server)
```bash
bun run dev
```

#### Option B: Run Separately
```bash
# Terminal 1 - Backend
bun run server

# Terminal 2 - Client (Web)
bun run client
```

The client will be available at:
- Web: http://localhost:8081
- API: http://localhost:3001

## 📱 Client Development

See [apps/client/README.md](./apps/client/README.md) for detailed client documentation.

**Key Commands:**
```bash
cd apps/client

# Web
bun run web

# iOS (requires Mac + Xcode)
bun run ios

# Android (requires Android Studio)
bun run android
```

## 🔧 Server Development

See [apps/server/README.md](./apps/server/README.md) for detailed server documentation.

**API Endpoints:**
- `POST /api/chat` - AI chat streaming with crypto analysis tools
- `GET /api/wallet/holdings` - Wallet holdings with price data
- `GET /health` - Health check

**AI Tools:**
- `searchWeb` - Web search for crypto news and prices via Exa (free)
- `getWalletBalance` - Check balance on any chain via x402labs (free)
- `getTransaction` - Get transaction details via x402labs (free)
- `getTokenHoldings` - View Solana token portfolio via x402labs (free)
- `analyzeWalletMultiChain` - Multi-chain wallet analysis via x402labs (free)
- `getGasPrice` - Real-time gas prices via x402labs (free)
- `getBlockInfo` - Current blockchain state via x402labs (free)
- `nansen*` - 19 Nansen API endpoints for advanced analytics (requires x402 payments)
- `addMemory` - User memory via Supermemory (optional)

## 🔑 Grid Wallet Integration

Mallory uses [Grid](https://developers.squads.so) for embedded wallets:

- **Non-Custodial**: User private keys never exist - Grid uses secure enclaves and MPC
- **Email-Based Auth**: Simple OTP verification flow
- **Session Secrets**: Generated client-side, passed to backend only when needed for signing
- **Smart Contract Wallets**: Spending limits and programmable transactions
- **Production Ready**: Sandbox and production environments
- **x402 Integration**: Automatic micropayments for premium data APIs

Grid's architecture means neither the client nor server ever has access to user private keys, making it truly non-custodial while still providing seamless transaction signing.

## 📦 Shared Package

The `packages/shared` directory contains TypeScript types and utilities shared between client and server:

```typescript
import type { ChatRequest, HoldingsResponse } from '@darkresearch/mallory-shared';
import { X402PaymentService } from '@darkresearch/mallory-shared';
```

## 🧪 Testing

Mallory has comprehensive test coverage: unit tests, integration tests, and E2E tests.

**Run tests:**
```bash
cd apps/client

# Fast tests (unit + integration)
bun test

# E2E tests (requires backend running)
bun run test:e2e

# AI-powered tests (optional - expensive)
# These use Claude to verify response completeness and test 200k+ token conversations
bun test __tests__/e2e/chat-message-flow.test.ts  # ~5-10 min, ~$1-2
bun test __tests__/e2e/long-context.test.ts       # ~10-20 min, ~$2-3
```

**CI/CD:**
- Regular tests run on every PR
- AI tests only run when `[run-ai-tests]` is in commit message:
  ```bash
  git commit -m "fix: improve streaming [run-ai-tests]"
  ```

See [apps/client/__tests__/CHAT_STATE_TESTS.md](./apps/client/__tests__/CHAT_STATE_TESTS.md) for full testing documentation.

## 🚢 Deployment

### Client Deployment
- **Web**: Deploy to Vercel, Netlify, or any static host
- **iOS**: Deploy via Expo EAS or native build
- **Android**: Deploy via Expo EAS or native build

See [apps/client/README.md](./apps/client/README.md#deployment) for details.

### Server Deployment
- **Recommended**: Railway, Render, Fly.io
- **Node.js**: Any Node.js 18+ hosting

See [apps/server/README.md](./apps/server/README.md#deployment) for details.

## 🤝 Contributing

Contributions welcome! Please read [CONTRIBUTING.md](./CONTRIBUTING.md) first.

## 📄 License

Apache License 2.0 - see [LICENSE](./LICENSE) for details.

## 🆘 Support

- 📧 Email: hello@darkresearch.ai
- 🐛 Issues: [GitHub Issues](https://github.com/darkresearch/mallory/issues)
- 📚 Docs: [Full Documentation](./docs/)

## 🙏 Acknowledgments

Built with:
- [Expo](https://expo.dev) - React Native framework
- [Grid (Squads)](https://developers.squads.so) - Embedded wallets
- [Anthropic](https://anthropic.com) - Claude AI for analysis guidance
- [x402labs](https://x402labs.cloud) - Multi-chain RPC infrastructure
- [Exa](https://exa.ai) - AI-powered web search for crypto news
- [Nansen](https://nansen.ai) - Blockchain analytics (via x402)
- [Faremeter](https://x402.org) - x402 payment protocol
- [Supabase](https://supabase.com) - Auth & database
- [Birdeye](https://birdeye.so) - Solana market data

---

**Made with ❤️ by [Dark](https://darkresearch.ai)**

