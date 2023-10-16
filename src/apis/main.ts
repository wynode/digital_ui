import request from "./request"

const triggerId = "6a2ad524-fd15-4dd9-88aa-3afe0f9a376e"

export function postFile(payload: Object) {
  return request.post("/files", payload)
}

// export function getAvatar(params: Object) {
//   return request.get("/items/avatar", { params: { ...params, sort: "-date_created"} })
// }
// export function getAvatar(params: Object) {
//   return request.get("/items/tpl_background", { params: { ...params, sort: "-date_created"} })
// }
export function getAvatar(params: Object) {
  return request.get("/items/avatar", {
    params: { ...params, "filter[status][_eq]": "published", sort: "-date_created" },
  })
}
export function getDavinci(params: Object) {
  return request.get("/items/davinci", { params: { ...params, sort: "-date_created" } })
}
export function getScenario(params: Object) {
  return request.get("/items/scenario", { params: { ...params, sort: "-date_created" } })
}
export function getScript(params: Object) {
  return request.get("/items/script", { params: { ...params, sort: "-date_created" } })
}
export function getBackground(params: Object) {
  return request.get("/items/tpl_background", { params: { ...params, sort: "-date_created" } })
}
export function getForeground(params: Object) {
  return request.get("/items/tpl_foreground", { params: { ...params, sort: "-date_created" } })
}
export function getVoice(params: Object) {
  return request.get("/items/tpl_voice", { params: { ...params, sort: "-date_created" } })
}
export function getVideos(params: Object) {
  return request.get("/items/videos", { params: { meta: "filter_count", ...params, sort: "-date_created" } })
}
export function postScript(payload: Object) {
  return request.post("/items/script", payload)
}
export function getMaterials(params: Object) {
  return request.get(
    "/items/materials?limit=25&fields[]=is_template&fields[]=name&fields[]=path&fields[]=tag.dicts_id.type&fields[]=tag.dicts_id.title&fields[]=tag.dicts_id.id&fields[]=id&sort[]=-date_created&page=1",
    { params: { ...params } }
  )
}

export function postMaterials(payload: Object) {
  return request.post("/items/materials", payload)
}
export function postVideo(payload: Object) {
  return request.post("/items/videos", payload)
}
export function patchVideo(id: any, payload: Object) {
  return request.patch(`/items/videos/${id}`, payload)
}

export function patchWebcast(id: any, payload: Object) {
  return request.patch(`/items/webcast/${id}`, payload)
}

export function postWebcast(payload: Object) {
  return request.post("/items/webcast", payload)
}

export function getWebcastById(id: any, payload: Object) {
  return request.patch(`/items/webcast/${id}`, payload)
}
export function getVideosById(id: any, payload: Object) {
  return request.patch(`/items/videos/${id}`, payload)
}

export function deleteWebcastById(id: any, payload: Object) {
  return request.delete(`/items/webcast_list/${id}`, payload)
}

export function deleteScriptById(id: any, payload: Object) {
  return request.delete(`/items/script/${id}`, payload)
}

export function deleteMaterialById(id: any, payload: Object) {
  return request.delete(`/items/materials/${id}`, payload)
}

export function deleteVideosById(id: any, payload: Object) {
  return request.delete(`/items/videos/${id}`, payload)
}

export function postVideoTemplate(payload: Object) {
  return request.post(`/flows/trigger/d9277cba-09ae-4e19-8931-e308e9395a83`, payload)
}

export function getVideoPreviewProgress(params: Object) {
  return request.get(`/flows/trigger/6a2ad524-fd15-4dd9-88aa-3afe0f9a376e`, {
    params: { ...params, sort: "-date_created" },
  })
}

export function getVideoProgress(params: Object) {
  return request.get(`/flows/trigger/6a2ad524-fd15-4dd9-88aa-3afe0f9a376e`, {
    params: { ...params, sort: "-date_created" },
  })
}

export function generateLive(payload: Object) {
  return request.post("/flows/trigger/e5194248-15e7-471c-897c-b39a861f9a7c", payload)
}

export function generateLiveNew(payload: Object) {
  return request.post("/items/webcast_list", payload)
}

export function getWebcastList(params: Object) {
  return request.get("/items/webcast_list", {
    params: { meta: "filter_count", fields: "id,*,webcast,webcast.*", ...params, sort: "-date_created" },
  })
}

export function generateVideo(payload: Object) {
  return request.post("/flows/trigger/95cfe30a-a459-4063-8681-26a4ed0e5c77", payload)
}

export function postChatGpt(payload: Object) {
  return request.post("/api/chat_stream", payload, { responseType: "stream" })
}

export function getChatGpt(params: Object) {
  return request.get(`/items/chat_gpt`, {
    params: { ...params, sort: "-date_created" },
  })
}

export function deleteChatGpt(id: any, payload: Object) {
  return request.delete(`/items/chat_gpt/${id}`, payload)
}


export function postLiveProfile(payload: Object) {
  return request.post(`/items/brodcast_assistant`, payload)
}

export function patchLiveProfile(id: any, payload: Object) {
  return request.patch(`/items/brodcast_assistant/${id}`, payload)
}

export function getLiveList(params: Object) {
  return request.get(`/items/brodcast_assistant`, {
    params: { ...params, sort: "-date_created" },
  })
}

export function getLiveProfile(id: any, params: Object) {
  return request.get(`/items/brodcast_assistant/${id}`, {
    params: { ...params },
  })
}

export function deleteLive(id: any, payload: Object) {
  return request.delete(`/items/brodcast_assistant/${id}`, payload)
}

export function patchLiveConfig(id: any, payload: Object) {
  return request.patch(`/items/brodcast_config/${id}`, payload)
}

export function deleteLiveConfig(id: any, payload: Object) {
  return request.delete(`/items/brodcast_config/${id}`, payload)
}

export function deleteBalckUser(id: any, payload: Object) {
  return request.delete(`/items/black_user_list/${id}`, payload)
}

export function postLiveConfig(payload: Object) {
  return request.post(`/items/brodcast_config`, payload)
}

export function getLiveConfig(params: Object) {
  return request.get(`/items/brodcast_config`, {
    params: { ...params, sort: "-date_created" },
  })
}

export function postBlackUser(payload: Object) {
  return request.post(`/items/black_user_list`, payload)
}

export function getBlackUser(params: Object) {
  return request.get(`/items/black_user_list`, {
    params: { ...params, sort: "-date_created" },
  })
}

export function postKeyword(payload: Object) {
  return request.post(`/items/brodcast_keywords`, payload)
}

export function getKeyword(params: Object) {
  return request.get(`/items/brodcast_keywords`, {
    params: { ...params, sort: "-date_created" },
  })
}

export function postStartLive(payload: Object) {
  return request.post(`/live_api/start_live`, payload)
}

export function postStopLive(payload: Object) {
  return request.post(`/live_api/stop_live`, payload)
}

export function postGetLiveStatus(payload: Object) {
  return request.post(`/live_api/get_status`, payload)
}

export function postGetStreamUrl(payload: Object) {
  return request.post(`/live_api/get_stream_url`, payload)
}


export function patchLiveProcess(id: any, payload: Object) {
  return request.patch(`/items/host_config/${id}`, payload)
}

export function deleteLiveProcess(id: any, payload: Object) {
  return request.delete(`/items/host_config/${id}`, payload)
}

export function postLiveProcess(payload: Object) {
  return request.post(`/items/host_config`, payload)
}

export function getLiveProcess(params: Object) {
  return request.get(`/items/host_config`, {
    params: { ...params, sort: "-date_created" },
  })
}

export function patchLiveProduct(id: any, payload: Object) {
  return request.patch(`/items/product_info/${id}`, payload)
}

export function deleteLiveProduct(id: any, payload: Object) {
  return request.delete(`/items/product_info/${id}`, payload)
}

export function postLiveProduct(payload: Object) {
  return request.post(`/items/product_info`, payload)
}

export function getLiveProduct(params: Object) {
  return request.get(`/items/product_info`, {
    params: { ...params, sort: "-date_created" },
  })
}

