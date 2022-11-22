import DotEnv from "./shared/env/DotEnv";
import {EnvType} from "./shared/env/Env";
import {Service} from "./shared/decorators/service.decorator";

interface Env extends EnvType{

}

@Service()
export default class LatencyEnv extends DotEnv<Env> {
    constructor() {
        super({
            NODE_ENV: 'dev',
            PORT: '3000',
        });
    }
}
