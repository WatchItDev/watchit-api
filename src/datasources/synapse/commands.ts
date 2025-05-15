import { DataSourceManager } from '../manager'
import { web3 } from '../../externals/web3'
import LedgerVaultAbi from '../../externals/web3/config/abi/LedgerVault.json'

export class SynapseCommands extends DataSourceManager {
    /**
     * Transfers `amount` MMC to the recipient from your Vault.
     * @param to Destination address
     * @param amount Number of tokens (integers, e.g., 50)
     * @returns Tx hash
     */
    async transfer(to: string, amount: number): Promise<string> {
        const value = web3.parseUnits(amount)
        return await web3.writeContract({
            address: process.env.API_LEDGER_VAULT_ADDRESS! as `0x${string}`,
            abi: LedgerVaultAbi.abi,
            fnName: 'transfer',
            args: [to, value, process.env.API_MMC_TOKEN_ADDRESS! as `0x${string}`],
        })
    }
}
