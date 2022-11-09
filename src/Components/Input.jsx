export const Input = ({
	label,
	name,
	suffix,
	prefix,
	type = 'text',
	value,
	...props
}) => {
	return (
		<div>
			<label htmlFor={name}>{label}</label>
			{prefix}
			<input
				type={type}
				id={name}
				name={name}
				value={value?.[name]}
				{...props}
			/>
			{suffix}
		</div>
	)
}
