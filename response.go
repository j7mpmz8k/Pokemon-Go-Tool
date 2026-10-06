package main

import (
	"fmt"
	"os"
	"path"
	"strings"
	"time"
)

type Response struct {
	version string
	Headers map[string]any
	code int
	reason string
	body string
	ext string
}

func makeResponse() Response {
	return Response{
		version: "HTTP/1.1",
		code:    200,
		reason:  "OK",
		body:    "",
		Headers: map[string]any{
			"Server":                 "PoGo Server",
			"Date":                   time.Now().UTC().Format("Mon, 02 Jan 2006 15:04:05 GMT"),
			"Connection":             "close",
			"Cache-Control":          "max-age=5",
			"X-Content-Type-Options": "nosniff",                         // Prevents browser MIME-sniffing
			"X-Frame-Options":        "DENY",                            // Clickjacking protection
			"Referrer-Policy":        "strict-origin-when-cross-origin", // Limits URL leakage
		},
	}
}

func (res Response) stringify() string {
	var rawResponse strings.Builder

	// Format status line
	fmt.Fprintf(&rawResponse, "%s %d %s\r\n", res.version, res.code, res.reason)

	// Format headers
	for key, value := range res.Headers {
		fmt.Fprintf(&rawResponse, "%s: %v\r\n", key, value)
	}

	// Append blank line and body
	rawResponse.WriteString("\r\n")
	rawResponse.WriteString(res.body)

	return rawResponse.String()
}

func (res *Response) SetCode(code int) {
	res.code = code
	// Look up status text (e.g. 200 -> "OK")
	res.reason = StatusCodes[code]
	// Default body for errors
	if code >= 400 {
		res.body = fmt.Sprintf("%d %s", res.code, res.reason)
	}
}

func (res *Response) SetBody(body string) {
	res.body = body
	// Auto-set Content-Length based on body byte size
	res.Headers["Content-Length"] = len(body)
}

func (res *Response) loadFile(filepath string) error {
	// Read file from disk
	template, err := os.ReadFile(filepath)
	if err != nil {
		return err
	} else {
		// Set body and Content-Type from file extension
		res.SetBody(string(template))
		ext := strings.TrimPrefix(path.Ext(filepath), ".")
		res.Headers["Content-Type"] = ContentTypes[ext]
		return nil
	}
}
