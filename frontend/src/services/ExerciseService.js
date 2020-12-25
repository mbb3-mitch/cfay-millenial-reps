import http from "../http-common";

const getAll = () => {
  return http.get("/exercises");
};

const get = id => {
  return http.get(`/exercises/${id}`);
};

const create = data => {
  return http.post("/exercises", data);
};

const update = (id, data) => {
  return http.put(`/exercises/${id}`, data);
};

const remove = id => {
  return http.delete(`/exercises/${id}`);
};

const removeAll = () => {
  return http.delete(`/exercises`);
};

const findByName = name => {
  return http.get(`/exercises?name=${name}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName
};
