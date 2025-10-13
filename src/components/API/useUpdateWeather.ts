import {useMutation, useQueryClient} from "@tanstack/react-query";

export const useUpdateWeather = () => {
    const queryClient = useQueryClient()
    const { mutate } = useMutation({
        mutationFn: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["weather"]
            })
        }
    })
    return mutate
}