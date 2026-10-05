package main

import (
	"fmt"
	"log"
	"net"
)

const (
	HOST = "127.0.0.1"
	PORT = "8080"
)

func main() {
	address := net.JoinHostPort(HOST, PORT)
	listener, err := net.Listen("tcp", address)
	if err != nil {
		log.Fatalf("Failed to bind to %s: %v", address, err)
	}
	defer listener.Close()

	fmt.Println("Listening on", listener.Addr().String())

	for {
		conn, err := listener.Accept()
		if err != nil {
			log.Printf("Accept error: %v", err)
			continue
		}

		go handleConnection(conn)
	}
}

func handleConnection(conn net.Conn) {
	defer conn.Close()
	conn.Write([]byte("Hello from server!\n"))
}
