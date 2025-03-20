import React from "react";
import { Form, Input, Select, Upload, Button, Row, Col } from "antd";
import { UploadOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useGetAllWebsiteQuery } from "../../Redux/Features/Website/WebsiteApi";
import { useCreateHomeMutation } from "../../Redux/Features/Home/HomeApi";
import { toast } from "sonner";

const { Option } = Select;

const HomeForm = () => {
  const { data, isLoading, isError } = useGetAllWebsiteQuery();
  const [AddHome] = useCreateHomeMutation();
  const websites = data?.data || [];

  const onFinish = async (values) => {
    console.log(values)
    const formData = new FormData();
    
    // Append basic fields
    formData.append("serviceDescription", values.serviceDescription);
    formData.append("website", values.website);
    formData.append("serviceTitle", values.serviceTitle);

  
    const info = values.image.file
// console.log(info.file)
formData.append("image",info)
    const iconinfo = values.icon.file
// console.log(info.file)
formData.append("icone",iconinfo)

    // Handle highlights
    if (values.highlights) {
      values.highlights.forEach((highlight, index) => {
        formData.append(`highlights[${index}][title]`, highlight.title);
        formData.append(`highlights[${index}][description]`, highlight.description || "");
        // Handle highlight icon
      if (highlight.icon?.[0]?.originFileObj) {
        formData.append(
          `highlightIcons[${index}]`, 
          highlight.icon[0].originFileObj,
          `highlight_${index}_icon`
        );
      }
       



      
        if (highlight.image?.[0]) {
          formData.append(`highlights[${index}][image]`, highlight.image[0].originFileObj);
        }
      });
    }

    // Handle sections
    if (values.sections) {
      values.sections.forEach((section, index) => {
        formData.append(`sections[${index}][title]`, section.title);
        formData.append(`sections[${index}][description]`, section.description || "");
        if (section.image?.[0]) {
          formData.append(`sections[${index}][image]`, section.image[0].originFileObj);
        }
      });
    }

    // Handle clients
    // if (values.clients) {
    //   values.clients.forEach((client, index) => {
    //     formData.append(`clients[${index}][name]`, client.name);
    //     if (client.logo?.[0]) {
    //       formData.append(`clients[${index}][logo]`, client.logo[0].originFileObj);
    //     }
    //   });
    // }

    // Handle footer info
    if (values.footerInfo) {
      formData.append("footerInfo[companyName]", values.footerInfo.companyName);
      formData.append("footerInfo[address]", values.footerInfo.address);
      formData.append("footerInfo[email]", values.footerInfo.email);
      formData.append("footerInfo[phone]", values.footerInfo.phone);
      
      if (values.footerInfo.socialLinks) {
        const socials = values.footerInfo.socialLinks;
        formData.append("footerInfo[socialLinks][facebook]", socials.facebook || "");
        formData.append("footerInfo[socialLinks][twitter]", socials.twitter || "");
        formData.append("footerInfo[socialLinks][linkedin]", socials.linkedin || "");
        formData.append("footerInfo[socialLinks][instagram]", socials.instagram || "");
      }
    }

    // Handle PDF file
    if (values.pdfFile?.[0]) {
      formData.append("pdfFile", values.pdfFile[0].originFileObj);
    }

    try {
      const res = await AddHome(formData);
      if (res.data?.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.error?.data?.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("An error occurred while submitting the form");
    }
  };

  return (
    <Form layout="vertical" onFinish={onFinish}>
      <Row gutter={24}>
        <Col xs={24} md={12}>
          <Form.Item label="Icon" name="icon">
            <Upload.Dragger beforeUpload={() => false} maxCount={1}>
              <p className="ant-upload-drag-icon">
                <UploadOutlined />
              </p>
              <p className="ant-upload-text">Click or drag icon to upload</p>
            </Upload.Dragger>
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item label="Main Image" name="image">
            <Upload.Dragger beforeUpload={() => false} maxCount={1}>
              <p className="ant-upload-drag-icon">
                <UploadOutlined />
              </p>
              <p className="ant-upload-text">Click or drag image to upload</p>
            </Upload.Dragger>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col xs={24} md={12}>
          <Form.Item 
            label="Website" 
            name="website" 
            rules={[{ required: true, message: "Please select a website" }]}
          >
            <Select placeholder="Select website">
              {websites.map((website) => (
                <Option key={website._id} value={website._id}>
                  {website.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            label="Service Title"
            name="serviceTitle"
            rules={[{ required: true, message: "Please enter service title" }]}
          >
            <Input placeholder="Enter service title" />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label="Service Description"
        name="serviceDescription"
        rules={[{ required: true, message: "Please enter service description" }]}
      >
        <Input.TextArea rows={4} placeholder="Enter service description" />
      </Form.Item>

      {/* Highlights Section */}
      <Form.List name="highlights">
        {(fields, { add, remove }) => (
          <div className="mb-6">
            <div className="mb-4">
              <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                Add Highlight
              </Button>
            </div>

            {fields.map(({ key, name, ...restField }) => (
              <div key={key} className="border p-4 mb-4 rounded-lg">
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      {...restField}
                      label="Title"
                      name={[name, "title"]}
                      rules={[{ required: true, message: "Title is required" }]}
                    >
                      <Input placeholder="Highlight title" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      {...restField}
                      label="Description"
                      name={[name, "description"]}
                    >
                      <Input.TextArea placeholder="Highlight description" rows={2} />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Icon"
                      name={[name, "icon"]}
                    >
                      <Upload.Dragger beforeUpload={() => false} maxCount={1}>
                        <UploadOutlined />
                        <p>Upload icon</p>
                      </Upload.Dragger>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Image"
                      name={[name, "image"]}
                    >
                      <Upload.Dragger beforeUpload={() => false} maxCount={1}>
                        <UploadOutlined />
                        <p>Upload image</p>
                      </Upload.Dragger>
                    </Form.Item>
                  </Col>
                </Row>

                <Button
                  type="text"
                  danger
                  onClick={() => remove(name)}
                  icon={<DeleteOutlined />}
                >
                  Remove Highlight
                </Button>
              </div>
            ))}
          </div>
        )}
      </Form.List>

      {/* Sections Section */}
      <Form.List name="sections">
        {(fields, { add, remove }) => (
          <div className="mb-6">
            <div className="mb-4">
              <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                Add Section
              </Button>
            </div>

            {fields.map(({ key, name, ...restField }) => (
              <div key={key} className="border p-4 mb-4 rounded-lg">
                <Form.Item
                  {...restField}
                  label="Title"
                  name={[name, "title"]}
                  rules={[{ required: true, message: "Section title is required" }]}
                >
                  <Input placeholder="Section title" />
                </Form.Item>

                <Form.Item
                  {...restField}
                  label="Description"
                  name={[name, "description"]}
                >
                  <Input.TextArea rows={3} placeholder="Section description" />
                </Form.Item>

                <Form.Item
                  {...restField}
                  label="Image"
                  name={[name, "image"]}
                >
                  <Upload.Dragger beforeUpload={() => false} maxCount={1}>
                    <UploadOutlined />
                    <p>Upload section image</p>
                  </Upload.Dragger>
                </Form.Item>

                <Button
                  type="text"
                  danger
                  onClick={() => remove(name)}
                  icon={<DeleteOutlined />}
                >
                  Remove Section
                </Button>
              </div>
            ))}
          </div>
        )}
      </Form.List>

      {/* Clients Section */}
     <Form.List name="clients">
  {(fields, { add, remove }) => (
    <div className="mb-6">
      <div className="mb-4">
        <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
          Add Client
        </Button>
      </div>

      {fields.map(({ key, name, ...restField }) => (
        <div key={key} className="border p-4 mb-4 rounded-lg">
          <Form.Item
            {...restField}
            label="Client Name"
            name={[name, "name"]}
            rules={[{ required: true, message: "Client name is required" }]}
          >
            <Input placeholder="Client name" />
          </Form.Item>

          {/* Fixed logo field */}
          <Form.Item
            {...restField}
            label="Logo"
            name={[name, "logo"]}
            rules={[{ required: true, message: "Client logo is required" }]}
            valuePropName="fileList"
            getValueFromEvent={(e) => e.fileList}
          >
            <Upload.Dragger 
              beforeUpload={() => false} 
              maxCount={1}
              listType="picture"
            >
              <p className="ant-upload-drag-icon">
                <UploadOutlined />
              </p>
              <p className="ant-upload-text">Click or drag logo to upload</p>
            </Upload.Dragger>
          </Form.Item>

          <Button
            type="text"
            danger
            onClick={() => remove(name)}
            icon={<DeleteOutlined />}
          >
            Remove Client
          </Button>
        </div>
      ))}
    </div>
  )}
</Form.List>

      {/* Footer Info Section */}
      <div className="border p-4 mb-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Footer Information</h3>
        
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Company Name"
              name={["footerInfo", "companyName"]}
              rules={[{ required: true, message: "Company name is required" }]}
            >
              <Input placeholder="Company name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Address"
              name={["footerInfo", "address"]}
              rules={[{ required: true, message: "Address is required" }]}
            >
              <Input placeholder="Company address" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Email"
              name={["footerInfo", "email"]}
              rules={[{ required: true, type: "email", message: "Valid email is required" }]}
            >
              <Input placeholder="contact@company.com" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Phone"
              name={["footerInfo", "phone"]}
              rules={[{ required: true, message: "Phone number is required" }]}
            >
              <Input placeholder="+1 234 567 890" />
            </Form.Item>
          </Col>
        </Row>

        <h4 className="mt-4 mb-2">Social Links</h4>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Facebook"
              name={["footerInfo", "socialLinks", "facebook"]}
            >
              <Input placeholder="Facebook URL" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Twitter"
              name={["footerInfo", "socialLinks", "twitter"]}
            >
              <Input placeholder="Twitter URL" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="LinkedIn"
              name={["footerInfo", "socialLinks", "linkedin"]}
            >
              <Input placeholder="LinkedIn URL" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Instagram"
              name={["footerInfo", "socialLinks", "instagram"]}
            >
              <Input placeholder="Instagram URL" />
            </Form.Item>
          </Col>
        </Row>
      </div>

      {/* PDF Upload Section */}
      <Form.Item
        label="PDF Document"
        name="pdfFile"
        className="mb-6"
      >
        <Upload.Dragger beforeUpload={() => false} maxCount={1}>
          <p className="ant-upload-drag-icon">
            <UploadOutlined />
          </p>
          <p className="ant-upload-text">Click or drag PDF to upload</p>
        </Upload.Dragger>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" size="large">
          Submit Form
        </Button>
      </Form.Item>
    </Form>
  );
};

export default HomeForm;