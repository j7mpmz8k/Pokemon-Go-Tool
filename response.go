package main

import (
	"fmt"
	"os"
	"strings"
	"time"
)

type Response struct {
	version string
	headers map[string]any
	code int
	reason string
	body string
}

func makeResponse() Response { //I'm responsible for code, header, body
	res := Response{
		version: "HTTP/1.1",
		headers: make(map[string]any),
	}

	res.headers["Server"] = "PoGo Server"
	res.headers["Date"] = time.Now().UTC().Format("Mon, 02 Jan 2006 15:04:05 GMT")
	res.headers["Connection"] = "close"
	res.headers["Cache-Control"] = "max-age=5"

	return res
}

func (res Response) stringify() string {
	var rawResponse strings.Builder

	fmt.Fprintf(&rawResponse, "%s %d %s\r\n", res.version, res.code, res.reason)
	for key, value := range res.headers {
		fmt.Fprintf(&rawResponse, "%s: %v\r\n", key, value)
	}
	rawResponse.WriteString("\r\n")
	rawResponse.WriteString(res.body)

	return rawResponse.String()
}

func (res *Response) setCode(code int) {
	res.code = code
	res.reason = StatusCodes[code]
	if code >= 400 {
		res.body = fmt.Sprintf("%d %s", res.code, res.reason)
	}
}

func (res *Response) setBody(body string) {
	res.body = body
	res.headers["Content-Length"] = len(body)
}

func (res *Response) loadTemplate(uri string) error{
	template, err := os.ReadFile(uri)
	if err != nil {
		return err
	} else {
		res.setBody(string(template))
		return nil
	}
}
