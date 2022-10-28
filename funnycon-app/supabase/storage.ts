import { supabaseClient } from "../lib/supabase";
import { v4 as uuidv4 } from "uuid"

type UploadStorageArgs = {
  image: string;
  bucketName: any;
};

type ReturnUploadStorage = {
  pathname: string | null;
};

type GetStorageFileURLBody = {
  bucketName: any;
  pathName: string;
};

// const uuid = () => {
//   return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
//     var r = (Math.random() * 16) | 0,
//       v = c == 'x' ? r : (r & 0x3) | 0x8
//     return v.toString(16)
//   })
// }

export const uploadStorage = async ({
  image,
  bucketName,
}: UploadStorageArgs): Promise<ReturnUploadStorage> => {
  try {
    const file = image;
    const pathName = `theme/${uuidv4()}`;
    const { data, error } = await supabaseClient.storage
      .from(bucketName)
      .upload(pathName, file);
    if (error) throw error;
    return {
			pathname: data?.path.substring(bucketName.length + 1) ?? null
		}
	} catch (error) {
		console.error({ error });
    return { pathname: null };
  }
};

export const getStorageFileURL = async ({
	bucketName,
	pathName
}: GetStorageFileURLBody): Promise<string | undefined> => {
  try {
    const { data, error } = await supabaseClient.storage.from(bucketName).download(pathName);
    if (error) throw error;
    //@ts-ignore
    return URL.createObjectURL(data);
  } catch (error) {
    console.error({ error });
  }
};
