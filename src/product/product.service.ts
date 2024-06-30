import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as fs from 'fs';
import { Model } from 'mongoose';
import { generateFunctionWithLanguage } from 'src/generateCodeChain';
import { Product, ProductDocument } from 'src/schemas/product.schema';

const csvToJson = require('csvtojson');

@Injectable()
export class ProductService {
        private readonly logger = new Logger();

    constructor(
    @InjectModel(Product.name) private readonly productModel: Model<ProductDocument>,
  ) {}

    async readCsvStream(): Promise<void> {

    try {
      const csvRead = () => fs.createReadStream('./file/images40.csv');
     const allData: any[] = [];
    const seenProductIds = new Set();

      csvRead()
        .pipe(csvToJson({
          delimiter: '\t'
        }))
        .on('data', (data) => {
          const camelCaseData = this.convertHeadersToCamelCase(JSON.parse(data.toString()));
          const filteredData = this.filterUnwantedFields(camelCaseData);
          filteredData.isRX = filteredData.isRX === 'Y' ? 1 : 0;
          filteredData.isTBD = filteredData.isTBD === 'Y' ? 1 : 0;
          filteredData.createdAt = new Date()
          
          if (!seenProductIds.has(filteredData.productID)) {
            seenProductIds.add(filteredData.productID);
            allData.push(filteredData);
          }
        })
        .on('end', async () => {
          await this.productModel.insertMany(allData);
          console.log('CSV file successfully processed');
              this.logger.debug('Cron job finished');

          await this.enhanceDescriptions(allData.slice(0, 10));
        });
    } catch (error) {
      console.error('Error reading CSV stream:', error);
    }
    }
  
   private async enhanceDescriptions(products: any[]): Promise<void> {
    for (const product of products) {
      const enhancedDescription = await generateFunctionWithLanguage({
        language: 'en', 
        task: `Product name: ${product.productName}\nProduct description: ${product.productDescription}:`,
      });
      console.log({enhancedDescription});
      
      product.enhancedDescription = enhancedDescription.code; // Assuming the result is in `enhancedDescription.code`
      await this.productModel.updateOne({ _id: product._id }, { enhancedDescription: product.enhancedDescription });
    }
  }



  private convertHeadersToCamelCase(data: any): any {
    const camelCaseData: any = {};
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const camelCaseKey = key.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
          index === 0 ? match.toLowerCase() : match.toUpperCase()
        ).replace(/\s+|_/g, '');
        camelCaseData[camelCaseKey] = data[key];
      }
    }
    return camelCaseData;
  }

  private filterUnwantedFields(data: any): any {
    const filteredData: any = {};
    const allowedFields = [
      'siteSource',
      'itemID',
      'manufacturerID',
      'manufacturerCode',
      'manufacturerName',
      'productID',
      'productName',
      'productDescription',
      'manufacturerItemCode',
      'itemDescription',
      'imageFileName',
      'itemImageURL',
      'nDCItemCode',
      'pKG',
      'unitPrice',
      'quantityOnHand',
      'priceDescription',
      'availability',
      'isRX',
      'isTBD',
    ];

    for (const key of allowedFields) {
      if (data.hasOwnProperty(key)) {
        filteredData[key] = data[key];
      }
    }
    return filteredData;
  }
}
