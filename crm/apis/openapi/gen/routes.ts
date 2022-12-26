export const routes = {
	UpdatePet: {
		method: 'PUT',
		route: '/pet',
	},
	AddPet: {
		method: 'POST',
		route: '/pet',
	},
	FindPetsByStatus: {
		method: 'GET',
		route: '/pet/findByStatus',
	},
	FindPetsByTags: {
		method: 'GET',
		route: '/pet/findByTags',
	},
	GetPetById: {
		method: 'GET',
		route: '/pet/{petId}',
	},
	UpdatePetWithForm: {
		method: 'POST',
		route: '/pet/{petId}',
	},
	DeletePet: {
		method: 'DELETE',
		route: '/pet/{petId}',
	},
	UploadFile: {
		method: 'POST',
		route: '/pet/{petId}/uploadImage',
	},
	GetInventory: {
		method: 'GET',
		route: '/store/inventory',
	},
	PlaceOrder: {
		method: 'POST',
		route: '/store/order',
	},
	GetOrderById: {
		method: 'GET',
		route: '/store/order/{orderId}',
	},
	DeleteOrder: {
		method: 'DELETE',
		route: '/store/order/{orderId}',
	},
	CreateUser: {
		method: 'POST',
		route: '/user',
	},
	CreateUsersWithListInput: {
		method: 'POST',
		route: '/user/createWithList',
	},
	LoginUser: {
		method: 'GET',
		route: '/user/login',
	},
	LogoutUser: {
		method: 'GET',
		route: '/user/logout',
	},
	GetUserByName: {
		method: 'GET',
		route: '/user/{username}',
	},
	UpdateUser: {
		method: 'PUT',
		route: '/user/{username}',
	},
	DeleteUser: {
		method: 'DELETE',
		route: '/user/{username}',
	},
}