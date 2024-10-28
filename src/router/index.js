import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import B1Template from '@/views/Btap1/B1Template.vue'
import B2Template from '@/views/Btap2/B2Template.vue'
import B3Template from '@/views/Btap3/B3Template.vue'
import B4Template from '@/views/Btap4/B4Template.vue'
import B5Template from '@/views/Btap5/B5Template.vue'
import B6Template from '@/views/Btap6/B6Template.vue'
import B7Template from '@/views/Btap7/B7Template.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/bai1',
      name: 'bai1',
      component: B1Template
    },
    {
      path: '/bai2',
      name: 'bai2',
      component: B2Template
    },
    {
      path: '/bai3',
      name: 'bai3',
      component: B3Template
    },
    {
      path: '/bai4',
      name: 'bai4',
      component: B4Template
    },
    {
      path: '/bai5',
      name: 'bai5',
      component: B5Template
    },
    {
      path: '/bai6',
      name: 'bai6',
      component: B6Template
    },
    {
      path: '/bai7',
      name: 'bai7',
      component: B7Template
    }
  ]
})

export default router
