'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.Web3Commands = void 0;
const manager_1 = require('../manager');
const web3_1 = require('../../externals/web3');
const LedgerVault_json_1 = __importDefault(
  require('../../externals/web3/config/abi/LedgerVault.json'),
);
class Web3Commands extends manager_1.DataSourceManager {
  /**
   * Transfers `amount` MMC to the recipient from your Vault.
   * @param to Destination address
   * @param amount Number of tokens (integers, e.g., 50)
   * @returns Tx hash
   */
  async transfer(to, amount) {
    const value = web3_1.web3.parseUnits(amount);
    return await web3_1.web3.writeContract({
      address: process.env.API_LEDGER_VAULT_ADDRESS,
      abi: LedgerVault_json_1.default.abi,
      fnName: 'transfer',
      args: [to, value, process.env.API_MMC_TOKEN_ADDRESS],
    });
  }
}
exports.Web3Commands = Web3Commands;
//# sourceMappingURL=commands.js.map
