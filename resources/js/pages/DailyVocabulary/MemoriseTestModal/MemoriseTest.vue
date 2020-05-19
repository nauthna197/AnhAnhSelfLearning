<template>
  <modal width="800" name="MemoryTest">
    <div slot="body" class="form-memorise-word">
      <div class="title-memory">
        What is <span class="font-weight-bold">{{vocabularyQuestions[indexQuestion].name}}</span> mean ?
      </div>
      <div class="answer-content">
        <a-radio-group v-model="selectedAnswer">

          <a-radio :style="radioStyle" :value="1">
            Option A
          </a-radio>
        </a-radio-group>
      </div>
      <div class="button-groups">
        <button @click="onNextButton" class="btn btn-success">Mext</button>
      </div>
    </div>
  </modal>
</template>

<script>
import modal from "../../../components/Modal";

export default {
  components:{
    modal,
  },
  data:function(){
    return {
      selectedWord:"",
      vocabularyQuestions:[],
      indexQuestion:0,
      radioStyle: {
          display: 'block',
          height: '30px',
          lineHeight: '30px',
      },
      selectedAnswer:"",
    };
  },
  methods:{
    onNextButton:function(){
      this.indexQuestion++;
    }
  }

};
</script>

<style scoped lang="scss">
@import "../../../../sass/_variables.scss";

.form-memorise-word {
  .title-memory {
    font-size: 20px;
  }
  .answer-content{
    margin-top:10px;
    margin-bottom:5px;
  }
  .button-groups {
    text-align: center;
    padding: 10px;
  }
}
</style>