import { ServiceManager } from "./manager";
import { User, UserInput } from "@/schema/types";

export class ProfileService extends ServiceManager {
    async createProfile(user: UserInput): Promise<User> {
        // const createdUser = await this.ds.Users.createProfile(user)
        // const balacne = this.ds.getBalanceXP(user)
        // const cotnract: Contract = this.ext.Blockchain.getContract('MMC')
        // cotnract.transfer(balance / 2, address)
    }
}