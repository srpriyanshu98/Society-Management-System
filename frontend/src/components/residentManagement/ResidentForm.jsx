import Layout from "../Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ResidentDetail from "./ResidentDetail";
import MembersCounting from "./MembersCounting";
import VehicleCounting from "./VehicleCounting";
import OwnerDetail from "./OwnerDetail";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";

export default function ResidentForm({ userRole }) {
	const {
		handleSubmit,
		control,
		formState: { errors, isValid },
	} = useForm({
		mode: "onChange",
	});

	const onSubmit = (data) => {
		console.log(data);
	};

	return (
		<Layout userRole={userRole}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Tabs defaultValue="owner">
					<TabsList className="grid grid-cols-2 w-[400px]">
						<TabsTrigger
							value="owner"
							className="p-5 rounded-t-xl border-b-orange-500 text-black"
						>
							Owner
						</TabsTrigger>
						<TabsTrigger
							value="tenant"
							className="p-5 rounded-t-xl border-b-orange-500 text-black"
						>
							Tenant
						</TabsTrigger>
					</TabsList>

					<TabsContent value="owner">
						<ResidentDetail control={control} errors={errors} />
						<MembersCounting control={control} errors={errors} />
						<VehicleCounting control={control} errors={errors} />
					</TabsContent>

					<TabsContent value="tenant">
						<OwnerDetail control={control} errors={errors} />
						<ResidentDetail control={control} errors={errors} />
						<MembersCounting control={control} errors={errors} />
						<VehicleCounting control={control} errors={errors} />
					</TabsContent>
				</Tabs>

				<div className="justify-self-end mt-3">
					<Button variant="outline" className="mr-1">
						Cancel
					</Button>
					<Button type="submit" disabled={!isValid}>
						Create
					</Button>
				</div>
			</form>
		</Layout>
	);
}
