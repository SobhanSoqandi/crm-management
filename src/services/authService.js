import http from "./httpServices";

export function RegisterApi(data) {
    return http.post("/register", data).then((res) => res.data);
}
