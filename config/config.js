import { merge } from 'lodash';
import config, { development } from './config.json';

const defaultConfig = development;
const environment = process.env.NODE_ENV || 'development';
const environmentConfig = config[environment];
const finalConfig = merge(defaultConfig, environmentConfig);

global.gConfig = finalConfig;

console.log(`global.gConfig: ${JSON.stringify(global.gConfig, undefined, global.gConfig.json_indentation)}`);
