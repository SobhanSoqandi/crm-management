import useFetchData from "./useFetchData";
import useSalon from "./useSalon";

function useServices() {
    const { salon, isSalonLoading } = useSalon();

    const salonId = salon?.data?.id;

    const { data, isLoading, isError, error, refetch } = useFetchData(
        ["services-list", salonId],
        `salon/${salonId}/services`,
        {
            enabled: !!salonId,
        }
    );

    return {
        services: data?.data || [],
        salonId,
        isLoading: isSalonLoading || isLoading,
        isError,
        error,
        refetch,
    };
}

export default useServices;