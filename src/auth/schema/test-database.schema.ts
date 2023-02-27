import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TestDocument = HydratedDocument<Test>;

@Schema({ timestamps: false })
export class Test {
  @Prop()
  name?: string;
}

export const TestSchema = SchemaFactory.createForClass(Test);
