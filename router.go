package main

var routes = map[string]Handler{
	"/": index,
}

func router(req *Request) Response {
	endpoint, found := routes[req.uri]
	if !found {
		res := makeResponse()
		res.SetCode(404) // Route does not exist
		return res
	}

	if req.method != "GET" {
		res := makeResponse()
		res.SetCode(405) // Method Not Allowed
		return res
	}

	return endpoint(req)
}
