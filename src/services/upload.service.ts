import api from './api';

export interface UploadResponse {
  url: string;
  publicId: string;
}

export class UploadService {
  static async uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('image', file);

    const response = await api.post<UploadResponse>('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data.url;
  }

  async deleteImage(publicId: string): Promise<void> {
    await api.delete(`/upload/${publicId}`);
  }
}

export const uploadService = new UploadService(); 