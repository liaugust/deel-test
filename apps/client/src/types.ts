export type Profile = {
	id: number
	firstName: string
	lastName: string
	balance: number
}

export type Job = {
	id: number
	price: number
	paid: null | true
	description: string | null
}