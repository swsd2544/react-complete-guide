import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS = [
	{
		title: 'My First Book',
		price: 6,
		description: "The first book I've ever written",
	},
	{
		title: 'My Second Book',
		price: 6,
		description: "The Second book I've ever written",
	},
];

const Products = (props) => {
	const productItems = DUMMY_PRODUCTS.map((product) => (
		<ProductItem
			key={product.title}
			title={product.title}
			price={product.price}
			description={product.description}
		/>
	));

	return (
		<section className={classes.products}>
			<h2>Buy your favorite products</h2>
			<ul>{productItems}</ul>
		</section>
	);
};

export default Products;
