<template>
    <transition name="modal" v-if="show">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container" v-bind:style="{ width: width + 'px'}">
                    <div class="modal-header">
                        <h4> {{title}}</h4>
                    </div>

                    <div class="modal-body">
                        <slot name="body">
                            default body
                        </slot>
                    </div>

                    <div class="modal-footer">
                      <div ref="buttons" class="list_button_modal">
                        <div :key="index" v-for="(button,index) in configs.buttons">
                          <button type="button" class="btn btn-modal" v-bind:class="button.class" @click="button.callback">{{ button.label }}</button>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
window.CommonModal = {
  show: function(modalName, configs){
    window.app.$broadcast('showCommonModal', modalName, configs);
  },
  hide: function(modalName){
    window.app.$broadcast('hideCommonModal', modalName);
  }
}
export default {
  props: {
      name: {
        default : 'defaultModal',
        type    : String
      },
      title: {
        default : '',
        type    : String
      },
      width: {
        default : '',
        type    : String
      }
    },
  data(){
    return {
      show:false,
      configs: {
        mask: true,
        buttons: [],
        close: null,
      }
    }
  },
  methods:{
    hideModal(){
      window.app.$broadcast('hideCommonModal', this.name);
    }
  },
  created(){
    this.$on('showCommonModal',(modalName,userConfig)=>{
      if(modalName === this.name){
        this.show = true;
        this.configs = Object.assign(this.configs,userConfig);
      }
    })
    this.$on('hideCommonModal', (modalName) => {
      if (modalName == this.name){
        this.show = false;
      }
    });
  }
};
</script>

<style lang="scss" scoped>

@import "../../sass/_variables.scss";

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.list_button_modal {
  .btn-modal {
    background-color: $green;
    color: $white;
    height: 35px;
    position: relative;
    padding: 0px 20px;
    display: inline-block;
    cursor: pointer;
    font-size: $font-smaller;
    border: 1px solid $green;
    text-align:center;
    text-transform: uppercase;
    font-weight: 600;
    border-radius: 3px;
    margin-right: 10px;
    min-width: 90px;
    font-family: $font-family-roboto;
    &:hover {
      background-color: $color-blue-custom;
      border-color: $color-blue-custom;
    }
  }
  >div:last-child {
    display: inline-block;
    float: none;
    
  }
  >div:first-child {
    display: inline-block;
    float: none;
    
  }
}

.modal-header {
  padding: 16px 16px 16px 45px;
  position: relative;
  border-bottom: none;
  // .icon-close {
  //   position: absolute;
  //   right: 14px;
  //   top: 14px;
  //   font-size: 12px;
  //   font-weight: 600;
  //   color: black;
  //   text-shadow: none;
  //   opacity: 0.35;
  //   cursor: pointer;
  //   &:hover {
  //     opacity: 0.4;
  //   }
  // }
}


</style>
