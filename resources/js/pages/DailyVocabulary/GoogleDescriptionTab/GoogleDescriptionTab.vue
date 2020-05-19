<template>
  <div class>
    <div class="d-flex">
      <h3 class="title">{{title}}</h3>
      <i @click="this.$emit('onCloseDescription')" class="fas fa-window-close ml-auto text-danger"></i>
    </div>
    <div class="line mt-5"></div>
    <div class="content-description">
      <div class="description-word mt-3">
        <span class="grey-bold">Nghĩa của từ</span>
        {{selectedWord.word}}
      </div>
      <div class="pronunciation-word">{{selectedWord.phonetic}}</div>
      <div class="mean-word" v-for="(value,key) in selectedWord.meaning" :key="key">
        <div class="type-word">{{key}}</div>
        <div
          class="child-difinitions d-flex"
          v-for="(difinition,keyDefinition) in value"
          :key="keyDefinition"
        >
          <div class="left-difinitions">
            <button class="rounded-circle">{{keyDefinition}}</button>
          </div>
          <div class="right-difinitions">
            <div class="difinition">{{difinition.definition}}</div>
            <div class="example">{{difinition.example}}</div>
            <div class="symnonyms">
              <button
                class="btn btn-symnonyms"
                v-for="(synonym,keySynomym) in difinition.synonyms"
                :key="keySynomym"
              >{{synonym}}</button>
            </div>
          </div>
        </div>
      </div>
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
      Utils
    };
  }
};
</script>

<style lang="scss">
@import "../../../../sass/_variables.scss";

.grey-bold {
  color: $color-grey-bold;
}

.content-description {
  line-height: 30px;
  font-size: 20px;
  .pronunciation-word {
    color: $color-grey-bold;
    font-weight: bold;
  }
  .mean-word {
    margin-top: 10px;
    .type-word {
      color: $color-blue-custom;
      font-weight: bold;
    }
    .example {
      color: $color-grey-bold;
    }
    .left-difinitions{
      margin-top: 10px;
      width: 10%;
      text-align: center;
      button{
        color : $color-grey-bold;
        background-color: #fff;
        border: solid 1px $color-grey-bold;
      }
    }
    .right-difinitions{
      margin-top: 10px;
      width: 90%;
    }
    .symnonyms {
      .btn-symnonyms {
        margin-right: 5px;
        margin-top: 5px;
        background-color: #fff;
        color : $color-grey-bold;
        border: solid 1px $color-grey-bold;
        border-radius: 30px;
      }
    }
  }
}
</style>