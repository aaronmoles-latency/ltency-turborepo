import 'reflect-metadata';
import {LatencyExpressApp} from "./latency-express.app";
import {packageA} from "@latency/package-a";

try {
    new LatencyExpressApp().start();
    packageA();
} catch (e) {
    console.log(e);
    process.exit(1);
}

process.on('uncaughtException', err => {
    console.log('uncaughtException', err);
    process.exit(1);
});
