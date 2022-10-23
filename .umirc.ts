import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  mfsu: {},
  layout: {
    title: '百变主题',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
      icon: 'home'
    },
    {
      name: 'ECPM',
      path: '/ecpm',
      component: './Ecpm',
      icon: 'DashboardOutlined'
    },
    {
      name: ' 用户',
      path: '/users',
      component: './Users',
      icon: 'UsergroupAddOutlined'
    },
    {
      name: '达人',
      path: '/talent',
      component: './Talent',
      icon: 'SmileOutlined'
    },
    {
      name: '播放量',
      path: '/plays',
      component: './Plays',
      icon: 'PlaySquareOutlined'
    },
    {
      name: '权限演示',
      path: '/access',
      component: './Access',
    },
  ],
  npmClient: 'pnpm',
  proxy: {

    '/api': {
      'target': 'http://localhost:3000',
      'changeOrigin': true,
      // 'pathRewrite': { '^/api' : '' },
    },
  }
});

