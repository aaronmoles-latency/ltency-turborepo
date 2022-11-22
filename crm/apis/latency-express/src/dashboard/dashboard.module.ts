import { ContainerBuilder } from 'diod';
import { DiTag } from '../shared/di/di-tag';
import { Module } from '../shared/module';
import DashboardController from './dashboard.controller';
import DashboardService from './dashboard.service';

export default class DashboardModule extends Module {
    register(builder: ContainerBuilder): void {
        builder.registerAndUse(DashboardController).addTag(DiTag.CONTROLLER)
        builder.registerAndUse(DashboardService)
    }
}
