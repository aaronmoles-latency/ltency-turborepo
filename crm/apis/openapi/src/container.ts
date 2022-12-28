import { config } from './container.config';
import { DiodAppContainer } from './shared/di/diod.app-container';

export const container = new DiodAppContainer(config)
