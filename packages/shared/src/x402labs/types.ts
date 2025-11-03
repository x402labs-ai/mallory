/**
 * Types for x402labs crypto analysis
 */

export interface TokenInfo {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  totalSupply?: string;
  chain: string;
}

export interface WalletAnalysis {
  address: string;
  chain: string;
  balance: string;
  balanceUsd?: number;
  transactionCount: number;
  tokens?: TokenHolding[];
  lastActivity?: number;
}

export interface TokenHolding {
  tokenAddress: string;
  symbol: string;
  balance: string;
  balanceFormatted: string;
  decimals: number;
  valueUsd?: number;
}

export interface TransactionInfo {
  hash: string;
  from: string;
  to: string;
  value: string;
  valueFormatted: string;
  gasUsed?: string;
  gasPrice?: string;
  blockNumber: number;
  timestamp: number;
  status: 'success' | 'failed' | 'pending';
  chain: string;
}

export interface BlockInfo {
  number: number;
  hash: string;
  timestamp: number;
  transactions: string[];
  gasUsed: string;
  gasLimit: string;
  chain: string;
}

export interface GasEstimate {
  estimatedGas: string;
  gasPrice: string;
  totalCostWei: string;
  totalCostEth: string;
  totalCostUsd?: number;
}

export interface ChainAnalysis {
  chain: string;
  blockNumber: number;
  gasPrice: string;
  averageBlockTime?: number;
  pendingTransactions?: number;
}

export interface SmartContractInfo {
  address: string;
  chain: string;
  bytecode?: string;
  isContract: boolean;
  creator?: string;
  creationTx?: string;
}
