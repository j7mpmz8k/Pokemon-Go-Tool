package main

func index(req *Request) Response {
	res := makeResponse()
	res.loadTemplate("pogo.html")
	return res
}
