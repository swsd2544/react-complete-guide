import { useParams } from 'react-router';

const ProductDetail = () => {
	const params = useParams();

	return (
		<section>
			<h1>ProductDetail</h1>
			<p>{params.productId}</p>
		</section>
	);
};

export default ProductDetail;
