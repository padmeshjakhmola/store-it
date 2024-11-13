export const appwriteConfig = {
  endpointUrl: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT! as string,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT! as string,
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE! as string,
  usersCollectionId: process.env
    .NEXT_PUBLIC_APPWRITE_USERS_COLLECTION! as string,
  filesCollectionId: process.env
    .NEXT_PUBLIC_APPWRITE_FILES_COLLECTION! as string,
  bucketId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET! as string,
  secretKey: process.env.NEXT_APPWRITE_KEY! as string,
};
