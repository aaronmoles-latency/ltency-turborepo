import { Button } from '../../../components/ui';
import { routes } from '../gen/routes';

export default function Web() {
	return (
		<div>
			<h1>Web {routes.AddPet.route}</h1>
			<Button />
		</div>
	);
}
