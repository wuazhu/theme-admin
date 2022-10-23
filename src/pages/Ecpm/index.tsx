import {useEffect,useState} from 'react'
import { ProForm, ProFormDigit, ProFormDatePicker, PageContainer, ProCard, ProFormMoney } from '@ant-design/pro-components';
import { useModel, request} from '@umijs/max';
import styles from './ecpm.less';
import { Col, message, Row, Modal, Divider } from 'antd';
import moment from 'moment';

const HomePage: React.FC = () => {
  const { name } = useModel('global');
  
  const submitCost = (platform, values) => {
    console.log(platform, values);
    return request('/api/play/calculate', {
      method: 'POST',
      data: {
        platform,
        date: platform == 1? values.dyDate : values.ksDate,
        applyPv: platform == 1? values.dyApplyPv : values.ksApplyPv,
        realPv: platform == 1? values.dyRealPv : values.ksRealPv,
        ecpm: platform == 1? values.dyEcpm : values.ksEcpm,
      }
    }).then(res => {
      console.log('请求成功',res);
    }).catch(err => {
      message.error('结算错误')
    })

  }
  
  return (
    <PageContainer ghost
      header={{
        title: '结算ECPM',
      }}>
      <div className={styles.container}>
        <ProCard gutter={20} >
          <h3>抖音平台</h3>
          <ProForm<{
            name: string;
            company?: string;
            useMode?: string;
          }>
            labelCol={{ span: 4 }}
            wrapperCol= {{ span: 14 }}
            onFinish={async (values) => {
              // await waitTime(2000);
              console.log(values, );
              const _yestoday = moment().subtract(1, 'day').format('YYYY-MM-DD')
              if (values.dyDate !== _yestoday) {
                Modal.warning({
                  title: '提示',
                  content: '当前所选日期不是昨日日期，确定提交吗？',
                  cancelText: '取消',
                  closable: true,
                  okText: '确定',
                  onOk: () => {
                    submitCost(1, values)
                  },
                });
              } else {
                submitCost(1, values)
              }
              // message.success('提交成功');
            }}
          >
            <ProFormDatePicker
              width="md"
              name="dyDate"
              label="请选择昨日日期"
              rules={[
                { required: true, message: '请选择昨日日期!' },
              ]}
            />
            <ProFormDigit
              width="md"
              name="dyApplyPv"
              label="广告请求PV"
              rules={[
                { required: true, message: '请输入广告请求PV!' },
              ]}
              placeholder="请输入广告请求PV"
            />
            <ProFormDigit
              width="md"
              name="dyRealPv"
              label="曝光PV"
              rules={[
                { required: true, message: '请输入曝光PV!' },
              ]}
              placeholder="请输入广告曝光PV"
            />
            {/* <ProFormMoney
              label="昨日平台结算金额"
              name="dyMoney"
              initialValue={22.22}
              min={0}
            /> */}
            <ProFormDigit
              width="md"
              name="dyEcpm"
              label="昨日ECPM"
              fieldProps={{ precision: 2 }}
              rules={[
                { required: true, message: '请输入ECPM!' },
              ]}
              tooltip="请输入昨日ECPM"
              placeholder="请输入Ecpm"
            />
          </ProForm>
        </ProCard>
        <Divider />
        <ProCard gutter={20} >
          <h3>快手平台</h3>
          <ProForm<{
            name: string;
            company?: string;
            useMode?: string;
          }>
            labelCol={{ span: 4 }}
            wrapperCol= {{ span: 14 }}
            onFinish={async (values) => {
              // await waitTime(2000);
              console.log(values, );
              const _yestoday = moment().subtract(1, 'day').format('YYYY-MM-DD')
              if (values.ksDate !== _yestoday) {
                Modal.warning({
                  title: '提示',
                  content: '当前所选日期不是昨日日期，确定提交吗？',
                  cancelText: '取消',
                  closable: true,
                  okText: '确定',
                  onOk: () => {
                    submitCost(2, values)
                  },
                });
              } else {
                submitCost(2, values)
              }
              // message.success('提交成功');
            }}
          >
            <ProFormDatePicker
              width="md"
              name="ksDate"
              label="请选择昨日日期"
              rules={[
                { required: true, message: '请选择昨日日期!' },
              ]}
            />
            <ProFormDigit
              width="md"
              name="ksApplyPv"
              label="广告请求PV"
              rules={[
                { required: true, message: '请输入广告请求PV!' },
              ]}
              placeholder="请输入广告请求PV"
            />
            <ProFormDigit
              width="md"
              name="ksRealPv"
              label="曝光PV"
              rules={[
                { required: true, message: '请输入曝光PV!' },
              ]}
              placeholder="请输入广告曝光PV"
            />
            <ProFormDigit
              width="md"
              name="ksEcpm"
              label="昨日ECPM"
              fieldProps={{ precision: 2 }}
              rules={[
                { required: true, message: '请输入ECPM!' },
              ]}
              tooltip="请输入昨日ECPM"
              placeholder="请输入Ecpm"
            />
          </ProForm>
        </ProCard>
      </div>
      
    </PageContainer>
  );
};

export default HomePage;
