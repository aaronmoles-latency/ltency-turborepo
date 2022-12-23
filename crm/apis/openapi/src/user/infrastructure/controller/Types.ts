export type Order = {
	id?: number
	petId?: number
	quantity?: number
	shipDate?: string
	status?: 'placed' | 'approved' | 'delivered'
	complete?: boolean
}

export type Customer = {
	id?: number
	username?: string
	address?: Array<Address>
}

export type Address = {
	street?: string
	city?: string
	state?: string
	zip?: string
}

export type Category = {
	id?: number
	name?: string
}

export type User = {
	id?: number
	username?: string
	firstName?: string
	lastName?: string
	email?: string
	password?: string
	phone?: string
	userStatus?: number
}

export type Tag = {
	id?: number
	name?: string
}

export type Pet = {
	id?: number
	name: string
	category?: Category
	photoUrls: Array<{

	}>
	tags?: Array<Tag>
	status?: 'available' | 'pending' | 'sold'
}

export type ApiResponse = {
	code?: number
	type?: string
	message?: string
}

export type UpdatePetRequestBody = Pet

export type AddPetRequestBody = Pet

export type FindPetsByStatusQueryParams = {
	queryParam: string
	status: 'available' | 'pending' | 'sold'
}

export type FindPetsByTagsQueryParams = {
	tags: Array<{

	}>
}

export type GetPetByIdPathParams = {
	petId: number
}

export type UpdatePetWithFormPathParams = {
	petId: number
}

export type UpdatePetWithFormQueryParams = {
	name: string
	status: string
}

export type DeletePetPathParams = {
	petId: number
}

export type UploadFilePathParams = {
	petId: number
}

export type UploadFileQueryParams = {
	additionalMetadata: string
}

export type PlaceOrderRequestBody = Order

export type GetOrderByIdPathParams = {
	orderId: number
}

export type DeleteOrderPathParams = {
	orderId: number
}

export type CreateUserRequestBody = User

export type CreateUsersWithListInputRequestBody = Array<User>

export type LoginUserQueryParams = {
	username: string
	password: string
}

export type GetUserByNamePathParams = {
	username: string
}

export type UpdateUserRequestBody = User

export type UpdateUserPathParams = {
	username: string
}

export type DeleteUserPathParams = {
	username: string
}
