import { Config } from '../../../../shared/config.js'
import { resources } from '../resources.js'

export interface Locals {
  resources: Record<keyof typeof resources, Record<string, string>>
  config: Config
}
