import { axiosReq } from "../api/axiosDefaults"
/**
 *  Renders/updates data for the InfiniteScroll component
 *  Sends request to the next page of results
*/
export const fetchMoreData = async (resource, setResource) => {
    try {
        const {data} = await axiosReq.get(resource.next);
        setResource(prevResource => ({
            ...prevResource,
            next: data.next,
            results: data.results.reduce((acc, cur) => {
                return acc.some((accResult) => accResult.id === cur.id) 
                ? acc
                : [...acc, cur];
            }, prevResource.results),
        }));
    }catch(err){}
};