import dayjs from 'dayjs'
import { useForm } from '../hooks/useForm'
import { Input } from './Input'
import { calculatePrice } from '../calculatePrice.js'
import { useState } from 'react'
import { Output } from './Output'

export const Form = () => {
	const [result, setResult] = useState(null)
	const [values, setValues] = useForm({
		yearDriversLicense: dayjs().subtract(3, 'year').year(),
	})
	function submit(e) {
		e.preventDefault()
		setResult(calculatePrice(values))
	}
	return (
		<div>
			<form onSubmit={submit}>
				<Input
					value={values}
					onChange={setValues}
					label='Przejechane kilometry:'
					suffix='km'
					name='distance'
					type='number'
				/>
				<Input
					value={values}
					onChange={setValues}
					label='Rok otrzymania prawa jazdy:'
					min={1918}
					max={dayjs().year()}
					name='yearDriversLicense'
					type='number'
				/>
				<div>
					<p>Termin wypożyczenia samochodu:</p>
				</div>
				<Input
					value={values}
					onChange={setValues}
					name='start'
					prefix='od'
					type='date'
				/>
				<Input
					onChange={setValues}
					name='stop'
					prefix='do'
					type='date'
					min={dayjs().add(1, 'day').year()}
				/>
				{/* <ul>
					<li id='oilPrice'></li>
					<li id='onlyLoan'></li>
					<li id='priceNetto'></li>
					<li id='priceBrutto'></li>
				</ul> */}
				<button type='submit'>Przelicz</button>
			</form>
			{result !== null && <Output {...result} />}
		</div>
	)
}
