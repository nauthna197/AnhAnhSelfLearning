import BaseRequest from "./BaseRequest";

class VocabularyRequest extends BaseRequest{
    create(data){
        return this.post('api/vocabulary/create',data); 
    }

    getListVoca(params){
        return this.get('api/vocabulary/get',params);
    }
}

export default VocabularyRequest;