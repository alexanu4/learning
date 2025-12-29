import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ContextIdFactory, DiscoveryService, ModuleRef } from '@nestjs/core';
import { CatsService } from 'src/cats/cats.service';
import { ConfigService } from 'src/config/config.service';
import { FeatureFlag } from 'src/decorator/custom-metadata.decorator';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService implements OnModuleInit, OnModuleDestroy {
  private catsService: CatsService;

  constructor(
    // private usersService: UsersService,
    private moduleRef: ModuleRef,
    private readonly discoveryService: DiscoveryService,
  ) {
    const providers = this.discoveryService.getProviders();
    // console.log(providers);

    // const controllers = this.discoveryService.getControllers();
    // console.log(controllers);

    const [provider] = providers.filter(
      (item) =>
        this.discoveryService.getMetadataByDecorator(FeatureFlag, item) ===
        'experimental',
    );
    console.log(
      "\nProviders with the 'experimental' feature flag metadata:\n",
      provider,
    );
  }

  async onModuleInit() {
    const contextId = ContextIdFactory.create();
    this.catsService = await this.moduleRef.resolve(CatsService, contextId, {
      strict: false,
    });
    console.log(this.catsService.findAll());
    console.log(this.moduleRef.get(ConfigService, { strict: false }));
  }
  onModuleDestroy(signal?: string) {
    console.log('Auth service on destroy with signal: ', signal);
  }

  doSomething() {
    return 'It works!';
  }
}
