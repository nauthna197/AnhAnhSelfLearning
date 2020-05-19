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
       <div class="date-wrapper">
          <datepicker :format="customFormatter" class="from-date mr-4" v-model="fromDate"></datepicker>
          <span class="mr-4">To</span>
          <datepicker :format="customFormatter"class="to-date mr-4" v-model="toDate"></datepicker>
          <button @click="onClickTestVoca" class="btn btn-success">
            Test vocabulary
          </button>
      </div>
      <div class="content mt-5">
        <div class="list-item-wrapper" v-for="(value,key) in listVocaByDay" :key="key">
          <h5 class="title-group-list">{{key}}</h5>
          <ul class="list-group list-group-flush">
            <li class="list-group-item" v-for="voca in value" :key="voca.id">
              <span
                @click="onSelectWord(voca)"
              >{{voca.name}} ({{Utils.convertTypeVocabulary(voca.type)}})</span>
            </li>
          </ul>
        </div>
      </div>
      <modal width="800" name="AddWordButton">
        <div slot="body" class="form-add-word">
          <div class="row">
            <div class="form-group col-md-6">
              <label>
                Word
                <span class="text-danger">*</span>
              </label>
              <input type="text" v-model="formDataAddWord.name" class="form-control" />
            </div>
            <div class="form-group col-md-6">
              <label for="exampleInputEmail1">
                Type
                <span class="text-danger">*</span>
              </label>
              <select class="form-control" v-model="formDataAddWord.type">
                <option value>Select type of word</option>
                <option value="1">Verb</option>
                <option value="2">Noun</option>
                <option value="3">Adjective</option>
                <option value="4">Adverb</option>
              </select>
            </div>
          </div>
          <div class="row">
            <div class="form-group col-md">
              <label>
                Mean
                <span class="text-danger">*</span>
              </label>
              <input type="text" v-model="formDataAddWord.mean" class="form-control" />
            </div>
          </div>
          <div class="row">
            <div class="form-group col-md">
              <label>Synonym</label>
              <input type="text" disabled class="form-control" />
              <small>This input will be comming soon</small>
            </div>
          </div>
          <div class="row">
            <div class="form-group col-md">
              <label>Description</label>
              <ckeditor :editor="editor" v-model="formDataAddWord.description" :config="{}"></ckeditor>
            </div>
          </div>
        </div>
      </modal>
    </div>
    <div v-if="selectedWord" class="desciption-vocabulary col-5">
      <a-tabs default-active-key="1">
        <a-tab-pane key="1">
          <span slot="tab">
            <a-icon type="user" />My Description
          </span>
          <my-description-tab
            :selectedWord="selectedWord"
            title="My Description"
            :onCloseDescription="onCloseDescription"
          />
        </a-tab-pane>
        <a-tab-pane key="2">
          <span slot="tab">
            <a-icon type="google" />From Google
          </span>
          <google-description-tab
            :selectedWord="selectedWordGoogle"
            title="Google Dictionary"
            :onCloseDescription="onCloseDescription"
          />
        </a-tab-pane>
      </a-tabs>
    </div>
    <memorise-test/>
  </div>
</template>

<script>
import modal from "../../components/Modal";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import rf from "../../lib/RequestFactory";
import MyDescriptionTab from "./MyDescriptionTab/MyDescription";
import GoogleDescriptionTab from "./GoogleDescriptionTab/GoogleDescriptionTab";
import Utils from "../../App/Utils";
import MemoriseTest from "./MemoriseTestModal/MemoriseTest";
import Datepicker from 'vuejs-datepicker';
import moment from "moment";


export default {
  components: {
    modal,
    MyDescriptionTab,
    GoogleDescriptionTab,
    MemoriseTest,
    Datepicker,
  },
  data() {
    return {
      editor: ClassicEditor,
      fromDate: new moment().subtract("days",6).toDate(),
      toDate: new moment().toDate(),
      formDataAddWord: {
        description: "",
        name: "",
        type: "",
        mean: ""
      },
      listVocaByDay: {},
      selectedWord: "",
      selectedWordGoogle: {},
      Utils,
      vocabulariesTest:[],
    };
  },
  methods: {
    onClickAddButton() {
      CommonModal.show("AddWordButton", {
        buttons: [
          {
            label: "Save",
            style: {
              width: "140px",
              background: "rgb(0,112,192)"
            },
            callback: () => {
              const { name, type, mean } = this.formDataAddWord;

              if (name === "" || type === "" || mean === "") {
                this.$toasted.error("Important field is required!");
                return;
              }
              rf.getRequest("VocabularyRequest")
                .create(this.formDataAddWord)
                .then(data => {
                  this.$toasted.success(data);
                  this.fetchData();
                  this.resetFormData();
                  CommonModal.hide("AddWordButton");
                })
                .catch(error => {
                  console.log(error);
                  this.$toasted.error("Something went wrong!");
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
          }
        ]
      });
    },
    resetFormData: function() {
      this.formDataAddWord = {
        description: "",
        name: "",
        type: "",
        mean: ""
      };
    },
    convertToDataTest:function(data){
      const vocabulariesTestData = window._.map(data,function(e,index){
        const answerList = [e.mean];
        const exceptIndex = [index];
        while (exceptIndex.length<4){
            const random = Math.floor(Math.random() * Math.floor(data.length));
            if(exceptIndex.indexOf(random)!==-1){
                continue;
            }
            answerList.push(data[random].mean);
            exceptIndex.push(index)
        }
        e.answerList = Utils.shuffle(answerList);
        return e;
      });
      return Utils.shuffle(vocabulariesTestData);
    },
    customFormatter:function(value){
        return moment(value).format('Y-M-D');
    },
    fetchData: function() {
      rf.getRequest("VocabularyRequest")
        .getListVocaGroupByDate({})
        .then(response => {
          this.listVocaByDay = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    onSelectWord: function(word) {
      this.selectedWord = word;
      const params = {
        "word": word.name
      }

      rf.getRequest("VocabularyRequest")
        .getInformationFromGoogle(params)
        .then(response => {
          this.selectedWordGoogle = response[0];
        })
        .catch(error => {
          console.log(error);
        });
    },
    onCloseDescription() {
      this.selectedWord = "";
    },
    onClickTestVoca(){
      const params = {
          from_date:this.customFormatter(this.fromDate),
          to_date:this.customFormatter(this.toDate),
      }
      rf.getRequest("VocabularyRequest")
        .getVocabularies(params)
        .then(response => {
            this.vocabulariesTest = this.convertToDataTest(response);
            console.log(this.vocabulariesTest);
        })
        .catch(error => {
            console.log(error);
        });
      CommonModal.show("MemoryTest", {
        buttons: [
          {
            label: "Save",
            style: {
              width: "140px",
              background: "rgb(0,112,192)"
            },
            callback: () => {

            }
          },
          {
            label: "Cancel",
            style: {
              width: "140px",
              background: "rgb(0, 112, 192)"
            },
            callback: () => {
              CommonModal.hide("MemoryTest");
            }
          }
        ]
      });
    }
  },
  mounted() {
    this.fetchData();
  }
};
</script>

<style lang="scss">
@import "../../../sass/_variables.scss";

.container-wrapper {
  margin: 0;
  padding: 30px;
  & > div {
    -webkit-box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.75);
    margin: 10px;
    border-radius: 3px;
    background-color: #fff;
    padding: 20px;
    .title {
      font-size: 40px;
      font-weight: bold;
    }
    .line {
      border-bottom: solid 1px $color-grey-bold;
    }
  }
}

.fa-window-close {
  font-size: 20px;
  cursor: pointer;
}

.daily-vocabulary {
  .list-item-wrapper {
    .title-group-list {
      text-align: center;
    }
    li {
      text-transform: capitalize;
      span {
        cursor: pointer;
      }
      &:hover {
        background-color: #e8f9e9;
      }
    }
  }
}
.text-danger {
  margin-left: 3px;
}
.ck-content {
  height: 200px;
}
.content {
  height: 575px;
  overflow: auto;
}

.date-wrapper{
  display: flex;
  margin-top:20px;
  align-items: center;
  .vdp-datepicker input {
    width: 130px;
    border: 1px solid #cfcfcf;
    padding: 5px;
    font-size: 14px;
    border-radius: 3px;
    text-align: center;
  }
}
</style>
