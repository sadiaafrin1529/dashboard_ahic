import React from 'react';
import { Form, Input, Upload, Button, Select, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import useAxioshook from '../../hook/AxiosHook/useAxioshook';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useCreateSliderMutation } from '../../Redux/Features/Slider/SliderApi';
import { useGetAllWebsiteQuery } from '../../Redux/Features/Website/WebsiteApi';

const { TextArea } = Input;

const SliderForm = ({refetch}) => {
 

  
  // const { data } = useQuery({
  //   queryKey: ['website'],
  //   queryFn: async () => {
  //     const res = await axiosHook.get("/website");
  //     return res.data;
  //   }
  // });
const {data,isLoading,isError}=useGetAllWebsiteQuery()
  const [addNewSlider]=useCreateSliderMutation()
  const websites = data?.data || [];
  console.log(websites?.map(item => item.name));

  const onFinish = async (values) => {
  
    const formData = new FormData();
    
   const data= {
    website: values.website,
    title:values.title,
    description:values.description
   }
   const result = JSON.stringify(data)
    // formData.append("website", values.website); 
    // formData.append("title", values.title);
    formData.append("data",result);
    
    
    // if (values.file && values.file.fileList?.length > 0) {
    //   formData.append("file", values.file.fileList[0].originFileObj);
    // }
const info = values.file.file
console.log(info.file)
formData.append("file",info)
    try {
      const response = await addNewSlider(formData );
      toast.success(response?.data?.message); // Success toast
      console.log( response);
      refetch( )

    } catch (error) {
      toast.error(response?.data?.message); // Error toast
      console.error("Error:", error);
    }

    console.log("Submitted values:", values);
  };

  return (
    <Form onFinish={onFinish} layout="vertical">
      <Form.Item label="Website" name="website">
        <Select placeholder="Select a website">
          {websites.map(item => (
            <Select.Option key={item._id} value={item._id}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Title" name="title">
        <Input placeholder="Enter title" />
      </Form.Item>

      <Form.Item label="Description" name="description">
        <TextArea rows={4} placeholder="Enter description" />
      </Form.Item>

      <Form.Item label="Image" name="file">
        <Upload.Dragger beforeUpload={() => false}>
          <p className="ant-upload-drag-icon">
            <UploadOutlined />
          </p>
          <p className="ant-upload-text">Drop files here to upload</p>
        </Upload.Dragger>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SliderForm;
