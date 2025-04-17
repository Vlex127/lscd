import { supabase } from '../supabaseClient';

export const getCourses = async() => {
    const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
};export const createCourse = async (courseData) => {
    const { data, error } = await supabase
      .from('courses')
      .insert([courseData])
      .select();
  
    if (error) throw error;
    return data[0].id;
  };
  