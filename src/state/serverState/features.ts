import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "@/utils/axios";
import { useQueryClient } from "@tanstack/react-query";
import errorHandler from "@/utils/errorHandler";
import { message } from "antd";

export const fetchAllFeatures = async () => {
  const response = await axios.get(`/feature`);
  return response?.data?.payload;
};

export const useAllFeatures = (onSuccess?: (data: any) => void, onError?: (error: any) => void) => {
  return useQuery({
    queryKey: ["allFeatures"],
    queryFn: () => fetchAllFeatures(),
    retry: 1,
    meta: {
      errorMessage: "An error occurred while fetching data",
    },
  });
};

export const updateUserFeatures = async (features: string[]) => {
  const response = await axios.post(`/gateway/subnewplan`, {
    features,
  });
  return response.data;
};

export const useUpdateUserFeatures = (onSuccess?: (data: any) => void, onError?: (error: any) => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: string[]) => updateUserFeatures(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["user"] as any);
      message.success(data.message || "Your features have been updated successfully");
      onSuccess && onSuccess(data);
    },
    onError: (error: Error) => {
      console.log(error);
      errorHandler(error);
      onError && onError(error);
    },
  });
};
