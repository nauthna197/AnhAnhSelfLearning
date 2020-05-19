export default class BaseRequest {
  async get(url, params = {}) {
    try {
      const response = await window.axios.get(url,  {params} );
      return this._responseHandler(response);
    } catch (error) {
      this._errorHandler(error);
    }
  }

  async put (url, data = {}) {
    try {
      const response = await window.axios.put(url, data);
      return this._responseHandler(response);
    } catch (error) {
      this._errorHandler(error);
    }
  }

  async post(url, data = {}) {
    try {
      const response = await window.axios.post(url, data);
      return this._responseHandler(response);
    } catch (error) {
      this._errorHandler(error);
    }
  }

  async delete(url, params = {}) {
    try {
      const response = await window.axios.delete(url, params);
      return this._responseHandler(response);
    } catch (error) {
      this._errorHandler(error);
    }
  }

  async _responseHandler (response) {
    const data = response.data;
    return data;
  }

  _errorHandler(err) {
    if (err.response && err.response.status === 401) { // Unauthorized (session timeout)
      window.location.href = '/admin/login';
    }
    throw err;
  }

}
