import { ContainerBuilder } from 'diod';

import { DiTag } from '../shared/di/di-tag';
import { Module } from '../shared/module';
import DashboardService from './application/dashboard.service';
import DashboardController from './infrastructure/dashboard.controller';

export default class DashboardModule extends Module {
	register(builder: ContainerBuilder): void {
		builder.registerAndUse(DashboardController).addTag(DiTag.CONTROLLER);
		builder.registerAndUse(DashboardService);
	}
}
