import api from './client';

const getallDoctors = () =>
  api.post('doctor/get_doctors_by_name', {q: '', is_online: false});
const getDoctorById = info => api.post('/doctor/get_doctor_by_id', info);

export default {
  getallDoctors,
  getDoctorById,
};
