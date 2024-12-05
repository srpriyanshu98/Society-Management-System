import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

export default function SuccessPage() {
	return (
		<Layout>
			<div className="max-w-lg mx-auto mt-12 text-center">
				<h1 className="text-2xl font-bold text-green-600">
					Payment Successful!
				</h1>
				<p className="text-gray-700 mt-4">
					Thank you for your payment. Your transaction was successful.
				</p>
				<Link
					to="/"
					className="text-blue-500 underline mt-6 inline-block"
				>
					Go back to Dashboard
				</Link>
			</div>
		</Layout>
	);
}
