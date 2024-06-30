import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ProductService } from './product.service';

@Injectable()
export class ProductCronService {
    private readonly logger = new Logger(ProductCronService.name);

  constructor(private readonly productService: ProductService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  handleCron() {
     this.logger.debug('Cron job started');
    this.productService.readCsvStream();
  }
}