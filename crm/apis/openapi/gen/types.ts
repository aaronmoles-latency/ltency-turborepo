/* eslint-disable no-use-before-define */
export type Error = {
	code: string
	message: string
}

export type Order = {
	id?: number
	petId?: string
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
	photoUrls: Array<string>
	tags?: Array<Tag>
	status?: 'available' | 'pending' | 'sold'
}

export type ApiResponse = {
	code?: number
	type?: string
	message?: string
}

export type UpdatePetRequestBody = Pet

export type UpdatePet200Response = Pet

export type AddPetRequestBody = Pet

export type AddPet200Response = Pet

export type FindPetsByStatus200Response = Array<Pet>

export type FindPetsByTags200Response = Array<Pet>

export type GetPetById200Response = Pet

export type UploadFile200Response = ApiResponse

export type UploadFile401Response = Error

export type UploadFileDefaultResponse = Error

export type PlaceOrderRequestBody = Order

export type PlaceOrder200Response = Order

export type GetOrderById200Response = Order

export type CreateUserRequestBody = User

export type CreateUserDefaultResponse = User

export type CreateUsersWithListInputRequestBody = Array<User>

export type CreateUsersWithListInput200Response = User

export type LoginUser200Response = string

export type GetUserByName200Response = User

export type UpdateUserRequestBody = User

export type FindPetsByStatusQueryParams = {
	queryParam: string
	status: 'available' | 'pending' | 'sold'
}

export type FindPetsByTagsQueryParams = {
	tags: Array<string>
}

export type GetPetByIdPathParams = {
	petId: string
}

export type UpdatePetWithFormPathParams = {
	petId: string
}

export type UpdatePetWithFormQueryParams = {
	name: string
	status: string
}

export type DeletePetPathParams = {
	petId: string
}

export type UploadFilePathParams = {
	petId: string
}

export type UploadFileQueryParams = {
	additionalMetadata: string
}

export type GetOrderByIdPathParams = {
	orderId: string
}

export type DeleteOrderPathParams = {
	orderId: string
}

export type LoginUserQueryParams = {
	username: string
	password: string
}

export type GetUserByNamePathParams = {
	username: string
}

export type UpdateUserPathParams = {
	username: string
}

export type DeleteUserPathParams = {
	username: string
}

