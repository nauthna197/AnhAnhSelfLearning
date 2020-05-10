<template>
<div class="container-wrapper row">
  <div class="daily-vocabulary col">
      <div class="header d-flex">
      <h3 class="mr-4 title">My Vocabulary</h3>
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
              <span @click="onSelectWord(voca)">{{voca.name}}</span>
            </li>
          </ul>
      </div>
    </div>
      <modal width="800" name=AddWordButton>
          <div slot="body" class="form-add-word">
            <div class="row">
              <div class="form-group col-md-6">
                <label>Word<span class="text-danger">*</span></label>
                <input type="text" v-model="formDataAddWord.name"  class="form-control">
              </div>
              <div class="form-group col-md-6">
                <label for="exampleInputEmail1">Type<span class="text-danger">*</span></label>
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
                <label>Mean<span class="text-danger">*</span></label>
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
  <div v-if="selectedWord" class="desciption-vocabulary col-5">
    <div class="d-flex">
      <h3 class="title">Description</h3>
      <i class="fas fa-window-close ml-auto text-danger"></i>
    </div>
    <div class="line mt-5"></div>
    <div class="content-description">
      <div class="description-word mt-3">
        {{selectedWord.name}}
      </div>
      <div class="pronunciation-word">
        a-b-c-d-e
      </div>
      <div class="mean-word">
        {{selectedWord.mean}}
      </div>
    </div>
  </div>
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
      listVocaByDay:{},
      selectedWord:"",
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
              const {name,type,mean} = this.formDataAddWord;

              if(name==='' || type==='' || mean===''){
                this.$toasted.error('Important field is required!');
                return;
              }
              rf.getRequest('VocabularyRequest').create(this.formDataAddWord).then((data)=>{
                this.$toasted.success(data);
                this.fetchData();
                this.resetFormData();
                CommonModal.hide("AddWordButton");
              }).catch((error)=>{
                console.log(error);
                this.$toasted.error('Something went wrong!');
              });
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
    },
    fetchData:function(){
      rf.getRequest('VocabularyRequest').getListVoca({}).then((response)=>{
        this.listVocaByDay = response.data;
      }).catch((error)=>{
        console.log(error);
      });
    },
    onSelectWord:function(word){
      this.selectedWord = word;
      console.log(word);
    }
  },
  mounted(){
    this.fetchData();
  }
}
</script>

<style lang="scss">

@import "../../sass/_variables.scss";

.container-wrapper{
 margin: 0;
 padding: 30px;
 .desciption-vocabulary{
   font-size: 16px;
   .content-description{
     margin: 0;
     .description-word{
       font-size: 30px;
     }
     .mean-word{
      margin-top: 10px;
       margin-bottom: 10px;
       color: $blue;
     }
   }
  }
 &>div{
  -webkit-box-shadow: 0px 0px 9px 0px rgba(0,0,0,0.75);
-moz-box-shadow: 0px 0px 9px 0px rgba(0,0,0,0.75);
box-shadow: 0px 0px 9px 0px rgba(0,0,0,0.75);
  margin: 10px;
  border-radius: 3px;
  background-color: #fff;
  padding: 20px;
  .title{
    font-size: 40px;
    font-weight: bold;
  }
  .line{
    border-bottom: solid 1px $color-grey-bold;
  }
 }
}

.fa-window-close{
  font-size: 20px;
  cursor: pointer;
}

.daily-vocabulary{
  .list-item-wrapper{
    .title-group-list{
      text-align: center;
    }
    li{
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
.text-danger{
  margin-left: 3px;
}
.ck-content { height:200px; }
.content{
  height: 575px;
  overflow: auto;
}


</style>