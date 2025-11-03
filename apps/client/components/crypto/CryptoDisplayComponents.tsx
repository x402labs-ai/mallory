import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * Component for displaying blockchain wallet balances
 */
export interface WalletBalanceDisplayProps {
  address: string;
  chain: string;
  balance: string;
  balanceFormatted: string;
}

export function WalletBalanceDisplay({ address, chain, balance, balanceFormatted }: WalletBalanceDisplayProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.chain}>{chain.toUpperCase()}</Text>
      <Text style={styles.address}>
        {address.substring(0, 6)}...{address.substring(address.length - 4)}
      </Text>
      <Text style={styles.balance}>{balanceFormatted}</Text>
    </View>
  );
}

/**
 * Component for displaying multi-chain wallet analysis
 */
export interface MultiChainBalanceProps {
  address: string;
  balances: Array<{
    chain: string;
    chainName?: string;
    balance: string;
    balanceFormatted: string;
    success: boolean;
    error?: string;
  }>;
}

export function MultiChainBalanceDisplay({ address, balances }: MultiChainBalanceProps) {
  return (
    <View style={styles.multiChainContainer}>
      <Text style={styles.header}>Multi-Chain Analysis</Text>
      <Text style={styles.addressHeader}>
        {address.substring(0, 8)}...{address.substring(address.length - 6)}
      </Text>
      
      {balances.map((item, index) => (
        <View key={index} style={styles.chainRow}>
          <View style={styles.chainInfo}>
            <Text style={styles.chainName}>{item.chainName || item.chain}</Text>
            {item.success ? (
              <Text style={styles.balanceValue}>{item.balanceFormatted}</Text>
            ) : (
              <Text style={styles.errorText}>{item.error || 'Failed'}</Text>
            )}
          </View>
        </View>
      ))}
    </View>
  );
}

/**
 * Component for displaying transaction info
 */
export interface TransactionDisplayProps {
  hash: string;
  from: string;
  to: string;
  value?: string;
  valueFormatted?: string;
  status: 'success' | 'failed' | 'pending';
  chain: string;
  blockNumber?: number;
}

export function TransactionDisplay({ 
  hash, 
  from, 
  to, 
  valueFormatted, 
  status, 
  chain,
  blockNumber 
}: TransactionDisplayProps) {
  const statusColor = status === 'success' ? '#4CAF50' : status === 'failed' ? '#F44336' : '#FFC107';
  
  return (
    <View style={styles.txContainer}>
      <View style={styles.txHeader}>
        <Text style={styles.chain}>{chain.toUpperCase()}</Text>
        <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
          <Text style={styles.statusText}>{status}</Text>
        </View>
      </View>
      
      <View style={styles.txRow}>
        <Text style={styles.label}>Hash:</Text>
        <Text style={styles.hash}>{hash.substring(0, 10)}...{hash.substring(hash.length - 8)}</Text>
      </View>
      
      <View style={styles.txRow}>
        <Text style={styles.label}>From:</Text>
        <Text style={styles.address}>{from.substring(0, 6)}...{from.substring(from.length - 4)}</Text>
      </View>
      
      <View style={styles.txRow}>
        <Text style={styles.label}>To:</Text>
        <Text style={styles.address}>{to.substring(0, 6)}...{to.substring(to.length - 4)}</Text>
      </View>
      
      {valueFormatted && (
        <View style={styles.txRow}>
          <Text style={styles.label}>Value:</Text>
          <Text style={styles.value}>{valueFormatted}</Text>
        </View>
      )}
      
      {blockNumber && (
        <View style={styles.txRow}>
          <Text style={styles.label}>Block:</Text>
          <Text style={styles.value}>{blockNumber}</Text>
        </View>
      )}
    </View>
  );
}

/**
 * Component for displaying gas prices
 */
export interface GasPriceDisplayProps {
  chain: string;
  gasPriceGwei: string;
}

export function GasPriceDisplay({ chain, gasPriceGwei }: GasPriceDisplayProps) {
  const gasPriceNum = parseFloat(gasPriceGwei);
  const level = gasPriceNum < 30 ? 'Low' : gasPriceNum < 100 ? 'Medium' : 'High';
  const levelColor = level === 'Low' ? '#4CAF50' : level === 'Medium' ? '#FFC107' : '#F44336';
  
  return (
    <View style={styles.gasContainer}>
      <Text style={styles.chain}>{chain.toUpperCase()}</Text>
      <Text style={styles.gasPrice}>{gasPriceGwei} Gwei</Text>
      <View style={[styles.gasLevel, { backgroundColor: levelColor }]}>
        <Text style={styles.gasLevelText}>{level}</Text>
      </View>
    </View>
  );
}

/**
 * Component for displaying token holdings
 */
export interface TokenHoldingDisplayProps {
  tokens: Array<{
    mint: string;
    balance: string;
    decimals: number;
  }>;
}

export function TokenHoldingDisplay({ tokens }: TokenHoldingDisplayProps) {
  return (
    <View style={styles.tokenContainer}>
      <Text style={styles.header}>Token Holdings ({tokens.length})</Text>
      {tokens.map((token, index) => (
        <View key={index} style={styles.tokenRow}>
          <Text style={styles.tokenMint}>
            {token.mint.substring(0, 6)}...{token.mint.substring(token.mint.length - 4)}
          </Text>
          <Text style={styles.tokenBalance}>{token.balance}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  multiChainContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  addressHeader: {
    fontSize: 14,
    color: '#888',
    marginBottom: 16,
    fontFamily: 'monospace',
  },
  chain: {
    fontSize: 12,
    fontWeight: '600',
    color: '#888',
    marginBottom: 4,
  },
  address: {
    fontSize: 14,
    color: '#888',
    fontFamily: 'monospace',
  },
  balance: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 8,
  },
  chainRow: {
    marginBottom: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  chainInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chainName: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  balanceValue: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '600',
  },
  errorText: {
    fontSize: 14,
    color: '#F44336',
  },
  txContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  txHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  txRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: '#888',
    width: 80,
  },
  hash: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'monospace',
    flex: 1,
  },
  value: {
    fontSize: 14,
    color: '#FFFFFF',
    flex: 1,
  },
  gasContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#333',
    alignItems: 'center',
  },
  gasPrice: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginVertical: 8,
  },
  gasLevel: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 8,
  },
  gasLevelText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  tokenContainer: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#333',
  },
  tokenRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  tokenMint: {
    fontSize: 14,
    color: '#888',
    fontFamily: 'monospace',
  },
  tokenBalance: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
});
