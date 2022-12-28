import parser from '@asyncapi/parser';
import * as fs from 'fs';
import * as path from 'path';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const openapiSchemaParser = require('@asyncapi/openapi-schema-parser');

const content = fs.readFileSync(path.resolve(__dirname, '../asyncapi.yaml')).toString();
parser.registerSchemaParser(openapiSchemaParser);
parser.parse(content)
	.then((result) => {
		console.log('CHANNELS', JSON.stringify(result.channels(), null, 2))
	});
