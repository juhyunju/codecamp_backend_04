import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ProductCategory {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column({ unique: true })
  @Field()
  name: string;
}
