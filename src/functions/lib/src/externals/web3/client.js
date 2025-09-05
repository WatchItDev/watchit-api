'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.parseUnits = parseUnits;
exports.readContract = readContract;
exports.writeContract = writeContract;
const viem_1 = require('viem');
const accounts_1 = require('viem/accounts');
const chains_1 = require('viem/chains');
const viem_2 = require('viem');
// —————————————————————————————————————————
// Client initialization
// —————————————————————————————————————————
const { API_RPC_URL, API_PRIVATE_KEY } = process.env;
if (!API_RPC_URL || !API_PRIVATE_KEY)
  throw new Error('Missing API_RPC_URL or API_PRIVATE_KEY in env');
const publicClient = (0, viem_1.createPublicClient)({
  transport: (0, viem_1.http)(API_RPC_URL),
  chain: chains_1.polygonAmoy,
});
const walletClient = (0, viem_1.createWalletClient)({
  transport: (0, viem_1.http)(API_RPC_URL),
  account: (0, accounts_1.privateKeyToAccount)(API_PRIVATE_KEY),
  chain: chains_1.polygonAmoy,
});
// —————————————————————————————————————————
// Exports
// —————————————————————————————————————————
function parseUnits(value) {
  return (0, viem_2.parseUnits)(value.toString(), 18);
}
async function readContract(opts) {
  const result = await publicClient.readContract({
    address: opts.address,
    abi: opts.abi,
    functionName: opts.fnName,
    args: opts.args,
  });
  return result;
}
async function writeContract(opts) {
  return walletClient.writeContract({
    address: opts.address,
    abi: opts.abi,
    functionName: opts.fnName,
    args: opts.args,
  });
}
//# sourceMappingURL=client.js.map
