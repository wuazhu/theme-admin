import services from '@/services/demo';
import {
  ActionType,
  PageContainer,
  ProDescriptionsItemProps,
  ProTable,
} from '@ant-design/pro-components';
import { Button, message, Modal, Input, Row, Col, Drawer } from 'antd';
import React, { useRef, useState } from 'react';

const { queryPlays } = services.PlayController;
  
const TableList: React.FC<unknown> = () => {
  
  const [user, setUser] = useState({});
  
  const [activePlatform, setActivePlatform] = useState('1');
  const [showMonthData, setShowMonthData] = useState(false);

  const actionRef = useRef<ActionType>();
  const columns: ProDescriptionsItemProps<API.PlaysData>[] = [
    {
      title: '用户id',
      dataIndex: 'talentId',
      valueType: 'text',
      hideInSearch: true,
      width: 60
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
      valueType: 'text',
    },
    {
      title: '日期',
      dataIndex: 'date',
      valueType: 'text',
    },
    {
      title: '本日实际播放次数',
      dataIndex: 'playTimes',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '本日结算播放次数(50%)',
      hideInSearch: true,
      valueType: 'text',
      render: (_, record) => (<>{Math.ceil(record.playTimes/2)}</>)
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      align: 'right',
      render: (_, record) => (
        <>
          <a
            onClick={() => {
              setUser(record)
              setShowMonthData(true)
            }}
          >
            查看本月数据
          </a>
        </>
      ),
    },
  ];
  
  
  return (
    <PageContainer
      header={{
        title: '播放次数',
      }}
    >
      <ProTable<API.UserInfo>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        pagination={{
          pageSize: 20
        }}
        toolbar={{
          menu: {
            type: 'tab',
            activeKey: activePlatform,
            items: [
              {key: '1', label: '抖音'},
              {key: '2', label: '快手'},
            ],
            onChange: (key) => {
              setActivePlatform(key as string);
              actionRef.current.reloadAndRest();
            },
          }
        }}
        request={async (params) => {
          const data = await queryPlays({
            ...params,
            platform: Number(activePlatform),
          });
          console.log('用户信息', params)
          return {
            data: data?.list || [],
            total: data?.total || 0,
            success: data?.code == 0,
          };
        }}
        columns={columns}
      />
      <Drawer visible={showMonthData} width={500} onClose={() => setShowMonthData(false)}></Drawer>

    </PageContainer>
  );
};

export default TableList;
