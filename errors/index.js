const CustomAPIError = require("./customAPIError");
const UnauthenticatedError = require("./unauthenticated");
const BadRequestError = require("./badRequest");
const NotFoundError = require("./notFound");
const ForbiddenError = require("./forbiden")

module.exports = {
	CustomAPIError,
	UnauthenticatedError,
	BadRequestError,
	NotFoundError,
	ForbiddenError
}