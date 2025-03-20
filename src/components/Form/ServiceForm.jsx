import { UploadOutlined } from '@ant-design/icons'
import { Button, Form, Input, Select, Upload, Spin, Alert } from 'antd'
import React from 'react'
import { useGetAllWebsiteQuery } from '../../Redux/Features/Website/WebsiteApi'
import { useCreateServiceMutation } from '../../Redux/Features/Service/ServiceApi'
import { toast } from 'sonner'

function ServiceForm() {
    const [addService] = useCreateServiceMutation()
    const { data, isLoading, isError } = useGetAllWebsiteQuery()
    const website = data?.data || []

    const onFinish = async (values) => {
        const formData = new FormData()
        const information = {
            website: values.website,
            title: values.title
        }

        formData.append("data", JSON.stringify(information))
        const info = values.file.file
        formData.append("file", info)

        try {
            const res = await addService(formData)
            toast.success(res?.data?.message)
        } catch (error) {
            toast.error('Failed to add service')
        }
    }

    if (isLoading) return <Spin tip="Loading websites..." />
    if (isError) return <Alert message="Failed to fetch websites" type="error" showIcon />

    return (
        <Form
            layout="vertical"
            name="control-hooks"
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
        >
            <Form.Item label="Image" name="file">
                <Upload.Dragger beforeUpload={() => false}>
                    <p className="ant-upload-drag-icon">
                        <UploadOutlined />
                    </p>
                    <p className="ant-upload-text">Drop files here to upload</p>
                </Upload.Dragger>
            </Form.Item>
            <Form.Item
                name="website"
                label="Website"
                rules={[{ required: true }]}
            >
                <Select placeholder="Select a Website" allowClear>
                    {website.map((item) => (
                        <Select.Option key={item?._id} value={item?._id}>
                            {item?.name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default ServiceForm
