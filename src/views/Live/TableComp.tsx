import React from "react"
import { Table, Modal } from "antd"
import { format } from "date-fns"
import { deleteBalckUser } from "~/apis/main"

interface DataItem {
  nickname: string
  date_created: string
}

interface TableProps {
  data: DataItem[]
  onGetListData: () => void
}

const TableComponent: React.FC<TableProps> = ({ data, onGetListData }: TableProps) => {
  const [isdModalVisible, setIsdModalVisible] = React.useState(false)
  const [rowId, setrowId] = React.useState("")

  const handleDelete = () => {
    deleteBalckUser(rowId, {}).then(() => {
      setIsdModalVisible(false)
      onGetListData()
    })
  }

  const handleCancel = () => {
    setIsdModalVisible(false)
  }

  const showModal = (row: any) => {
    setIsdModalVisible(true)
    setrowId(row.id)
  }

  const columns = [
    {
      title: "黑名单用户名",
      dataIndex: "nickname",
      width: 340,
      key: "nickname",
    },
    {
      title: "添加时间",
      dataIndex: "date_created",
      key: "date_created",
      render: (date: string) => format(new Date(date), "yyyy-MM-dd HH:mm:ss"),
    },
    {
      title: "操作",
      key: "action",
      render: (row: any) => (
        <div>
          <a
            style={{ color: "#f5222d" }}
            onClick={() => {
              showModal(row)
            }}
          >
            删除
          </a>
        </div>
      ),
    },
  ]

  return (
    <>
      <Table columns={columns} dataSource={data} />{" "}
      <Modal
        title="确认删除"
        open={isdModalVisible}
        onOk={handleDelete}
        onCancel={handleCancel}
        okText="确定"
        cancelText="取消"
      >
        <p>确定要执行删除操作吗？</p>
      </Modal>
    </>
  )
}

export default TableComponent
