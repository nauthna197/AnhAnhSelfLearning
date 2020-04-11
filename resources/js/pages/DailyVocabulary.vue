<template>
  <div class="daily-vocabulary">
      <div class="header d-flex">
      <h3 class="mr-4">My Vocabulary</h3>
      <button @click="onClickAddButton" class="btn float-right btn-success">
        <i class="fas fa-plus"></i>
        Add word
      </button>
    </div>
    <div class="content mt-5">
      <div class="list-item-wrapper" v-for="(value,key) in listVocaByDay" :key="key">
          <h5 class="title-group-list">{{key}}</h5>
          <ul class="list-group list-group-flush">
            <li class="list-group-item" v-for="voca in value" :key="voca.id">
              <span>{{voca.name}}</span>
            </li>
          </ul>
      </div>
    </div>
      <modal width="800" name=AddWordButton>
          <div slot="body" class="form-add-word">
            <div class="row">
              <div class="form-group col-md-6">
                <label>Word</label>
                <input type="text" v-model="formDataAddWord.name"  class="form-control">
              </div>
              <div class="form-group col-md-6">
                <label for="exampleInputEmail1">Type</label>
                <select class="form-control" v-model="formDataAddWord.type">
                  <option value="">Select type of word</option>
                  <option value="1">Verb</option>
                  <option value="2">Noun</option>
                  <option value="3">Adjective</option>
                </select>
              </div>
            </div>
            <div class="row">
              <div class="form-group col-md">
                <label>Mean</label>
                <input type="text" v-model="formDataAddWord.mean" class="form-control">
              </div>
            </div>
            <div class="row">
              <div class="form-group col-md">
                <label>Synonym
                </label>
                <input type="text" disabled class="form-control">
                <small>This input will be comming soon</small>
              </div>
            </div>
            <div class="row">
              <div class="form-group col-md">
              <label>Description</label>
              <ckeditor  :editor="editor" v-model="formDataAddWord.description" :config="{}"></ckeditor>
              </div>
            </div>
          </div>
      </modal>
  </div>
</template>

<script>
import modal from "../components/Modal";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import rf from '../lib/RequestFactory';

export default {
  components:{
    modal,
  },
  data(){
    return{
      editor: ClassicEditor,
      formDataAddWord:{
        description:"",
        name:"",
        type:"",
        mean:"",
      },
      listVocaByDay:{a:'1',b:'3'},
    };
  },
  methods:{
    onClickAddButton(){
      CommonModal.show('AddWordButton',{
        buttons:[
          {
            label:"Save",
            style:{
              width:"140px",
              background:"rgb(0,112,192)"
            },
            callback:()=>{
              rf.getRequest('VocabularyRequest').create(this.formDataAddWord).then((data)=>{
                this.$toasted.success(data);
              }).catch((error)=>{
                console.log(error);
                this.$toasted.error('Something went wrong!');
              });
              this.resetFormData();
              CommonModal.hide("AddWordButton");
            }
          },
          {
            label: "Cancel",
            style: {
              width: "140px",
              background: "rgb(0, 112, 192)"
            },
            callback: () => {
              this.resetFormData();
              CommonModal.hide("AddWordButton");
            }
          },
        ]
      });
    },
    resetFormData:function(){
      this.formDataAddWord = {
        description:"",
        name:"",
        type:"",
        mean:"",
      };
    }
  },
  mounted(){
    rf.getRequest('VocabularyRequest').getListVoca({}).then((response)=>{
      this.listVocaByDay = response.data;
    }).catch((error)=>{
      console.log(error);
    });
  }
}
</script>

<style lang="scss">

@import "../../sass/_variables.scss";

.daily-vocabulary{
  padding: 10px;
  .list-item-wrapper{
    .title-group-list{
      text-align: center;
    }
    li{
      margin-left: 100px;
      text-transform: capitalize;
      span{
        cursor: pointer;
      }
      &:hover{
        background-color: #e8f9e9;
      }
    }
  }
}
.ck-content { height:200px; }
.content{
  height: 100%;
  overflow: auto;
}


</style>