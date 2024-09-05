import { CloudinaryUploadWidgetResults } from "next-cloudinary";

export type ExtendedCloudinaryUploadWidgetResults = Omit<
  CloudinaryUploadWidgetResults,
  "info"
> & {
  info: {
    public_id: string;
    url: string;
  };
};
