import React from 'react';

import { EuiPageTemplate } from '@elastic/eui';
import { EuiText } from '@elastic/eui';
import { AreaChart } from './area.chart';



function App() {
	return (
		<EuiPageTemplate
			panelled={true}
			bottomBorder={true}
			grow={true}
			offset={0}
		>
			<EuiPageTemplate.Sidebar sticky={true}>
				<h2>Sidebar</h2>
			</EuiPageTemplate.Sidebar>
			<EuiPageTemplate.Section grow={false} bottomBorder={true}>
				<EuiText textAlign="center">
					<strong>
						Stack EuiPageTemplate sections and headers to create your custom
						content order.
					</strong>
				</EuiText>
			</EuiPageTemplate.Section>
			<EuiPageTemplate.Section>Content</EuiPageTemplate.Section>
			<EuiPageTemplate.Section>
				<AreaChart />
			</EuiPageTemplate.Section>
		</EuiPageTemplate>
	);
}

export default App;
