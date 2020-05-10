<template>
<div class="page-container">
  <div class="todoList">
    <div class="header">
      <h3>My day</h3>
      {{this.now}}
    </div>
    <div class="todo-container mt-5">
      <div v-for="(todo,index) in lstTodo" :key="index" :class="{'done-task-row' : todo.isDone}" class="row lst-has-todo">
          <div class="col-1">
              <i @click="onDoneTask(index)" :class="todo.isDone ? 'fa-check-circle' : 'fa-circle-notch'" class="fas fa-check-circle text-success"/>
          </div>
          <div class="col">
            <span :class="{'done-task' : todo.isDone}">{{todo.content}}</span>
          </div>
      </div>
      <div @click="onClickAddMethod" class="add-todo-thing row">
        <div class="col-1">
          <i :class="isEdit ? 'fa-circle-notch' : 'fa-plus' " class="fas"></i> 
        </div>
        <div class="col">
          <input placeholder="Add task" @blur="onBlurAddTodo" v-model="inputTodo" ref="inputTodo" v-if="isEdit" class=""/>
          <span v-if="!isEdit">Add task</span>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>

import moment from "moment";

export default {
  data:function(){
    return {
      lstTodo:[],
      inputTodo:"",
      isEdit:false,
      now: moment().format("Do MMM YYYY"),
    };
  },
  methods:{
    onClickAddMethod:function(){
      this.isEdit = true;
      this.$nextTick(() => this.$refs.inputTodo.focus());
    },
    onBlurAddTodo:function(){
      if (this.inputTodo !== ""){
        this.lstTodo.push({content : this.inputTodo,isDone:false});
        this.inputTodo = "";
      }
        this.isEdit = false;
    },
    onDoneTask:function(i){
      if(this.lstTodo[i].isDone!==true){
        this.lstTodo[i].isDone = true;
      }
    },
  }
}
</script>

<style lang="scss" scoped>

@import "../../sass/_variables.scss";


.no-padding{
  padding:0;
}

.todoList{
  .todo-container{
    .row{
      padding :10px;
      font-size: $font-medium;
      color: $color-grey-bold;
      border-bottom: solid 1px $color-grey;
      span{
      }
      input{
        border:0;
        width: 100%;
        outline :0;
        padding-right:20px;
      }
      .done-task{
        text-decoration: line-through;

      }
    }
    .done-task-row{
      background-color: #e8f9e9;
    }
    .lst-has-todo{
      &:hover{
        background-color: #e8f9e9;
      }
      i{
        cursor: pointer;
      }
    }
    .add-todo-thing{
      &:hover{
        cursor: text;
      }
    }
  }
}
</style>>
