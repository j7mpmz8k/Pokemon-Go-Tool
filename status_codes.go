package main

var StatusCodes = map[int]string{
	// 2xx - Success: The request was successful.
	200: "OK",                   // The request succeeded. This is the most common success code.
	201: "Created",              // A new resource was successfully created (typically used with POST requests).
	204: "No Content",           // The request succeeded but there's no content to return (often used with DELETE requests).

	// 3xx - Redirection: The client needs to take additional action.
	301: "Moved Permanently",    // The resource has permanently moved to a new URL.
	302: "Found",                // The resource is temporarily at a different URL.
	304: "Not Modified",         // The resource hasn't changed since the last request (used for caching).

	// 4xx - Client Error: The request was invalid or cannot be fulfilled.
	400: "Bad Request",          // The server couldn't understand the request (malformed syntax, invalid parameters).
	401: "Unauthorized",         // Authentication is required or has failed.
	403: "Forbidden",            // The server understood the request but refuses to authorize it (different from 401—you're authenticated but not allowed).
	404: "Not Found",            // The requested resource doesn't exist on the server.
	405: "Method Not Allowed",   // The HTTP method used is not allowed for this resource.
	409: "Conflict",             // The request conflicts with the current state of the server (e.g., trying to create a resource that already exists).
	422: "Unprocessable Entity", // The request is well-formed but contains semantic errors (often used for validation errors).

	// 5xx - Server Error: The server failed to fulfill a valid request.
	500: "Internal Server Error", // A generic server error occurred. Something went wrong on the server side.
	502: "Bad Gateway",          // The server acting as a gateway received an invalid response from an upstream server.
	503: "Service Unavailable",  // The server is temporarily unavailable (often due to maintenance or overload).
	504: "Gateway Timeout",       // The server acting as a gateway didn't receive a timely response from an upstream server.
}
