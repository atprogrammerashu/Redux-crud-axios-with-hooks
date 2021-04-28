import http from "./Httpcommon";

const getAll = () => {
  return http.get("/Users");
};

const get = (id) => {
  return http.get(`/Users/${id}`);
};

const create = (data) => {
  return http.post("/Users", data);
};

const update = (id, data) => {
  return http.put(`/Users/${id}`, data);
};

const remove = (id) => {
  return http.delete(`/Users/${id}`);
};

const removeAll = () => {
  return http.delete(`/Users`);
};

const findByName = (name) => {
  return http.get(`/Users?Name=${name}`);
};

const Mymethods = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName,
};
export default Mymethods;
