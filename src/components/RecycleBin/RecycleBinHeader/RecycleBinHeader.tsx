import React from "react";



const RecycleBinHeader = () => {

    return (
        <div style={{ padding: "2% 0", fontSize: "12px", color: "#b3b3b3", display: "flex", flexDirection: "row", alignItems: "center" }}>
        <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1801" height="12">
                <path 
                d="M512 992C246.912 992 32 777.088 32 512 32 246.912 246.912 32 512 32c265.088 0 480 214.912 480 480 0 265.088-214.912 480-480 480zM480 256v352a32 32 0 0 0 64 0V256a32 32 0 0 0-64 0z m-16 528a48 48 0 1 0 96 0 48 48 0 0 0-96 0z" 
                p-id="1802" 
                fill="#b3b3b3" />
            </svg>
            <span style={{marginLeft:"2px"}}>回收站的项目仅为您保存30天，30天后将永久删除</span>
        </div>

    )
}

export default RecycleBinHeader