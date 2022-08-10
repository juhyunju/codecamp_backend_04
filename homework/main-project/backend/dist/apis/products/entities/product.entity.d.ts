import { Category } from "src/apis/categories/entities/category.entity";
import { Image } from "src/apis/images/entities/image.entity";
import { User } from "src/apis/users/entities/user.entity";
import { ProductTag } from "src/apis/productsTags/entities/productTag.entity";
export declare class Product {
    code: string;
    name: string;
    price: number;
    region: string;
    desc: string;
    deletedAt: Date;
    image: Image;
    category: Category;
    Payment: any;
    users: User[];
    productTags: ProductTag[];
}
