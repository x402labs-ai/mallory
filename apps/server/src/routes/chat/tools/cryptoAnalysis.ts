/**
 * Crypto Analysis Tools using x402labs RPC
 * 
 * AI tools for blockchain data analysis across multiple chains
 */

import { tool } from 'ai';
import { z } from 'zod';
import { createX402LabsRPCService, SUPPORTED_CHAINS } from '@darkresearch/mallory-shared';

// Initialize the RPC service
const rpcService = createX402LabsRPCService(process.env.X402LABS_API_KEY);

/**
 * Get wallet balance across multiple chains
 */
export const getWalletBalance = tool({
  description: `Get the native token balance of a wallet address on any supported blockchain. 
  Supports: Ethereum, Polygon, BSC, Arbitrum, Optimism, Base, Solana.
  Returns the balance in the native token (ETH, MATIC, BNB, SOL, etc.) and chain info.`,
  parameters: z.object({
    address: z.string().describe('The wallet address to check'),
    chain: z.string().describe('The blockchain to query (ethereum, polygon, bsc, arbitrum, optimism, base, solana)')
  }),
  execute: async ({ address, chain }) => {
    try {
      console.log(`💰 Getting balance for ${address} on ${chain}`);
      
      if (chain.toLowerCase() === 'solana') {
        const result = await rpcService.getSolanaBalance(address);
        const solBalance = rpcService.lamportsToSol(result.value);
        return {
          success: true,
          address,
          chain,
          balance: solBalance.toString(),
          balanceFormatted: `${solBalance.toFixed(4)} SOL`,
          rawBalance: result.value.toString()
        };
      } else {
        const balanceWei = await rpcService.getBalance(chain, address);
        const balanceEth = rpcService.weiToEther(balanceWei);
        const chainInfo = SUPPORTED_CHAINS[chain.toLowerCase()];
        return {
          success: true,
          address,
          chain,
          chainName: chainInfo?.name || chain,
          balance: balanceEth,
          balanceFormatted: `${balanceEth} ${chainInfo?.name?.split(' ')[0] || 'ETH'}`,
          rawBalance: balanceWei
        };
      }
    } catch (error) {
      console.error('❌ Error getting balance:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get balance',
        address,
        chain
      };
    }
  }
});

/**
 * Get transaction details
 */
export const getTransaction = tool({
  description: `Get detailed information about a blockchain transaction by its hash.
  Supports all EVM chains (Ethereum, Polygon, BSC, etc.) and Solana.
  Returns transaction details including from, to, value, gas used, and status.`,
  parameters: z.object({
    txHash: z.string().describe('The transaction hash to look up'),
    chain: z.string().describe('The blockchain where the transaction occurred')
  }),
  execute: async ({ txHash, chain }) => {
    try {
      console.log(`🔍 Getting transaction ${txHash} on ${chain}`);
      
      if (chain.toLowerCase() === 'solana') {
        const tx = await rpcService.getSolanaTransaction(txHash);
        return {
          success: true,
          chain,
          hash: txHash,
          transaction: tx,
          type: 'solana'
        };
      } else {
        const tx = await rpcService.getTransaction(chain, txHash);
        const receipt = await rpcService.getTransactionReceipt(chain, txHash);
        
        return {
          success: true,
          chain,
          hash: txHash,
          from: tx.from,
          to: tx.to,
          value: tx.value,
          valueFormatted: `${rpcService.weiToEther(tx.value)} ETH`,
          gasUsed: receipt?.gasUsed,
          gasPrice: tx.gasPrice,
          blockNumber: tx.blockNumber,
          status: receipt?.status === '0x1' ? 'success' : 'failed',
          type: 'evm',
          transaction: tx,
          receipt: receipt
        };
      }
    } catch (error) {
      console.error('❌ Error getting transaction:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get transaction',
        txHash,
        chain
      };
    }
  }
});

/**
 * Get recent transactions for an address (Solana)
 */
export const getRecentTransactions = tool({
  description: `Get recent transactions for a Solana address. 
  Returns up to 10 most recent transaction signatures with timestamps.
  Great for analyzing wallet activity and transaction history.`,
  parameters: z.object({
    address: z.string().describe('The Solana wallet address'),
    limit: z.number().optional().describe('Number of transactions to fetch (default: 10, max: 100)')
  }),
  execute: async ({ address, limit = 10 }) => {
    try {
      console.log(`📜 Getting recent transactions for ${address}`);
      
      const signatures = await rpcService.getSolanaSignaturesForAddress(
        address,
        Math.min(limit, 100)
      );
      
      return {
        success: true,
        address,
        count: signatures.length,
        transactions: signatures.map((sig: any) => ({
          signature: sig.signature,
          timestamp: sig.blockTime,
          slot: sig.slot,
          err: sig.err,
          memo: sig.memo
        }))
      };
    } catch (error) {
      console.error('❌ Error getting recent transactions:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get transactions',
        address
      };
    }
  }
});

/**
 * Get token holdings for a Solana wallet
 */
export const getTokenHoldings = tool({
  description: `Get all SPL token holdings for a Solana wallet address.
  Returns token accounts with balances, decimals, and token metadata.
  Perfect for portfolio analysis and token tracking.`,
  parameters: z.object({
    address: z.string().describe('The Solana wallet address')
  }),
  execute: async ({ address }) => {
    try {
      console.log(`🪙 Getting token holdings for ${address}`);
      
      const result = await rpcService.getSolanaTokenAccountsByOwner(address);
      
      const tokens = result.value.map((account: any) => {
        const info = account.account.data.parsed.info;
        return {
          mint: info.mint,
          owner: info.owner,
          balance: info.tokenAmount.uiAmountString,
          decimals: info.tokenAmount.decimals,
          rawBalance: info.tokenAmount.amount
        };
      });
      
      return {
        success: true,
        address,
        tokenCount: tokens.length,
        tokens
      };
    } catch (error) {
      console.error('❌ Error getting token holdings:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get token holdings',
        address
      };
    }
  }
});

/**
 * Get current block information
 */
export const getBlockInfo = tool({
  description: `Get information about the current or specific block on any chain.
  Returns block number, hash, timestamp, gas info, and transaction count.
  Useful for monitoring blockchain state and network activity.`,
  parameters: z.object({
    chain: z.string().describe('The blockchain to query'),
    blockNumber: z.string().optional().describe('Specific block number (hex) or "latest"')
  }),
  execute: async ({ chain, blockNumber = 'latest' }) => {
    try {
      console.log(`📦 Getting block info for ${chain}`);
      
      if (chain.toLowerCase() === 'solana') {
        const recentBlockhash = await rpcService.getSolanaRecentBlockhash();
        return {
          success: true,
          chain,
          type: 'solana',
          recentBlockhash: recentBlockhash.value
        };
      } else {
        const block = await rpcService.getBlockByNumber(chain, blockNumber, false);
        const currentBlock = await rpcService.getBlockNumber(chain);
        
        return {
          success: true,
          chain,
          type: 'evm',
          currentBlockNumber: parseInt(currentBlock, 16),
          blockNumber: parseInt(block.number, 16),
          blockHash: block.hash,
          timestamp: parseInt(block.timestamp, 16),
          transactionCount: block.transactions.length,
          gasUsed: block.gasUsed,
          gasLimit: block.gasLimit
        };
      }
    } catch (error) {
      console.error('❌ Error getting block info:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get block info',
        chain
      };
    }
  }
});

/**
 * Get gas price for a chain
 */
export const getGasPrice = tool({
  description: `Get current gas price for EVM chains (Ethereum, Polygon, BSC, etc.).
  Returns gas price in Gwei and helps estimate transaction costs.
  Essential for timing transactions and cost optimization.`,
  parameters: z.object({
    chain: z.string().describe('The EVM blockchain to query (ethereum, polygon, bsc, etc.)')
  }),
  execute: async ({ chain }) => {
    try {
      console.log(`⛽ Getting gas price for ${chain}`);
      
      const gasPriceWei = await rpcService.getGasPrice(chain);
      const gasPriceGwei = parseInt(gasPriceWei, 16) / 1e9;
      
      return {
        success: true,
        chain,
        gasPriceWei,
        gasPriceGwei: gasPriceGwei.toFixed(2),
        gasPriceFormatted: `${gasPriceGwei.toFixed(2)} Gwei`
      };
    } catch (error) {
      console.error('❌ Error getting gas price:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get gas price',
        chain
      };
    }
  }
});

/**
 * Get account transaction count (nonce)
 */
export const getTransactionCount = tool({
  description: `Get the transaction count (nonce) for an address on EVM chains.
  Shows how many transactions an address has sent. 
  Useful for wallet activity analysis and nonce management.`,
  parameters: z.object({
    address: z.string().describe('The wallet address'),
    chain: z.string().describe('The blockchain to query')
  }),
  execute: async ({ address, chain }) => {
    try {
      console.log(`🔢 Getting transaction count for ${address} on ${chain}`);
      
      const count = await rpcService.getTransactionCount(chain, address);
      const countDecimal = parseInt(count, 16);
      
      return {
        success: true,
        address,
        chain,
        transactionCount: countDecimal,
        nonce: countDecimal
      };
    } catch (error) {
      console.error('❌ Error getting transaction count:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get transaction count',
        address,
        chain
      };
    }
  }
});

/**
 * Multi-chain wallet analysis
 */
export const analyzeWalletMultiChain = tool({
  description: `Comprehensive wallet analysis across multiple chains.
  Checks balance and activity on Ethereum, Polygon, BSC, Arbitrum, Optimism, Base, and Solana.
  Perfect for getting a complete view of a wallet's holdings across different blockchains.`,
  parameters: z.object({
    address: z.string().describe('The wallet address to analyze'),
    chains: z.array(z.string()).optional().describe('Specific chains to check (default: all supported chains)')
  }),
  execute: async ({ address, chains }) => {
    try {
      console.log(`🔍 Multi-chain analysis for ${address}`);
      
      const chainsToCheck = chains || Object.keys(SUPPORTED_CHAINS);
      const results: any[] = [];
      
      for (const chain of chainsToCheck) {
        try {
          if (chain.toLowerCase() === 'solana') {
            const result = await rpcService.getSolanaBalance(address);
            const solBalance = rpcService.lamportsToSol(result.value);
            results.push({
              chain,
              success: true,
              balance: solBalance.toString(),
              balanceFormatted: `${solBalance.toFixed(4)} SOL`
            });
          } else {
            const balanceWei = await rpcService.getBalance(chain, address);
            const balanceEth = rpcService.weiToEther(balanceWei);
            const chainInfo = SUPPORTED_CHAINS[chain.toLowerCase()];
            results.push({
              chain,
              chainName: chainInfo?.name,
              success: true,
              balance: balanceEth,
              balanceFormatted: `${balanceEth} ${chainInfo?.name?.split(' ')[0] || 'ETH'}`
            });
          }
        } catch (error) {
          results.push({
            chain,
            success: false,
            error: error instanceof Error ? error.message : 'Failed to get balance'
          });
        }
      }
      
      return {
        success: true,
        address,
        chainsAnalyzed: results.length,
        results
      };
    } catch (error) {
      console.error('❌ Error in multi-chain analysis:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to analyze wallet',
        address
      };
    }
  }
});

/**
 * List all supported chains
 */
export const listSupportedChains = tool({
  description: `Get a list of all blockchain networks supported by the crypto analysis tools.
  Returns chain names, IDs, and RPC methods available.`,
  parameters: z.object({}),
  execute: async () => {
    const chains = rpcService.getSupportedChains();
    return {
      success: true,
      count: chains.length,
      chains: chains.map(chain => ({
        name: chain.name,
        chainId: chain.chainId,
        rpcMethod: chain.rpcMethod
      }))
    };
  }
});
