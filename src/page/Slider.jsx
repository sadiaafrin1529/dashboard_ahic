import { DeleteOutlined, EyeOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button, Card, Modal, Popconfirm, Table } from 'antd';
import React, { useState } from 'react';

import SliderForm from '../components/Form/SliderForm';
import GlobalModal from '../components/Global/GlobalModal/GlobalModal';

import { useDeleteSliderMutation, useGetAllSliderQuery } from '../Redux/Features/Slider/SliderApi';
import { toast } from 'sonner';

export default function Slider() {
  const [modalOpen, setModalOpen] = useState(false);
  const [websiteModalOpen, setWebsiteModalOpen] = useState(false);
  const [selectedWebsite, setSelectedWebsite] = useState(null);
  
  const { isLoading, isError, data, refetch } = useGetAllSliderQuery();
  const [sliderDelete] = useDeleteSliderMutation();

  const handleDelete = async (id) => {
    try {
      const res = await sliderDelete(id); // Ensure correct API response handling
      toast.success(res?.data?.message );
      refetch();
    } catch (error) {
      toast.error('Failed to delete slider'); // Better error feedback
      console.error('Delete Error:', error);
    }
  };

  console.log(data);

  const dataSource = data?.data?.map((item) => ({
    key: item?._id, // Ensuring _id is mapped to key
    title: item?.title,
    description: item?.description,
    image: item?.image,
    website: item?.website,
  })) || [];

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => <img src={image} alt="Slider" style={{ width: 50, height: 50, borderRadius: '8px' }} />,
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
      render: (website) => (
        <Button
          type="text"
          icon={<EyeOutlined />}
          onClick={() => {
            setSelectedWebsite(website);
            setWebsiteModalOpen(true);
          }}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
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
    <div className="">
      <Button
        type="dashed"
        className="flex items-center gap-2 mb-4"
        onClick={() => setModalOpen(true)}
      >
        <PlusCircleOutlined style={{ fontSize: '20px' }} /> Add Slider
      </Button>

      <Table scroll={{ x: 'max-content' }} dataSource={dataSource} columns={columns} bordered loading={isLoading} />

      <GlobalModal
        open={modalOpen}
        setOpen={setModalOpen}
        title="Add Slider"
        data={<SliderForm refetch={refetch} />}
      />

      <Modal
        open={websiteModalOpen}
        onCancel={() => setWebsiteModalOpen(false)}
        footer={null}
        centered
        title={<div className="flex items-center gap-2 text-lg font-semibold">Website Details</div>}
      >
        <div className="p-6">
          <p className="text-xl font-bold mb-2">Name: {selectedWebsite?.name}</p>
          <p className="text-gray-700 mb-4">Description: {selectedWebsite?.desc}</p>
          <div className="flex gap-4">
            {selectedWebsite?.logo && <img src={selectedWebsite.logo} alt="Website Logo" className="w-24 h-24 object-cover rounded-lg shadow-md" />}
            {selectedWebsite?.image && <img src={selectedWebsite.image} alt="Website Image" className="w-24 h-24 object-cover rounded-lg shadow-md" />}
            {selectedWebsite?.icon && <img src={selectedWebsite.icon} alt="Website Icon" className="w-24 h-24 object-cover rounded-lg shadow-md" />}
          </div>
        </div>
      </Modal>
    </div>
  );
}
