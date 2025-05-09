import { create } from 'zustand';
import { fetchTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '@/lib/api';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  imageUrl: string;
  youtubeUrl?: string;
}

interface TestimonialsState {
  testimonials: Testimonial[];
  isLoading: boolean;
  error: string | null;
  fetchTestimonials: () => Promise<void>;
  addTestimonial: (testimonial: Omit<Testimonial, 'id'>) => Promise<void>;
  updateTestimonial: (id: string, testimonial: Omit<Testimonial, 'id'>) => Promise<void>;
  removeTestimonial: (id: string) => Promise<void>;
}

export const useTestimonialsStore = create<TestimonialsState>((set) => ({
  testimonials: [],
  isLoading: false,
  error: null,

  fetchTestimonials: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetchTestimonials();
      set({ testimonials: response.testimonials, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch testimonials', isLoading: false });
    }
  },

  addTestimonial: async (testimonial) => {
    set({ isLoading: true, error: null });
    try {
      await createTestimonial(testimonial);
      const response = await fetchTestimonials();
      set({ testimonials: response.testimonials, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to create testimonial', isLoading: false });
      throw error;
    }
  },

  updateTestimonial: async (id, testimonial) => {
    set({ isLoading: true, error: null });
    try {
      await updateTestimonial(id, testimonial);
      const response = await fetchTestimonials();
      set({ testimonials: response.testimonials, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to update testimonial', isLoading: false });
      throw error;
    }
  },

  removeTestimonial: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await deleteTestimonial(id);
      const response = await fetchTestimonials();
      set({ testimonials: response.testimonials, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to delete testimonial', isLoading: false });
      throw error;
    }
  },
}));