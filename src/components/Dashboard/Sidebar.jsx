import { Flex, Menu } from 'antd'
import React from 'react'
import '../../App.css'
import CustomItems from '../../router/CustomRouterAntd'
function Sidebar() {
  return (
    <>
    <Flex className='justify-center items-center'>
        <div className=' text'>Wcc</div>
    </Flex>
    <Menu mode="inline" defaultSelectedKeys={['1']} className='menu-bar' items={CustomItems}/>
    </>
  )
}

export default Sidebar