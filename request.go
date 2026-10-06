package main

import (
	"path"
	"strings"
)

type Request struct {
	method string
	uri string
	ext string
	version string
	headers map[string]string
	body string
}

func makeRequest(bytes string) {
	req := Request{
		headers: make(map[string]string),
	}

	// Get request line
	requestLine, rest, found := strings.Cut(bytes, "\r\n")
	if !found {
		return
	}

	// Parse method
	method, restOfRequestLine, found := strings.Cut(requestLine, " ")
	if !found {
		return
	}
	req.method = strings.TrimSpace(method)

	// Parse URI and HTTP version
	uri, version, found := strings.Cut(restOfRequestLine, " ")
	if !found {
		return
	}
	req.uri = strings.TrimSpace(uri)

	// Parse file extension
	cleanPath, _, _ := strings.Cut(req.uri, "?")
	req.ext = strings.TrimPrefix(path.Ext(cleanPath), ".")
	req.version = strings.TrimSpace(version)

	// Separate headers and body
	headerString, body, found := strings.Cut(rest, "\r\n\r\n")
	if !found {
		return
	}

	// Parse headers
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
