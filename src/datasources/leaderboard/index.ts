import { Mixin }              from 'ts-mixer'
import { LeaderboardCommands } from './commands'
import { LeaderboardQuery }    from './query'

export default class LeaderboardDS extends Mixin(LeaderboardCommands, LeaderboardQuery) {}
