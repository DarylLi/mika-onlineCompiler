export const templates : any = [{filename:'src',
value:'',
path:'src',kind:'directory',children:[
  {
    filename:'app.vue',
    value:`<script setup>
    import { ref } from 'vue';
    import ChildComp from './childComp.vue';

    const greeting = ref('Hello World!')
    </script>
    
    <template>
      <p class="greeting">{{ greeting }}</p>
      <ChildComp />
    </template>
    
    <style>
    .greeting {
      color: maron;
      font-weight: bold;
    }
    </style>`,
    path:'src/app.vue'
  },{
    filename:'childComp.vue',
    value:`<script setup>
    import { ref } from 'vue';
    const greeting = ref('This is my child!')
    </script>
    
    <template>
      <p class="greeting">{{ greeting }}</p>
    </template>
    
    <style>
    .greeting {
      color: red;
      font-weight: bold;
    }
    </style>`,
    path:'src/extraA.jsx'
  },{
    filename:'component.css',
    value:`.App-inner{background:#fbe2f0;font-size:12px}`,
    path:'component.css'
  }
]}]
  