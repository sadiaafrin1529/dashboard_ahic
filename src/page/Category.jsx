import React, { useState } from 'react';
import GlobalModal from '../components/Global/GlobalModal/GlobalModal';
import CategoryForm from '../components/Form/CategoryForm';
import { Button, Table, Modal, Popconfirm } from 'antd';
import { DeleteOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { useDeleteCategoryMutation, useGetAllCategoryQuery } from '../Redux/Features/Category/CategoryApi';
import { toast } from 'sonner';
import { EyeClosed, EyeIcon } from 'lucide-react';

function Category() {
  const [modalOpen, setModalOpen] = useState(false);
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const { data, isLoading, isError } = useGetAllCategoryQuery();

  const [deletecategory] = useDeleteCategoryMutation();

  const handleDelete = async (id) => {
    try {
      const res = await deletecategory(id);
      toast.success(res?.data?.message);
    } catch (error) {
      toast.error('Failed to delete category');
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong. Please try again later.</p>;

  const dataSources = data?.data.map((item) => ({
    key: item?._id,
    title: item?.title,
    description: item?.description,
    images: item?.image || [],
    service: {
      image: item?.service?.image,
      title: item?.service?.title,
    },
  }));

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => (text.length > 50 ? `${text.slice(0, 50)}...` : text),
    },

    {
      title: "Images",
      dataIndex: "images",
      key: "images",
      render: (images) => (
        <div style={{ display: "flex", gap: "5px" }}>
          {images.map((img, index) => (
            <img key={index} src={img} alt="" style={{ width: "50px" }} />
          ))}
        </div>
      ),
    },
    {
      title: "Service Details",
      key: "serviceDetails",
      render: (_, record) => (
        <Button
          type="primary"
          icon={<EyeIcon/>}
          onClick={() => {
            setSelectedService(record.service);
            setServiceModalOpen(true);
          }}
        >
          View Service
        </Button>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure to delete this Slider?"
          onConfirm={() => handleDelete(record.key)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" danger icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },
  ];

  return (
    <div>
      <Button
        type="dashed"
        className="flex items-center gap-2 mb-4"
        onClick={() => setModalOpen(true)}
      >
        <PlusCircleOutlined style={{ fontSize: '20px' }} /> Add Category
      </Button>

      <GlobalModal open={modalOpen} setOpen={setModalOpen} title="Add Category" data={<CategoryForm />} />

      <Table scroll={{ x: 'max-content' }} dataSource={dataSources} columns={columns} bordered loading={isLoading} />

      <Modal title="Service Details" open={serviceModalOpen} onCancel={() => setServiceModalOpen(false)} footer={null}>
        {selectedService && (
          <div className='flex flex-col justify-center items-center'>
            <p className='text-[18px] py-4'>
              <strong>Title:</strong> {selectedService.title}
            </p>
            <img src={selectedService.image} alt="" style={{ width: '100px' }} />
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Category;