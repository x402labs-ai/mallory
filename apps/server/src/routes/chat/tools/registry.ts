import { searchWeb } from './searchWeb.js';
import { createSupermemoryTools } from './supermemory.js';
import { createNansenTool, createNansenSmartMoneyNetflowsTool, createNansenSmartMoneyHoldingsTool, createNansenSmartMoneyDexTradesTool, createNansenSmartMoneyJupiterDcasTool, createNansenCurrentBalanceTool, createNansenTransactionsTool, createNansenCounterpartiesTool, createNansenRelatedWalletsTool, createNansenPnlSummaryTool, createNansenPnlTool, createNansenLabelsTool, createNansenTokenScreenerTool, createNansenFlowIntelligenceTool, createNansenHoldersTool, createNansenFlowsTool, createNansenWhoBoughtSoldTool, createNansenTokenDexTradesTool, createNansenTokenTransfersTool, createNansenTokenJupiterDcasTool, createNansenPnlLeaderboardTool, createNansenPortfolioTool } from './nansen.js';
import * as cryptoAnalysis from './cryptoAnalysis.js';

/**
 * Tool registry for Mallory AI assistant
 * All available tools that the AI can use during conversations
 */

export const toolRegistry = {
  searchWeb,
  createSupermemoryTools,
  createNansenTool,
  createNansenSmartMoneyNetflowsTool,
  createNansenSmartMoneyHoldingsTool,
  createNansenSmartMoneyDexTradesTool,
  createNansenSmartMoneyJupiterDcasTool,
  createNansenCurrentBalanceTool,
  createNansenTransactionsTool,
  createNansenCounterpartiesTool,
  createNansenRelatedWalletsTool,
  createNansenPnlSummaryTool,
  createNansenPnlTool,
  createNansenLabelsTool,
  createNansenTokenScreenerTool,
  createNansenFlowIntelligenceTool,
  createNansenHoldersTool,
  createNansenFlowsTool,
  createNansenWhoBoughtSoldTool,
  createNansenTokenDexTradesTool,
  createNansenTokenTransfersTool,
  createNansenTokenJupiterDcasTool,
  createNansenPnlLeaderboardTool,
  createNansenPortfolioTool,
  // Crypto Analysis Tools (x402labs RPC)
  cryptoAnalysis
};

// Export individual tools for easier imports
export { searchWeb, createSupermemoryTools, createNansenTool, createNansenSmartMoneyNetflowsTool, createNansenSmartMoneyHoldingsTool, createNansenSmartMoneyDexTradesTool, createNansenSmartMoneyJupiterDcasTool, createNansenCurrentBalanceTool, createNansenTransactionsTool, createNansenCounterpartiesTool, createNansenRelatedWalletsTool, createNansenPnlSummaryTool, createNansenPnlTool, createNansenLabelsTool, createNansenTokenScreenerTool, createNansenFlowIntelligenceTool, createNansenHoldersTool, createNansenFlowsTool, createNansenWhoBoughtSoldTool, createNansenTokenDexTradesTool, createNansenTokenTransfersTool, createNansenTokenJupiterDcasTool, createNansenPnlLeaderboardTool, createNansenPortfolioTool, cryptoAnalysis };

