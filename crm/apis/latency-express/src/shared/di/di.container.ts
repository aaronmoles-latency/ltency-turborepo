import 'reflect-metadata';
import {Container, ContainerBuilder} from "diod";
import {glob} from "glob";
import {Module} from "../module";

function registerModules(builder: ContainerBuilder) {
    const { dirname } = require('path');
    const appDir = require.main ? dirname(require.main?.filename) : require.main;

    const modules = glob.sync(appDir + '/**/*.module.*');
    modules.forEach((module) => {
        const moduleClass = require(module).default
        const moduleInstance = Reflect.construct<[], Module>(moduleClass, [])
        moduleInstance.register(builder)
    });
}


export function DiContainer(register: (builder: ContainerBuilder) => void): Container {
    const builder = new ContainerBuilder()

    register(builder)
    registerModules(builder)

    return builder.build()
}

export function DiTestContainer(register: (builder: ContainerBuilder) => void): Container {
    const builder = new ContainerBuilder()

    register(builder)

    return builder.build()
}
