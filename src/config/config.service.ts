import {
  BeforeApplicationShutdown,
  Inject,
  Injectable,
  OnApplicationShutdown,
  OnModuleDestroy,
  Scope,
} from '@nestjs/common';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as dotenv from 'dotenv';
import type { ConfigModuleOptions, EnvConfig } from './interfaces';
import { CONFIG_OPTIONS } from 'src/config/constants';
import { MODULE_OPTIONS_TOKEN } from './config.module-definition';
import { FeatureFlag } from 'src/decorator/custom-metadata.decorator';

@Injectable({ scope: Scope.TRANSIENT })
@FeatureFlag('experimental')
export class ConfigService {
  private readonly envConfig: EnvConfig;

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private options: ConfigModuleOptions,
  ) {
    const filePath = `${process.env.NODE_ENV || 'development'}.env`;
    const envFile = path.resolve(__dirname, '../../', options.folder, filePath);
    this.envConfig = dotenv.parse(fs.readFileSync(envFile));
  }

  // onModuleDestroy(signal?: string) {
  //   console.log('Config service on destroy with signal: ', signal);
  // }

  // beforeApplicationShutdown(signal?: string) {
  //   console.log('Config service before shutdown with signal: ', signal);
  // }
  // onApplicationShutdown(signal?: string) {
  //   console.log('Config service on shutdown with signal: ', signal);
  // }

  get(key: string): string {
    return this.envConfig[key];
  }
}
