import BaseRequest from "./BaseRequest";

class VocabularyRequest extends BaseRequest {
    create(data) {
        return this.post("api/vocabulary/create", data);
    }

    getListVocaGroupByDate(params) {
        return this.get("api/vocabulary/get-group-by-date", params);
    }

    getVocabularies(params) {
        console.log(params);
        return this.get("api/vocabulary/get", params);
    }

    getInformationFromGoogle(params) {
        return this.get("api/vocabulary/service-search", params);
    }
}

export default VocabularyRequest;
