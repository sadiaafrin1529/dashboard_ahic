import React, { useState } from 'react'
import GlobalModal from '../components/Global/GlobalModal/GlobalModal'
import ServiceForm from '../components/Form/ServiceForm'
import { Button, Popconfirm, Table } from 'antd'
import { DeleteOutlined, EyeOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { useDeleteserviceMutation, useGetAllServiceQuery } from '../Redux/Features/Service/ServiceApi'
import { toast } from 'sonner'

function Service() {
  const [modalOpen, setModalOpen] = useState(false);
  const [websiteModalOpen, setWebsiteModalOpen] = useState(false);
  const [websiteData, setWebsiteData] = useState(null);
  const { data, isError, isLoading } = useGetAllServiceQuery();
  const [deleteService] = useDeleteserviceMutation()

  const handleDelete = async (id) => {
    try {
      const res = await deleteService(id);
      toast.success(res?.data?.message)
    } catch (error) {

    }
  }

  const datasources = data?.data.map((item) => ({
    key: item?._id,
    image: item?.image,
    title: item?.title,
    website: item?.website
  }));

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title"
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => <img src={image} alt="service" style={{ width: 50, height: 50, borderRadius: '8px' }} />,
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
      render: (website) => (
        <Button className='text-blue-400' type="dashed" icon={<EyeOutlined />} onClick={() => {
          setWebsiteData(website);
          setWebsiteModalOpen(true);
        }}>Website
        </Button>
      )
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Popconfirm
          title="Are you sure to delete this Slider?"
          onConfirm={() => handleDelete(record.key)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="dashed" danger >Delete</Button>
        </Popconfirm>
      ),
    }
    
  ];

  return (
    <div className="">
      <Button
        type="dashed"
        className="flex items-center gap-2 mb-4"
        onClick={() => setModalOpen(true)}
      >
        <PlusCircleOutlined style={{ fontSize: "20px" }} /> Add Service
      </Button>

      <GlobalModal
        open={modalOpen}
        setOpen={setModalOpen}
        title="Add Service"
        data={<ServiceForm />}
      />

      <GlobalModal
        open={websiteModalOpen}
        setOpen={setWebsiteModalOpen}
        title={websiteData?.name || "Website Details"}
        data={
          websiteData ? (
            <div className=" flex flex-col justify-center items-center">
              <div className='grid grid-col-1 md:grid-cols-2 gap-5 '>
                <img
                  src={websiteData.logo}
                  alt={websiteData.name}
                  style={{ width: 50, height: 50 }}
                />
                <img
                  src={websiteData.icon}
                  alt={websiteData.name}
                  style={{ width: 50, height: 50 }}
                />
              </div>
              <p className='font-semibold'>{websiteData.desc}</p>
              <img
                src={websiteData.image}
                alt={websiteData.name}
                style={{ width: 400, height: 250, borderRadius: "8px" }}
              />
            </div>
          ) : null
        }
      />

      <Table
        scroll={{ x: "max-content" }}
        dataSource={datasources}
        columns={columns}
        bordered
        loading={isLoading}
      />
    </div>
  );
}

export default Service;
