import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({  type: mongoose.Schema.Types.String })
  siteSource: string;

  @Prop({  type: mongoose.Schema.Types.String })
  itemID: string;

 @Prop({ type: mongoose.Schema.Types.String },)
  manufacturerID: string;

  @Prop({ type: mongoose.Schema.Types.String })
  manufacturerCode: string;

  @Prop({ type: mongoose.Schema.Types.String })
  manufacturerName: string;

  @Prop({ type: mongoose.Schema.Types.String })
  manufacturerItemCode: string;
  
  @Prop({  type: mongoose.Schema.Types.String })
  productID: string;

  @Prop({  type: mongoose.Schema.Types.String })
  productName: string;

  @Prop({ type: mongoose.Schema.Types.String })
  productDescription: string;

  @Prop({ type: mongoose.Schema.Types.String })
  itemDescription: string;

  @Prop({ type: mongoose.Schema.Types.String })
  imageFileName: string;

  @Prop({ type: mongoose.Schema.Types.String })
  itemImageUrl: string;

  @Prop({ type: mongoose.Schema.Types.String })
  nDCItemCode: string;

  @Prop({ type: mongoose.Schema.Types.String })
  pKG: string;

  @Prop({  type: mongoose.Schema.Types.String })
  unitPrice: string;

  @Prop({  type: mongoose.Schema.Types.String })
  quantityOnHand: string;

  @Prop({ type: mongoose.Schema.Types.String })
  priceDescription: string;

  @Prop({ type: mongoose.Schema.Types.String })
  availability: string;

  @Prop({ default: false })
  isRx: boolean;

  @Prop({ default: false })
  isTbd: boolean;

  @Prop({ type: mongoose.Schema.Types.Date })
  createdAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

// 'siteSource',
//       'itemID',
//       'manufacturerID',
//       'manufacturerCode',
//       'manufacturerName',
//       'productID',
//       'productName',
//       'productDescription',
//       'manufacturerItemCode',
//       'itemDescription',
//       'imageFileName',
//       'itemImageURL',
//       'nDCItemCode',
//       'pKG',
//       'unitPrice',
//       'quantityOnHand',
//       'priceDescription',
//       'availability',
//       'isRX',
//       'isTBD',