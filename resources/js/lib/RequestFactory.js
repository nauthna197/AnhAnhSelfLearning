import VocabularyRequest from "../requests/VocabularyRequest";

const requestMap = {
    VocabularyRequest,
};

const instances = {};

export default class RequestFactory {

    static getRequest(classname)
    {
        let RequestClass = requestMap[classname];
        if (!RequestClass) {
            throw new Error('Invalid request class name: ' + classname);
        }

        let requestInstance = instances[classname];
        if (!requestInstance) {
            requestInstance = new RequestClass();
            instances[classname] = requestInstance;
        }

        return requestInstance;
    }

}
