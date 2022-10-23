import {useEffect,useState} from 'react'
import { trim } from '@/utils/format';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { useModel, request} from '@umijs/max';
import {Statistic} from 'antd'
import {Column, Bar} from '@ant-design/charts'
import styles from './index.less';
import mockData from './data'

const HomePage: React.FC = () => {
  const { name } = useModel('global');
  const [data, setData] = useState([]);
  const [tab, setTab] = useState('1');
  const [concept, setConcept] = useState({
    ttUser: 0, ksUser: 0, ttTalent: 0, ksTalent: 0
  });

  
  const config = {
    data: mockData,
    xField: 'date',
    yField: 'value',
    seriesField: 'type',
    isGroup: true,
    padding: [30, 20, 10, 20],
    appendPadding: [30, 0, 60, 0],
    columnStyle: {
      radius: [20, 20, 0, 0],
    },
  };

  const phb = [
    {
      nickName: '吴阿铸',
      value: 38,
    },
    {
      nickName: 'wuazhu',
      value: 152,
    },
    {
      nickName: 'wuazhu2',
      value: 11,
    },
  ];
  const phbConfig = {
    data: phb.sort((a,b) => {return b-a}).map(i=>i),
    xField: 'value',
    yField: 'nickName',
    padding: [30, 20, 40, 0],
    appendPadding: [30, 0, 30, 70],

    seriesField: 'nickName',
    legend: {
      position: 'top-left',
    },
  };
  async function getHome() {
    const _concept = await request('/api/user/home')
    console.log(_concept);
    if (_concept.code == 0) {
      setConcept({
        ttUser: _concept.data.ttUser,
        ttTalent: _concept.data.ttTalent,
        ksUser: _concept.data.ksUser,
        ksTalent: _concept.data.ksTalent
      })
    }
    
  }
  useEffect(() => {
    getHome()
  }, [])
  
  return (
    <PageContainer ghost
      header={{
        title: '数据总览',
      }}>
      <div className={styles.container}>
        {/* <Guide name={trim(name)} /> */}
        <ProCard gutter={20} >
          <ProCard colSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }} bordered >
            <h1>抖音用户总数</h1>
            <Statistic value={concept.ttUser}/>
          </ProCard>
          <ProCard colSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }} bordered>
            <h1>抖音达人总数</h1>
            <Statistic value={concept.ttTalent}/>
          </ProCard>
          <ProCard colSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }} bordered>
            <h1>快手用户总数</h1>
            <Statistic value={concept.ksUser}/>
          </ProCard>
          <ProCard colSpan={{ xs: 6, sm: 6, md: 6, lg: 6, xl: 6 }} bordered>
            <h1>快手达人总数</h1>
            <Statistic value={concept.ksTalent}/>
          </ProCard>
        </ProCard>
      </div>
      <ProCard
        gutter={20} style={{marginTop: 30}}
        tabs={{
          activeKey: tab,
          onChange: (key) => {
            setTab(key);
          },
        }}
        >
        <ProCard.TabPane key="1" tab="抖音">
          <ProCard title="用户、达人本月数据" colSpan={12} bodyStyle={{height: 450}}>
            <Column {...config} />
          </ProCard>
          <ProCard title="播放量排行（前10）" colSpan={12} bodyStyle={{height: 450}}>
            <Bar {...phbConfig} />
          </ProCard>
        </ProCard.TabPane>
        <ProCard.TabPane key="2" tab="快手">
          <ProCard title="用户、达人本月数据" colSpan={12} bodyStyle={{height: 450}}>
            <Column {...config} />
          </ProCard>
          <ProCard title="播放量排行（前10）" colSpan={12} bodyStyle={{height: 450}}>
            <Bar {...phbConfig} />
          </ProCard>
        </ProCard.TabPane>
        
      </ProCard>

    </PageContainer>
  );
};

export default HomePage;
