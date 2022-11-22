import 'reflect-metadata';
import {LatencyExpressApp} from "./latency-express.app";

try {
    new LatencyExpressApp().start();
} catch (e) {
    console.log(e);
    process.exit(1);
}

process.on('uncaughtException', err => {
    console.log('uncaughtException', err);
    process.exit(1);
});
