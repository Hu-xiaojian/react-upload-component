import type { UploaderConfig } from './upload-config';
import type { ResponseUpload } from './helper';

export type BeforeUploadFileType = File | Blob | boolean | string;

export interface UploadProgressEvent extends Partial<ProgressEvent> {
  percent?: number;
}

export type UploadRequestMethod = 'POST' | 'PUT' | 'PATCH' | 'post' | 'put' | 'patch';

/**
 * @desc 上传请求错误
 */
export interface UploadRequestError extends Error, ResponseUpload {
  status?: number;
  method?: UploadRequestMethod;
}

/**
 * @desc 上传请求配置
 */
export interface UploadRequestOption extends UploaderConfig {
  filename?: string;
  file: BeforeUploadFileType;
}
