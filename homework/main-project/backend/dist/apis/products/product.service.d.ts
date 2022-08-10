import { Repository } from "typeorm";
import { ProductTag } from "../productsTags/entities/productTag.entity";
import { Product } from "./entities/product.entity";
export declare class ProductService {
    private readonly productRepository;
    private readonly productTagRepository;
    constructor(productRepository: Repository<Product>, productTagRepository: Repository<ProductTag>);
    findAll(): Promise<Product[]>;
    findOne({ productId }: {
        productId: any;
    }): Promise<Product>;
    findProductsWithDeleted(): Promise<Product[]>;
    create({ createProductInput }: {
        createProductInput: any;
    }): Promise<any>;
    update({ productId, updateProductInput }: {
        productId: any;
        updateProductInput: any;
    }): Promise<any>;
    checkresion({ productId }: {
        productId: any;
    }): Promise<void>;
    delete({ productId }: {
        productId: any;
    }): Promise<boolean>;
    restore({ productId }: {
        productId: any;
    }): Promise<boolean>;
}
