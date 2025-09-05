import { createPublicClient, createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { polygonAmoy } from 'viem/chains';
import { parseUnits as viemParseUnits } from 'viem';
import type {
  WriteContractOptions,
  ReadContractOptions,
  HexAddress,
} from './types';

// —————————————————————————————————————————
// Client initialization
// —————————————————————————————————————————

const { API_RPC_URL, API_PRIVATE_KEY } = process.env;
if (!API_RPC_URL || !API_PRIVATE_KEY)
  throw new Error('Missing API_RPC_URL or API_PRIVATE_KEY in env');

const publicClient = createPublicClient({
  transport: http(API_RPC_URL),
  chain: polygonAmoy,
});

const walletClient = createWalletClient({
  transport: http(API_RPC_URL),
  account: privateKeyToAccount(API_PRIVATE_KEY as HexAddress),
  chain: polygonAmoy,
});

// —————————————————————————————————————————
// Exports
// —————————————————————————————————————————

export function parseUnits(value: string | number) {
  return viemParseUnits(value.toString(), 18);
}

export async function readContract<A extends readonly any[], R>(
  opts: ReadContractOptions<A, R>,
): Promise<R> {
  const result = await publicClient.readContract({
    address: opts.address,
    abi: opts.abi,
    functionName: opts.fnName,
    args: opts.args,
  });
  return result as R;
}

export async function writeContract<A extends readonly any[]>(
  opts: WriteContractOptions<A>,
): Promise<string> {
  return walletClient.writeContract({
    address: opts.address,
    abi: opts.abi,
    functionName: opts.fnName,
    args: opts.args,
  });
}
