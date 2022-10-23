import services from '@/services/demo';
import {
  ActionType,
  FooterToolbar,
  PageContainer,
  ProDescriptions,
  ProDescriptionsItemProps,
  ProTable,
} from '@ant-design/pro-components';
import { Divider, Modal, Tag, message, Col, Row, Input } from 'antd';
import React, { useRef, useState } from 'react';

const {  queryTalentList, updateToTalent, updateToHot } =
  services.UserController;

const TableList: React.FC<unknown> = () => {
  const [showEdit, setShowEdit] = useState<boolean>(false);
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
        1: { text: '抖音', status: 'TT' },
        2: { text: '快手', status: 'KS' },
      },
      render: (_, record) => (
        <Tag color={record.platform == 1 ? 'blue': 'error'}>
          {record.platform == 1?'抖音':'快手'}
        </Tag>
      ),
    },
    {
      title: '口令',
      dataIndex: 'token',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '是否热门用户',
      dataIndex: 'isHot',
      hideInSearch: true,
      hideInForm: true,
      valueEnum: {
        true: {
          text: '是',
          status: 'Success',
        },
        false: {
          text: '否',
          status: 'Error',
        },
      },
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
          <a onClick={() => {
            const a = message.loading('设置中')
            setTopTalent(record)
            setTimeout(() => {
              actionRef.current?.reload()
              a()
            }, 300);
          }}>{record.isHot ? '取消热门': '设置热门'}</a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              setToken(record.token);
              setUser(record);
              setShowEdit(true);
            }}
          >修改口令</a>
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
      setShowEdit(false)
      setUser({})
      setToken('')
    }
    actionRef.current?.reload()
  }
  const changeInput = (e) => {
    setToken(e.target.value)
  }

  const setTopTalent = async (record) => {
    console.log(record);
    const {id, isHot} = record
    const r  = await updateToHot({id, status: Number(isHot)})
    console.log('结果',r);
  }
  
  return (
    <PageContainer
      header={{
        title: '所有达人',
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
          //   新增达人
          // </Button>,
        ]}
        request={async (params) => {
          const data = await queryTalentList({
            ...params,
            // FIXME: remove @ts-ignore
            // @ts-ignore
          });
          console.log('用户信息', data)
          return {
            data: data?.list || [],
            success: data?.code == 0,
          };
        }}
        columns={columns}
        rowSelection={{
          onChange: (_, selectedRows) => setSelectedRows(selectedRows),
        }}
      />
      <Modal
        title="修改口令"
        open={showEdit}
        onOk={setToTalent}
        onCancel={() => {
          setShowEdit(false)
          setToken('')
        }}>
        <Row>
          <Col>请输入口令：</Col>
          <Col><Input value={token} placeholder='输入设置口令' onChange={changeInput}/></Col>
        </Row>
      </Modal>
      
    </PageContainer>
  );
};

export default TableList;
