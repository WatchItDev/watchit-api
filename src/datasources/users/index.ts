import { Mixin } from 'ts-mixer'
import { QueryManager } from './query'

export default class UsersRoot extends Mixin(
  QueryManager
) { }
