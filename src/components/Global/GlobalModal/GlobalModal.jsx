import React from 'react'
import { Button, Modal } from 'antd';

function GlobalModal({ open, setOpen, data, title, width }) {
  return (
    <>
      <Modal 
        title={title}
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={width || undefined}
      >
        {data}
      </Modal>
    </>
  )
}

export default GlobalModal
