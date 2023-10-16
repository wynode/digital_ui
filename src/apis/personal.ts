import request from "./request";

export function getVideos(){
    return request.get("/items/videos")
}