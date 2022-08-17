import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Product } from './product.entity';
import { BigQuery } from '@google-cloud/bigquery';

@EventSubscriber()
export class ProductsSubscriber implements EntitySubscriberInterface<Product> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }
  listenTo() {
    return Product;
  }

  afterInsert(event: InsertEvent<Product>): void | Promise<any> {
    console.log(event);

    const bigquery = new BigQuery({
      keyFilename: 'gcp-bigquery.json',
      projectId: 'emerald-lattice-358105',
    });

    bigquery
      .dataset('mybigquery04')
      .table('mybigquerylog')
      .insert([
        {
          id: event.entity.id,
          name: event.entity.name,
          description: event.entity.description,
          price: event.entity.price,
          isSoldout: event.entity.isSoldout,
        },
      ]);
  }
}
