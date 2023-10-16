import React, { useEffect, useState } from "react"
import { Table, Button, message, Modal } from "antd"
import { useParams } from "react-router-dom"
import { postLiveProduct, getLiveProduct, patchLiveProduct, deleteLiveProduct } from "~/apis/main"
import ProductModal from "./ProductModal"
import ProductSpeech from "./ProductSpeech"
import { format } from "date-fns"
import { TableData, replyTypeMap, eventMap } from "./liveConfig"

interface ProductInfo {
  id: string
  name: string
}

const ParentComponent: React.FC = () => {
  const columns = [
    {
      title: "创建时间",
      dataIndex: "date_created",
      key: "date_created",
      width: 164,
    },
    {
      title: "产品名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "产品话术量",
      key: "config",
      dataIndex: "config",
      width: 120,
      render: (config: Array<string>) => <div>{config.length}</div>,
    },
    {
      title: "状态",
      key: "status",
      width: 120,
      render: (row: any) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <div className={row.status === "on" ? "ai-config-status-on" : "ai-config-status-off"}></div>
          <div>{row.status === "on" ? "启用" : "禁用"}</div>
        </div>
      ),
    },
    {
      title: "操作",
      key: "action",
      width: 220,
      render: (row: any) => (
        <div>
          <a
            onClick={() => {
              handleManageSpeech(row)
            }}
          >
            管理话术
          </a>
          <a
            style={{ marginLeft: "20px" }}
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
      const res = await getLiveProduct({
        "filter[brodcast_assis][_eq]": params.id,
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
      await deleteLiveProduct(rowId, {})
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
        ? patchLiveProduct(initialData.id, { ...formData })
        : postLiveProduct({ ...formData, brodcast_assis: params.id })
      await fetchPromise
      handleEditCancel()
      message.success(`${initialData ? "修改" : "添加"}开场白成功`)
      getListData()
    } catch {
      setEditConfirmLoading(false)
    }
  }

  const [showSpeech, setShowSpeech] = useState(false)
  const [productInfo, setProductInfo] = useState({ id: "", name: "" })

  const handleManageSpeech = (row: any) => {
    setProductInfo(row)
    setShowSpeech(true)
  }

  const handleGoProduct = () => {
    getListData()
    setShowSpeech(false)
  }

  return (
    <div>
      {showSpeech ? (
        <ProductSpeech productInfo={productInfo} handleGoProduct={handleGoProduct}></ProductSpeech>
      ) : (
        <div>
          <div className="tabs-top-desc">
            <span>产品说明：</span>
            <p>详情</p>
          </div>
          <div style={{ marginBottom: "20px" }}>
            <Button type="primary" onClick={handleAddConfig}>
              添加产品
            </Button>
            <Button style={{ marginLeft: "14px" }}>一键导入样例数据</Button>
          </div>
          <Table dataSource={data} columns={columns} />
          <ProductModal
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
      )}
    </div>
  )
}

export default ParentComponent
