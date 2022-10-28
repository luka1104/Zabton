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
			pathname: data?.path ?? null
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
    return URL.createObjectURL(data);
  } catch (error) {
    console.error({ error });
  }
};
