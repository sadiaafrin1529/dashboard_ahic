import { UploadOutlined } from '@ant-design/icons'

import { Button, Form, Input, Select, Upload, Spin, Alert } from 'antd'
import { useGetAllServiceQuery } from '../../Redux/Features/Service/ServiceApi'
import { useCreateCategoryMutation } from '../../Redux/Features/Category/CategoryApi'
import { toast } from 'sonner'
function CategoryForm() {
    const { data, isLoading, isError } = useGetAllServiceQuery()
    const [Addcategory] = useCreateCategoryMutation()
    const services = data?.data || []
    const onFinish = async (values) => {
        const formData = new FormData()
        const information = {
            service: values.service,
            description: values.description,
            title: values.title
        }
        formData.append("data", JSON.stringify(information))
        values.file.fileList.forEach((file) => {
            formData.append("files", file.originFileObj)
        })
        try {
            const res = await Addcategory(formData)
            console.log(res)
            toast.success(res?.data?.message)
        } catch (error) {
            toast.error(res?.error?.data?.message)
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
                <Upload.Dragger beforeUpload={() => false} multiple>
                    <p className="ant-upload-drag-icon">
                        <UploadOutlined />
                    </p>
                    <p className="ant-upload-text">Drop files here to upload</p>
                </Upload.Dragger>
            </Form.Item>
            <Form.Item
                name="service"
                label="Service"
                rules={[{ required: true }]}
            >
                <Select placeholder="Select a Service" allowClear>
                    {services.map((item) => (
                        <Select.Option key={item?._id} value={item?._id}>
                            {item?.title}
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
            <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: "Please enter  description" }]}
            >
                <Input.TextArea placeholder="Enter  description" rows={4} />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default CategoryForm
