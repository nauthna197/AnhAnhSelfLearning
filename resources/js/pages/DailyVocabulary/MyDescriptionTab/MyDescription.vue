<template>
  <div class>
    <div class="d-flex">
      <h3 class="title">{{title}}</h3>
      <i @click="this.$emit('onCloseDescription')" class="fas fa-window-close ml-auto text-danger"></i>
    </div>
    <div class="line mt-5"></div>
    <div class="content-description">
      <div
        class="description-word mt-3"
      >{{selectedWord.name}} ({{Utils.convertTypeVocabulary(selectedWord.type)}})</div>
      <div class="pronunciation-word">a-b-c-d-e</div>
      <div class="mean-word">
        {{isShowMean ? selectedWord.mean : hiddenWord(selectedWord.mean)}} <i @click="onMeaningEyeClick" class="fa eye-icon" :class="isShowMean ? 'fa-eye-slash' : 'fa-eye'"></i>
      </div>
      <h3 class="title">Some Example Sentences</h3>
      <div class="eample-sentence" v-html="selectedWord.description" />
    </div>
  </div>
</template>

<script>
import Utils from "../../../App/Utils";

export default {
  props: {
    selectedWord: {
      type: Object,
      default: {}
    },
    title: {
      type: String,
      default: ""
    }
  },
  data: function() {
    return {
      Utils,
      isShowMean:false,
    };
  },
  methods:{
    onMeaningEyeClick:function(){
     this.isShowMean = !this.isShowMean;
    },
    hiddenWord:function(mean){
      const hiddenWord = new Array(mean.length).join(mean.charAt(0)).toString();
      return hiddenWord;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../sass/_variables.scss";

.desciption-vocabulary {
  font-size: 16px;
  .content-description {
    margin: 0;
    .description-word {
      font-size: 30px;
    }
    .mean-word {
      margin-top: 10px;
      margin-bottom: 10px;
      color: $blue;
    }
    .eye-icon{
      margin-left: 5px;
      margin-right: 5px;
      cursor: pointer;
      color: $color-grey-dark;
    }
  }
}
</style>