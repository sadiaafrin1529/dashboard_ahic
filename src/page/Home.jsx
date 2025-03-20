import React, { useState } from 'react'
import GlobalModal from '../components/Global/GlobalModal/GlobalModal'
import { PlusCircleOutlined } from '@ant-design/icons'
import { Button } from 'antd';
import HomeForm from '../components/Form/HomeForm';
import { useGetAllHomeQuery } from '../Redux/Features/Home/HomeApi';

function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const { isLoading, isError, data, refetch }=useGetAllHomeQuery();
  // console.log(data)
  return (
    <div className="p-4">
    <Button
      type="dashed"
      className="flex items-center gap-2 mb-4"
      onClick={() => setModalOpen(true)}
    >
      <PlusCircleOutlined style={{ fontSize: '20px' }} /> Add Home
    </Button>

   

    <GlobalModal
      open={modalOpen}
      setOpen={setModalOpen}
      title="Add Home"
      data={<HomeForm  />}
      width={1000}
    />

    
  </div>
  )
}

export default Home