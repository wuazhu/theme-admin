import services from '@/services/demo';
import {
  ActionType,
  PageContainer,
  ProDescriptionsItemProps,
  ProTable,
} from '@ant-design/pro-components';
import { Button, message, Modal, Input, Row, Col, Tag } from 'antd';
import React, { useRef, useState } from 'react';

const { queryUserList, updateToTalent } = services.UserController;
  
const TableList: React.FC<unknown> = () => {
  const [tobeTalent, setTobeTalent] = useState<boolean>(false);
  const [user, setUser] = useState({});
  const [token, setToken] = useState('');

  const actionRef = useRef<ActionType>();
  const columns: ProDescriptionsItemProps<API.UserInfo>[] = [
    {
      title: '用户id',
      dataIndex: 'id',
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
      title: '平台',
      dataIndex: 'platform',
      valueEnum: {
        1: { text: '抖音', status: '1' },
        2: { text: '快手', status: '2' },
      },
      render: (_, record) => (
        <Tag color={record.platform == 1 ? 'blue': 'error'}>
          {record.platform == 1?'抖音':'快手'}
        </Tag>
      ),
    },
    {
      title: '性别',
      dataIndex: 'gender',
      hideInSearch: true,
      hideInForm: true,
      valueEnum: {
        0: { text: '男', status: 'MALE' },
        1: { text: '女', status: 'FEMALE' },
      },
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
              setTobeTalent(true)
              setUser(record)
              console.log(user);
              
            }}
          >
            设为达人
          </a>
          {/* <Divider type="vertical" /> */}
          {/* <a href="">订阅警报</a> */}
        </>
      ),
    },
  ];
  const setToTalent = async () => {
    if (!token) {
      message.error('请输入口令！')
    }
    console.log(token, user);
    const _u = await updateToTalent({
      id: user.id,
      token: token
    })
    if (_u.code == 0) {
      message.success(_u.message)
      setTobeTalent(false)
      setUser({})
      setToken('')
    }
    console.log(_u);
    actionRef.current?.reload()
  }
  const inputToken = (e) => {
    setToken(e.target.value)
  }
  
  return (
    <PageContainer
      header={{
        title: '所有用户',
      }}
    >
      <ProTable<API.UserInfo>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          // <Button
          //   key="1"
          //   type="primary"
          //   onClick={() => handleModalVisible(true)}
          // >
          //   新建
          // </Button>,
        ]}
        request={async (params) => {
          const data = await queryUserList({
            ...params,
            // FIXME: remove @ts-ignore
            // @ts-ignore
          });
          console.log('用户信息', data)
          return {
            data: data?.list || [],
            total: data?.total || 0,
            success: data?.code == 0,
          };
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
      />
      <Modal
        title="确认设置为达人？"
        open={tobeTalent}
        onOk={setToTalent}
        onCancel={() => {
          setTobeTalent(false)
          setToken('')
        }}>
        <Row>
          <Col>请输入口令：</Col>
          <Col><Input value={token} placeholder='输入设置口令' onChange={inputToken}/></Col>
        </Row>
      </Modal>

    </PageContainer>
  );
};

export default TableList;
