import { PlusCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Table, Popconfirm, message } from 'antd';
import { useState } from 'react';
import WebsiteForm from '../components/Form/WebsiteForm';
import GlobalModal from '../components/Global/GlobalModal/GlobalModal';
import { useDeleteWebsiteMutation, useGetAllWebsiteQuery } from '../Redux/Features/Website/WebsiteApi';
import { toast } from 'sonner';

export default function WebSite() {
  const { isLoading, isError, data, refetch } = useGetAllWebsiteQuery();
  const [websitedelete] = useDeleteWebsiteMutation();
  const [modalOpen, setModalOpen] = useState(false);

  const handleDelete = async (id) => {
    try {
     const res= await websitedelete(id);
      toast.success(res?.data?.message);
      refetch(); // Refresh table after deletion
    } catch (error) {
      message.error('Failed to delete website!');
    }
  };

  const dataSource = data?.data?.map((item) => ({
    key: item?._id,
    name: item?.name,
    desc: item?.desc,
    image: item?.image,
    logo: item?.logo,
    icon: item?.icon,
    text: item?.text,
    slug: item?.slug,
    id: item?._id,
  }));

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
    },
    {
      title: "Logo",
      dataIndex: "logo",
      key: "logo",
      render: (logo) => <img src={logo} alt="logo" style={{ width: 50, height: 50 }} />,
    },
    {
      title: "Icon",
      dataIndex: "icon",
      key: "icon",
      render: (icon) => <img src={icon} alt="icon" style={{ width: 50, height: 50 }} />,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => <img src={image} alt="image" style={{ width: 50, height: 50 }} />,
    },
    {
      title: "Text",
      dataIndex: "text",
      key: "text",
    },
    {
      title: "Slug",
      dataIndex: "slug",
      key: "slug",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure to delete this website?"
          onConfirm={() => handleDelete(record.id)}
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
        className="flex items-center gap-1"
        onClick={() => setModalOpen(true)}
      >
        <PlusCircleOutlined style={{ fontSize: '20px' }} /> Add Website
      </Button>

      <GlobalModal
        open={modalOpen}
        setOpen={setModalOpen}
        title="Add website"
        data={<WebsiteForm />}
      />

      <Table
      scroll={{ x: 'max-content' }} 
        dataSource={dataSource}
        columns={columns}
        loading={isLoading}
        // rowKey="key"
        bordered
        className="mt-4"
      />
    </div>
  );
}
