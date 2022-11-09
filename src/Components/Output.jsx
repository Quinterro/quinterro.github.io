export const Output = (props) => {
	if (!props) return null
	return (
		<ul>
			{Object.entries(props).map(([key, value]) => (
				<li key={key}>
					{key}:{' '}
					{new Intl.NumberFormat('pl-PL', {
						style: 'currency',
						currency: 'PLN',
					}).format(value)}
				</li>
			))}
		</ul>
	)
}
