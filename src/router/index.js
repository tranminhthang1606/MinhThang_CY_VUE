import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import B1Template from '@/views/Buoi1/Btap1/B1Template.vue'
import B2Template from '@/views/Buoi1/Btap2/B2Template.vue'
import B3Template from '@/views/Buoi1/Btap3/B3Template.vue'
import B4Template from '@/views/Buoi1/Btap4/B4Template.vue'
import B5Template from '@/views/Buoi1/Btap5/B5Template.vue'
import B6Template from '@/views/Buoi1/Btap6/B6Template.vue'
import B7Template from '@/views/Buoi1/Btap7/B7Template.vue'
import B21Temp from '@/views/Buoi2/Bai1/B21Temp.vue'
import B22Temp from '@/views/Buoi2/Bai2/B22Temp.vue'
import B23Temp from '@/views/Buoi2/Bai3/B23Temp.vue'
import B31Comp from '@/views/Buoi3/components/B31Comp.vue'
import B3Temp from '@/views/Buoi3/B3Temp.vue'

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
    },
    {
      path: '/buoi2_1',
      name: 'buoi2_1',
      component: B21Temp
    },
    {
      path: '/buoi2_2',
      name: 'buoi2_2',
      component: B22Temp
    },
    {
      path: '/buoi2_3',
      name: 'buoi2_3',
      component: B23Temp
    },
    {
      path: '/buoi3',
      name: 'buoi3',
      component:B3Temp,
      children: [
        {
          path: 'bai1',
          name: 'buoi3_bai1',
          component: B31Comp
        }
      ]
    }
  ]
})

export default router
