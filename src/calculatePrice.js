import dayjs from 'dayjs'

const distanceMax = 1000000
const distanceMin = 0
const distanceDefault = 0
const today = dayjs()
const tomorrow = dayjs().add(1, 'day')
const priceCategories = {
	basic: {
		name: 'Basic',
		factor: 1,
	},
	standard: {
		name: 'Standard',
		factor: 1.3,
	},
	medium: {
		name: 'Medium',
		factor: 1.6,
	},
	premium: {
		name: 'Premium',
		factor: 2,
	},
}

const oilPrice = 7.6
const priceCategory = priceCategories.medium.name
let localization = 'Rzeszow'
const baseloanPrice = 100
const mileage = 10
const availableModel = 2
const car = {
	priceCategory,
	mileage,
	availableModel,
	localization,
}
const hours = 24
const minutes = 60
const seconds = 60
const miliseconds = 1000

const currentYear = today.year()

const driversLongevityRate = 1.2
const amountOfCarsRate = 1.15
const vatRate = 1.23

export const calculatePrice = ({
	distance,
	yearDriversLicense,
	start,
	stop,
}) => {
	let loanPrice = 100 * dayjs(stop).diff(dayjs(start), 'day')
	let wholeLoanPrice = 0
	wholeLoanPrice += loanPrice

	switch (car.priceCategory) {
		case 'Basic':
			wholeLoanPrice *= priceCategories.basic.factor
			break
		case 'Standard':
			wholeLoanPrice *= priceCategories.medium.factor
			break
		case 'Medium':
			wholeLoanPrice *= priceCategories.medium.factor
			break
		case 'Premium':
			wholeLoanPrice *= priceCategories.premium.factor
			break
	}

	if (currentYear - yearDriversLicense < 5)
		wholeLoanPrice *= driversLongevityRate

	if (currentYear - yearDriversLicense < 3 && car.priceCategory == 'Premium')
		window.prompt(
			'Nie możesz wypożyczyć tego samochodu, ponieważ aby wypożyczyć samochód klasy Premium, potrzebujesz posiadać prawo jazdy conajmniej 3 lata.'
		)

	if (availableModel < 3) wholeLoanPrice *= amountOfCarsRate

	let oilCost = (distance / 100) * car.mileage * oilPrice

	wholeLoanPrice += oilCost

	let priceBrutto = wholeLoanPrice * vatRate
	return {
		['Szacunkowa cena za paliwo:']: oilCost,
		['Cena za samo wypożyczenie:']: oilPrice,
		['Cena netto za całe wypożyczenie:']: wholeLoanPrice,
		['Cena brutto za całe wypożyczenie:']: priceBrutto,
	}
}
// document.getElementById('form').addEventListener('submit', (e) => {
// 	e.preventDefault()

// 	document.getElementById(
// 		'oilPrice'
// 	).innerHTML = `Szacunkowa cena za paliwo: ${new Intl.NumberFormat('pl-PL', {
// 		style: 'currency',
// 		currency: 'PLN',
// 	}).format(oilCost)}`

// 	document.getElementById(
// 		'onlyLoan'
// 	).innerHTML = `Cena za samo wypożyczenie: ${new Intl.NumberFormat('pl-PL', {
// 		style: 'currency',
// 		currency: 'PLN',
// 	}).format(loanPrice)}`

// 	document.getElementById(
// 		'priceNetto'
// 	).innerHTML = `Cena netto za całe wypożyczenie: ${new Intl.NumberFormat(
// 		'pl-PL',
// 		{
// 			style: 'currency',
// 			currency: 'PLN',
// 		}
// 	).format(wholeLoanPrice)}`

// 	document.getElementById(
// 		'priceBrutto'
// 	).innerHTML = `Cena brutto za całe wypożyczenie: ${new Intl.NumberFormat(
// 		'pl-PL',
// 		{
// 			style: 'currency',
// 			currency: 'PLN',
// 		}
// 	).format(priceBrutto)}`
// })
