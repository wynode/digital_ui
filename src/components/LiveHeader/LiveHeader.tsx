import React from 'react'
const { Search } = Input;
import { Button, Input, Select } from 'antd';
import type { SelectProps } from 'antd';

//搜索框
const onSearch = (value: string) => console.log(value);
//第一个选择器
const handleChange = (value: { value: string; label: React.ReactNode }) => {
    console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
};
//第二个选择器
const options: SelectProps['options'] = [];
const messges:any=["视频","内容"]
for (let i = 0; i < 2; i++) {
    options.push({
        value: i.toString(36) + i,
        label: i.toString(2) + i,
    });
}
const ChangeGroup = (value: string) => {
    console.log(`selected ${value}`);
};
const VideoHeader: React.FC = () => {
    return (
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px", flexDirection: "row",width:"100%" }}>
            <div style={{ display: "flex" }}>
                <Search placeholder="请输入内容" onSearch={onSearch} style={{ width: 130,}} />
            </div>
            <div style={{ display: "flex"}}>
                <Select
                    labelInValue
                    defaultValue={{ value: 'lucy', label: '标题' }}
                    style={{ width: 120,marginRight:"10px" }}
                    onChange={handleChange}
                    options={[
                        {
                            value: '标题',
                            label: '标题',
                        },
                        {
                            value: '已创建',
                            label: '已创建',
                        },
                        {
                            value: '更新时间',
                            label: '更新时间',
                        },
                    ]}
                />
                <Button style={{marginRight:"10px"}}>视频长度</Button>
                <Select
                    mode="tags"
                    style={{ width: 130 }}
                    onChange={ChangeGroup}
                    tokenSeparators={[',']}
                    options={options}
                />
            </div>
        </div>
    )

}
export default VideoHeader