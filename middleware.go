package main

import (
	"fmt"
	"os"
)

type Handler func(req *Request) Response

func loggingMiddlware(next Handler) Handler {
	return func(req *Request) Response {
		fmt.Printf("[REQUEST] %s %s", req.method, req.uri)
		res := next(req)
		fmt.Printf("[RESPONSE] %d %s", res.code, res.reason)
		return res
	}
}

func staticMiddleware(next Handler) Handler {
	return func(req *Request) Response {
		if req.ext != "" {
			res := makeResponse()
			filepath := fmt.Sprintf("static%s", req.uri)
			err := res.loadTemplate(filepath)
			if err != nil {
				if os.IsNotExist(err) {
					res.SetCode(404)
				} else {
					res.SetCode(500)
				}
				return res
			}
			res.SetCode(200)
			return res
		}
		return next(req)
	}
}
