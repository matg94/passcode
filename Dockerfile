FROM golang:1.19-alpine AS go-build

WORKDIR /passcode

COPY go.mod .
COPY go.sum .
RUN go mod download

COPY . .

RUN go build -o /passcode-app

FROM node:19.2.0 AS node-build

WORKDIR /passcode
COPY --from=go-build /passcode ./

WORKDIR /passcode/frontend

RUN npm install && npm run build

FROM scratch

COPY --from=go-build \
    /passcode \
    /app

COPY --from=node-build \
    /passcode/frontend/build \
    /app/build/

CMD ["/app/passcode-app"]