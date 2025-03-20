import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Upload } from "antd";
import React from "react";
import { useCreateWebsiteMutation } from "../../Redux/Features/Website/WebsiteApi";
import { toast } from "sonner";

const WebsiteForm = () => {
  const [addNewWebsite,{ isLoading, isError, data}] = useCreateWebsiteMutation()
  // const axiosHook = useAxioshook();

  const onFinish = async (values) => {
    console.log("Form Data Submitted:", values);

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("slug", values.slug);
    formData.append("text", values.text);
    formData.append("desc", values.desc);

    // Handle file uploads
    if (values.logo && values.logo[0]) {
      formData.append("logo", values.logo[0].originFileObj);
    }
    if (values.icon && values.icon[0]) {
      formData.append("icon", values.icon[0].originFileObj);
    }
    if (values.image && values.image[0]) {
      formData.append("image", values.image[0].originFileObj);
    }

    try {
      // const response = await axiosHook.post("/website/create-website", formData);
      const response = await addNewWebsite(formData)
      toast.success(response?.data?.message)
      console.log(response)
    } catch (error) {
      toast.error(response?.data?.message)
      console.log(error)
    }
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please enter a name" }]}>
        <Input placeholder="Enter name" />
      </Form.Item>

      <Form.Item label="Slug" name="slug" rules={[{ required: true, message: "Please enter a slug" }]}>
        <Input placeholder="Enter slug" />
      </Form.Item>

      <Row gutter={16}>
        <Col xs={24} md={8}>
          <Form.Item label="Logo" name="logo" valuePropName="fileList" getValueFromEvent={(e) => e?.fileList}>
            <Upload.Dragger beforeUpload={() => false} maxCount={1}>
              <p className="ant-upload-drag-icon">
                <UploadOutlined />
              </p>
              <p className="ant-upload-text">Drop or click to upload logo</p>
            </Upload.Dragger>
          </Form.Item>
        </Col>

        <Col xs={24} md={8}>
          <Form.Item label="Icon" name="icon" valuePropName="fileList" getValueFromEvent={(e) => e?.fileList}>
            <Upload.Dragger beforeUpload={() => false} maxCount={1}>
              <p className="ant-upload-drag-icon">
                <UploadOutlined />
              </p>
              <p className="ant-upload-text">Drop or click to upload icon</p>
            </Upload.Dragger>
          </Form.Item>
        </Col>

        <Col xs={24} md={8}>
          <Form.Item label="Image" name="image" valuePropName="fileList" getValueFromEvent={(e) => e?.fileList}>
            <Upload.Dragger beforeUpload={() => false} maxCount={1}>
              <p className="ant-upload-drag-icon">
                <UploadOutlined />
              </p>
              <p className="ant-upload-text">Drop or click to upload image</p>
            </Upload.Dragger>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item label="Text" name="text">
        <Input placeholder="Enter text" />
      </Form.Item>

      <Form.Item label="Description" name="desc">
        <Input.TextArea rows={4} placeholder="Enter description" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default WebsiteForm;
