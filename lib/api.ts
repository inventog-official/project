import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Error handler
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    throw error;
  }
);

// Testimonials
export const fetchTestimonials = () => api.get('/api/testimonials');
export const createTestimonial = (data: any) => api.post('/api/testimonials', data);
export const updateTestimonial = (id: string, data: any) => api.put(`/api/testimonials/${id}`, data);
export const deleteTestimonial = (id: string) => api.delete(`/api/testimonials?id=${id}`);

// Leads
export const fetchLeads = () => api.get('/api/leads');
export const createLead = (data: any) => api.post('/api/leads', data);
export const deleteLead = (id: string) => api.delete(`/api/leads?id=${id}`);

// Blogs
export const fetchBlogs = () => api.get('/api/blogs');
export const createBlog = (data: any) => api.post('/api/blogs', data);
export const updateBlog = (id: string, data: any) => api.put(`/api/blogs/${id}`, data);
export const deleteBlog = (id: string) => api.delete(`/api/blogs/${id}`);

// Careers
export const fetchCareers = () => api.get('/api/careers');
export const createCareer = (data: any) => api.post('/api/careers', data);
export const updateCareer = (id: string, data: any) => api.patch(`/api/careers/${id}`, data);
export const deleteCareer = (id: string) => api.delete(`/api/careers/${id}`);

// Job Applications
export const fetchJobApplications = (careerId: string) => 
  api.get(`/api/careers/${careerId}/applications`);
export const createJobApplication = (careerId: string, data: any) => 
  api.post(`/api/careers/${careerId}/applications`, data);
export const fetchAllJobApplications = () => api.get('/api/careers/applications');