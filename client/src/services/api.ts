import { axiosInstance, axiosUpload } from "./AxiosInstance";

export const fetchVideos = async () =>
    await axiosInstance.get('/videos');

export const fileUpload = async (videoFile: File) => {
    const formData = new FormData();
    formData.append('video', videoFile);
    await axiosUpload.post('/videos', formData);
}

