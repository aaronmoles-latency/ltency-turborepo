/* eslint-disable @typescript-eslint/ban-types */
import { Request, Response } from 'express';

import {
	AddPet200Response,
	AddPetRequestBody,
	CreateUserDefaultResponse,
	CreateUserRequestBody,
	CreateUsersWithListInput200Response,
	CreateUsersWithListInputRequestBody,
	DeleteOrderPathParams,
	DeletePetPathParams,
	DeleteUserPathParams,
	FindPetsByStatus200Response,
	FindPetsByStatusQueryParams,
	FindPetsByTags200Response,
	FindPetsByTagsQueryParams,
	GetOrderById200Response,
	GetOrderByIdPathParams,
	GetPetById200Response,
	GetPetByIdPathParams,
	GetUserByName200Response,
	GetUserByNamePathParams,
	LoginUser200Response,
	LoginUserQueryParams,
	PlaceOrder200Response,
	PlaceOrderRequestBody,
	UpdatePet200Response,
	UpdatePetRequestBody,
	UpdatePetWithFormPathParams,
	UpdatePetWithFormQueryParams,
	UpdateUserPathParams,
	UpdateUserRequestBody,
	UploadFile200Response,
	UploadFile401Response,
	UploadFileDefaultResponse,
	UploadFilePathParams,
	UploadFileQueryParams,
} from './types'

interface Controller<Req extends Request = Request, Res extends Response = Response> {
	run(req: Req, res: Res): Promise<void>
}

export type UpdatePetControllerDefinition = Controller<Request<{}, UpdatePet200Response, UpdatePetRequestBody, {}>, Response<UpdatePet200Response>>

export type AddPetControllerDefinition = Controller<Request<{}, AddPet200Response, AddPetRequestBody, {}>, Response<AddPet200Response>>

export type FindPetsByStatusControllerDefinition = Controller<Request<{}, FindPetsByStatus200Response, {}, FindPetsByStatusQueryParams>, Response<FindPetsByStatus200Response>>

export type FindPetsByTagsControllerDefinition = Controller<Request<{}, FindPetsByTags200Response, {}, FindPetsByTagsQueryParams>, Response<FindPetsByTags200Response>>

export type GetPetByIdControllerDefinition = Controller<Request<GetPetByIdPathParams, GetPetById200Response, {}, {}>, Response<GetPetById200Response>>

export type UpdatePetWithFormControllerDefinition = Controller<Request<UpdatePetWithFormPathParams, {}, {}, UpdatePetWithFormQueryParams>, Response<{}>>

export type DeletePetControllerDefinition = Controller<Request<DeletePetPathParams, {}, {}, {}>, Response<{}>>

export type UploadFileControllerDefinition = Controller<Request<UploadFilePathParams, UploadFile200Response | UploadFile401Response | UploadFileDefaultResponse, {}, UploadFileQueryParams>, Response<UploadFile200Response | UploadFile401Response | UploadFileDefaultResponse>>

export type GetInventoryControllerDefinition = Controller<Request<{}, {}, {}, {}>, Response<{}>>

export type PlaceOrderControllerDefinition = Controller<Request<{}, PlaceOrder200Response, PlaceOrderRequestBody, {}>, Response<PlaceOrder200Response>>

export type GetOrderByIdControllerDefinition = Controller<Request<GetOrderByIdPathParams, GetOrderById200Response, {}, {}>, Response<GetOrderById200Response>>

export type DeleteOrderControllerDefinition = Controller<Request<DeleteOrderPathParams, {}, {}, {}>, Response<{}>>

export type CreateUserControllerDefinition = Controller<Request<{}, CreateUserDefaultResponse, CreateUserRequestBody, {}>, Response<CreateUserDefaultResponse>>

export type CreateUsersWithListInputControllerDefinition = Controller<Request<{}, CreateUsersWithListInput200Response, CreateUsersWithListInputRequestBody, {}>, Response<CreateUsersWithListInput200Response>>

export type LoginUserControllerDefinition = Controller<Request<{}, LoginUser200Response, {}, LoginUserQueryParams>, Response<LoginUser200Response>>

export type LogoutUserControllerDefinition = Controller<Request<{}, {}, {}, {}>, Response<{}>>

export type GetUserByNameControllerDefinition = Controller<Request<GetUserByNamePathParams, GetUserByName200Response, {}, {}>, Response<GetUserByName200Response>>

export type UpdateUserControllerDefinition = Controller<Request<UpdateUserPathParams, {}, UpdateUserRequestBody, {}>, Response<{}>>

export type DeleteUserControllerDefinition = Controller<Request<DeleteUserPathParams, {}, {}, {}>, Response<{}>>
