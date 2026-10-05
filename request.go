package main

import (
	// "fmt"
	"strings"
)

type request struct {
	method string
	uri string
	ext string
	version string
	headers map[string]string
	body string
}

func makeRequest(bytes string) {
	req := request{
		headers: make(map[string]string),
	}
	requestLine, rest, found := strings.Cut(bytes, "\r\n")
	if !found {
		return
	}

	method, restOfRequestLine, found := strings.Cut(requestLine, " ")
	if !found {
		return
	}
	req.method = strings.TrimSpace(method)
	uri, version, found := strings.Cut(restOfRequestLine, " ")
	if !found {
		return
	}
	req.uri = strings.TrimSpace(uri)
	parsedUri := strings.Split(req.uri, ".")
	if len(parsedUri) > 0 {
		req.ext = parsedUri[len(parsedUri) - 1]
	} else {
		req.ext = ""
	}
	req.version = strings.TrimSpace(version)

	headerString, body, found := strings.Cut(rest, "\r\n\r\n")
	if !found {
		return
	}
	for _, line := range strings.Split(headerString, "\r\n") {
		if line == "" {
			continue
		}
		key, value, found := strings.Cut(line, ":")
		if !found {
			continue
		}
		req.headers[strings.TrimSpace(key)] = strings.TrimSpace(value)
	}
	req.body = body
	
}
