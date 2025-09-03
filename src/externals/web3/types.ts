/**
 * Hexadecimal Ethereum address, prefixed with 0x.
 */
export type HexAddress = `0x${string}`;

/**
 * Options for write-only contract calls (state-changing).
 */
export interface WriteContractOptions<A extends readonly any[]> {
  /** Contract address */
  address: HexAddress;
  /** ABI JSON array */
  abi: readonly unknown[];
  /** Name of the function to call */
  fnName: string;
  /** Array of arguments for the function */
  args: A;
}

/**
 * Options for read-only contract.
 */
export interface ReadContractOptions<A extends readonly any[], R> {
  /** Contract address */
  address: HexAddress;
  /** ABI JSON array */
  abi: readonly unknown[];
  /** Name of the function to call */
  fnName: string;
  /** Array of arguments for the function */
  args: A;
}
