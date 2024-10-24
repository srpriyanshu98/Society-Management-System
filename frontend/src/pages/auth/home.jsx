import { Button } from "@/components/ui/button";

export default function Home() {
	return (
		<div>
			<h1 className="text-3xl font-bold underline">Hello world!</h1>
			<p className="mt-6 mb-8">
				Lorem ipsum dolor, sit amet consectetur adipisicing elit.
				Accusantium, sunt saepe nostrum quae, minus odit alias ab
				laboriosam officia maiores tempore earum repellat totam debitis.
				Ipsa accusantium dicta rem similique.
			</p>
			<div>
				<p className="mb-3">Shadcn/ui component</p>
				<Button>Click Me</Button>
			</div>
			<div>
				<p className="mb-3 mt-3">
					Shadcn/ui component variant = destructive
				</p>
				<Button variant="destructive">Click Me</Button>
			</div>
		</div>
	);
}
