type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  pictureUrl: string;
  type?: string;
  category: string;
  quantityInStock: number;
};

type ProductParams = {
  orderBy: string;
  searchTerm?: string;
  categories: string[];
  types: string[];
  pageNumber: number;
  pageSize: number;
};
