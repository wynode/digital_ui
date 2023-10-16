import React, { useEffect, useState } from "react"
import { Table, Button, message, Modal } from "antd"
import { useParams } from "react-router-dom"
import { postLiveProcess, getLiveProcess, patchLiveProcess, deleteLiveProcess } from "~/apis/main"
import OpeningModal from "./OpeningModal"
import AudioPlayer from "./AudioPlayer"
import { format } from "date-fns"
import { NEW_BACK_API_ASSETS } from "~/config"
import { TableData, replyTypeMap, eventMap } from "./liveConfig"

const ParentComponent: React.FC = () => {
  const columns = [
    {
      title: "创建时间",
      dataIndex: "date_created",
      key: "date_created",
      width: 164,
    },
    {
      title: "话术名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "开场白话术",
      dataIndex: "content",
      key: "content",
      width: "30%",
    },
    {
      title: "预览",
      key: "preview",
      width: 100,
      render: (row: any) => <div>{row.audio_file && <AudioPlayer audioSrc={`${row.audio_file}`} />}</div>,
    },
    {
      title: "类型",
      dataIndex: "reply_type_cn",
      width: 100,
      key: "reply_type_cn",
    },
    {
      title: "操作",
      key: "action",
      width: 120,
      render: (row: any) => (
        <div>
          <a
            onClick={() => {
              handleEdit(row)
            }}
          >
            编辑
          </a>
          <a
            style={{ color: "#f5222d", marginLeft: "20px" }}
            onClick={() => {
              handleDelete(row)
            }}
          >
            删除
          </a>
        </div>
      ),
    },
  ]
  const params = useParams()
  const [data, setData] = useState<TableData[]>([])
  const getListData = async () => {
    try {
      const res = await getLiveProcess({
        "filter[brodcast_assis][_eq]": params.id,
        "filter[phase][_eq]": "prologue",
      })
      const { data } = res
      const transformedData = data.map((item: TableData) => ({
        ...item,
        reply_type_cn: replyTypeMap.get(item.reply_type),
        second_type_cn: eventMap.get(item.second_type || ""),
        date_created: format(new Date(item.date_created), "yyyy-MM-dd HH:mm:ss"),
      }))
      setData(transformedData)
    } catch {
      message.error("获取列表失败，请联系管理员")
    }
  }
  useEffect(() => {
    getListData()
  }, [])

  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [editConfirmLoading, setEditConfirmLoading] = useState(false)
  const [deleteConfirmLoading, setDeleteConfirmLoading] = useState(false)

  const [initialData, setInitialData] = useState<TableData | null>(null)
  const [rowId, setrowId] = useState("")

  const handleDelete = (row: any) => {
    setDeleteOpen(true)
    setrowId(row.id)
  }

  const handleDeleteOk = async () => {
    setDeleteConfirmLoading(true)
    try {
      await deleteLiveProcess(rowId, {})
      setDeleteOpen(false)
      getListData()
    } catch {
      message.error("删除操作失败，请联系管理员")
    }
    setDeleteConfirmLoading(false)
  }

  const handleDeleteCancel = () => {
    setDeleteOpen(false)
  }

  const handleAddConfig = () => {
    setInitialData(null)
    setEditOpen(true)
  }

  const handleEdit = (record: any) => {
    setInitialData({ ...record })
    setEditOpen(true)
  }

  const handleEditCancel = () => {
    setEditConfirmLoading(false)
    setEditOpen(false)
  }

  const handleEditOk = async (formData: TableData) => {
    try {
      setEditConfirmLoading(true)
      const fetchPromise = initialData
        ? patchLiveProcess(initialData.id, { audio_file: "", content: "", ...formData })
        : postLiveProcess({ ...formData, brodcast_assis: params.id, phase: "prologue" })
      await fetchPromise
      handleEditCancel()
      message.success(`${initialData ? "修改" : "添加"}开场白成功`)
      getListData()
    } catch {
      setEditConfirmLoading(false)
    }
  }

  return (
    <div>
      <div className="tabs-top-desc">
      </div>
      <div style={{ marginBottom: "20px" }}>
        <Button type="primary" onClick={handleAddConfig}>
          添加开场白
        </Button>
        <Button style={{ marginLeft: "14px" }}>一键导入样例数据</Button>
      </div>
      <Table dataSource={data} columns={columns} />
      <OpeningModal
        open={editOpen}
        initialData={initialData}
        modalLoading={editConfirmLoading}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
      />
      <Modal
        title="确认删除"
        open={deleteOpen}
        confirmLoading={deleteConfirmLoading}
        onOk={handleDeleteOk}
        onCancel={handleDeleteCancel}
        okText="确定"
        cancelText="取消"
      >
        <p>确定要执行删除操作吗？</p>
      </Modal>
    </div>
  )
}

export default ParentComponent
