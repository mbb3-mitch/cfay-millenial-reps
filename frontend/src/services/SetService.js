import http from "../http-common";

const getAll = () => {
  return http.get("/sets");
};

const get = id => {
  return http.get(`/sets/${id}`);
};

const create = data => {
  return http.post("/sets", data);
};

const update = (id, data) => {
  return http.put(`/sets/${id}`, data);
};

const remove = id => {
  return http.delete(`/sets/${id}`);
};

const removeAll = () => {
  return http.delete(`/sets`);
};

const findByWorkoutName = name => {
  return http.get(`/sets?workout=${name}`);
};
const findByWorkoutID = id => {
  return http.get(`/sets?workout_id=${id}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByWorkoutName,
  findByWorkoutID
};
