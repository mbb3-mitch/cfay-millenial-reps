import http from "../http-common";

const getAll = () => {
  return http.get("/workouts");
};

const get = id => {
  return http.get(`/workouts/${id}`);
};

const create = data => {
  return http.post("/workouts", data);
};

const update = (id, data) => {
  return http.put(`/workouts/${id}`, data);
};

const remove = id => {
  return http.delete(`/workouts/${id}`);
};

const removeAll = () => {
  return http.delete(`/workouts`);
};

const findByName = title => {
  return http.get(`/workouts?name=${title}`);
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
