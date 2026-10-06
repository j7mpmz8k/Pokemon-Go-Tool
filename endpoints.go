package main

func index(req *Request) Response {
	res := makeResponse()
	res.loadFile("templates/pogo.html")
	return res
}
