<template>
<div class="left_menu fixed">

       <img class='logo' src="../../assets/logo.png">
       
        <div class="menu">
            <router-link to="/helloworld">水环境<br/>形式分析</router-link>
            <router-link to="/header"> 重点流域<br />生态补偿</router-link>
            <router-link to="/helloworld">湖泊生态<br />安全评估</router-link>
            <router-link to="/header">河流生态<br />安全评估</router-link>
            <router-link to="/helloworld">水环境<br />承载力</router-link>
        
          
        </div>
    </div>
</template>

<script>
export default{
  components:{
  }}
</script>

<style>
.left_menu {
    background: #2F353F;
    width: 100px;
    left: 0;
    top: 0;
    bottom: 0;
    text-align: center;
    color: #fff;
    font-size: 13px;
}
.fixed {
    position: fixed;
}
.logo {
    width: 80px;
    padding-top: 10px;
}
.left_menu .menu {
    padding-top: 50px;
}
.left_menu .menu a.hover, .left_menu .menu a:hover {
    border-left: 3px solid #0086f5;
    color: #fff;
}
.left_menu .menu a {
    color: #a3a9b8;
    line-height: 2;
    display: block;
    padding-top: 20px;
    padding-bottom: 20px;
    border-left: 3px solid #2F353F;
    list-style: none;
    text-decoration: none;
    cursor: pointer;
}
</style>