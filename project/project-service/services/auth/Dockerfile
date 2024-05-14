#First Image to compile code to binary code
FROM golang:alpine AS auth-compiler

WORKDIR /app
COPY . .
RUN go mod download
RUN CGO_ENABLED=0 GOOS=linux go build -o /app/micro-auth

#Second to running binary code from first image
FROM alpine:latest
WORKDIR /app
COPY --from=auth-compiler /app/micro-auth /app/micro-auth
EXPOSE 80
ENTRYPOINT ["/app/micro-auth"]