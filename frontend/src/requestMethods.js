import axios from "axios";

const BASE_URL = "http://localhost:4000/"
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxODA3MzI3YjdjNWY4MzBhYzZlYmJmNiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzNTgwODA4MiwiZXhwIjoxNjM2MDY3MjgyfQ.GxgrVyc4lNR_RU52E3CXSuqpRQNewGgZg_XxMC-pNGw"

export const publicRequest = axios.create({
    baseURL: BASE_URL,
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: {token: `Bearer ${TOKEN}`}
})